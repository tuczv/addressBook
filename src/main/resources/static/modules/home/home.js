angular
    .module('addressbook')
    .controller('mainController', [ '$scope', '$http', 'Authentication', 'groupService', '$mdMedia', '$mdDialog', '$stateParams', '$state',
        '$timeout', '$log', '$mdToast', '$mdSidenav', 'userService', '$mdBottomSheet',
        function($scope, $http, Authentication, groupService, $mdMedia, $mdDialog, $stateParams, $state,
                   $timeout, $log, $mdToast, $mdSidenav, userService, $mdBottomSheet) {

            $scope.showMobileMainHeader = true;
            $scope.avatar = 'assets/icons/avatar.png';

            $scope.getGroups = function () {
                groupService.getAll()
                    .then(function (data) {
                        $scope.groups = data;

                    });
            };

            $scope.user = Authentication.currentUser;

            console.log($scope.user);
            $scope.logout = function(){
                userService.logout().then(function(response){
                    $scope.user = null;
                    Authentication.currentUser = null;
                    $state.go('login');
                });
            };

            $scope.$watch(function(){
                return Authentication.currentUser
            },function(user){
                $scope.user = user;
                if(user == null){
                    $state.go('login');
                }
            });

            $scope.sidenavMenu = {
                sections:[
                    {
                        icon: 'action:ic_shopping_cart_24px',
                        name: 'Grupy',
                        expand: false

                    }]
            };

            $scope.goToChat = function () {
                $state.go('home.chat');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Czat")
                        .position('top right')
                        .hideDelay(1000)
                );
            };

            $scope.goToContact = function () {
                $state.go('home.contacts');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Kontakty")
                        .position('top right')
                        .hideDelay(1000)
                );
            };

            $scope.goUsers = function () {
                $state.go('home.users');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Użytkownicy")
                        .position('top right')
                        .hideDelay(1000)
                );
            };

            function getGroups() {
                $http.get('/api/groups')
                    .success(function (data) {
                        $scope.groups = data;
                    })
                    .error(function () {
                        alert('error fetching groups');
                    });
            }

            getGroups();

            $scope.showAddGroup = function ($event) {
                $mdDialog.show({
                    controller:  'mainController',
                    templateUrl: 'modules/contact/views/dialog-group.html',
                    targetEvent: $event,
                    parent: angular.element(document.body)
                })
                    .then(function (result) {

                    });
            };

            $scope.cancelAddModal = function () {
                $mdDialog.cancel();
            };

            $scope.group= {

            };

            $scope.saveGroup = function () {

                $http({
                    method: 'POST',
                    url: '/api/groups/' + $scope.group.id,
                    data: $scope.group

                })
                    .success(function () {
                        console.log('success');
                        $state.reload();
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Grupa została utworzona")
                                .position('top right')
                                .hideDelay(1000)
                        );
                    })
                    .error(function () {
                        alert("error creating new group");
                    });
            };

            $scope.goToProfile = function () {
                $state.go('home.profile');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Twój profil")
                        .position('top right')
                        .hideDelay(1000)
                );
            };

            $scope.goToInbox = function () {
                $state.go('home.inbox');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Wysłane wiadomości")
                        .position('bottom right')
                        .hideDelay(1000)
                );
            };

            $scope.goToCalendar = function () {
                $state.go('home.calendar');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Kalendarz")
                        .position('bottom right')
                        .hideDelay(1000)
                );
            };

            $scope.bottomSettings = function () {
                $scope.alert = '';
                $mdBottomSheet.show({
                    templateUrl: '/modules/home/settings.html',
                    controller: 'mainController'
                }).then(function(clickedItem) {
                    $scope.alert = clickedItem['name'] + ' clicked!';
                });
            };
        }
    ]);