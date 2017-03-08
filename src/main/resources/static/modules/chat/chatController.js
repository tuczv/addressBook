//noinspection JSAnnotator
angular
    .module('addressbook')

    .controller('chatController',
        function ($scope, $http, $q, Authentication, $timeout, $log, $state, $stateParams) {

            $scope.user = Authentication.currentUser;

          
            $scope.messages = [];

            $scope.toggleLeft = buildToggler('left');
            $scope.toggleRight = buildToggler('right');

            function buildToggler(componentId) {
                return function() {
                    $mdSidenav(componentId).toggle();
                };
            }

            function getAll() {
                 $http
                    .get('/messages')
                    .success(function(data) {
                        $scope.messages = data;
                        console.log(data);
                });
            }

            getAll();
            
            var socket = new SockJS('/websocket');
                     var stompClient = Stomp.over(socket);

                     stompClient.connect({}, function (frame) {
                             stompClient.subscribe('/app/chat', function (data) {
                                     $scope.messages = JSON.parse(data.body);
                                     $scope.$apply();

                                     stompClient.subscribe('/topic/chat', function (data) {
                                             var message = JSON.parse(data.body);
                                             $scope.messages.unshift(message);
                                             $scope.$apply();
                                     });
                             });
                     });

             $scope.messageSend = function () {

                         var data = {
                                 author: $scope.message.author,
                                 body: $scope.message.body
                         };
                         stompClient.send("/app/chat", {}, JSON.stringify(data));
                         $scope.message.body = '';

             };

            //export to PDF
            $scope.exportPDF = function () {

                html2canvas(document.getElementById('exportPDF'), {
                    onrendered: function (canvas) {
                        var data = canvas.toDataURL();
                        var definition = {
                            content: [{
                                image: data,
                                width: 500
                            }]
                        };
                        pdfMake.createPdf(definition).download("Historia_Czatu.pdf");
                    }
                });
            };
        });
