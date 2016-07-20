//noinspection JSAnnotator
angular
    .module('chat')
    .controller('chatController', ['$scope', '$http', 'Authentication',
        function ($scope, $http, Authentication) {

            $scope.user = Authentication.currentUser;

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
            };

            function init () {
                var sock = new SockJS('/chat');
                stompClient = Stomp.over(sock);
                stompClient.connect({}, function(frame) {
                    stompClient.subscribe('/topic/chat', function (response) {
                        $scope.messages.push(response.body);
                        $scope.$apply();
                    });
                });
            }

           init();

    }]);
