angular
    .module('addressbook', ['ui.router', 'ngMaterial', 'ngCookies',
        'md.data.table', 'ngAnimate', 'ngAria', 'ngMdIcons', 'ngMessages'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$mdThemingProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider) {

            $httpProvider.interceptors.push('authInterceptor');
            $urlRouterProvider.otherwise('/contacts');

            $mdThemingProvider
                .theme('default')
                .primaryPalette('blue', {
                    'default': '700'
                });

            $stateProvider
                .state('register', {
                    'url': '/register',
                    'templateUrl': '/modules/user/views/register.html',
                    'controller': 'registerController',
                    'data': {
                        'requiresLogin': false
                    }
                })
                .state('login', {
                    'url': '/login',
                    'templateUrl': '/modules/user/views/login.html',
                    'controller': 'loginController',
                    'data': {
                        'requiresLogin': false
                    }
                })
                .state('home', {
                    'url': '',
                    'templateUrl': '/modules/home/addressbook.html',
                    'controller': 'mainController',
                    'data': {
                        'requiresLogin': true
                    }
                })
                .state('home.contacts', {
                    'url': '/contacts',
                    'templateUrl': '/modules/contact/views/contacts.html',
                    'controller': 'contactController',
                    'data': {
                        'requiresLogin': true
                    }
                })
                .state('home.chat', {
                    'url': '/chat',
                    'templateUrl': '/modules/chat/chat.html',
                    'controller': 'chatController',
                    'data': {
                        'requiresLogin': true
                    }
                });
        }
    ]);

angular
    .module('addressbook')
    .run(['$rootScope', '$state', 'Authentication',
        function ($rootScope, $state, Authentication) {
            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                Authentication.me().then(function (response) {

                    console.log(toState);

                    var requiresLogin = toState.data.requiresLogin;
                    var isAuthenticated = Authentication.isAuthenticated();

                    console.log(requiresLogin);
                    console.log(isAuthenticated);

                    if (requiresLogin && !isAuthenticated) {
                        event.preventDefault();
                        $state.go('login');
                    }

                    if (!requiresLogin && isAuthenticated) {
                        console.log("called");
                        event.preventDefault();
                        $state.go('home');
                    }
                });
            });
            $rootScope.tableFilter = {order: '-name', limit: 10, page: 1};
    }
]);

