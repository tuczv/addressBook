//noinspection JSAnnotator
angular
    .module('addressbook')
    .controller('loginController', ['$scope', '$state', '$http', 'userService', '$mdToast', '$mdDialog',
        function ($scope, $state, $http, userService, $mdToast, $mdDialog) {

            $scope.user = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.password,
                authorities: [{authority:'ROLE_USER'}]
            };

            $scope.error = {};

            $scope.loginUser = function () {

                userService.loginUser($scope.user)
                    .then(function (response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Logowanie się udało")
                                .position('top right')
                                .hideDelay(1000)
                        );
                        $state.go('home');

                    }, function (err) {

                        $scope.error.hasError = true;
                        if (err.status == 401) {
                            $scope.error.message = "Invalid Credentials";
                        }
                        else {
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Podany login lub hasło jest błędne")
                                    .position('top right')
                                    .hideDelay(2000)
                            );
                            $scope.error.message = "Podany login lub hasło jest błędne"
                        }
                    });
            };

            $scope.sameUser = {
                username : '',
                password: '',
                email: '',
                secret: '',
                authorities: [{authority: 'ROLE_USER'}]
            };

            $scope.registerUser = function () {

                userService.register($scope.sameUser)
                    .then(function (response) {
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Nowy użytkownik został utworzony")
                                .position('top right')
                                .hideDelay(1000)
                        );

                        $scope.sameUser = {
                            username : '',
                            password: '',
                            email: '',
                            secret:'',
                            authorities: [{authority: 'ROLE_USER'}]
                        };

                    }, function (err) {
                        console.log(err);
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Użytkownik o takiej nazwie lub email istnieje w bazie!")
                                .position('top right')
                                .hideDelay(1000)
                        );
                    });

            };

            $scope.reset = function() {

                $scope.sameUser = {
                    username: '',
                    password: '',
                    email: '',
                    secret: '',
                    authorities: [{authority: 'ROLE_USER'}]
                };

            };

            $scope.clickResetPasswordUser = function (user, $event) {
                $mdDialog.show({
                    controller: resetDialogController,
                    templateUrl: 'modules/user/views/reset.html',
                    targetEvent: $event,
                    locals: {
                        user: user
                    }
                })
                    .then(function (result) {

                    });
            };


            $scope.showReset = function () {
                $state.go('reset');
            };

            $scope.closeReset = function () {
                $state.go('login');
            };

            function resetDialogController($scope, $mdDialog, user, $mdToast) {
                $scope.user = user;

                $scope.resetPassword = function (user) {
                    $http({
                        method: "PUT",
                        url: "api/users/" + $scope.user.username,
                        data: angular.toJson($scope.user),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function () {
                            console.log('success reset password');
                            $mdDialog.hide();
                            $state.reload();
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Hasło zostało zresetowane")
                                    .position('top right')
                                    .hideDelay(1000)
                            );
                        })
                        .error(function () {
                            console.log('Error reset password');
                        });
                };

            }
        }
    ]);