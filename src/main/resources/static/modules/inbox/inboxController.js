angular
    .module('addressbook')
    .controller('inboxController', [ '$scope', '$mdMedia', '$mdDialog', '$stateParams', '$http', '$mdToast', '$state', 'Authentication',
        function ($scope, $mdMedia, $mdDialog, $stateParams, $http, $mdToast, $state, Authentication) {

            $scope.showMobileMainHeader = true;
            $scope.showEmail = true;
            $scope.showReadEmail = false;
            $scope.logged = Authentication.currentUser;

            $scope.selected = [];
            /**/
            $scope.selected = null;
            $scope.selectedMailShowDetails = false;
            $scope.avatarEmail = 'assets/icons/A.png';

            $scope.selectItem = function(item) {
                $scope.showEmail = false;
                $scope.showReadEmail = true;
                $scope.selected = angular.isNumber(item) ? $scope.items[item] : item;
            };

            $scope.showCreateNews = function ($event) {

                $mdDialog.show({
                    controller:  'inboxController',
                    templateUrl: 'modules/inbox/dialog-news.html',
                    targetEvent: $event,
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
                userFrom: $scope.logged
            };

            /* Emails*/
            function getEmails() {
                $http.get('/api/emails')
                    .success(function (data) {
                        $scope.emails = data;
                        console.log(data);
                    })
                    .error(function () {
                        alert("error getting data");
                    });
            }

            getEmails();


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
                                .content("Sent message")
                                .position('bottom right')
                                .hideDelay(1000)
                        );


                    })
                    .error(function () {
                        alert("Error create email");
                    });
            };

            $scope.deleteEmail = function (id) {

                $http({
                    method: 'DELETE',
                    url: 'api/emails/' + id
                })
                    .success(function () {
                        console.log('success delete');
                        $mdDialog.hide();
                        $state.reload();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Delete message")
                                .position('top right')
                                .hideDelay(1000)
                        );

                    })
                    .error(function () {
                        alert('error deleting email');
                    });
            };

            $scope.closeSelectEmail = function () {
                $scope.showReadEmail = false;
            };

            $scope.cancelAddModal = function () {
                $mdDialog.cancel();
            };

            /*GET USERS*/
            $scope.users = [];
            $scope.filterSelected = true;

            $http.get('/admin/users')
                .success(function (response) {
                    $scope.users = response;
                });

        }
    ]);