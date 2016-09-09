angular
    .module('addressbook')
    .controller('calendarController', ['$scope', '$filter', '$http', '$q', '$mdDialog',
        function ($scope, $filter, $http, $q, $mdDialog) {

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();


            $http.get('/api/events')
                    .success(function (data) {
                        $scope.events = data;
                        console.log(data);

                    });

            $scope.selectedDate = null;
            $scope.firstDayOfWeek = 0;
            $scope.setDirection = function(direction) {
                $scope.direction = direction;
            };
            $scope.dayClick = function(date) {
                showNewEventDialog();
            };

            $scope.prevMonth = function(data) {
                $scope.msg = "You clicked (prev) month " + data.month + ", " + data.year;
            };

            $scope.nextMonth = function(data) {
                $scope.msg = "You clicked (next) month " + data.month + ", " + data.year;
            };


            var date = new Date();

            $scope.setDayContent = function(date) {
                // You would inject any HTML you wanted for
                // that particular date here.
                return "<p></p>";
            };


            function showFormEventDialog(calendarEvent, e) {
                $mdDialog.show({
                    controller: 'formEventController',
                    templateUrl: 'modules/calendar/event-form/form-event.html',
                    targetEvent: e,
                    clickOutsideToClose: true,
                    locals: {
                        calendarEvent: calendarEvent,
                        showNewEventDialog: showNewEventDialog,
                        event: e
                    }
                });
            }

            function showNewEventDialog(calendarEvent, start, end, e) {

                var dialogData = {
                    calendarEvent: calendarEvent,
                    start        : start,
                    end          : end
                };

                $mdDialog.show({
                    controller: 'newEventController',
                    templateUrl: 'modules/calendar/event-new/new-event.html',
                    targetEvent: e,
                    clickOutsideToClose: true,
                    locals             : {
                        dialogData: dialogData
                    }
                }).then(function (response)
                {


                });
            }

        }
    ])

    .controller('newEventController', ['$scope', '$http', '$mdDialog', 'Authentication', '$state', '$mdToast', 'dialogData',
        function ($scope, $http, $mdDialog, Authentication, $state, $mdToast, dialogData) {

            $scope.logged = Authentication.currentUser;

            $scope.dialogData = dialogData;

            $scope.event = {
                title: $scope.title,
                start: $scope.start,
                end: $scope.end,
                user: $scope.logged
            };

            $scope.saveEvent = saveEvent;

            function saveEvent() {
                $http({
                    method: 'POST',
                    url: '/api/events',
                    data: $scope.event
                })
                    .success(function () {
                        console.log('success');
                        $state.reload();
                        $mdDialog.hide();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Wydarzenie zostało dodane")
                                .position('top right')
                                .hideDelay(1000)
                        );


                    })
                    .error(function () {
                        alert("error creating event");
                    });
            }

            $scope.cancelDialog = function () {
                $mdDialog.cancel();
            };

        }
    ])

    .controller('formEventController', ['$scope', '$mdDialog',
        function ($scope, $mdDialog) {

            $scope.cancelDialog = function () {
                $mdDialog.cancel();
            };
        }
    ]);