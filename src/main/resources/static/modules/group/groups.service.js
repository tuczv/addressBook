angular
    .module('addressbook')
    .factory('Group', ['$http',
        function ($http) {

            return {
                getAll: function () {
                    return $http.get('/api/groups')
                        .then(function (response) {
                            return response;
                        });
                },

                createGroup: function (group) {
                    return $http.post('/api/groups/'+ group)
                        .then(function(response){
                            return response;
                    });
                },

                updateGroup: function () {

                },

                deleteGroup: function (id) {
                    return $http.delete('/api/groups/' + id)
                        .then(function (response) {
                            return response;
                        });
                }
            };

        }
    ]);