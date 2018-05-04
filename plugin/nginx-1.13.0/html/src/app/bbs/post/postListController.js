'use strict';

angular.module('app')
	.controller('postListController', ['$rootScope', '$scope', '$http', '$state',
	       function ($rootScope, $scope, $http, $state) {
	           $scope.title = '帖子管理';

	           //=======================================验证权限 statr===================================
	           //权限模块代码
	           $scope.permissionCode = $state.$current.name;
	           $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
	           // 清贴
	           $scope.hasClean = $.inArray($scope.permissionCode + '.clean', $rootScope.permissionList) != -1;
	           //禁言
	           $scope.notAllowSpeak = $.inArray($scope.permissionCode + '.notallowspeak', $rootScope.permissionList) != -1;

	           // 解除禁言
	           $scope.hasAllowSpeak = $.inArray($scope.permissionCode + '.allowspeak', $rootScope.permissionList) != -1;
	           // 设置
	           $scope.hasSetting = $.inArray($scope.permissionCode + '.setting', $rootScope.permissionList) != -1;

	           $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
	           if (!$scope.hasQuery) {
	               layer.alert("未经授权，禁止访问！", { icon: 2 });
	               return false;
	           }
	           //=======================================验证权限 end===================================







	           //==================================执行查询 start==================================
	           $scope.setModel = {};
	           $scope.param = {};
	           $scope.param.nid = '0';
	           $scope.param.isEssence = '-1';
	           $scope.param.jb = '-1';
	           $scope.param.status = '-1';
	           var url = '/back/getSystemTopicList';
	           $rootScope.pageInfo = []; // 请求数据前清空

	           $scope.getPlateList = function () {
	               $scope.loading = true;
	               // 请求表格数据
	               $.ajax({
	                   url: url,
	                   type: 'get',
	                   contentType: 'application/json;charset=UTF-8',
	                   data: $scope.param
	               }).then(function (result) {
	                   $scope.loading = false;
	                   if (result.httpCode == 200) {
	                       $rootScope.pageInfo = new Object(result);
	                       //console.log($rootScope.pageInfo);
	                   } else {
	                       $scope.msg = result.msg;
	                       //toaster.clear('*');
	                       //toaster.pop('error', '', "查询失败");
	                   }
	                   $rootScope.$apply();
	               })
	           }
	           $scope.getPlateList();

	           $scope.goSearch = function () {
			         	$scope.param.pageNum = 1;
			         	$scope.getPlateList();
			       }
	           $scope.clearSearch = function () {
	               $scope.param.keyword = null;
	               $scope.getPlateList();
	           }
	           // 翻页 - 排序翻页数据与此一致
	           $scope.pagination = function (page) {
	               $scope.param.pageNum = page;
	               $scope.param.asc = $rootScope.changeAsc();
	               $scope.getPlateList();
	           };

	           //==================================执行查询 end==================================

	           // 获取板块列表
	           function getNodeList() {
	               $.ajax({
	                   url: '/back/getNodeAll',
	                   type: 'get',
	                   contentType: 'application/json;charset=UTF-8'
	               }).then(function (result) {
	                   if (result.httpCode == 200) {
	                       $scope.nodeList = result.data;
	                   } else {
	                       alertDialog(result.msg, 2);
	                   }
	               })
	           }
	           getNodeList();

	           //删除
	           $scope.delInfo = function (id) {

	               layer.confirm('确认要删除？', function (index) {
	                   $scope.loading = true;
	                   $.ajax({
	                       type: 'get',
	                       url: ' /back/deleteTopic',
	                       data: { "tid": id }
	                   }).then(function (result) {
	                       $scope.loading = false;
	                       //console.log(result);
	                       if (result.httpCode == 200) {
	                           tipDialog("删除成功", 1, 0.8 * 1000, function () {
	                               if ($rootScope.pageInfo.data.length == 1 && $scope.param.pageNum > 1) {
	                                   $scope.param.pageNum = $scope.param.pageNum - 1;
	                               }
	                               $scope.getPlateList();
	                           });
	                       } else {
	                           alertDialog(result.msg, 2);
	                       }
	                       $scope.$apply();
	                   });
	               });
	           }
	           //取消禁言
	           $scope.enable = function (uid) {

	               layer.confirm('确认要取消此用户禁言？', function (index) {
	                   $scope.loading = true;
	                   $.ajax({
	                       type: 'get',
	                       url: '/back/allowSpeech',
	                       data: { "uid": uid }
	                   }).then(function (result) {
	                       $scope.loading = false;
	                       //console.log(result);
	                       if (result.httpCode == 200) {
	                           tipDialog("禁言已取消", 1, 0.8 * 1000, function () {
	                               $scope.getPlateList();
	                           });
	                       } else {
	                           alertDialog(result.msg, 2);
	                       }
	                       $scope.$apply();
	                   });
	               });
	           }
	           //禁言
	           $scope.disable = function (uid) {

	               layer.confirm('确认要禁言此用户？', function (index) {
	                   $scope.loading = true;
	                   $.ajax({
	                       type: 'get',
	                       url: '/back/notAllowSpeech',
	                       data: { "uid": uid }
	                   }).then(function (result) {
	                       $scope.loading = false;
	                       //console.log(result);
	                       if (result.httpCode == 200) {
	                           tipDialog("禁言成功", 1, 0.8 * 1000, function () {
	                               $scope.getPlateList();
	                           });
	                       } else {
	                           alertDialog(result.msg, 2);
	                       }
	                       $scope.$apply();
	                   });
	               });

	           }
	           //根据用户清帖
	           $scope.removeByUser = function (uid) {

	               layer.confirm('确定要删除该用户的所有帖子吗？', function (index) {
	                   $scope.loading = true;
	                   $.ajax({
	                       type: 'get',
	                       url: '/back/deleteAllTopic',
	                       data: { "uid": uid }
	                   }).then(function (result) {
	                       $scope.loading = false;
	                       //console.log(result);
	                       if (result.httpCode == 200) {
	                           tipDialog("所选用户帖子已全部清除", 1, 0.8 * 1000, function () {
	                               $scope.param.pageNum = 1
	                               $scope.getPlateList();
	                           });
	                       } else {
	                           alertDialog(result.msg, 2);
	                       }
	                       $scope.$apply();
	                   });
	               });

	           }


	           //--------设置
	           $scope.setting = function (tid) {
	               $scope.model = {};
	               if (tid) { // 如果是编辑
	                   //$scope.model.id = id;
	                   getSettingDetail(tid);
	               }
	               layer.open({
	                   type: 1,
	                   title: '帖子设置',
	                   content: $('#setting'),
	                   btn: ['确认', '取消'],
	                   area: ['50%', '300'],
	                   yes: function (index) {
	                       //validate();
	                       submitSetting();
	                   }
	               })
	           }

	           // 获取当前设置详情
	           function getSettingDetail(tid) {
	               $.ajax({
	                   type: 'get',
	                   url: '/back/setUpTopicInfo',
	                   data: { tid: tid }
	               }).then(function (result) {
	                   if (result.httpCode == 200) {
	                       $scope.setModel = result.data;
	                       $scope.setModel.tid = tid;
	                       $scope.$apply();
	                   }
	                   console.log(result);
	               })
	           }
	           // 保存当前设置详情
	           function submitSetting() {
	               if ($scope.setModel.sort == "") {
	                   $scope.setModel.sort = 100;
	                   //return false;
	               } else if (!(/(^[1-9]\d*$)/.test($scope.setModel.sort))) {
	                   tipDialog('排序序号请输入正整数', 2);
	                   return false;
	               }
	               else if ($scope.setModel.sort > 1000) {
	                   tipDialog('排序序号不能大于1000', 2);
	                   return false;
	               }

	               ShowLoading();
	               $.ajax({
	                   type: 'get',
	                   url: '/back/setUpTopic',
	                   data: $scope.setModel
	               }).then(function (result) {
	                   if (result.httpCode == 200) {
	                       HideLoading();
	                       tipDialog('保存成功！', 1);
	                       $scope.getPlateList();
	                   }
	                   else {
	                       alertDialog(result.msg, 2);
	                   }
	               })
	           }


	           $scope.show = function (tid) {
	               openDialog($rootScope.config.bbsUrl + '/back/gettopicdetail?tid=' + tid, '帖子详情');
	           }
	       }]);