angular
    .module('addressbook', ['ui.router', 'ngMaterial', 'ngCookies',
        'md.data.table', 'ngAnimate', 'ngAria', 'ngMdIcons', 'ngMessages', 'ngSanitize', 'ui.bootstrap', 'ui.calendar', 'pascalprecht.translate','ngLetterAvatar'])
    .config(['$stateProvider', '$urlRouterProvider', '$httpProvider', '$mdThemingProvider', '$translateProvider',
        function ($stateProvider, $urlRouterProvider, $httpProvider, $mdThemingProvider, $translateProvider) {

            $httpProvider.interceptors.push('authInterceptor');
            $urlRouterProvider.otherwise('/contacts');

            $translateProvider.translations('pl', {
                TITLE: 'Księga Adresowa',
                USERS: 'Użytkownicy',
                GROUPS: 'Grupy',
                CHAT: 'Czat',
                FROM: 'Od',
                TO: 'Do',
                WHERE: 'Gdzie',
                BODY: 'Treść',
                CONTACTS: 'Kontakty',
                NAME: 'Nazwa',
                LASTNAME: 'Nazwisko',
                SEND_EMAIL: 'Wysłane wiadomości',
                EMAIL: 'Poczta',
                PHONE: 'Telefon',
                GROUP: 'Grupa',
                PASSWORD: 'Hasło',
                AUTHORITY: 'Dostęp',
                EVENT: 'Wydarzenie',
                UPDATE:'Edytuj',
                SELECT: 'Wybierz',
                WRITE: 'Napisz',
                NEW: 'Dodaj',
                SEND: 'Wyślij',
                BACK: 'Wróć',
                DELETE: 'Usuń',
                EMAILS: 'Wiadomości',
                CALENDAR: 'Kalendarz',
                SETTINGS: 'Ustawienia',
                DETAILS: 'Szczegóły',
                FIND: 'Szukaj',
                CLEAN: 'Wyczyść',
                EXPORT: 'Eksportuj',
                IMPORT: 'Importuj',
                en: 'English',
                pl: 'Polski',
                rus: 'Русский'
            })
            .translations('en', {
                TITLE: 'AddressBook',
                USERS: 'Users',
                GROUPS: 'Group',
                CHAT: 'Chat',
                FROM:'From',
                TO: 'To',
                WHERE: 'Where',
                BODY: 'Body',
                CONTACTS: 'Contacts',
                NAME: 'Name',
                LASTNAME: 'Last Name',
                SEND_EMAIL: 'Sent Mail',
                EMAIL: 'Email',
                PHONE: 'Phone',
                GROUP: 'Group',
                PASSWORD: 'Password',
                AUTHORITY: 'Permission',
                EVENT: 'Event',
                UPDATE: 'Update',
                SELECT: 'Select',
                WRITE: 'Write',
                NEW: 'New',
                SEND: 'Send',
                BACK: 'Back',
                DELETE: 'Delete',
                EMAILS: 'Messages',
                CALENDAR: 'Calendar',
                SETTINGS: 'Settings',
                DETAILS: 'Details',
                FIND: 'Find',
                CLEAN: 'Clean',
                EXPORT: 'Export',
                IMPORT: 'Import',
                en: 'English',
                pl: 'Polski',
                rus: 'Русский'
            })
            .translations('rus', {
                TITLE: 'Книга контактов',
                USERS: 'Пользователи',
                GROUPS: 'Группы',
                CHAT: 'Чат',
                FROM: 'От',
                TO: 'До',
                WHERE: 'Где',
                BODY: 'Содержание',
                CONTACTS: 'Koнтакты',
                NAME: 'Название',
                LASTNAME: 'Фамилия',
                SEND_EMAIL: 'Отправленные',
                EMAIL: 'Почта',
                PHONE: 'Телефон',
                GROUP: 'Группа',
                EVENT: 'Событие',
                PASSWORD: 'Пароль',
                AUTHORITY: 'Права',
                SELECT: 'Выбрать',
                WRITE: 'Написать',
                UPDATE: 'Обновить',
                NEW: 'Создать',
                SEND: 'Да',
                BACK: 'Назад',
                DELETE: 'Удалить',
                EMAILS: 'Сообщения',
                CALENDAR: 'Календарь',
                SETTINGS: 'Настройки',
                DETAILS: 'Детали',
                FIND: 'Искать',
                CLEAN: 'Очистить',
                EXPORT: 'Экспорт',
                IMPORT: 'Импорт',
                en: 'English',
                pl: 'Polski',
                rus: 'Русский'
            });

            $translateProvider.preferredLanguage('en');
            $translateProvider.fallbackLanguage('en');

            var accentPalette = $mdThemingProvider.extendPalette('orange', {
                'contrastDefaultColor': 'light'
            });

            $mdThemingProvider.definePalette('teal-custom', accentPalette);
            $mdThemingProvider.theme('default')
                .primaryPalette('blue', {
                    'default': '900',
                    'hue-2': 'A100'
                })
                .accentPalette('deep-orange', {
                    'default': 'A700'
                });

            $mdThemingProvider.theme('teal')
                .primaryPalette('teal')
                .accentPalette('teal')
                .warnPalette('teal');

            $mdThemingProvider.theme('lime')
                .primaryPalette('lime')
                .accentPalette('orange')
                .warnPalette('blue');

            $mdThemingProvider.alwaysWatchTheme(true);


            $stateProvider
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
                .state('home.users', {
                    'url': '/users',
                    'templateUrl': '/modules/user/views/users.html',
                    'controller': 'adminController',
                    'data': {
                        'requiresLogin': true,
                        'access': ['ROLE_ADMIN']
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
                .state('home.inbox', {
                    'url': '/inbox',
                    'templateUrl': '/modules/inbox/inbox.html',
                    'controller': 'inboxController',
                    'data': {
                        'requiresLogin': true

                    }
                })
                .state('home.calendar', {
                    'url': '/calendar',
                    'templateUrl': '/modules/calendar/calendar.html',
                    'controller': 'calendarController',
                    'data': {
                        'requiresLogin': true

                    },
                    'bodyClass': 'calendar'
                })
                .state('home.groups', {
                    'url': '/groups',
                    'templateUrl': '/modules/group/groups.html',
                    'controller': 'groupController',
                    'data': {
                        'requiresLogin': true
                    }
                })
                .state('home.groups.contacts', {
                    'url': '/contactsByGroup',
                    'templateUrl': '/modules/group/contactsByGroup.html',
                    'controller': 'groupController',
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
    .run(['$rootScope', '$state', '$translate', 'Authentication', 'Security',
        function ($rootScope, $state, $translate, Authentication, Security) {

            $rootScope.theme = 'default';
            $rootScope.language = 'en';

            $rootScope.setTheme = function(value){
                $rootScope.theme = value;
            };

            $rootScope.setLanguage = function (argument) {
                $translate.use(argument);   
            };

            Security.initialize();

            $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {

                Authentication.login()
                    .then(function () {

                        var isAuthenticated = Authentication.isAuthenticated();
                        var requiresLogin = toState.data.requiresLogin;

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

