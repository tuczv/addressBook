//noinspection JSAnnotator
angular.module('addressbook').controller('loginController',['$scope','$state','userService', '$mdToast',
    function($scope, $state, userService, $mdToast){

		$scope.user = {};
		$scope.error = {};
		
		$scope.loginUser = function(){
			
			userService.loginUser($scope.user)
			.then(function(response){
				$mdToast.show(
                        $mdToast.simple()
                            .content("Logowanie się udało")
                            .position('top right')
                            .hideDelay(1000)
                    );
				$state.go('home');

			},function(err){
				
				$scope.error.hasError = true;
				if(err.status == 401){
					$scope.error.message = "Invalid Credentials";
				}
				else{
					$mdToast.show(
                            $mdToast.simple()
                                .content("Podany login lub hasło jest błędne")
                                .position('top right')
                                .hideDelay(2000)
                        );
					$scope.error.message = "Podany login lub hasło jest błędne"
				}
			});
		}
	}
]);