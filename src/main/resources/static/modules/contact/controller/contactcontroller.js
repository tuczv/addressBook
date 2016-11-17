//noinspection JSAnnotator
angular
    .module('addressbook')
    .controller('contactController', ['$scope', '$http', 'Authentication', 'Group', '$mdDialog', '$stateParams', '$state',
        '$timeout', '$log', '$mdToast',
        function ($scope, $http, Authentication, Group, $mdDialog, $stateParams, $state, $timeout, $log, $mdToast) {

            $scope.user = Authentication.currentUser;
            $scope.groups = [];
            $scope.contacts = [];
            $scope.selected = [];

            $scope.options = {
                showSearch: false,
                rowSelection: true,
                multiSelect: true
            };

            $scope.selectItem = function (item) {
                console.log(item.name, 'selected');
            };

            //fetch groups
            function getGroups() {
                return Group.getAll()
                    .then(function (response) {
                        $scope.groups = response.data;
                    });
            }

            function getContact(contactId) {
                $http.get('/api/contacts/' + contactId)
                    .success(function (data) {
                        $scope.contact = data;
                    });
            }

            $scope.group = {
                id: $scope.id,
                name: $scope.name
            };

            $scope.contact = {
                user: $scope.user,
                name: $scope.name,
                lastName: $scope.lastName,
                email: $scope.email,
                phone: $scope.phone,
                address: $scope.address,
                groupId: $scope.groups.id
            };

            function getContacts() {
                $http.get('/api/contacts')
                    .success(function (data) {
                        $scope.contacts = data;
                        console.log(data);
                    })
                    .error(function () {
                        alert("error getting data");
                    });
            }

            getContacts();

            // edit contact
            $scope.clickEdit = function (contact, $event) {

                $mdDialog.show({
                    controller: dialogController,
                    templateUrl: 'modules/contact/views/edit-contact.html',
                    targetEvent: $event,
                    locals: {
                        contact: contact
                    }
                })
                    .then(function (result) {

                    });
            };

            $scope.filters = {};

            $scope.resetFilter = function () {
                $scope.searchInput = null;
            };

            $scope.exportData = function () {
                alasql("SELECT * INTO CSV('kontakty.csv', {headers:true}) FROM ?", [$scope.contacts]);
            };


            // add contact
            $scope.saveContact = function () {

                $http({
                    method: 'POST',
                    url: '/api/contacts/' + $scope.contact.groupId,
                    data: $scope.contact
                })
                    .success(function () {
                        console.log('success');
                        $state.reload();
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Kontakt dodany do listy")
                                .position('top right')
                                .hideDelay(1000)
                        );


                    })
                    .error(function (error) {
                        if (error.status == 500) {
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Kontakt o takiej nazwie lub email istnieje w bazie!")
                                    .position('top right')
                                    .hideDelay(1000)
                            );
                        }
                        else
                            alert("error creating contact");
                    });
            };

           /* $scope.deleteSelected = function (item) {
                    var index = $scope.data.indexOf(item);

                    if(index !== -1) {
                        $scope.data.splice(index, 1);
                    }
            };*/

            $scope.clickAdd = function ($event) {

                var confirm = $mdDialog.confirm({
                    controller: 'contactController',
                    templateUrl: 'modules/contact/views/dialog-contact.html',
                    targetEvent: $event,
                    parent: angular.element(document.body)
                });

                $mdDialog.show(confirm).then(function () {
                    console.log("here");
                });
            };

            $scope.cancelAddModal = function () {
                $mdDialog.cancel();
            };

//pagination
            $scope.onOrderChange = function () {
            };

            $scope.onPageChange = function () {
            };

            return getGroups();


            function dialogController($scope, $mdDialog, contact, $mdToast, Group) {

                $scope.contact = contact;
                $scope.groups = [];
                //fetch groups
                function getGroups() {
                    return Group.getAll()
                        .then(function (response) {
                            $scope.groups = response.data;
                        });
                }


                $scope.editContact = function (contact) {

                    $http({
                        method: "PUT",
                        url: "api/contacts/" + $scope.contact.id,
                        data: angular.toJson($scope.contact),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                        .success(function () {
                            console.log('success updating contact');
                            $mdDialog.hide();
                            $state.reload();
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Kontakt został edytowany")
                                    .position('top right')
                                    .hideDelay(1000)
                            );
                        })
                        .error(function () {
                            console.log('Error editing contact');
                        });
                };

                // delete contact
                $scope.removeContact = function (id) {

                    $http({
                        method: 'DELETE',
                        url: 'api/contacts/' + id
                    })
                        .success(function () {
                            console.log('success delete');
                            $mdDialog.hide();
                            $state.reload();
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Kontakt został usunięty")
                                    .position('top right')
                                    .hideDelay(1000)
                            );

                        })
                        .error(function () {
                            alert('error deleting contact');
                        });
                };

                $scope.cancelEditModal = function () {
                    $mdDialog.cancel();
                };

                $scope.openMenu = function ($mdOpenMenu, $event) {
                    $mdOpenMenu($event);
                };

                return getGroups();
            }
        }
    ]);