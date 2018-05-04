'use strict';

angular.module('app')
	.controller('postSettingController', ['$rootScope', '$scope', '$http', '$state',
	       function ($rootScope, $scope, $http, $state) {
	           $scope.title = '帖子管理';

	           //=======================================验证权限 statr===================================
	           //权限模块代码
	           //$scope.permissionCode = $state.$current.name;
	           //$scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
	           //$scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	           //$scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;	        
	           //if (!$scope.hasQuery) {
	           //    layer.alert("未经授权，禁止访问！", { icon: 2 });
	           //    return false;
	           //}
	           //=======================================验证权限 end===================================







	       }]);