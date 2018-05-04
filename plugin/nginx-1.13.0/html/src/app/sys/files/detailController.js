'use strict';

angular.module('app')
	.controller('detailController', [ '$rootScope', '$scope', '$http', '$state', 
	                                function($rootScope, $scope, $http, $state) {
		$scope.title = "详情";
        $scope.loading = true;
		$scope.id = $state.params.id;
		
		//文件流转详情
		$.ajax({
			type: 'PUT',
			dataType: 'json',
			contentType:'application/json;charset=UTF-8',
			url : '/iBase4J-SYS-Web/file/detail',
			data: angular.toJson({"id":$scope.id})
		}).then(function(result) {
			$scope.loading = false;
			if (result.httpCode == 200) {
				$scope.data = result.data;
			} else {
			    alertDialog(result.msg, 2);
			}
			$scope.$apply();
		});
} ]);