angular
    .module('addressbook')
    .controller('groupController', ['$scope', '$http', '$state', 'Authentication', '$mdDialog', '$mdToast', 'Group',
        function ($scope, $http, $state, Authentication, $mdDialog, $mdToast, Group) {

            $scope.user = Authentication.currentUser;
            $scope.group = {
                id: $scope.id,
                name: $scope.name,
                user: $scope.user
            };
            $scope.groups = [];

            $scope.options = {
                showSearch: false,
                rowSelection: true,
                multiSelect: true
            };

            $scope.filters = {};

            $scope.resetFilter = function () {
                $scope.searchInput = null;
                $state.reload('home.groups');
            };

            function getGroup(groupId) {
                $http.get('/api/groups/' + groupId)
                    .success(function (data) {
                        $scope.group = data;
                    });
            }

            function fetchGroups() {
                return Group.getAll()
                    .then(function (response) {
                        $scope.groups = response.data;
                    })
            }


            $scope.showAddGroup = function ($event) {
                $mdDialog.show({
                    controller: 'groupController',
                    templateUrl: 'modules/group/dialog-group.html',
                    targetEvent: $event,
                    parent: angular.element(document.body)
                })
                    .then(function (result) {

                    });
            };

            $scope.clicked = function (group, $event) {
                $mdDialog.show({
                    controller: dialogGroupController,
                    templateUrl: 'modules/group/contactsByGroup.html',
                    targetEvent: $event,
                    locals: {
                        group: group
                    },
                    parent: angular.element(document.body)

                })
                    .then(function (result) {

                    });
            };

            $scope.showEditGroup = function (group, $event) {
                $mdDialog.show({
                    controller: dialogGroupController,
                    templateUrl: 'modules/group/dialog-edit-group.html',
                    targetEvent: $event,
                    locals: {
                        group: group
                    },
                    parent: angular.element(document.body)

                })
                    .then(function (result) {

                    });
            };

            $scope.cancelAddModal = function () {
                $mdDialog.cancel();
            };


            $scope.saveGroup = function () {
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
                                .content("Create group")
                                .position('top right')
                                .hideDelay(1000)
                        );

                    })
                    .error(function (error) {
                        if (error.status == 500) {
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Group not found!")
                                    .position('top right')
                                    .hideDelay(1000)
                            );
                        }
                        else
                            alert("error creating group");
                    });

            };

            $scope.openDelete = function ($event, id) {
               console.log(id);
               var confirm = $mdDialog.confirm()
                     .title('Would you like to delete?')
                     .textContent('You will be logged out of the system')
                     .ariaLabel('Lucky delete')
                     .targetEvent($event)
                     .ok('OK')
                     .cancel('CANCEL');
               $mdDialog.show(confirm).then(function() {
                   function deleteGroup (id) {
                       return Group.deleteGroup(id)
                           .then(function () {
                               $state.reload();
                           });
                   }

                   $mdToast.show(
                       $mdToast.simple()
                           .content("Success delete")
                           .position('top right')
                           .hideDelay(1000)
                   );
                   deleteGroup(id);

               }, function() {
                 $scope.status = '';
               });

            };

            function dialogGroupController($scope, $http, $mdDialog, group, $mdToast, Group) {

                $scope.group = group;
                $scope.groups = [];
                $scope.contact = {};
                $scope.contacts = [];


                function getContactsByGroup(group){
                    $http.get('api/contacts/group/' + $scope.group.name)
                        .success(function (data) {
                            $scope.contacts = data;
                            console.log(data);
                        });
                }
                getContactsByGroup();

                function getGroups() {
                    return Group.getAll()
                        .then(function (response) {
                            $scope.groups = response.data;
                        });
                }

                $scope.editGroup = function (group) {

                    $http({
                        method: "PUT",
                        url: "api/groups/" + $scope.group.id,
                        data: angular.toJson($scope.group),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function () {
                            console.log('success updating group');
                            $mdDialog.hide();
                            $state.reload();
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Update group")
                                    .position('top right')
                                    .hideDelay(1000)
                            );
                        })
                        .error(function () {
                            console.log('Error editing group');
                        });
                };

                $scope.cancelAddModal = function () {
                    $mdDialog.cancel();
                };

                return getGroups();
            }

            return fetchGroups();


        }]);
