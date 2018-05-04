'use strict';

angular.module('app')
	.controller('plateFormController', ['$rootScope', '$scope', '$http', '$state',
	       function ($rootScope, $scope, $http, $state) {
	           $scope.title = '板块管理';

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
	           $scope.param = {};
	           $scope.url = '/iBase4J-SYS-Web/sysUserHeart/read/list';
	           $rootScope.pageInfo = []; // 请求数据前清空
	           $rootScope.search($scope.url, $scope.param);

	           $scope.clearSearch = function () {
	               $scope.param.keyword = null;
	               $rootScope.search($scope.url, $scope.param);
	           }
	           // 翻页 - 排序翻页数据与此一致
	           $scope.pagination = function (page) {
	               $scope.param.pageNum = page;
	               $scope.param.asc = $rootScope.changeAsc();
	               $rootScope.search($scope.url, $scope.param);
	           };

	           //==================================执行查询 end==================================

	           //删除
	           $scope.delInfo = function (id) {

	               layer.confirm('确认要删除？', function (index) {
	                   $scope.loading = true;
	                   $.ajax({
	                       type: 'delete',
	                       url: '/iBase4J-SYS-Web/sysUserHeart',
	                       data: angular.toJson({ "id": id })
	                   }).then(function (result) {
	                       $scope.loading = false;
	                       //console.log(result);
	                       if (result.httpCode == 200) {
	                           tipDialog("删除成功", 1, 0.8 * 1000, function () {
	                               if ($rootScope.pageInfo.data.length == 1 && $scope.param.pageNum > 1) {
	                                   $scope.param.pageNum = $scope.param.pageNum - 1;
	                               }
	                               $rootScope.search($scope.url, $scope.param);
	                           });
	                       } else {
	                           alertDialog(result.msg, 2);
	                       }
	                       $scope.$apply();
	                   });
	               });
	           }
	           //启用
	           $scope.enable = function (id) {

	               execute(id, 1);
	               //if (confirm('确认要启用？')) {

	               //}
	           }
	           //禁用
	           $scope.disable = function (id) {
	               layer.confirm('确认要禁用此提醒？', function (index) {
	                   execute(id, -1);
	               });
	               //if (confirm('确认要禁用此提醒？')) {
	               //    execute(id, -1);
	               //}
	           }

	           //执行启用禁用操作
	           function execute(id, enable) {
	               $scope.loading = true;
	               $.ajax({
	                   type: 'post',
	                   url: '/iBase4J-SYS-Web/sysUserHeart/disable',
	                   data: angular.toJson({ "id": id, enable: enable })
	               }).then(function (result) {
	                   $scope.loading = false;
	                   if (result.httpCode == 200) {
	                       tipDialog("操作成功", 1, 0.8 * 1000, function () {
	                           if ($rootScope.pageInfo.data.length == 1 && $scope.param.pageNum > 1) {
	                               $scope.param.pageNum = $scope.param.pageNum - 1;
	                           }
	                           $rootScope.search($scope.url, $scope.param);
	                       });
	                   } else {
	                       alertDialog(result.msg, 2);
	                   }
	                   $scope.$apply();
	               });
	           }

	       }]);