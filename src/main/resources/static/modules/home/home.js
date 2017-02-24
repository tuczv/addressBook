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

            /* sidenavs left and right */
            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                };
            }

            $scope.sidenavMenu = {
                sections:[
                    {
                        icon: 'action:ic_shopping_cart_24px',
                        name: 'Grupy',
                        expand: false

                    }]
            };

            /* ilość e-maili */
            function lengthEmails() {
                Inbox.getAll()
                    .then(function(data) {
                        $scope.emails  = data.data;
                    });
            }
            lengthEmails();

            /* wszystkie grupy */
            $scope.getGroups = function () {
                Group.getAll();
            };

            /* zalogowany użytkownik */
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

            /* wszystkie użytkownicy*/
            function getUsers() {
                $http.get('admin/users')
                    .success(function (data) {
                        $scope.users = data;
                    })
                    .error(function (data) {

                    });
            }

            getUsers();

            // get all messages
            $scope.messages = [];
            $scope.message = {
                author: $scope.user.username,
                text: ''
            };

            function showHistoryMessages() {
                $http.get('/api/messages')
                    .success(function (response) {
                        $scope.messages = response;
                    })
                    .error(function () {
                        alert('problem fetching message history');
                    })
            }

            showHistoryMessages();

            //configure STOMP and SOCKJs
            var stompClient = null;

            //add message
            $scope.sendTo = function () {
                stompClient.send('/api/chat', {}, JSON.stringify($scope.message));
                $scope.message = '';
            };

            /* konfiguracja Stomp i SockJS */
            function init() {
                var sock = new SockJS('/chat');
                stompClient = Stomp.over(sock);
                stompClient.connect({}, function (frame) {
                    stompClient.subscribe('/topic/chat', function (response) {
                        $scope.messages.push(response.body);
                        $scope.$apply();
                    });
                });
            }

            init();

            $scope.goToChat = function () {
                $state.go('home.chat');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Chat")
                        .position('top right')
                        .hideDelay(1000)
                );
            };

            $scope.goToContact = function () {
                $state.go('home.contacts');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Contacts")
                        .position('top right')
                        .hideDelay(1000)
                );
            };

            $scope.goUsers = function () {
                $state.go('home.users');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Users")
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
                        .content("Groups")
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
                        .content("Sent Mail")
                        .position('bottom right')
                        .hideDelay(1000)
                );
            };

            $scope.goToCalendar = function () {
                $state.go('home.calendar');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Calendar")
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