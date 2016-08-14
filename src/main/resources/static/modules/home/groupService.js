angular
    .module('addressbook')
    .service('groupService', ['$http',
        function ($http) {
            return {
                getAll: function () {
                    return $http.get('/api/groups')
                        .then(function (response) {
                           return response;
                        });
                }
            };
        }
    ]);