angular
    .module('addressbook')
    .controller('inboxController', [ '$scope', '$mdMedia', '$mdDialog', '$stateParams', '$http', '$mdToast', '$state', 'Authentication',
        function ($scope, $mdMedia, $mdDialog, $stateParams, $http, $mdToast, $state, Authentication) {

            $scope.showMobileMainHeader = true;
            $scope.showReadEmail = false;
           /* var imagePath = 'assets/icons/contacts.svg';*/

            $scope.selected = [];
            $scope.users = [];
            $scope.user = {};

            function getUsers() {
                $http.get('/api/users/')
                    .success(function (data) {
                        $scope.users = data;
                    });
            }

            getUsers();


            /**/
            $scope.selected = null;
            $scope.selectItem = function(item) {
                $scope.showReadEmail = true;
                $scope.selected = angular.isNumber(item) ? $scope.items[item] : item;
            };

            $scope.showCreateNews = function ($event) {

                $mdDialog.show({
                    controller:  'inboxController',
                    templateUrl: 'modules/inbox/dialog-news.html',
                    targetEvent: $event,
                    parent: angular.element(document.body),
                    focusOnOpen: false

                })
                    .then(function (result) {

                    });
            };

            $scope.emails = [];


            $scope.email = {
                userTo: $scope.userTo,
                subject: $scope.subject,
                body: $scope.body,
                userFrom:$scope.loggedUser
            };

            /* Emails*/
            function getMessages() {
                $http.get('/api/emails')
                    .success(function (response) {
                        $scope.emails = response;
                    })
                    .error(function () {
                        alert('problem fetching email history');
                    })
            }

            getMessages();

            $scope.createNews = function () {
                $http({
                    method: 'POST',
                    url: '/api/emails',
                    data: $scope.email
                })
                    .success(function () {
                        console.log('success');
                        $state.reload();
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Wiadmość została wysłana")
                                .position('bottom right')
                                .hideDelay(1000)
                        );


                    })
                    .error(function () {
                        alert("Error create email");
                    });
            };

            $scope.cancelAddModal = function () {
                $mdDialog.cancel();
            };

        }
    ]);