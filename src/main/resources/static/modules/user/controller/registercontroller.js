//noinspection JSAnnotator
angular.module('user')
	.controller('registerController',['$scope','$state','userService', 
    function($scope, $state, userService){
		
		$scope.user = {};
		
		$scope.registerUser = function(){

			userService.register($scope.user)
			.then(function(response){
				$state.go('login');
			},function(err){
				console.log(err);
				
			});

		};
		
		$scope.reset = function() {
			$scope.user = {
			        email: "",
			        username: "",
			        password: ""
			      }
		};
		
		$scope.reset();
	}
]);