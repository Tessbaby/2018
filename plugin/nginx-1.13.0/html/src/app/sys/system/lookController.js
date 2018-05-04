'use strict';

angular.module('app')
	.controller('lookController', ['$rootScope', '$scope', '$http', '$state',
	 function ($rootScope, $scope, $http, $state) {
	 	$scope.title = '本级统计';
    /* 权限 */
    var permissionCode = $state.$current.name;
    // 党员情况统计
    $scope.hasMemberCount = $.inArray(permissionCode + '.formalUser', $rootScope.permissionList) != -1;
    $scope.hasMemberDev = $.inArray(permissionCode + '.developUser', $rootScope.permissionList) != -1;
    $scope.hasMemberBind = $.inArray(permissionCode + '.bindUser', $rootScope.permissionList) != -1;
    // 功能使用统计
    $scope.hasArticle = $.inArray(permissionCode + '.article', $rootScope.permissionList) != -1;
    $scope.hasQuestion = $.inArray(permissionCode + '.question', $rootScope.permissionList) != -1;
    $scope.hasActivity = $.inArray(permissionCode + '.activity', $rootScope.permissionList) != -1;
    $scope.hasReport = $.inArray(permissionCode + '.report', $rootScope.permissionList) != -1;
    $scope.hasStudy = $.inArray(permissionCode + '.study', $rootScope.permissionList) != -1;
    $scope.hasMeeting = $.inArray(permissionCode + '.meeting', $rootScope.permissionList) != -1;
    $scope.hasNotice = $.inArray(permissionCode + '.notice', $rootScope.permissionList) != -1;


	 	$.ajax({ // 党员情况统计
      url: '/iBase4J-SYS-Web/count/getUserOwn',
      type: 'get',
      contentType: 'application/json;charset=UTF-8',
      data: ''
    }).then(function (result) {
      if (result.httpCode == 200) {
      	$scope.infoList = result.data;
      } else {
      	layer.alert(result.msg, { icon: 2 });
      }
      $scope.$apply();
    });

    $.ajax({ // 功能使用统计
      url: '/iBase4J-SYS-Web/count/getModelOwn',
      type: 'get',
      contentType: 'application/json;charset=UTF-8',
      data: ''
    }).then(function (result) {
      if (result.httpCode == 200) {
      	$scope.usageList = result.data;
      } else {
      	layer.alert(result.msg, { icon: 2 });
      }
      $scope.$apply();
    })
	 }])