angular
    .module('addressbook')
    .controller('adminController', [ '$scope', '$http', '$state', '$mdDialog', '$mdToast',
        function ($scope, $http, $state, $mdDialog, $mdToast) {

            $scope.users = [];
            $scope.selected = [];
            $scope.getUsers = getUsers;

            $scope.options = {
                showSearch: false,
                rowSelection: true,
                multiSelect: true
            };

            $scope.selectItem = function (item) {
                console.log(item.name, 'selected');
            };

            $scope.filters = {};

            $scope.resetFilter = function () {
                $scope.searchInput = null;
                $state.reload('home.users');
            };

            function getUsers() {
                $http.get('/admin/users/')
                    .success(function (data) {
                        $scope.users = data;
                    });
            }

            getUsers();

            $scope.profileUser = function() {
                $state.go('home.profile');
                $mdToast.show(
                    $mdToast.simple()
                        .content("Twój profil")
                        .position('bottom right')
                        .hideDelay(1000)
                );
            };

            $scope.user = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.password,
                authorities: [{authority:'ROLE_USER'}]
            };

            $scope.clickAddUser = function ($event) {
                var confirm = $mdDialog.confirm({
                    controller: 'adminController',
                    templateUrl: 'modules/user/views/add-user.html',
                    targetEvent: $event,
                    parent: angular.element(document.body)
                });

                $mdDialog.show(confirm).then(function () {
                    console.log("here");
                });
            };

            $scope.clickUpdateUser = function (user, $event) {
                $mdDialog.show({
                    controller: adminDialogController,
                    templateUrl: 'modules/user/views/edit-user.html',
                    targetEvent: $event,
                    locals: {
                        user: user
                    }
                })
                    .then(function (result) {

                    });
            };

            $scope.create = {
                username: $scope.username,
                email: $scope.email,
                password: $scope.password,
                authorities: [{authority:'ROLE_USER'}]

            };

            $scope.createUser = function () {
                $http({
                    method: 'POST',
                    url: '/api/users/register',
                    data: $scope.create
                })
                    .success(function () {
                        console.log('success');
                        $state.reload();
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Użytkownik dodany")
                                .position('top right')
                                .hideDelay(1000)
                        );


                    })
                    .error(function (error) {
                        if (error.status == 500) {
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Użytkownik o takiej nazwie lub email istnieje w bazie!")
                                    .position('top right')
                                    .hideDelay(1000)
                            );
                        }
                        else
                            alert("error creating user");
                    });
            };

            $scope.deleteUser = function (id) {
                $http({
                    method: 'DELETE',
                    url: 'admin/users/' + id
                })
                    .success(function () {
                        console.log('success delete');
                        $state.reload();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Uzytkownik został usunięty")
                                .position('top right')
                                .hideDelay(1000)
                        );

                    })
                    .error(function () {
                        alert('error deleting contact');
                    });
            };

            $scope.cancelCreate = function () {
                $mdDialog.hide();
            };

            $scope.onOrderChange = function () {};

            $scope.onPageChange = function () {};

            function adminDialogController($scope, $mdDialog, user, $mdToast) {

                $scope.user = user;

                $scope.updateUser = function (user) {
                    $http({
                        method: "PUT",
                        url: "admin/users/" + $scope.user.id,
                        data: angular.toJson($scope.user),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function () {
                            console.log('success updating user');
                            $mdDialog.hide();
                            $state.reload();
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Użytkownik został edytowany")
                                    .position('top right')
                                    .hideDelay(1000)
                            );
                        })
                        .error(function () {
                            console.log('Error editing user');
                        });
                };

                $scope.cancelEditModal = function () {
                    $mdDialog.hide();
                };
            }
        }
    ]);
