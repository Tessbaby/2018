'use strict';

angular.module('app')
	.controller('listHeadController', ['$rootScope', '$scope', '$http', '$state', 
	      function ($rootScope, $scope, $http, $state) {
	          $scope.title = '文件头&落款';
	          $scope.param = {};
	     
	          //=======================================验证权限 statr===================================
	          //权限模块代码
	          $scope.permissionCode = "main.party.notice.head";
	          $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
	          $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	          $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;

	   



	          if (!$scope.hasQuery) {
	              layer.alert("未经授权，禁止访问！", { icon: 2 });
	              return false;
	          }
	          //=======================================验证权限 end===================================


	          $scope.search = function () {
	              $scope.loading = true;
	              $.ajax({
	                  type: 'PUT',
	                  dataType: 'json',
	                  contentType: 'application/json;charset=UTF-8',
	                  url: '/iBase4J-SYS-Web/noticeHeader/header/list',
	                  data: angular.toJson($scope.param)
	              }).then(function (result) {
	                  $scope.loading = false;
	                  if (result.httpCode == 200) {
	                      $scope.pageInfo = result;
	                  } else {
	                      alertDialog(result.msg, 2);
	                  }
	                  $scope.$apply();
	              });
	          }
	          $scope.pageInfo = [];
	          $scope.search();

	          // 翻页
	          $scope.pagination = function (page) {
	              $scope.param.pageNum = page;
	              $scope.search();
	          };

	          //设置默认值
	          $scope.setDefault = function (id) {
	              $.ajax({
	                  type: 'post',
	                  dataType: 'json',
	                  contentType: 'application/json;charset=UTF-8',
	                  url: '/iBase4J-SYS-Web/noticeHeader/header/updateDefault',
	                  data: angular.toJson({ "id": id })
	              }).then(function (result) {
	                  $scope.loading = false;
	                  console.log(result);
	                  if (result.httpCode == 200) {
	                      tipDialog("设置成功", 1, 0.8 * 1000, function () {
	                          $scope.search();
	                      })
	                  } else {
	                      alertDialog(result.msg, 2);
	                  }
	                  $scope.$apply();
	              });
	          }
	          //删除
	          $scope.delInfo = function (id) {
	          	layer.confirm('确认要删除？', function (index) {
	          		layer.close(index);
								$.ajax({
									type: 'post',
									dataType: 'json',
									contentType: 'application/json;charset=UTF-8',
									url: '/iBase4J-SYS-Web/noticeHeader/header/delete',
									data: angular.toJson({
										"id": id,
										"enable": "-1"
									})
								}).then(function(result) {
									$scope.loading = false;
									//console.log(result);
									if (result.httpCode == 200) {

										if ($scope.pageInfo.data.length == 1 && $scope.param.pageNum > 1) {
											$scope.param.pageNum = $scope.param.pageNum - 1;
										}
										$scope.search($scope.url, $scope.param);
									} else {
										alertDialog(result.msg, 2);
									}
									$scope.$apply();
								});
	          	})
	          }






	      }]);