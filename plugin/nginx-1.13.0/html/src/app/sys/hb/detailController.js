'use strict';

angular.module('app')
	.controller('detailController', ['$rootScope', '$scope', '$http', '$state', 
	     function ($rootScope, $scope, $http, $state) {
	         $scope.title = "详情";

	         $scope.id = $state.params.id;

	         //权限模块代码
	         $scope.permissionCode = $state.$current.name;
	         console.log($state.$current.name);

	         $scope.hasQeurysub = $.inArray($scope.permissionCode + '.qeurysub', $rootScope.permissionList) != -1;
	         $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	         $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;

	         //百度编辑器
	         var myEditor = UE.getEditor("myEditor", {
	             topOffset: 0,
	             autoFloatEnabled: false,
	             autoHeightEnabled: false,
	             wordCount: false,
	             readonly: true,
	             autotypeset: {
	                 removeEmptyline: true
	             },
	             toolbars: [
                     [
                         //'source', //源代码
                         'bold', //加粗
                         'forecolor', //字体颜色
                         'indent', //首行缩进
                         'italic', //斜体
                         'underline', //下划线
                         //'simpleupload', //单图上传
                         //'inserttable', //插入表格
                         'link', //超链接
                         'removeformat',//清除格式
                         'huodong',

                     ]
	             ]
	         });
	         // 文件流转详情
	         $.ajax({
	             type: 'PUT',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             url: '/iBase4J-SYS-Web/report/detail',
	             data: angular.toJson({ "id": $scope.id })
	         }).then(function (result) {
	             $scope.loading = false;
	             if (result.httpCode == 200) {
	                 $scope.data = result.data;
	                 if (result.data.mcontent != '') {
	                     myEditor.ready(function () {//编辑器初始化完成再赋值  
	                         myEditor.setContent(result.data.content);  //赋值给UEditor  
	                     });
	                 }
	                 var filePath = result.data.filePath;
		               if (filePath) {
		                   $scope.filePath = $.parseJSON(filePath);
		               } else {
		                   $scope.filePath = '';
		               }
	             } else {
	                 // $scope.msg = result.msg;
	                 alertDialog(result.msg, 2);
	             }
	             $scope.$apply();
	         });

	         $scope.del = function (id) {

	             var m = { id: id };
	             if (confirm('确认要删除？')) {
	                 $scope.loading = true;
	                 $.ajax({
	                     url: '/iBase4J-SYS-Web/report/delete',
	                     type: 'post',
	                     dataType: 'json',
	                     contentType: 'application/json;charset=UTF-8',
	                     data: angular.toJson(m)
	                 }).then(function (result) {
	                     $scope.loading = false;
	                     if (result.httpCode == 200) {
	                         tipDialog("删除成功", 1, 0.8 * 1000, function () {
	                             $state.go('main.party.hb');
	                         });
	                     } else {
	                         alertDialog(result.msg, 2);
	                     }
	                     $scope.$apply();
	                 })
	             }
	         }
	     }]);