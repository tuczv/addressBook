angular
    .module('addressbook')
    .controller('inboxController', [ '$scope', '$mdMedia', '$mdDialog', '$stateParams',
        function ($scope, $mdMedia, $mdDialog, $stateParams) {

            $scope.showMobileMainHeader = true;

            var imagePath = 'assets/icons/contacts.svg';

            $scope.selected = null;
            $scope.selectItem = function( item ) {
                $scope.selected = angular.isNumber(item) ? $scope.items[item] : item;
            };

            $scope.showCreateNews = function ($event) {

                $mdDialog.show({
                    controller:  'inboxController',
                    templateUrl: 'modules/inbox/dialog-news.html',
                    targetEvent: $event,
                    parent: angular.element(document.body)

                })
                    .then(function (result) {

                    });
            };

            $scope.createNews = function () {

            };

            $scope.cancelAddModal = function () {
                $mdDialog.cancel();
            };

            $scope.items = [
                {
                    id: 1,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'Min Li Chan',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    id: 2,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'aaaa',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    id: 3,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'cccc',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    id: 4,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'bbbb',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    id: 5,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'xxxx',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    id: 6,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'xxxx',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    id: 7,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'xxxx',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    id: 8,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'xxxx',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                },
                {
                    id: 9,
                    face : imagePath,
                    what: 'Brunch this weekend?',
                    who: 'xxxx',
                    when: '3:08PM',
                    notes: " I'll be in your neighborhood doing errands"
                }
            ];
        }
    ]);