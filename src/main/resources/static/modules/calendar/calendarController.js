angular
    .module('addressbook')
    .controller('calendarController', ['$scope', '$http', '$mdDialog', '$q',
        function ($scope, $http, $mdDialog, $q) {

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

            $scope.events = [];

            function getEvents() {
                $http.get('/api/events')
                    .success(function (data) {
                        $scope.events = data;
                        console.log(data);

                    });
            }

            getEvents();

            $scope.uiConfig = {
                calendar: {
                    editable: true,
                    header: '',
                    handleWindowResize: false,
                    aspectRatio       : 1,
                    lang: "pl",
                    viewRender: function (view) {
                        $scope.calendarView = view;
                        $scope.calendar = $scope.calendarView.calendar;
                        $scope.currentMonthShort = $scope.calendar.getDate().format('MMM');
                    },
                    columnFormat      : {
                        month: 'ddd',
                        week : 'ddd D',
                        day  : 'ddd M'
                    },
                    eventClick: clickEvent,
                    selectable: true,
                    selectHelper: true,
                    select: select
                }
            };

            function clickEvent(event, e) {
                showFormEventDialog(event, e);
            }

            function select(start, end, e) {
                showNewEventDialog('add', false, start, end, e);
            }

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

            $scope.next = next;
            $scope.prev = prev;
            $scope.addEvent = addEvent;

            function next() {
                calendarView.calendar.next();
            }

            function prev() {
                calendarView.calendar.prev();
            }

            function addEvent(e)
            {
                var start = new Date(),
                    end = new Date();

                showNewEventDialog('add', false, start, end, e);
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