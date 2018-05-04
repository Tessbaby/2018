'use strict';

angular.module('app')
	.controller('faultsReportController', ['$rootScope', '$scope', '$http', '$state',
	       function ($rootScope, $scope, $http, $state) {
	           $scope.title = '事件统计';

	           //=======================================验证权限 statr===================================
	           ////权限模块代码
	           //$scope.permissionCode = $state.$current.name;
	           //$scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;	          
	           //if (!$scope.hasQuery) {
	           //    layer.alert("未经授权，禁止访问！", { icon: 2 });
	           //    return false;
	           //}
	           //=======================================验证权限 end===================================

	           //=======================================部门Tree statr===================================
	           //党组织结构设置
	           var setting = {
	               check: { enable: false },
	               data: {
	                   key: {
	                       name: "deptName"
	                   },
	                   simpleData: {
	                       enable: true,
	                       idKey: "id",
	                       pIdKey: "parentId",
	                       rootPId: 0
	                   }
	               },
	               callback: { onClick: onClick }
	           };

	           //获取选中子级
	           function onClick(e, treeId, treeNode) {

	               $scope.param.deptid = treeNode.id;

	               $rootScope.search($scope.url, $scope.param);
	           }
	           //党组织结构树

	           $scope.getDepTree = function () {

	               $.ajax({
	                   type: 'PUT',
	                   dataType: 'json',
	                   contentType: 'application/json;charset=UTF-8',
	                   url: '/iBase4J-SYS-Web/dept/read/treelist2',
	                   data: angular.toJson($scope.param)
	               }).then(function (result) {

	                   if (result.httpCode == 200) {
	                       //console.log(result);
	                       var zNodes = result.data;
	                       var treeObj = $.fn.zTree.init($("#depTree"), setting, zNodes);
	                       treeObj.expandAll(true);

	                   } else {
	                       // $scope.msg = result.msg;
	                       alertDialog(result.msg, 2);
	                   }
	                   $scope.$apply();
	               });
	           }
	           $scope.getDepTree();
	           //=======================================部门Tree end===================================




	           //==================================执行查询 start==================================

	           $scope.param = {};

	           var myDate = new Date();
	           //myDate.toLocaleDateString(); //可以获取当前日期

	           //myDate.getFullYear();    //获取完整的年份(4位,1970-????)
	           //myDate.getMonth();       //获取当前月份(0-11,0代表1月)
	           var month = Number(myDate.getMonth()) + 1;
	           if (month < 10) {
	               month = "0" + month;
	           }

	           $scope.param.queryDate = myDate.getFullYear() + "/" + month;

	           var queryDate = {
	               elem: '#queryDate',
	               format: 'YYYY/MM',
	              // min: laydate.now(0, "YYYY/MM"),
	               max: '2099-06',
	               istime: false,
	               istoday: false,
	               choose: function (datas) {

	                   $scope.param.queryDate = datas;
	               }
	           };
	           laydate(queryDate);

	           //$scope.param.queryDate=
	           $scope.url = '/iBase4J-SYS-Web/issueHistory/list';
	           $rootScope.pageInfo = []; // 请求数据前清空
	           $rootScope.search($scope.url, $scope.param);

	           $scope.goSearch = function () {
		         	$scope.param.pageNum = 1;
		         	$rootScope.search($scope.url, $scope.param);
		         }

	           $scope.clearSearch = function () {
	               $scope.param.keyWord = null;
	               $rootScope.search($scope.url, $scope.param);
	           }
	           // 翻页 - 排序翻页数据与此一致
	           $scope.pagination = function (page) {
	               $scope.param.pageNum = page;
	               $scope.param.asc = $rootScope.changeAsc();
	               $rootScope.search($scope.url, $scope.param);
	           };

	           //==================================执行查询 end==================================
	           //生成本月统计
	           $scope.makeCrrrent = function () {
	               $.ajax({
	                   type: 'put',
	                   url: '/iBase4J-SYS-Web/issueHistory/makeScoreNowMonth'
	               }).then(function (result) {
	                   $scope.loading = false;
	                   //console.log(result);
	                   if (result.httpCode == 200) {
	                       tipDialog("本月数据已生成", 1, 0.8 * 1000, function () {
	                           $rootScope.search($scope.url, $scope.param);
	                       });
	                   } else {
	                       alertDialog(result.msg, 2);
	                   }
	                   $scope.$apply();
	               });
	           }
	           //生成上月统计
	           $scope.makeUp = function () {
	               $.ajax({
	                   type: 'put',
	                   url: '/iBase4J-SYS-Web/issueHistory/makeScoreLastMonth'
	               }).then(function (result) {
	                   $scope.loading = false;
	                   //console.log(result);
	                   if (result.httpCode == 200) {
	                       tipDialog("上月数据已生成", 1, 0.8 * 1000, function () {
	                           $rootScope.search($scope.url, $scope.param);
	                       });
	                   } else {
	                       alertDialog(result.msg, 2);
	                   }
	                   $scope.$apply();
	               });
	           }

	       }]);