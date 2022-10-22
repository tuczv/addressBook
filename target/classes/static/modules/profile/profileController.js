angular
    .module('addressbook')
    .controller('profileController', [ '$scope', 'Authentication', '$state',
        function ($scope, Authentication, $state) {
            $scope.imagePath = 'assets/icons/1.png';
            $scope.user = Authentication.currentUser;

            /*$scope.back = function () {
                $state.go('home.contacts');
            };*/
        }
    ]);