'use strict';

angular.module('app')
	.controller('demoMemberListController', ['$rootScope', '$scope', '$http', '$state', '$timeout',
    function ($rootScope, $scope, $http, $state, $timeout) {
    	$scope.title = '评议列表';
    	$scope.param = {};
    	$scope.url = '/iBase4J-SYS-Web/sysDeptComment/read/list';
      $rootScope.pageInfo = []; // 请求数据前清空
      $rootScope.search($scope.url, $scope.param);
    }])