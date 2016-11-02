//noinspection JSAnnotator
angular
    .module('addressbook')
    .factory('Authentication', ['$http', '$state', '$q',
    
        function ( $http, $state, $q) {

            var self = {

                currentUser: null,
             /*   loginState: 'login',
                logoutPath: '/logout',
                desireState: 'home.contacts',*/

                /*authorize: function () {

                    self.login()
                        .then(function() {
                            if(!self.isAuthenticated())
                                $state.go(self.loginState);
                        });

                    $rootScope.$on('$stateChangeStart', function(event, toState, toParams, fromState, fromParams) {

                        if(toState.name === self.loginState || self.isAuthenticated())
                            return;

                        self.desireState = toState.name;

                        event.preventDefault();
                    });
                },*/

                login: function () {
                    if (!self.isAuthenticated()) {
                        var deferred = $q.defer();
                        return $http.get("/api/users/login")
                            .then(function (response) {
                                self.currentUser = response.data;
                                deferred.resolve(self.currentUser);
                            }, function (err) {
                                self.currentUser = null;
                                deferred.resolve({authenticated: false});
                            });
                        return deffered.promise;
                    }
                    else {
                        return $q.when(self.currentUser)
                    }
                },

                isAuthenticated: function () {
                    return !!self.currentUser;
                }
            };

            return self;
        }
    ]);