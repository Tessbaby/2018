﻿'use strict';

angular.module('app')
	.controller('trainingController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {

	      var userId = $state.params.userId;

	      console.log("培养发展 userId=" + userId);
	      $scope.btnInfo = '提交';
	      $scope.showSubmit = true;
	      $scope.btnState = false;
	      $scope.model = {};
	    
	      getDropdowmList();
	      setDate();
	      validate();
	      $scope.showSubmit = true;
	      if (userId) {
	          getModel(userId);
	      } else {
	          alertDialog("请先添加基本信息", 2);
	          $scope.showSubmit = false;
	      }

	      //获取党员详情
	      function getModel(userId) {
	          // 文件流转详情
	          $.ajax({
	              type: 'get',
	              url: '/iBase4J-SYS-Web/userDevelop/detail',
	              data: { userId: userId }
	          }).then(function (result) {
	              $scope.loading = false;
	              if (result.httpCode == 200) {

	                  $scope.model = result.data;
	                  $scope.model.userId = userId;
	                  console.log($scope.model);
	                  ////所属部门
	                  //$('#deptId').attr('value', $scope.model.joinDeptName);
	                  //$('#treeids').attr('value', $scope.model.deptId);

	              } else {
	                  // $scope.msg = result.msg;
	                  alertDialog(result.msg, 2);
	              }

	              $scope.$apply();
	          });
	      }

	      // 日期
	      function setDate() {
	          //入党申请日期
	          laydate({
	              elem: '#joinApplyDate',
	              format: 'YYYY-MM-DD',
	              choose: function (datas) {
	                  $scope.model.joinApplyDate = datas;
	              }

	          });
	          //列为积极分子日期
	          laydate({
	              elem: '#setAcitveDate',
	              format: 'YYYY-MM-DD',
	              choose: function (datas) {
	                  $scope.model.setAcitveDate = datas;
	              }

	          });
	          //列为发展对象日期
	          laydate({
	              elem: '#setDevelopDate',
	              format: 'YYYY-MM-DD',
	              choose: function (datas) {
	                  $scope.model.setDevelopDate = datas;
	              }

	          });
	          //上级批准日期
	          laydate({
	              elem: '#approvalDate',
	              format: 'YYYY-MM-DD',
	              choose: function (datas) {
	                  $scope.model.approvalDate = datas;
	              }

	          });
	          //支部大会通过日期
	          laydate({
	              elem: '#meetingApprovalDate',
	              format: 'YYYY-MM-DD',
	              choose: function (datas) {
	                  $scope.model.meetingApprovalDate = datas;
	              }

	          });
	          //最近培训日期
	          laydate({
	              elem: '#trainLastDate',
	              format: 'YYYY-MM-DD',
	              choose: function (datas) {
	                  $scope.model.trainLastDate = datas;
	              }

	          });

	      }


	      //获取页面下拉框配置
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

	      $scope.hideMenu = function () {
	          $('#depContent').fadeOut('fast');
	          $('#joinNamesContent').fadeOut('fast');
	          $('#trainingContent').fadeOut('fast');
	          $('body').unbind('mousedown', onBodyDown);
	      }

	      function onBodyDown(event) {

	          var e = e || window.event; //浏览器兼容性   
	          var elem = e.target || e.srcElement;
	          while (elem) { //循环判断至跟节点，防止点击的是div子元素   
	              if (elem.id && elem.id == 'depContent' || elem.id == 'joinNamesContent' || elem.id == 'trainingContent') {
	                  return;
	              }
	              elem = elem.parentNode;
	          }
	          $scope.hideMenu();
	      }

	      //显示入党介绍人下拉框
	      $scope.showJoinNames = function () {

	          $('#joinNamesContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      //获取介入党绍人信息
	      function getJoinNames(depId) {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/user/getAllUserByBranch',
	              data: { id: depId }
	          }).then(function (result) {

	              if (result.httpCode == 200) {
	                  $scope.joinNameList = result.data;

	                  //入党介绍人
	                  var joinNodes = $scope.joinNameList;
	                  var treeJoinNames = $.fn.zTree.init($('#treeJoinNames'), settingForJoin, joinNodes);
	                  treeJoinNames.expandAll(true);

	                  var treetrainingNames = $.fn.zTree.init($('#treetrainingNames'), settingForTraining, joinNodes);
	                  treetrainingNames.expandAll(true);



	                  $scope.$apply();
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });
	      }
	      //入党介绍人下拉框配置
	      var settingForJoin = {
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
	              beforeClick: beforeClick,
	              onCheck: onJoinCheck
	          }
	      };

	      function beforeClick(treeId, treeNode) {
	          var zTree = $.fn.zTree.getZTreeObj("treeJoinNames");
	          zTree.checkNode(treeNode, !treeNode.checked, null, true);
	          return false;
	      }
	      //介绍人选择事件 做多选2个
	      function onJoinCheck(e, treeId, treeNode) {
	          var zTree = $.fn.zTree.getZTreeObj("treeJoinNames"),
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

	          //var joinNamesObj = $("#joinIntroducerNames");
	          //joinNamesObj.attr("value", v);
	          $scope.model.joinIntroducerNames = v;
	          $scope.model.joinIntroducerIds = ids;
	          $scope.$apply();

	      }

	      //------------------------------------------------------------------------
	      //显示入党培养人下拉框
	      $scope.showTrainingNames = function () {

	          $('#trainingContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      //入党介绍人下拉框配置
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

	      //表单验证
	      function validate() {
	          var validator = jQuery('form').validate({
	              ignore: "",
	              rules: {
	                  joinApplyDate: { required: true },
	                  joinIntroducerNames: { maxlength: 20 },
	                  trainIssue: { maxlength: 100 }
	                  //joinDeptName: {

	                  //    maxlength: 50
	                  //},
	                  //removeStatus: {
	                  //    required: true,
	                  //},
	                  //partyName: {
	                  //    maxlength: 50
	                  //},
	                  //beforeBranchName: {
	                  //    maxlength: 50
	                  //},



	              },
	              messages: {
	                  joinApplyDate: { required: '请选择入党申请日期' },
	                  joinIntroducerNames: { maxlength: '入党介绍人不能超过20字' },
	                  trainIssue: { maxlength: '培训情况不能超过100字' }
	                  //joinDeptName: {

	                  //    maxLength: "入党时所在支部名称不能超过50个字"
	                  //},
	                  //removeStatus: {
	                  //    required: '请选择转入转出状态'
	                  //},
	                  //partyName: {
	                  //    maxLength: "党委名称不能超过50个字"
	                  //},
	                  //beforeBranchName: {
	                  //    maxLength: "原党支部名称不能超过50个字"
	                  //},

	              },
	              submitHandler: function () {
	                  submit();
	              }
	          });

	      }
	      function submit() {

	          var postData = angular.copy($scope.model);

	          debugger;
	          if (!postData.deptId) {
	              alertDialog("请选择所在支部", 2);
	              return;
	          } else if (!postData.joinApplyDate) {
	              alertDialog("请选择入党申请日期", 2);
	              return;
	          }

	          $scope.btnInfo = '提交中...';
	          $scope.btnState = true;
	          console.log(angular.toJson(postData));
	          $.ajax({
	              type: 'post',
	              url: '/iBase4J-SYS-Web/userDevelop/update',
	              data: angular.toJson(postData)
	          }).then(function (result) {
	              console.log(result);
	              if (result.httpCode == 200) {
	                  tipDialog("保存成功", 1, 0.8 * 1000, function () {

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