angular
    .module('addressbook')
    .controller('adminController', [ '$scope', '$http', '$state', '$mdToast',
        function ($scope, $http, $state, $mdToast) {

            $scope.users = [];

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
        }
    ]);