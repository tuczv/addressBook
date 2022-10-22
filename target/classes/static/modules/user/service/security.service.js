angular
    .module('addressbook')
    .service('Security', ['$rootScope', '$http', '$location', '$state', 'Authentication',
        function ($rootScope, $http, $location, $state, Authentication) {

            return {

                initialize: function () {

                    $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                        if (!!toState.data.access)
                            if (!hasAnyRole(toState.data.access)) {
                                event.preventDefault();
                                $state.go('home.contacts');
                            }

                    });
                },

                hasRole: function (role) {
                    var boolean = false;
                    var authorities = ['ROLE_USER', 'ROLE_ADMIN'];
                    angular.forEach(Authentication.currentUser.authorities, function (i) {
                        if (i.authority === role) {
                            boolean = true;
                        }
                    });
                    return boolean;
                },

                hasAnyRole: function (arrayRoles) {
                    var boolean = false;
                    var authorities = ['ROLE_USER', 'ROLE_ADMIN'];

                    angular.forEach(Authentication.currentUser.authorities, function (i) {
                        angular.forEach(arrayRoles, function (j) {
                            if (i.authority === j) {
                                boolean = true;
                            }
                        })
                    });
                    return boolean;
                }
            };
        }
    ]);