'use strict';

angular.module('app')
	.controller('detailController', ['$scope', '$http', '$state',
	   function ($scope, $http, $state) {
	       $scope.title = "详情";
	       $scope.loading = true;
	       $scope.id = $state.params.id;

	       //通知公告内容
	       $.ajax({
	           type: 'PUT',
	           dataType: 'json',
	           contentType: 'application/json;charset=UTF-8',
	           url: '/iBase4J-SYS-Web/notice/detail',
	           data: angular.toJson({ "id": $scope.id })
	       }).then(function (result) {
	           $scope.loading = false;
	           console.log(result);
	           if (result.httpCode == 200) {
	               $scope.data = result.data;
	               //$scope.content = data.content;
	               var filePath = result.data.filePath;
	               if (filePath) {
	                   $scope.filePath = $.parseJSON(filePath);
	               } else {
	                   $scope.filePath = '';
	               }

	           } else {
	               //$scope.msg = result.msg;
	               alertDialog(result.msg, 2);
	           }
	           $scope.$apply();
	       });

	   }]);