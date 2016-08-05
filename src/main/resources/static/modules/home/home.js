angular
    .module('addressbook')
    .controller('mainController', [ '$scope', '$http', 'Authentication', '$mdMedia', '$mdDialog', '$stateParams', '$state',
        '$timeout', '$log', '$mdToast', '$mdSidenav', 'userService',
        function($scope, $http, Authentication, $mdMedia, $mdDialog, $stateParams, $state,
                   $timeout, $log, $mdToast, $mdSidenav, userService) {

            $scope.showMobileMainHeader = true;

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
                        name: 'Grupy',
                        expand: true

                    }]
            };

            $scope.goToChat = function () {
                $state.go('home.chat');
            };

            $scope.goToContact = function () {
                $state.go('home.contacts');
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
                    controller:  'contactController',
                    templateUrl: 'modules/contact/views/dialog-group.html',
                    targetEvent: $event,
                    parent: angular.element(document.body)
                })
                    .then(function (result) {

                    });
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
                $mdToast.show(
                    $mdToast.simple()
                        .content("Twój profil")
                        .position('top right')
                        .hideDelay(1000)
                );
            };
        }
    ]);