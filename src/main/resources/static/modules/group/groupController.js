angular
    .module('addressbook')
    .controller('groupController', ['$scope', '$state', '$mdDialog', '$mdToast', 'Group',
        function ($scope, $state, $mdDialog, $mdToast, Group) {

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

            $scope.group= {

            };

            $scope.saveGroup = function() {
                 return Group.createGroup($scope.group)
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


                     });

            };

            return fetchGroups();

        }]);