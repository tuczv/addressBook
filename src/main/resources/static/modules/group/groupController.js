angular
    .module('addressbook')
    .controller('groupController', ['$scope', '$http', '$state', 'Authentication', '$mdDialog', '$mdToast', 'Group',
        function ($scope, $http, $state, Authentication, $mdDialog, $mdToast, Group) {

            $scope.user = Authentication.currentUser;
            console.log($scope.user);
            $scope.groups = [];

            function fetchGroups() {
                return Group.getAll()
                    .then(function (response) {
                        $scope.groups = response.data;
                    })
            }


            $scope.showAddGroup = function($event) {
                $mdDialog.show({
                    controller:  'groupController',
                    templateUrl: 'modules/group/dialog-group.html',
                    targetEvent: $event,
                    parent: angular.element(document.body)
                })
                    .then(function(result) {

                    });
            };

            $scope.cancelAddModal = function () {
                $mdDialog.cancel();
            };

            $scope.group = {
                id: $scope.id,
                user: $scope.user,
                name: $scope.name
            };

            $scope.saveGroup = function() {
               /*  return Group.createGroup($scope.id)
                     .then(function (response) {
                         $state.reload();
                         $mdToast.show(
                             $mdToast.simple()
                                 .content("Grupa dodana")
                                 .position('top right')
                                 .hideDelay(1000)
                         );
                         $mdDialog.hide();

                     }, function (err) {


                     });*/
                $http({
                    method: 'POST',
                    url: '/api/groups/' + $scope.group.id,
                    data: $scope.group
                })
                    .success(function () {
                        console.log('success');
                        $state.reload();
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Grupa dodana")
                                .position('top right')
                                .hideDelay(1000)
                        );


                    })
                    .error(function () {
                        alert("error creating group");
                    });

            };

            $scope.deleteGroup = function(id) {
                return Group.deleteGroup(id)
                    .then(function () {
                        $state.reload();
                    });
            };

            return fetchGroups();


        }]);