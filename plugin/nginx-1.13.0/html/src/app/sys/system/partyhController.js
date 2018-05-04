'use strict';

angular.module('app')
	.controller('partyhController', ['$rootScope', '$scope', '$http', '$state',
	 function ($rootScope, $scope, $http, $state) {
	     $scope.title = '党委工作台';
	     // var url;
	     getWorkPanel();

	     //=======================================验证权限 statr===================================
	     //通知
	     $scope.permissionNoticeCode = 'main.party.notice';
	     $scope.hasNoticeQuery = $.inArray($scope.permissionNoticeCode + '.query', $rootScope.permissionList) != -1;
	     $scope.hasNoticeUpdate = $.inArray($scope.permissionNoticeCode + '.update', $rootScope.permissionList) != -1;
	     $scope.hasNoticeDelete = $.inArray($scope.permissionNoticeCode + '.delete', $rootScope.permissionList) != -1;

	     //任务
	     $scope.permissionTaskCode = 'main.party.task';
	     $scope.hasTaskQuery = $.inArray($scope.permissionTaskCode + '.query', $rootScope.permissionList) != -1;
	     $scope.hasTaskUpdate = $.inArray($scope.permissionTaskCode + '.update', $rootScope.permissionList) != -1;
	     $scope.hasTaskDelete = $.inArray($scope.permissionTaskCode + '.delete', $rootScope.permissionList) != -1;

	     //会议
	     $scope.permissionMeetCode = 'main.life.meeting';
	     $scope.hasMeetQuery = $.inArray($scope.permissionMeetCode + '.query', $rootScope.permissionList) != -1;
	     $scope.hasMeetUpdate = $.inArray($scope.permissionMeetCode + '.update', $rootScope.permissionList) != -1;
	     $scope.hasMeetDelete = $.inArray($scope.permissionMeetCode + '.delete', $rootScope.permissionList) != -1;

	     // 党员活动
	     $scope.permissionMemberActiveCode = 'main.life.activity.1';
	     $scope.hasMemberActiveQuery = $.inArray($scope.permissionActiveCode + '.query', $rootScope.permissionList) != -1;

	     // 志愿活动
	     $scope.permissionHeartActiveCode = 'main.life.activity.2';
	     $scope.hasHeartActiveQuery = $.inArray($scope.permissionActiveCode + '.query', $rootScope.permissionList) != -1;

	     // 创城活动
	     $scope.permissionCityActiveCode = 'main.life.activity.3';
	     $scope.hasCityActiveQuery = $.inArray($scope.permissionActiveCode + '.query', $rootScope.permissionList) != -1;

	     if (!$scope.hasMemberActiveQuery && !$scope.hasHeartActiveQuery && !$scope.hasCityActiveQuery ) {
	     	$scope.hasActiveQuery = false;
	     } else {
	     	$scope.hasActiveQuery = true;
	     }
	     //=======================================验证权限 end===================================


	     function getWorkPanel() {
	         $.ajax({
	             url: '/iBase4J-SYS-Web/home/list',
	             type: 'put',
	             contentType: 'application/json;charset=UTF-8',
	             data: ''
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 $scope.panels = result.data;
	                 angular.forEach($scope.panels, function (item, i) {
	                     if (i % 2 == 0) {
	                         item.orange = 1;
	                         item.red = 2;
	                     } else {
	                         item.red = 1;
	                         item.orange = 2;
	                     }
	                 })
	                 $scope.$apply();
	                 //console.log($scope.panels);
	             } else {
	                 alertDialog(result.msg, 2);
	             }
	         })
	     }

	     $scope.param = {};
       $scope.param.pageNum = 1;
       var noticeUrl = '/iBase4J-SYS-Web/notice/list';
       var meetUrl = '/iBase4J-SYS-Web/sysMeeting/read/list';
       var dutyUrl = '/iBase4J-SYS-Web/task/list';

	     // 显示弹出框
	     $scope.showWorkLayer = function (txt) {

	         $scope.layerTitle = '发布' + txt;
	         $scope.showNoticeLayer = false;
	         $scope.showMeetingLayer = false;
	         $scope.showActiveLayer = false;
	         $scope.showDutyLayer = false;
	         
	         if (txt == '通知') {
	             // if (!$scope.hasNoticeQuery) {
	             //     layer.alert("未经授权，禁止访问！", { icon: 2 });
	             //     return false;
	             // }
	             $scope.showNoticeLayer = true;
	             getAjaxData(noticeUrl, $scope.param, -1)
	             // url = '/iBase4J-SYS-Web/notice/list';
	         } else if (txt == '会议') {
	             // if (!$scope.hasMeetQuery) {
	             //     layer.alert("未经授权，禁止访问！", { icon: 2 });
	             //     return false;
	             // }
	             $scope.showMeetingLayer = true;
	             getAjaxData(meetUrl, $scope.param, -1)
	             // url = '/iBase4J-SYS-Web/sysMeeting/read/list';
	         } else if (txt == '活动') {
	             // if (!$scope.hasActiveQuery) {
	             //     layer.alert("未经授权，禁止访问！", { icon: 2 });
	             //     return false;
	             // }
	             $scope.getActivityList();
	             $scope.showActiveLayer = true;

	         } else if (txt == '任务') {
	             // if (!$scope.hasTaskQuery) {
	             //     layer.alert("未经授权，禁止访问！", { icon: 2 });
	             //     return false;
	             // }
	             $scope.showDutyLayer = true;
	             getAjaxData(dutyUrl, $scope.param, -1);
	             // url = '/iBase4J-SYS-Web/task/list';
	         }
	         
	     }

	     function getAjaxData(url, param, fresh) {
	     		$scope.layerData = [];
	         $.ajax({
	             url: url,
	             type: 'put',
	             contentType: 'application/json;charset=UTF-8',
	             data: angular.toJson(param)
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 result = result.data;
	                 if (result.length > 3) {
	                     for (var i = 0; i < 3; i++) {
	                         $scope.layerData.push(result[i]);
	                         $scope.layerData[i].count = (i + 1);
	                     }
	                 } else {
	                     for (var i = 0; i < result.length; i++) {
	                         $scope.layerData.push(result[i]);
	                         $scope.layerData[i].count = (i + 1);
	                     }
	                 }
	                 if (fresh == -1) {
	                 		layer.open({
		                     type: 1,
		                     closeBtn: 1,
		                     title: '',
		                     content: $('#workLayer'),
		                     area: ['50%', '300']
	                 		})
	                 }
	                 
	             } else {
	                 $scope.msg = result.msg;
	             }
	             $scope.$apply();
	         })
	     }

	     $scope.activityList = [];
	     //获取活动分类
	     $scope.getActivityList = function () {
	         $.ajax({
	             url: '/iBase4J-SYS-Web/home/listActive',
	             type: 'get',

	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 $scope.activityList = result.data;
	                 layer.open({
	                     type: 1,
	                     closeBtn: 1,
	                     title: '活动分类',
	                     content: $('#workLayer'),
	                     area: ['20%', '300']
	                 })
	             } else {
	                 $scope.msg = result.msg;
	             }
	             $scope.$apply();
	         })
	     }

	     $scope.hideLayer = function () {
	         layer.closeAll();
	     }

	     /****************************处理会议******************************/
	     // 二维码下载
	     $scope.showEWM = function (id) {
	         $scope.id = id;
	         var m = {
	             enable: 1,
	             type: 'BARCODETYPE'
	         };
	         $.ajax({
	             url: '/iBase4J-SYS-Web/dic/read/list',
	             type: 'put',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             data: angular.toJson(m)
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 $scope.ewmList = result.data;
	                 layer.open({
	                     type: 1, //信息层
	                     title: '二维码下载', //显示标题
	                     shade: 0.5, //遮罩透明度
	                     moveType: 1, //拖拽风格，0是默认，1是传统拖动
	                     shift: 1, //0-6的动画形式，-1不开启
	                     area: ['550px', '300px'],
	                     skin: 'layer-add',
	                     content: $('#ewmHTML')
	                 })
	             } else {
	                 alertDialog(result.msg, 2);
	             }
	             $scope.$apply();
	         })
	     }

	     $scope.download = function (code) {
	         var dParam = {
	             barlength: code,
	             meetid: $scope.id
	         };
	         $.ajax({
	             url: '/iBase4J-SYS-Web/sysMeeting/read/barcode',
	             type: 'put',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             data: angular.toJson(dParam)
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 var img = result.data.imgpath;
	                 if (img) {
	                     $('#image').attr('src', img);
	                     $("#down").attr({ "href": img });
	                     layer.open({
	                         type: 1, //信息层
	                         title: false, //显示标题
	                         shade: 0.5, //遮罩透明度
	                         moveType: 1, //拖拽风格，0是默认，1是传统拖动
	                         shift: 1, //0-6的动画形式，-1不开启
	                         area: ['400px', '300px'],
	                         content: $('#downMsg')
	                     })
	                 } else {
	                     alertDialog("无二维码", 2);
	                 }
	             } else {
	                 alertDialog(result.msg, 2);
	             }
	             $scope.$apply();
	         })
	     }

	     $scope.delMeeting = function (id, e) {
	         var target = $(e.target)
	         var postData = { meetid: id };
	         layer.confirm('确认要删除？', function () {
	             $.ajax({
	                 url: '/iBase4J-SYS-Web/sysMeeting',
	                 type: 'delete',
	                 data: angular.toJson(postData)
	             }).then(function (result) {
	                 if (result.httpCode == 200) {
	                     $(_this).parent().parent().remove();
	                     tipDialog("删除成功", 1, 0.8 * 1000);
	                     getAjaxData(meetUrl, $scope.param, 1);
	                 } else {
	                     alertDialog(result.msg, 2);
	                 }
	                 $scope.$apply();
	             })
	         })
	     }
	     /****************************会议END******************************/

	     /******************************处理通知************************************/
	     $scope.delNotice = function (id) {
	         layer.confirm('确认要删除？', function (index) {
	             layer.close(index);
	             $.ajax({
	                 type: 'post',
	                 dataType: 'json',
	                 contentType: 'application/json;charset=UTF-8',
	                 url: '/iBase4J-SYS-Web/notice/deleteNotice',
	                 data: angular.toJson({
	                     "id": id,
	                     "enable": "-1"
	                 })
	             }).then(function (result) {
	                 $scope.loading = false;
	                 //console.log(result);
	                 if (result.httpCode == 200) {
	                     tipDialog("删除成功", 1, 0.8 * 1000);
	                      getAjaxData(noticeUrl, $scope.param, 1);
	                 } else {
	                     alertDialog(result.msg, 2);
	                 }
	                 $scope.$apply();
	             });
	         })
	     }
	     /******************************通知END********************************/

	     /*******************************任务模块***********************************/
	     $scope.delTask = function (id) {
	         layer.confirm('确认要删除？', function (index) {
	             layer.close(index);
	             $.ajax({
	                 type: 'post',
	                 dataType: 'json',
	                 contentType: 'application/json;charset=UTF-8',
	                 url: '/iBase4J-SYS-Web/notice/deleteNotice',
	                 data: angular.toJson({
	                     "id": id,
	                     "enable": "-1"
	                 })
	             }).then(function (result) {
	                 $scope.loading = false;
	                 //console.log(result);
	                 if (result.httpCode == 200) {
	                     tipDialog("删除成功", 1, 0.8 * 1000);
	                      getAjaxData(dutyUrl, $scope.param, 1);
	                 } else {
	                     alertDialog(result.msg, 2);
	                 }
	                 $scope.$apply();
	             });
	         })
	     }

	 }])