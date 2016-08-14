//noinspection JSAnnotator
angular
    .module('addressbook')
    .controller('contactController', [ '$scope', '$http', 'Authentication', '$mdMedia', '$mdDialog', '$stateParams', '$state',
        '$timeout', '$log', '$mdToast', '$mdSidenav',
        function ( $scope, $http, Authentication, $mdMedia, $mdDialog, $stateParams, $state,
                  $timeout, $log, $mdToast, $mdSidenav) {

            $scope.contacts = [];
            $scope.groups = [];
            $scope.user = Authentication.currentUser;

            
            //fetch groups
           function getGroups() {
               $http.get('/api/groups')
                   .success(function (data) {
                       $scope.groups = data;
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

            function dialogController ($scope, $mdDialog, contact, $mdToast) {

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
                        $mdToast.show(
                                $mdToast.simple()
                                    .content("Kontakt dodany do listy")
                                    .position('top right')
                                    .hideDelay(1000)
                            );


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
            
//pagination
            $scope.onOrderChange = function() {};
            
            $scope.onPageChange = function() {};
        }
    ]);

