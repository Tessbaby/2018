'use strict';

angular.module('app')
	.controller('organizeController', [ '$rootScope', '$scope', '$http', '$state', function($rootScope, $scope, $http, $state) {


	    //=======================================验证权限 statr===================================
	    //权限模块代码
	    $scope.permissionCode = $state.$current.name;
	    $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;	   
	    $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	    $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
	    if (!$scope.hasQuery) {
	        layer.alert("未经授权，禁止访问！", { icon: 2 });

	        return false;
	    }
	    //=======================================验证权限 end===================================

         
	    //==================================执行查询 start==================================

		$scope.param = {};  // 列表请求传入的参数
		$scope.param.enable = 1;
		$scope.title = '组织信息';
		$scope.url = '/iBase4J-SYS-Web/dept/read/list';
		$rootScope.pageInfo = []; // 请求数据前清空
		$rootScope.search($scope.url, $scope.param);

		$scope.clearSearch = function () {
		    $scope.param.keyword = null;
		    $rootScope.search($scope.url, $scope.param);
		}
	    //==================================执行查询 end==================================

		// 撤销数据
		$scope.cancelData = function (id, children) {
			
			var _id = id - 0;
			var m = {id: id};
			layer.confirm('确认要删除？', function (index) {
				layer.close(index);
				$.ajax({
					url: '/iBase4J-SYS-Web/dept',
					type: 'delete',
					dataType: 'json',
					contentType:'application/json;charset=UTF-8',
					data: angular.toJson(m)					
				}).then(function (result) {
					$scope.loading = false;
					if (result.httpCode == 200) {
					    tipDialog("删除成功", 1, 0.8 * 1000, function () {
					        $rootScope.search($scope.url, $scope.param);
					    });
					} else {
					    alertDialog(result.msg, 2);
					}
					$scope.$apply();
				})
			})
		}

	
}]);