//noinspection JSAnnotator
angular
    .module('addressbook')
    .controller('contactController', ['$scope', '$http', 'Authentication', 'Group', '$mdDialog', '$stateParams', '$state',
        '$timeout', '$log', '$mdToast', '$parse',
        function ($scope, $http, Authentication, Group, $mdDialog, $stateParams, $state, $timeout, $log, $mdToast, $parse) {

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

            //import contacts CSV file
            $scope.csv = {
                content: null,
                header: true,
                separator: ',',
                result: null,
                uploadButtonLabel: "upload a csv file",
                accept:true,
                callback: 'uploadFile'
            };

            var _lastGoodResult = '';
            var result = null;
            $scope.toPrettyJSON = function (json, tabWidth) {
                var objStr = JSON.stringify(json);
                var obj = null;
                try {
                    obj = $parse(objStr)({});
                } catch(e){
                    // eat $parse error
                    return _lastGoodResult;
                }

                 result = JSON.stringify(obj, null, Number(tabWidth));
                _lastGoodResult = result;

                return result;
            };

            // var table = new Array();
            // var fileInput = document.getElementById('fileInput');
            //
            // fileInput.addEventListener('change', function(e) {
            //     var file = fileInput.files[0];
            //     var textType = /text.*/;
            //
            //     var reader = new FileReader();
            //
            //     reader.onload = function(e) {
            //         table = new Array();
            //
            //         var lines = reader.result.split();
            //         lines.forEach(function(line) {
            //             var aLineArray = line.split(",");
            //             table.push(aLineArray);
            //         });
            //
            //         $timeout(function() {
            //             table.push(null);
            //         });
            //     };
            //     reader.readAsText(file);
            // });
            
            
            $scope.uploadFile = function() {

                $http
                    ({
                        method: 'POST',
                        url: 'api/contacts',
                        // headers: {'content-type': 'application/json; charset=UTF-8'},
                        data: result
                    })
                    .success(function(data, status) {
                        console.log(result);

                        console.log('success');
                    })
                    .error(function(data, status) {
                        console.log(result);

                        console.log('error');
                    });
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
                                .content("Create contact")
                                .position('top right')
                                .hideDelay(1000)
                        );


                    })
                    .error(function (error) {
                        if (error.status == 500) {
                            $mdToast.show(
                                $mdToast.simple()
                                    .content("Contact not found")
                                    .position('top right')
                                    .hideDelay(1000)
                            );
                        }
                        else
                            alert("Error creating contact");
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
                                    .content("Update contact")
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
                                    .content("Delete contact")
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
   
                getGroups();
            }
        }
    ]);