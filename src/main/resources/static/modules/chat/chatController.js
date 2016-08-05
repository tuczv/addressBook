//noinspection JSAnnotator
angular
    .module('addressbook')

    .controller('chatController', ['$scope', '$http', 'Authentication', '$timeout', '$log', '$state', '$stateParams',
        function ($scope, $http, Authentication, $timeout, $log, $state, $stateParams) {

            $scope.user = Authentication.currentUser;

            function getUsers() {
                $http.get('api/users')
                    .success(function (data) {
                        $scope.users = data;
                    })
                    .error(function (data) {

                    });
            }

            getUsers();

            // get all messages
            $scope.messages = [];
            $scope.message = {
                author: $scope.user.username,
                text: ''
            };

            function showHistoryMessages() {
                $http.get('/api/messages')
                    .success(function (response) {
                        $scope.messages = response;
                    })
                    .error(function () {
                        alert('problem fetching message history');
                    })
            }

            showHistoryMessages();

            //configure STOMP and SOCKJs
            var stompClient = null;

            //add message
            $scope.sendTo = function () {
                stompClient.send('/api/chat', {}, JSON.stringify($scope.message));
                $scope.message = '';
                $state.reload();
            };

            function init() {
                var sock = new SockJS('/chat');
                stompClient = Stomp.over(sock);
                stompClient.connect({}, function (frame) {
                    stompClient.subscribe('/topic/chat', function (response) {
                        $scope.messages.push(response.body);
                        $scope.$apply();
                    });
                });
            }

            init();

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
        }]);
