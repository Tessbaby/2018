'use strict';

angular.module('app')
	.controller('demoNoticeController', ['$rootScope', '$scope', '$http', '$state', '$timeout',
    function ($rootScope, $scope, $http, $state, $timeout) {
    	$scope.title = '评议规则设置';
    	$scope.param = {};

    	// 返回上一页
    	$scope.goSublingPage = function () {
    		$state.go('main.demoratic.content');
    	}

    	// 提交
    	$scope.submit = function () {
    		$.ajax({
          url: '/iBase4J-SYS-Web/sysDeptComment',
          type: 'post',
          data: angular.toJson($scope.param)
        }).then(function (result) {
        	if (result.httpCode == 200) {
        		tipDialog("保存成功", 1, 0.8 * 1000, function () {
              $state.go('main.demoratic.list');
            });
        	} else {
        		$scope.btnInfo = '提交';
            $scope.btnState = false;
            alertDialog(result.msg, 2);
        	}
        })
    	}
    }])