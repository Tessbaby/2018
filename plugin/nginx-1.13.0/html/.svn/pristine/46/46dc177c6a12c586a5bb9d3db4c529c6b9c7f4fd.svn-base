'use strict';

angular.module('app')
	.controller('ApplygoUpController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {

	      $scope.model = {};
	      var userId = $state.params.userId;
	      //$scope.model.userId = userId;
	      //// $scope.model.userId = 147;

	      $scope.btnInfo = '提交';
	      $scope.btnState = false;
	      getDetail();

	      laydate({
	          elem: '#setAcitveDate',
	          format: 'YYYY-MM-DD',
	          choose: function (dates) {
	              $scope.model.setAcitveDate = dates;
	          }
	      });

	      function getDetail() {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/userDevelop/getDetail',
	              data: { userId: userId }
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  console.log(result.data);
	                  $scope.model = result.data;

	                  $scope.model.deptId = $scope.model.deptId == null ? '' : $scope.model.deptId;
	                  getJoinNames($scope.model.deptId);
	                  getDropdowmList();
	              }
	          })
	      }

	      function getDropdowmList() {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/userDevelop/getAllSelect',
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  debugger;
	                  $scope.dropdowmList = result.data;
	                  //console.log(result);
	                  //党员所在支部
	                  var depNodes = $scope.dropdowmList.deptList;
	                  $.fn.zTree.init($('#depTree'), setting, depNodes);
	                  $scope.$apply();
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });
	      }
	      var setting = {
	          view: {
	              dblClickExpand: false,
	              showIcon: false
	          },
	          data: {
	              key: {
	                  name: "deptName"
	              },
	              simpleData: {
	                  enable: true,
	                  idKey: "code",
	                  pIdKey: "parentId",
	                  rootPId: 0
	              }
	          },
	          callback: {
	              onClick: onClick
	          }
	      };
	      function onClick(e, treeId, treeNode) { // 选择元素触发

	          //var idObj = $('#deptName');
	          //idObj.attr('value', treeNode.deptName);
	          $scope.model.deptText = treeNode.deptName;
	          $scope.model.deptId = treeNode.id;
	          getJoinNames(treeNode.id);
	          $scope.$apply();
	      }

	      $scope.showMenu = function () {
	          var idObj = $('#deptId');
	          var idOffset = $('#deptId').offset();
	          $('#depContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      //获取培养介绍人信息
	      function getJoinNames(depId) {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/user/getAllUserByBranch',
	              data: { id: depId }
	          }).then(function (result) {

	              if (result.httpCode == 200) {
	                  $scope.joinNameList = result.data;

	                  var joinNodes = $scope.joinNameList;
	                  var treetrainingNames = $.fn.zTree.init($('#treetrainingNames'), settingForTraining, joinNodes);
	                  treetrainingNames.expandAll(true);
	                  $scope.$apply();
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });
	      }
	      //显示入党培养人下拉框
	      $scope.showTrainingNames = function () {

	          $('#trainingContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      //培养联系人下拉框配置
	      var settingForTraining = {
	          check: {
	              enable: true,
	              chkboxType: { "Y": "", "N": "" }
	          },
	          view: {
	              dblClickExpand: false
	          },

	          data: {

	              key: {
	                  name: "userName"
	              },
	              simpleData: {
	                  enable: true,
	                  idKey: "id",
	                  pIdKey: "parentId",
	                  rootPId: 0
	              }
	          },
	          callback: {
	              beforeClick: beforeTrainingClick,
	              onCheck: onTrainingCheck
	          }
	      };

	      function beforeTrainingClick(treeId, treeNode) {
	          var zTree = $.fn.zTree.getZTreeObj("treetrainingNames");
	          zTree.checkNode(treeNode, !treeNode.checked, null, true);
	          return false;
	      }
	      //培养人选择事件 做多选2个
	      function onTrainingCheck(e, treeId, treeNode) {
	          var zTree = $.fn.zTree.getZTreeObj("treetrainingNames"),
              nodes = zTree.getCheckedNodes(true);

	          if (nodes.length > 2) {
	              tipDialog("最多选两人", 2);
	              return;
	          }
	          var v = "", ids = "";

	          for (var i = 0, l = nodes.length; i < l; i++) {
	              v += nodes[i].userName + ",";
	              ids += nodes[i].id + ",";
	          }
	          if (v.length > 0) v = v.substring(0, v.length - 1);
	          if (ids.length > 0) ids = ids.substring(0, ids.length - 1);

	          //var joinNamesObj = $("#trainingNames");
	          //joinNamesObj.attr("value", v);

	          $scope.model.joinTrainIds = ids;
	          $scope.model.joinTrainNames = v;

	          $scope.$apply();
	      }

	      function onBodyDown(event) {

	          var e = e || window.event; //浏览器兼容性   
	          var elem = e.target || e.srcElement;
	          while (elem) { //循环判断至跟节点，防止点击的是div子元素   
	              if (elem.id && elem.id == 'depContent' || elem.id == 'trainingContent') {
	                  return;
	              }
	              elem = elem.parentNode;
	          }
	          $scope.hideMenu();
	      }

	      $scope.hideMenu = function () {
	          $('#depContent').fadeOut('fast');
	          $('#trainingContent').fadeOut('fast');
	          $('body').unbind('mousedown', onBodyDown);
	      }

	      $scope.submit = function () {
	          console.log($scope.model)
	          if (!$scope.model.setAcitveDate) {
	              tipDialog('请选择列为积极分子日期', 2);
	              return;
	          } else if (!$scope.model.joinTrainIds) {
	              tipDialog('请选择培养介绍人', 2);
	              return;
	          } else if (!$scope.model.deptId) {
	              tipDialog('请选择支部', 2);
	              return;
	          }
	          var postData = {
	              deptId: $scope.model.deptId,
	              id: $scope.model.id,
	              joinTrainIds: $scope.model.joinTrainIds,
	              setAcitveDate: $scope.model.setAcitveDate,
	              userId: userId
	          }
	          $scope.btnInfo = '提交中...';
	          $scope.btnState = true;

	          $.ajax({
	              type: 'post',
	              url: '/iBase4J-SYS-Web/user/apply/changeActive',
	              data: angular.toJson(postData)
	          }).then(function (result) {
	              console.log(result);
	              if (result.httpCode == 200) {
	                  tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                      parent.layer.closeAll();
	                  });
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	              $scope.btnInfo = '提交';
	              $scope.btnState = false;
	              $scope.$apply();
	          });

	      }

	  }])