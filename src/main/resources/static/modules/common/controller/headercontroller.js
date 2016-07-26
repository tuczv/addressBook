//noinspection JSAnnotator
angular.module('common').controller('headerController',['$scope','$state','Authentication','userService', '$timeout', '$mdSidenav', '$log',
    function($scope,$state,Authentication,userService, $timeout, $mdSidenav, $log){
		$scope.user = Authentication.currentUser;

		console.log($scope.user);
		$scope.logout = function(){
			userService.logout().then(function(response){
				$scope.user = null;
				Authentication.currentUser = null;
				$state.go('login');
			});
		};
		
		$scope.$watch(function(){
			return Authentication.currentUser
		},function(user){
			$scope.user = user;
			if(user == null){
				$state.go('login');
			}
		});

		$scope.showMobileMainHeader = true;

	}
]);
