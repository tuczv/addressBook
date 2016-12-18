//noinspection JSAnnotator
angular.module('addressbook')
    .factory('userService', ['$http',
        function ($http) {
            return {

                loginUser: function (user) {
                    return $http({
                        method: 'POST',
                        url: '/login',
                        headers: {'Content-Type': 'application/x-www-form-urlencoded'},
                        transformRequest: function (objects) {
                            var array = [];
                            for (var pointer in objects)
                                array.push(encodeURIComponent(pointer) + "=" + encodeURIComponent(objects[pointer]));
                            return array.join("&");
                        },
                        data: {username: user.username, password: user.password, submit: 'Login'}
                    }).then(function (response) {
                        return response;
                    });
                },

                logout: function () {
                    return $http.post("/logout", {}).then(function (response) {
                        return response;
                    });
                },

                register: function (user) {
                    return $http.post("/api/users/register", user)
                        .then(function (response) {
                            return response;
                        });
                }
            }
        }
    ]);