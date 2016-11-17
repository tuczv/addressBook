angular
    .module('addressbook')
    .factory('Inbox', ['$http',
        function ($http) {
            return {
                getAll: function () {
                    return $http.get('/api/emails')
                        .then(function (response) {
                            return response;
                        });
                }
            };
        }
    ]);