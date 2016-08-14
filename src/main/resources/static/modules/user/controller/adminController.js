angular
    .module('addressbook')
    .controller('adminController', [ '$scope', '$http',
        function ($scope, $http) {

            $scope.users = [];

            function getUsers() {
                $http.get('/api/users/')
                    .success(function (data) {
                        $scope.users = data;
                    });
            }

            getUsers();
        }
    ]);