'use strict';

angular.module('app')
	.controller('voteListController', ['$rootScope', '$scope', '$http', '$state',
	      function ($rootScope, $scope, $http, $state) {
	          //$scope.title = '选举投票';
	          $scope.param = {};
	          $scope.param.type = $state.params.typeId;
	          //=======================================验证权限 statr===================================
	          //权限模块代码
	          $scope.permissionCode = $state.$current.name + '.' + $scope.param.type;
	          $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
	          $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	          $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
	          if (!$scope.hasQuery) {
	              layer.alert("未经授权，禁止访问！", { icon: 2 });
	              return false;
	          }

	          //=======================================验证权限 end===================================

	          $scope.url = '/iBase4J-SYS-Web/question/list';
	          $rootScope.pageInfo = []; // 请求数据前清空
	          $rootScope.search($scope.url, $scope.param);

	          getTypeName();

	          ////状态数组
	          //$scope.statusList = [
	          //	{
	          //		id:3,
	          //		text:'全部'
	          //	},
	          //	{
	          //		id:0,
	          //		text:'未开始'
	          //	},
	          //	{
	          //		id:1,
	          //		text:'进行中'
	          //	},
	          //	{
	          //		id:2,
	          //		text:'已结束'
	          //	}
	          //];

	          var getStateList = function () {
	              var postData = {
	                  type: '1'
	              };
	              $.ajax({
	                  type: 'PUT',
	                  url: '/iBase4J-SYS-Web/status/list',
	                  async: false,
	                  data: angular.toJson(postData)
	              }).then(function (result) {
	                  $scope.statusList = result.data;
	                  $scope.statusList.unshift({ code: "", name: "全部" });
	                  $scope.param.state = "";


	              });
	          }
	          getStateList();
	          //党组织结构设置
	          var setting = {
	              check: {
	                  enable: true
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
	                  //beforeClick: beforeClick,
	                  onCheck: onCheck
	              }
	          };
	          //包含下级
	          function setCheck() {
	              var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
                  sy = $("#sy").prop("checked");
	              var type;
	              if (sy) {
	                  type = { "Y": "s", "N": "s" };
	              } else {
	                  type = { "Y": "", "N": "" };
	              }
	              //console.log(type);
	              zTree.setting.check.chkboxType = type;
	          }
	          //获取选中子级
	          function onCheck(e, treeId, treeNode) {
	              var arrNodes = new Array();
	              var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
                  nodes = treeObj.getCheckedNodes(true);
	              for (var i = 0; i < nodes.length; i++) {
	                  arrNodes.push(nodes[i].id);
	              }
	              $scope.param.deptId = arrNodes.join(",");
	              //console.log($scope.param.sendDeptId);
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
	                  setCheck();
	                  $("#sy").bind("change", setCheck);
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	              $scope.$apply();
	          });

	          /*$scope.search = function () {
                  $scope.loading = true;
                  console.log("search");
                  $.ajax({
                      type: 'PUT',
                      dataType: 'json',
                      contentType:'application/json;charset=UTF-8',
                      url : '/iBase4J-SYS-Web/notice/list',
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
              
              $scope.search();*/

            $scope.goSearch = function () {
		         	$scope.param.pageNum = 1;
		         	$rootScope.search($scope.url, $scope.param);
		         }

	          $scope.clearSearch = function () {
	              $scope.param.keyword = null;
	              $rootScope.search($scope.url, $scope.param);
	          }

	          // 翻页 - 排序翻页数据与此一致
	          $scope.pagination = function (page) {
	              $scope.param.pageNum = page;
	              $scope.param.asc = $rootScope.changeAsc();
	              $rootScope.search($scope.url, $scope.param);
	          };

	          $rootScope.search($scope.url, $scope.param);


	          //删除
	          $scope.delInfo = function (id) {

	          	layer.confirm('确认要删除？', function (index) {
	          		layer.close(index);
	          		$.ajax({
                  type: 'post',
                  dataType: 'json',
                  contentType: 'application/json;charset=UTF-8',
                  url: '/iBase4J-SYS-Web/question/delete',
                  data: angular.toJson({ "id": id })
                }).then(function (result) {
                  $scope.loading = false;
                  //console.log(result);
                  if (result.httpCode == 200) {
                      tipDialog("删除成功", 1, 0.8 * 1000, function () {
                          $rootScope.search($scope.url, $scope.param);
                      });
                  } else {
                      alertDialog(result.msg, 2);
                  }
                  $scope.$apply();
                });
	          	})
	          }

	          //获取投票栏目名称（每月一星）
	          function getTypeName() {
	              $scope.loading = true;
	              $.ajax({
	                  type: 'PUT',
	                  url: '/iBase4J-SYS-Web/questionType/questionType',
	                  data: angular.toJson({ 'type': $scope.param.type })
	              }).then(function (result) {
	                  $scope.loading = false;
	                  if (result.httpCode == 200) {
	                      $scope.title = result.data.name;
	                      $scope.$apply();
	                  } else {
	                      alertDialog(result.msg, 2);
	                  }

	              });
	          }


	      }]);