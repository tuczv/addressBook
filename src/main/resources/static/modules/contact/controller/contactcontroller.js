angular
	.module('contact').controller('contactController',['$scope','$http',
    function($scope,$http){
		$scope.contacts = [];
		$scope.groups = [];

		$http.get('/api/groups')
			.success(function (data) {
				$scope.groups = data;
			})
			.error(function () {
				alert('error fetching groups');
			});

		$scope.contact = {
			groupId: $scope.groups.id
		};

		console.log($scope.contact);

		$http.get('/api/contacts')
			.success(function (data) {
				$scope.contacts = data;
				console.log(data);
			})
			.error(function () {
				alert("error getting data");
			});

		$scope.saveContact = function () {

			$http({
				method: 'POST',
				url: '/api/contacts/' + $scope.contact.groupId,
				data: $scope.contact
			})
				.success(function () {
					console.log('success');
				})
				.error(function () {
					alert("error creating contact");
				});
		};


		$scope.removeContact = function (id) {

			$http({
				method: 'DELETE',
				url: 'api/contacts/' + id
			})
				.success(function () {
					console.log('success delete');
				})
				.error(function () {
					alert('error deleting contact');
				});
		};

	}
]);