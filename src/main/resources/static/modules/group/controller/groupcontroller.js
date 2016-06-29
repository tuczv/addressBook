angular
    .module('group')
    .controller('groupController',['$scope', '$http',
        function ($scope, $http) {

            $scope.groups = [];

            $http.get('/api/groups')
                .success(function (data) {
                    $scope.groups = data;
                })
                .error(function () {
                    alert('error fetching groups');
                });
            
            $scope.group = {
                contacts: $scope.contacts
            };

            $scope.saveGroup = function () {
                $http.post('/api/groups', $scope.group.contacts)
                    .success(function () {
                        console.log('success');
                    })
                    .error(function () {
                        alert("error creating group");
                    });
            };

            $scope.removeGroup = function (id) {

                $http({
                    method: 'DELETE',
                    url: '/api/groups/' + id
                })
                    .success(function () {
                        console.log('success delete');
                    })
                    .error(function () {
                        alert('error deleting group');
                    });
            };
        }

    ]);