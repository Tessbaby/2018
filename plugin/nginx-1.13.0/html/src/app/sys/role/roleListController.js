'use strict';

angular.module('app')
	.controller('roleListController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {
	      $scope.title = '角色管理';

	      //=======================================验证权限 statr===================================
	      //权限模块代码
	      //$scope.permissionCode = $state.$current.name;
	      $scope.permissionCode = "main.role";

	      $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
	      $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	      $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;

	      if (!$scope.hasQuery) {
	          layer.alert("未经授权，禁止访问！", { icon: 2 });
	          return false;
	      }
	      //=======================================验证权限 end===================================

	      $scope.parts = {};
	      $scope.url = '/iBase4J-SYS-Web/role/read/list';
	      $rootScope.pageInfo = [];

	      $rootScope.search($scope.url, $scope.parts);

	      //党组织结构设置
	      var setting = {
	          check: {
	              enable: false
	          },
	          data: {
	              key: {
	                  name: "deptName"
	              },
	              simpleData: {
	                  enable: true,
	                  idKey: "id",
	                  pIdKey: "parentId",
	                  rootPId: 0
	              }
	          },
	          callback: {
	              beforeClick: beforeClick
	          }
	      };
	      //获取选中子级
	      function beforeClick(e, treeId, treeNode) {
	          $scope.parts.deptid = Number(treeId.id);
	          $rootScope.search($scope.url, $scope.parts);
	      }
	      //党组织结构树
	      $.ajax({
	          type: 'PUT',
	          dataType: 'json',
	          contentType: 'application/json;charset=UTF-8',
	          url: '/iBase4J-SYS-Web/dept/read/treelist2',
	          data: ''
	      }).then(function (result) {
	          $scope.loading = false;
	          if (result.httpCode == 200) {
	              // console.log(result);
	              var zNodes = result.data;
	              var treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	              treeObj.expandAll(true);
	          } else {
	              alertDialog(result.msg, 2);
	          }
	          $scope.$apply();
	      });

	      $scope.goSearch = function () {
         	$scope.parts.pageNum = 1;
         	$rootScope.search($scope.url, $scope.parts);
         }

	      $scope.clearSearch = function () {
	          $scope.parts.keyword = null;
	          $rootScope.search($scope.url, $scope.parts);
	      }

	      // 翻页 - 排序翻页数据与此一致
	      $scope.pagination = function (page) {
	          $scope.parts.pageNum = page;
	          $scope.parts.asc = $rootScope.changeAsc();
	          $rootScope.search($scope.url, $scope.parts);
	      };

	      // 删除暂无接口
	      $scope.cancel = function (id) {
	      	var id = Number(id);
	      	layer.confirm('确认删除吗？', function (index) {
	      		layer.close(index);
	      		$.ajax({
              type: 'delete',
              dataType: 'json',
              contentType: 'application/json;charset=UTF-8',
              url: '/iBase4J-SYS-Web/role',
              data: angular.toJson({ roleid: Number(id) })
            }).then(function (result) {
              if (result.httpCode == 200) {
                tipDialog("删除成功", 1, 0.8 * 1000, function () {
                  var infoLength = $rootScope.pageInfo.data.length - 1;
                  if (infoLength == 0 && $scope.parts.pageNum != 1) {
                      $scope.parts.pageNum = $scope.parts.pageNum - 1;
                  }
                  $rootScope.search($scope.url, $scope.parts);
                });

              } else {
                alertDialog(result.msg, 2);
              }
              $scope.$apply();
            })
	      	})

	      }
	  }])