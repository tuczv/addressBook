angular
    .module('addressbook')
    .controller('calendarController', ['$scope', '$filter', '$http', '$q', '$mdDialog', '$document',
        function ($scope, $filter, $http, $q, $mdDialog, $document) {

            var date = new Date();
            var d = date.getDate();
            var m = date.getMonth();
            var y = date.getFullYear();

         /*   $scope.events = [

                    {
                        id   : 1,
                        title: 'All Day Event',
                        start: new Date(y, m, 1),
                        end  : null
                    },
                    {
                        id   : 2,
                        title: 'Long Event',
                        start: new Date(y, m, d - 5),
                        end  : new Date(y, m, d - 2)
                    },
                    {
                        id   : 3,
                        title: 'Some Event',
                        start: new Date(y, m, d - 3, 16, 0),
                        end  : null
                    },
                    {
                        id   : 4,
                        title: 'Repeating Event',
                        start: new Date(y, m, d + 4, 16, 0),
                        end  : null
                    },
                    {
                        id   : 5,
                        title: 'Birthday Party',
                        start: new Date(y, m, d + 1, 19, 0),
                        end  : new Date(y, m, d + 1, 22, 30)
                    }
            ];*/

            $scope.events = [];

            $http.get('/api/events')
                .success(function (data) {
                    $scope.events = data;
                    console.log(data);

                });

            /*$scope.eventSources = [$scope.events];*/

            $scope.uiConfig = {
                calendar:{
                    editable          : true,
                    eventLimit        : true,
                    handleWindowResize: false,
                    aspectRatio       : 1,
                    header            : '',
                    viewRender        : function (view) {
                        $scope.calendarView = view;
                        $scope.calendar = $scope.calendarView.calendar;
                        $scope.currentMonthShort = $scope.calendar.getDate().format('MMM');
                    },
                    lang              : "pl",
                    eventClick        : alertEventOnClick,
                    selectable        : true,
                    selectHelper      : true,
                    select            : select
                }
            };

            $scope.next = next;
            $scope.prev = prev;
            $scope.addEvent = addEvent;

            function addEvent(e) {
                var start = new Date(),
                    end = new Date();

                showNewEventDialog(start, end, e);
            }

            function alertEventOnClick() {
                showFormEventDialog();
            }

            function select (start, end, e) {
                showNewEventDialog(start, end, e);
            }

            function next()
            {
                $scope.calendarView.calendar.next();
            }

            /**
             * Go to previous on current view (week, month etc.)
             */
            function prev()
            {
                $scope.calendarView.calendar.prev();
            }

            function showFormEventDialog(calendarEvent, e) {
                $mdDialog.show({
                    controller: 'formEventController',
                    templateUrl: 'modules/calendar/event-form/form-event.html',
                    parent: angular.element($document.body),
                    targetEvent: e,
                    clickOutsideToClose: true,
                    locals: {
                        calendarEvent: calendarEvent,
                        showNewEventDialog: showNewEventDialog,
                        event: e
                    }
                });
            }

            function showNewEventDialog(start, end, e) {

                $mdDialog.show({
                    controller: 'newEventController',
                    templateUrl: 'modules/calendar/event-new/new-event.html',
                    parent: angular.element($document.body),
                    targetEvent: e,
                    clickOutsideToClose: true,
                    locals             : {

                    }
                }).then(function (response)
                {


                });
            }

        }
    ])

    .controller('newEventController', ['$scope', '$http', '$mdDialog', 'Authentication', '$state', '$mdToast',
        function ($scope, $http, $mdDialog, Authentication, $state, $mdToast) {

            $scope.logged = Authentication.currentUser;

            var start = new Date(),
                end = new Date();

            $scope.event = {
                title: $scope.title,
                start: start ,
                end: end,
                user: $scope.logged
            };

            $scope.saveEvent = function() {
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
            };

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