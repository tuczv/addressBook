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

            function CSVToArray(strData, strDelimiter) {
                // Check to see if the delimiter is defined. If not,
                // then default to comma.
                strDelimiter = (strDelimiter || ";");
                // Create a regular expression to parse the CSV values.
                var objPattern = new RegExp((
                    // Delimiters.
                "(\\" + strDelimiter + "|\\r?\\n|\\r|^)" +
                // Quoted fields.
                "(?:\"([^\"]*(?:\"\"[^\"]*)*)\"|" +
                // Standard fields.
                "([^\"\\" + strDelimiter + "\\r\\n]*))"), "gi");
                // Create an array to hold our data. Give the array
                // a default empty first row.
                var arrData = [[]];
                // Create an array to hold our individual pattern
                // matching groups.
                var arrMatches = null;
                // Keep looping over the regular expression matches
                // until we can no longer find a match.
                while (arrMatches = objPattern.exec(strData)) {
                    // Get the delimiter that was found.
                    var strMatchedDelimiter = arrMatches[1];
                    // Check to see if the given delimiter has a length
                    // (is not the start of string) and if it matches
                    // field delimiter. If id does not, then we know
                    // that this delimiter is a row delimiter.
                    if (strMatchedDelimiter.length && (strMatchedDelimiter != strDelimiter)) {
                        // Since we have reached a new row of data,
                        // add an empty row to our data array.
                        arrData.push([]);
                    }
                    // Now that we have our delimiter out of the way,
                    // let's check to see which kind of value we
                    // captured (quoted or unquoted).
                    if (arrMatches[2]) {
                        // We found a quoted value. When we capture
                        // this value, unescape any double quotes.
                        var strMatchedValue = arrMatches[2].replace(
                            new RegExp("\"\"", "g"), "\"");
                    } else {
                        // We found a non-quoted value.
                        var strMatchedValue = arrMatches[3];
                    }
                    // Now that we have our value string, let's add
                    // it to the data array.
                    arrData[arrData.length - 1].push(strMatchedValue);
                }
                // Return the parsed data.
                return (arrData);
            }

            function CSV2JSON(csv) {
                var array = CSVToArray(csv);
                var objArray = [];
                for (var i = 1; i < array.length; i++) {
                    objArray[i - 1] = {};
                    for (var k = 0; k < array[0].length && k < array[i].length; k++) {
                        var key = array[0][k];
                        objArray[i - 1][key] = array[i][k]
                    }
                }

                var json = JSON.stringify(objArray);
                var str = json.replace(/},/g, "},\r\n");

                return str;
            }


            $scope.uploadFile = function(csv) {

                $http
                ({
                    method: 'POST',
                    url: 'api/contacts',
                    data: CSV2JSON(csv)
                })
                    .success(function(data, status) {
                        console.log(CSV2JSON(csv));

                        console.log('success');
                    })
                    .error(function(data, status) {
                        console.log(CSV2JSON(csv));

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
    ])
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
