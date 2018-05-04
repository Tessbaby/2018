'use strict';

angular.module('app')
	.controller('memberListController', [ '$rootScope', '$scope', '$http', '$state','toaster',
	  function($rootScope, $scope, $http, $state,toaster) {
	  	$scope.title = '人员列表';
	  	$scope.pageInfo = [];
	  }])