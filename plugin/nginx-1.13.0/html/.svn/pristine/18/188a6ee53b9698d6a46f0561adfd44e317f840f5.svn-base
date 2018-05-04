'use strict';

angular.module('app')
	.controller('plateListController', ['$rootScope', '$scope', '$http', '$state',
	       function ($rootScope, $scope, $http, $state) {
	           $scope.title = '板块管理';

	           //=======================================验证权限 statr===================================
	           //权限模块代码
	           //$scope.permissionCode = $state.$current.name;
	           //$scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
	           //$scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	           //$scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;	        
	           //if (!$scope.hasQuery) {
	           //    layer.alert("未经授权，禁止访问！", { icon: 2 });
	           //    return false;
	           //}
	           //=======================================验证权限 end===================================







	           //==================================执行查询 start==================================
	           $scope.param = {};
	           $scope.url = '/back/getNodeList';
	           $rootScope.pageInfo = []; // 请求数据前清空

	           $scope.getPlateList = function () {
	               $scope.loading = true;
	               // 请求表格数据
	               $.ajax({
	                   url: $scope.url,
	                   type: 'get',
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
	               $scope.param.userName = null;
	               $scope.getPlateList();
	           }
	           // 翻页 - 排序翻页数据与此一致
	           $scope.pagination = function (page) {
	               $scope.param.pageNum = page;
	               $scope.param.asc = $rootScope.changeAsc();
	               $scope.getPlateList();
	           };

	           //==================================执行查询 end==================================

	           // 编辑
	           $scope.editParam = {};
	           $scope.editPlate = function (id) {
	               $scope.model = {};
	               if (id) { // 如果是编辑
	                   //$scope.model.id = id;
	                   getPlateDetail(id);
	               }
	               layer.open({
	                   type: 1,
	                   title: '编辑版块',
	                   content: $('#editPlate'),
	                   btn: ['确认', '取消'],
	                   area: ['50%', '300'],
	                   yes: function (index) {
	                       //validate();
	                       submit();
	                   }
	               })
	           }
	           function submit() {

	               if ($scope.model.sort == "") {
	                   $scope.model.sort = 100;
	                   //return false;
	               } else if (!(/(^[1-9]\d*$)/.test($scope.model.sort))) {
	                   tipDialog('排序序号请输入正整数', 2);
	                   return false;
	               }
	               else if ($scope.model.sort > 1000) {
	                   tipDialog('排序序号不能大于1000', 2);
	                   return false;
	               }

	               if ($scope.model.title == "") {
	                   tipDialog('请输入版块名称', 2);
	                   return false;
	               }
	               else if ($scope.model.title.length > 4) {
	                   tipDialog('版块名称不能大于4个字', 2);
	                   return false;
	               }
	               ShowLoading();
	               $.ajax({
	                   type: 'post',
	                   url: '/back/nodeSave',
	                   data: angular.toJson($scope.model)
	               }).then(function (result) {
	                   if (result.httpCode == 200) {
	                       HideLoading();
	                       tipDialog('保存成功！', 1);
	                       $scope.getPlateList();
	                   } else {
	                       alertDialog(result.msg, 2);
	                   }
	               })
	           }
	           ////表单验证
	           //function validate() {
	           //    var validator = jQuery('form').validate({
	           //        ignore: "",
	           //        rules: {
	           //            title: {
	           //                required: true,
	           //                maxlength: 4
	           //            },
	           //            sort: {
	           //                required: true,
	           //                maxlength: 100
	           //            }


	           //        },
	           //        messages: {
	           //            title: {
	           //                required: '请输入板块名称',
	           //                maxLength: "板块名称不得超过4个字符"
	           //            },
	           //            sort: {
	           //                required: '请输入排序序号',
	           //                maxLength: "排序序号不得超过4个字符"
	           //            }
	           //        },
	           //        submitHandler: function () {
	           //            $scope.submit();
	           //        }
	           //    });

	           //}

	           // 获取板块详情
	           function getPlateDetail(id) {
	               $.ajax({
	                   type: 'get',
	                   url: '/back/getNodeInfo',
	                   data: { nid: id }
	               }).then(function (result) {
	                   if (result.httpCode == 200) {
	                       $scope.model = result.data;
	                       $scope.$apply();
	                   }
	                   console.log(result);
	               })
	           }

	           //删除
	           $scope.delInfo = function (id) {

	               layer.confirm('确认要删除？', function (index) {
	                   $scope.loading = true;
	                   $.ajax({
	                       type: 'get',
	                       url: '/back/deleteNode',
	                       data: { "nid": id }
	                   }).then(function (result) {
	                       $scope.loading = false;
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


	       }]);