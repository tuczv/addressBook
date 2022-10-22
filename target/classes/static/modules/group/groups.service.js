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
                            return response.data;
                    });
                },

                updateGroup: function (group, id) {
                    return $http.put('/api/groups/' + id, group)
                        .then(function (response) {
                            return response.data;
                        });    
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