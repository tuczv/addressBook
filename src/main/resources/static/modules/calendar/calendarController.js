angular
    .module('addressbook')
    .controller('calendarController', ['$scope', '$http', '$mdDialog','$q',
        function ($scope, $http, $mdDialog, $q) {

            $scope.uiConfig = {
                calendar:{
                    editable: true,
                    header: '',
                    viewRender        : function (view)
                    {
                        $scope.calendarView = view;
                        $scope.calendar = $scope.calendarView.calendar;
                        $scope.currentMonthShort = $scope.calendar.getDate().format('MMM');
                    },
                    eventClick: $scope.alertOnEventClick,
                    eventDrop: $scope.alertOnDrop,
                    eventResize: $scope.alertOnResize,
                    eventRender: $scope.eventRender
                }
            };

            $scope.next = next;
            $scope.prev = prev;

            function next() {
                calendarView.calendar.next();
            }

            function prev() {
                calendarView.calendar.prev();
            }
        }
    ]);