angular
    .module('addressbook')
    .controller('contactController',
        function ($scope, $http, Authentication, Group, Contact, $mdDialog, $stateParams, $state, $timeout, $log, $mdToast, $parse) {

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
                console.log(item.id, 'selected');
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
                id: $scope.id,
                user: $scope.user.username,
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
            function CSVToCollection(stringData, stringLimiter) {

                stringLimiter = (stringLimiter || ";");
                var objectsPattern = new RegExp((
                "(\\" + stringLimiter + "|\\r?\\n|\\r|^)" +
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                "([^\"\\" + stringLimiter + "\\r\\n]*))"), "gi");

                var arrayData = [[]];
                var arrayMatches = null;

                while (arrayMatches = objectsPattern.exec(stringData)) {

                    var strMatchedDelimiter = arrayMatches[1];

                    if (strMatchedDelimiter.length && (strMatchedDelimiter != stringLimiter)) {
                        arrayData.push([]);
                    }

                    if (arrayMatches[2]) {
                        var strMatchedValue = arrayMatches[2].replace(
                            new RegExp("\"\"", "g"), "\"");
                    } else {
                        var strMatchedValue = arrayMatches[3];
                    }
                    arrayData[arrayData.length - 1].push(strMatchedValue);
                }
                // Return the parsed data.
                return (arrayData);
            }

            function CSV2ToJSON(csv) {
                var collection = CSVToCollection(csv);
                var objectsArray = [];
                for (var i = 1; i < collection.length; i++) {
                    objectsArray[i - 1] = {};
                    for (var k = 0; k < collection[0].length && k < collection[i].length; k++) {
                        var key = collection[0][k];
                        objectsArray[i - 1][key] = collection[i][k]
                    }
                }

                var json = JSON.stringify(objectsArray);
                var string = json.replace(/},/g, "},\r\n");

                return string;
            }

            $scope.uploadFile = function(csv) {
                $http
                ({
                    method: 'POST',
                    url: 'api/contacts',
                    data: CSV2ToJSON(csv)
                })
                .success(function(data, status) {
                    console.log(CSV2ToJSON(csv));
                    console.log('success');
                    $state.reload();
                })
                .error(function(data, status) {
                    console.log(CSV2ToJSON(csv));

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

            $scope.openDeleteSelected = function ($event, selected) {
                var confirm = $mdDialog.confirm()
                    .title('Would you like to delete?')
                    .textContent('You will be logged out of the system')
                    .ariaLabel('Lucky delete')
                    .targetEvent($event)
                    .ok('OK')
                    .cancel('CANCEL');

                $mdDialog.show(confirm).then(function() {

                    function removeSelectContact (selected) {

                        $http
                        ({
                            method: 'DELETE',
                            url: 'api/contacts/',
                            data: selected,
                            headers: {
                                'Content-type': 'application/json'
                            }
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
                    }

                    removeSelectContact(selected);

                }, function() {
                    $scope.status = '';
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

                        function removeContact (id) {

                            $http
                            ({
                                method: 'DELETE',
                                url: 'api/contacts/' + id
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
                        }

                        removeContact(id);

                    }, function() {
                        $scope.status = '';
                    });

                };

                $scope.cancelEditModal = function () {
                    $mdDialog.cancel();
                    $state.reload();
                };

                $scope.openMenu = function ($mdOpenMenu, $event) {
                    $mdOpenMenu($event);
                };

                getGroups();
            }
    })
    // angular directive file upload and read .csv
    .directive('fileReader', function() {
        return {
            scope: {
                fileReader:"="
            },
            link: function(scope, element) {
                $(element).on('change', function(changeEvent) {
                    var files = changeEvent.target.files;
                    if (files.length) {
                        var r = new FileReader();
                        r.onload = function(e) {
                            var contents = e.target.result;
                            scope.$apply(function () {
                                scope.fileReader = contents;
                            });
                        };

                        r.readAsText(files[0]);
                    }
                });
            }
        };
    });
