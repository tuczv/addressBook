angular
    .module('addressbook')
    .controller('mainController',
        function($scope, $http, $q, Authentication, Security, Group, Inbox, $mdMedia, $mdDialog, $stateParams,
                    $state,$timeout, $log, $mdToast, $mdSidenav, userService, $mdBottomSheet, $location) {

            $scope.user = Authentication.currentUser;
            $scope.Security = Security;
            $scope.showMainHeader = true;
            $scope.avatar = 'assets/icons/avatar.png';
            $scope.emails = [];
            $scope.messages = [];

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

            $scope.openLogout = function ($event) {

               var confirm = $mdDialog.confirm()
                     .title('Would you like to logout?')
                     .textContent('You will be logged out of the system')
                     .ariaLabel('Lucky day')
                     .targetEvent($event)
                     .ok('OK')
                     .cancel('CANCEL');
               $mdDialog.show(confirm).then(function() {
                   function logout (){
                       userService.logout().then(function(response){
                           $scope.user = null;
                           Authentication.currentUser = '';
                           $state.go('login');
                       });
                   };
                   $mdToast.show(
                       $mdToast.simple()
                           .content("Success logout")
                           .position('top right')
                           .hideDelay(1000)
                   );
                   logout();
               }, function() {
                 $scope.status = '';
               });

            };

            $scope.$watch(function(){
                return Authentication.currentUser;
            },function(user){
                $scope.user = user;
                if(user == null){
                    $state.go('login');
                }
            });
            /* wszystkie użytkownicy*/

            $http.get('admin/users')
                .success(function (data) {
                    $scope.users = data;
                })
                .error(function (data) {

                });


            /*list messages in chat*/
            $http
                .get('/messages')
                .success(function(data) {
                    $scope.messages = data;
                    console.log(data);
                });


            var socket = new SockJS('/websocket');
            var stompClient = Stomp.over(socket);

            stompClient.connect({}, function (frame) {
                stompClient.subscribe('/app/chat', function (data) {
                    $scope.messages = JSON.parse(data.body);
                    $scope.$apply();

                    stompClient.subscribe('/topic/chat', function (data) {
                        var message = JSON.parse(data.body);
                        $scope.messages.unshift(message);
                        $scope.$apply();
                    });
                });
            });

            $scope.messageSend = function () {

                var data = {
                    author: $scope.user.username,
                    subject: $scope.message.subject,
                    text: $scope.message.text,
                    date: new Date()
                };
                stompClient.send("/app/chat", {}, JSON.stringify(data));
                $scope.message.text = '';

            };

            $scope.exportPDF = function(){
                html2canvas(document.getElementById('exportPDF'), {
                    onrendered: function (canvas) {
                        var data = canvas.toDataURL();
                        var docDefinition = {
                            content: [{
                                image: data,
                                width: 500
                            }]
                        };
                        pdfMake.createPdf(docDefinition).download("history.pdf");
                    }
                });
            };

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

        });
