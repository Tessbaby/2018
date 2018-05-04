'use strict';

angular.module('app')
	.controller('demoListController', ['$rootScope', '$scope', '$http', '$state', '$timeout',
    function ($rootScope, $scope, $http, $state, $timeout) {
    	$scope.title = '民主评议';

      //=======================================验证权限 statr===================================
      //权限模块代码
      // console.log($rootScope.permissionList);
      $scope.permissionCode = $state.$current.name;
      $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
      $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
      $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
      $scope.hasResult = $.inArray($scope.permissionCode + '.result', $rootScope.permissionList) != -1;
      $scope.hasOver = $.inArray($scope.permissionCode + '.over', $rootScope.permissionList) != -1;
      $scope.hasModule = $.inArray($scope.permissionCode + '.module', $rootScope.permissionList) != -1;
      
      if (!$scope.hasQuery) {
          layer.alert("未经授权，禁止访问！", { icon: 2 });
          return false;
      } 

    	$scope.param = {};
    	$scope.url = '/iBase4J-SYS-Web/sysDeptComment/read/list';
      $rootScope.pageInfo = []; // 请求数据前清空
      $rootScope.search($scope.url, $scope.param);

      // 翻页 - 排序翻页数据与此一致
      $scope.pagination = function (page) {
        $scope.param.pageNum = page;
        $scope.param.asc = $rootScope.changeAsc();
        $rootScope.search($scope.url, $scope.param);
      };

      // 结束评议
      $scope.endDemocratic = function (count, id) {
      	var _id = id;
      	layer.confirm('还有' + count + '人未评，确认要结束？', function () {
      		$.ajax({
            url: '/iBase4J-SYS-Web/sysDeptComment/over',
            type: 'get',
            data: {id: _id}
          }).then(function (result) {
          	if (result.httpCode == 200) {
          		tipDialog("评议已结束", 1, 0.8 * 1000, function () {
                if ($rootScope.pageInfo.data.length == 1 && $scope.param.pageNum > 1) {
                  $scope.param.pageNum = $scope.param.pageNum - 1;
                }
                $rootScope.search($scope.url, $scope.param);
              });
          	} else {
          		alertDialog(result.msg, 2);
          	}
          	$scope.$apply();
          })
      	})
      }

      // 查看结果
      $scope.goResult = function (id) {
      	var _id = id;
      	$state.go('main.party.result', {id: _id});
      }

      // 删除
      $scope.cancel = function (id) {
      	var _id = id;
      	layer.confirm('确认要删除？', function () {
      		$.ajax({
            url: '/iBase4J-SYS-Web/sysDeptComment',
            type: 'delete',
            data: angular.toJson({id: _id})
          }).then(function (result) {
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
          })
      	})
      }
    }])