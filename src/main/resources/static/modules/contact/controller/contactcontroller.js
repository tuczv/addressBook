//noinspection JSAnnotator
angular
    .module('contact')
    .controller('contactController', ['$scope', '$http', 'Authentication', '$mdMedia', '$mdDialog', '$stateParams', '$state',
        '$timeout', '$mdSidenav', '$log',
        function ($scope, $http, Authentication, $mdMedia, $mdDialog, $stateParams, $state,  $timeout, $mdSidenav, $log) {

            $scope.contacts = [];
            $scope.groups = [];
            $scope.user = Authentication.currentUser;
            $scope.showMobileMainHeader = true;

            $scope.openRightMenu = function() {
                $mdSidenav('right').toggle();
            };

            //fetch contacts
            function getGroups() {
                $http.get('/api/groups')
                    .success(function (data) {
                        $scope.groups = data;
                    })
                    .error(function () {
                        alert('error fetching groups');
                    });
            }

            getGroups();

            function getContact(contactId) {
                $http.get('/api/contacts/' + contactId)
                    .success(function (data) {
                        $scope.contact = data;
                    });
            }

            $scope.contact = {
                name: $scope.name,
                lastName: $scope.lastName,
                email: $scope.email,
                phone: $scope.phone,
                groupId: $scope.groups.id
            };

            console.log($scope.contact);

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
                    controller:  dialogController,
                    templateUrl: 'modules/contact/views/edit-contact.html',
                    targetEvent: $event,
                    locals : {
                        contact : contact
                    }
                })
                    .then(function (result) {

                    });
            };

            function dialogController ($scope, $mdDialog, contact) {

                $scope.contact = contact;
                $scope.groups = [];

                function getGroups() {
                    $http.get('/api/groups')
                        .success(function (data) {
                            $scope.groups = data;
                        })
                        .error(function () {
                            alert('error fetching groups');
                        });
                }
                getGroups();

                $scope.editContact = function (contact) {

                    $http({
                        method : "PUT",
                        url : "api/contacts/" + $scope.contact.id,
                        data : angular.toJson($scope.contact),
                        headers : {
                            'Content-Type' : 'application/json'
                        }
                    })
                        .success(function () {
                            console.log('success updating contact');
                            $mdDialog.hide();
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
                        })
                        .error(function () {
                            alert('error deleting contact');
                        });
                };

                $scope.cancelEditModal = function () {
                    $mdDialog.cancel();
                };
            }


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

                    })
                    .error(function () {
                        alert("error creating contact");
                    });
            };

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

        }
    ]);

