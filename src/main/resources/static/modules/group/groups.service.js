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
                    return $http({
                        method:'POST',
                        url:'/api/groups',
                        data:{name:group.name}
                    }).then(function(response){
                        return response;
                    });
                },

                updateGroup: function () {

                },

                deleteGroup: function () {

                }
            };

        }
    ]);