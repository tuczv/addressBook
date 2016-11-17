angular
    .module('addressbook')
    .controller('calendarController', ['$scope', '$filter', '$http', '$q', '$state', '$mdDialog', '$document',
        function ($scope, $filter, $http, $q, $state, $mdDialog, $document) {

            $scope.events = [];

            $http.get('api/events/')
                .then(function(response){
                    angular.forEach(response.data, function (scope) {
                        $scope.events.push({
                            id: scope.id,
                            title: scope.title,
                            start: new Date(scope.start),
                            end:  new Date(scope.end),
                            location: scope.location
                        });
                    });
                });

            $scope.eventSources=[$scope.events];

            console.log($scope.eventSources);

            $scope.uiConfig = {
                calendar:{
                    editable          : true,
                    eventLimit        : true,
                    handleWindowResize: false,
                    aspectRatio       : 1,
                    header:'',
                    viewRender        : function (view) {
                        $scope.calendarView = view;
                        $scope.calendar = $scope.calendarView.calendar;
                        $scope.currentMonthShort = $scope.calendar.getDate().format('MMM');

                    },
                    columnFormat      : {
                        month: 'ddd',
                        week : 'ddd D',
                        day  : 'ddd M'
                    },
                    lang              : "pl",
                    eventClick        : showFormEventDialog,
                    selectable        : true,
                    selectHelper      : true,
                    select            : showNewEventDialog
                }
            };

            $scope.next = next;
            $scope.prev = prev;
            $scope.showFormEventDialog = showFormEventDialog;
            $scope.showNewEventDialog = showNewEventDialog;


            function next() {
                $scope.calendarView.calendar.next();
                $state.reload('home.calendar');
            }

            function prev() {
                $scope.calendarView.calendar.prev();
                $state.reload('home.calendar');
            }

            function showFormEventDialog(calendarEvent, e) {
                $mdDialog.show({
                    controller: 'formEventController',
                    templateUrl: 'modules/calendar/event-form/form-event.html',
                    parent: angular.element($document.body),
                    targetEvent: e,
                    clickOutsideToClose: true,
                    locals: {
                        calendarEvent: calendarEvent
                    }
                });
            }

            function showNewEventDialog (calendarEvent, event) {
                $mdDialog
                    .show({
                    controller: 'newEventController',
                    templateUrl: 'modules/calendar/event-new/new-event.html',
                    parent: angular.element($document.body),
                    targetEvent: event,
                    clickOutsideToClose: true,
                    locals             : {
                        calendarEvent: calendarEvent
                    }
                })
                    .then(function (response) {

                });
            }

        }
    ])

    .controller('newEventController', ['$scope', '$http', '$mdDialog', 'Authentication', '$state', '$mdToast', 'calendarEvent',
        function ($scope, $http, $mdDialog, Authentication, $state, $mdToast, calendarEvent) {

            $scope.logged = Authentication.currentUser;
            $scope.saveEvent = saveEvent;
            $scope.calendarEvent = calendarEvent;

            if (moment.isMoment($scope.start))
            {
                $scope.start = $scope.start.toDate();
            }

            if (moment.isMoment($scope.end))
            {
                $scope.end = $scope.end.toDate();
            }

            $scope.calendarEvent = {
                title: $scope.title,
                start: $scope.start,
                end: $scope.end,
                location: $scope.location,
                user: $scope.logged
            };

            function saveEvent() {

                $http({
                    method: 'POST',
                    url: '/api/events',
                    data: $scope.calendarEvent
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

    .controller('formEventController', ['$http', '$scope', '$state', '$mdDialog', '$mdToast','calendarEvent',
        function ($http, $scope, $state, $mdDialog, $mdToast, calendarEvent) {

            $scope.calendarEvent = calendarEvent;
            $scope.editEvent = editEvent;
            $scope.cancelDialog = cancelDialog;
            $scope.removeEvent = removeEvent;

            function editEvent() {

                $http({
                    method: "PUT",
                    url: "api/events/" + $scope.calendarEvent.id,
                    data: angular.toJson($scope.calendarEvent),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                })
                    .success(function () {
                        console.log('success updating event');
                        $mdDialog.hide();
                        $state.reload();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Wydarzenie edytowane")
                                .position('top right')
                                .hideDelay(1000)
                        );
                    })
                    .error(function () {
                        console.log('Error editing event');
                    });
            }
            
            function removeEvent(id) {
                $http({
                    method: 'DELETE',
                    url: 'api/events/' + id
                })
                    .success(function () {
                        console.log('success delete');
                        $mdDialog.hide();
                        $state.reload();
                        $mdToast.show(
                            $mdToast.simple()
                                .content("Wydarzenie usunięte")
                                .position('top right')
                                .hideDelay(1000)
                        );

                    })
                    .error(function () {
                        alert('error deleting event ');
                    });
            }
            
            function cancelDialog() {
                $mdDialog.cancel();
            }
        }
    ]);