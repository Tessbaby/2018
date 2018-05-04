'use strict';

angular.module('app')
	.controller('detailController', [ '$rootScope', '$scope', '$http', '$state',
	                                function($rootScope, $scope, $http, $state) {
		$scope.title = "文章详情";
        $scope.loading = true;
		$scope.id = $state.params.id;
		$scope.loading = true;
		/*$scope.linksTypeList = [
			{
				"linksType":1,
				"linksName":"自定义文章内容"
			},
			{
				"linksType":2,
				"linksName":"文章链接"
			}
		];*/
		$.ajax({
			type: 'PUT',
				url : $rootScope.baseUrl+'/article/detail',
				dataType: 'json',
				contentType:'application/json;charset=UTF-8',
				data: angular.toJson({'id': $scope.id})
			}).then(function(result) {
				$scope.loading = false;
				if (result.httpCode == 200) {
					$scope.info = result.data;
					var filePath = result.data.filePath;
					if(filePath){
						$scope.filePath = $.parseJSON(filePath);
					} else {
						$scope.filePath = '';
					}
					console.log($scope.info);
				} else {
				    alertDialog(result.msg, 2);
				}
				$scope.$apply();
				
			});
	  //}
		
} ]);