'use strict';

angular.module('app')
	.controller('readListController', ['$rootScope', '$scope', '$http', '$state',
	       function ($rootScope, $scope, $http, $state) {
	           $scope.title = '阅读列表';
	           $scope.param = {};
	           $scope.param.noticeId = $state.params.id;
	           $scope.noticeTitle = unescape($state.params.title);

	           $scope.url = '/iBase4J-SYS-Web/noticeRead/read/userreadlist';

	           //党组织结构设置
	           var setting = {
	               check: {
	                   enable: true,
	                   chkboxType: { "Y": "", "N": "" }
	               },
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
	               callback: {
	                   beforeClick: beforeClick,
	                   onCheck: onCheck
	               }
	           };
	           //获取选中子级
	           function onCheck(e, treeId, treeNode) {
	               var arrNodes = new Array();
	               var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
                   nodes = treeObj.getCheckedNodes(true);
	               for (var i = 0; i < nodes.length; i++) {
	                   arrNodes.push(nodes[i].id);
	               }
	               $scope.param.deptId = arrNodes.join(",");

	               console.log($scope.param.deptId);
	               $rootScope.search($scope.url, $scope.param);
	           }
	           //点击文字选中复选框
	           function beforeClick(treeId, treeNode) {
	               var zTree = $.fn.zTree.getZTreeObj("treeDemo");
	               zTree.checkNode(treeNode, !treeNode.checked, null, true);
	               return false;
	           }
	           //党组织结构树
	           $.ajax({
	               type: 'PUT',
	               dataType: 'json',
	               contentType: 'application/json;charset=UTF-8',
	               url: '/iBase4J-SYS-Web/dept/read/treelist2',
	               data: ''
	           }).then(function (result) {
	               $scope.loading = false;
	               if (result.httpCode == 200) {
	                   //console.log(result);
	                   var zNodes = result.data;
	                   var treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
	                   treeObj.expandAll(true);
	                   //setCheck();
	                   //$("#sy").bind("change", setCheck);
	               } else {
	                   // $scope.msg = result.msg;
	                   alertDialog(result.msg, 2);
	               }
	               $scope.$apply();
	           });

	           /*$scope.search = function () {
                   $scope.loading = true;
                   $.ajax({
                       type: 'PUT',
                       dataType: 'json',
                       contentType:'application/json;charset=UTF-8',
                       url : '/iBase4J-SYS-Web/noticeRead/read/userreadlist',
                       data: angular.toJson($scope.param)
                   }).then(function(result) {
                       $scope.loading = false;
                       if (result.httpCode == 200) {
                           $scope.pageInfo = result;
                       } else {
                           $scope.msg = result.msg;
                       }
                       $scope.$apply();
                   });
               }
               */
	           $rootScope.pageInfo = []; // 请求数据前清空
	           $rootScope.search($scope.url, $scope.param);

	           // 翻页
	           $scope.pagination = function (page) {
	               $scope.param.pageNum = page;
	               $scope.param.asc = $rootScope.changeAsc();
	               $rootScope.search($scope.url, $scope.param);
	           };



	       }]);