angular
    .module('addressbook')
    .controller('mainController', [ '$scope', '$http', 'Authentication', 'Security', 'Group', 'Inbox', '$mdMedia', '$mdDialog', '$stateParams', '$state',
        '$timeout', '$log', '$mdToast', '$mdSidenav', 'userService', '$mdBottomSheet',
        function($scope, $http, Authentication, Security, Group, Inbox, $mdMedia, $mdDialog, $stateParams, $state,
                   $timeout, $log, $mdToast, $mdSidenav, userService, $mdBottomSheet) {

            $scope.showMobileMainHeader = true;
            $scope.avatar = 'assets/icons/avatar.png';
            $scope.Security = Security;
            $scope.emails = [];

            function lengthEmails() {
                Inbox.getAll()
                    .then(function(data) {
                        $scope.emails  = data.data;
                    });
            }
            lengthEmails();

            $scope.getGroups = function () {
                Group.getAll();
            };

            $scope.user = Authentication.currentUser;

            console.log($scope.user);
            $scope.logout = function(){
                userService.logout().then(function(response){
                    $scope.user = null;
                    Authentication.currentUser = '';
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
               return Group.getAll();
            }

            getGroups();

            $scope.goToGroups = function () {
                $state.go('home.groups');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Grupy kontaktów")
                        .position('top right')
                        .hideDelay(1000)
                );
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