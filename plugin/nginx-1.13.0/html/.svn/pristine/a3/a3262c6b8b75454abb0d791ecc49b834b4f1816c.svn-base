'use strict';

angular.module('app')
	.controller('changeController', [ '$scope', '$http', '$state',
	 function ( $scope, $http, $state) {

	     validate();
	     $scope.btnInfo = '提交';
	     $scope.btnState = false;
	     $scope.record = {};

	     function submit() {
	         $scope.btnInfo = '提交中...';
	         $scope.btnState = true;
	         $.ajax({
	             type: 'POST',
	             url: '/iBase4J-SYS-Web/user/update/updatePassword',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             data: angular.toJson($scope.record)
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 tipDialog("密码已修改", 1, 0.8 * 1000, function () {

	                     $scope.cancel();
	                 });

	             } else {
	                 alertDialog(result.msg, 2);
	             }
	             $scope.btnInfo = '提交';
	             $scope.btnState = false;

	         });
	     }

	     $scope.cancel = function () {
	         parent.layer.closeAll();
	     }
	     function validate() {

	         jQuery('form').validate({
	             rules: {
	                 oldpassword: {
	                     required: true,

	                 },
	                 newpassword1: {
	                     required: true,
	                     minlength: 6
	                 },

	                 newpassword2: {
	                     required: true,
	                     minlength: 6,
	                     equalTo: "#newpassword1"
	                 }


	             },
	             messages: {
	                 oldpassword: {
	                     required: "请输入原密码",
	                 },
	                 newpassword1: {
	                     required: "请输入新密码",
	                     minlength: "密码最少6位"
	                 },

	                 newpassword2: {
	                     required: "请再次输入新密码",
	                     minlength: "密码最少6位",
	                     equalTo: "两次密码不一致"
	                 }
	             },
	             submitHandler: function () {
	                 submit();
	             }
	         });
	     }
	 }])