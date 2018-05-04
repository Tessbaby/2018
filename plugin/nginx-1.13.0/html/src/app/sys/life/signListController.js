'use strict';

angular.module('app')
	.controller('signListController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {
	      $scope.title = '报名详情';
	      $scope.type = $state.params.typeId;
	      $scope.activity = {};
	      $scope.activity.activityid = $state.params.id;
	      $scope.url = '/iBase4J-SYS-Web/activitySignner/list';
	      $rootScope.pageInfo = []; // 请求数据前清空
	      $rootScope.search($scope.url, $scope.activity);

	      getTypeName();

	      // 获取类型
	      function getTypeName() {
	          $.ajax({
	              type: 'PUT',
	              url: '/iBase4J-SYS-Web/activityType/list',
	              data: angular.toJson({ 'type': $scope.type })
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.typeName = result.data.name;
	                  $scope.$apply();
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });
	      }
	  }])