﻿'use strict';

angular.module('app')
	.controller('partyInfoAddController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {

	      $scope.model = {};

	      validateParty();

	      $scope.btnInfo = '提交';
	      $scope.btnState = false;
	      var userId = Number($state.params.userId);

	      console.log("partyInfoAdd userId=" + userId);
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
	              url: '/iBase4J-SYS-Web/userParty/detail',
	              data: { userId: userId }
	          }).then(function (result) {
	              $scope.loading = false;
	              if (result.httpCode == 200) {

	                  $scope.model = result.data;
	                  $scope.model.userId = userId;
	                  console.log($scope.model);
	                  //所属部门
	                  $('#deptId').attr('value', $scope.model.joinDeptName);
	                  $('#treeids').attr('value', $scope.model.deptId);

	              } else {
	                  // $scope.msg = result.msg;
	                  alertDialog(result.msg, 2);
	              }

	              $scope.$apply();
	          });
	      }

	      getDropdowmList();
	      var zNodes;
	      //获取页面下拉框配置
	      function getDropdowmList() {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/userParty/getAllSelect',
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.PartyDropdowmList = result.data;

	                  zNodes = $scope.PartyDropdowmList.deptList;

	                  $.fn.zTree.init($('#depTree'), setting, zNodes);

	                  //加入中共组织类型
	                  var joinPartyNodes = $scope.PartyDropdowmList.joinPartyLevelList;
	                  $.fn.zTree.init($('#treeJoinParty'), joinPartySetting, joinPartyNodes);

	                  //转正情况
	                  var regularRemarkNodes = $scope.PartyDropdowmList.regularRemarkList;
	                  $.fn.zTree.init($('#treeRegularRemark'), regularRemarkSetting, regularRemarkNodes);
	                  //出党原因
	                  var leaveReasonNodes = $scope.PartyDropdowmList.leaveReasonList;
	                  $.fn.zTree.init($('#treeLeaveReason'), leaveReasonSetting, leaveReasonNodes);
	                  //离开中共组织类型
	                  var leavePartyNodes = $scope.PartyDropdowmList.leavePartyLevelList;
	                  $.fn.zTree.init($('#treeLeaveParty'), leavePartySetting, leavePartyNodes);
	                  debugger;
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
	                  enable: false,
	              }
	          },
	          callback: {
	              onClick: onClick
	          }
	      };
	      function onClick(e, treeId, treeNode) { // 选择元素触发	         

	          $scope.model.deptText = treeNode.deptName;
	          $scope.model.deptId = treeNode.id;
	          $scope.hideMenu();
	          $scope.$apply();
	      }

	      $scope.showMenu = function () {

	          var idObj = $('#deptId');
	          var idOffset = $('#deptId').offset();
	          $('#depContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      //加入类型配置
	      var joinPartySetting = {
	          view: {
	              dblClickExpand: false,
	              showIcon: false
	          },
	          data: {
	              key: {
	                  name: "codeText"
	              },
	              simpleData: {
	                  enable: true,
	                  idKey: "code",
	                  pIdKey: "parentId",
	                  rootPId: 0
	              }
	          },
	          callback: {
	              onClick: onJoinPartyClick
	          }
	      };
	      function onJoinPartyClick(e, treeId, treeNode) { // 选择元素触发
	          $scope.model.joinPartyLevelText = treeNode.codeText;
	          $scope.model.joinPartyLevel = treeNode.id;
	          $scope.hideMenu();
	          $scope.$apply();
	      }

	      $scope.showJoinPartyMenu = function () {

	          $('#joinPartyContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }
	      //转正情况配置
	      var regularRemarkSetting = {
	          view: {
	              dblClickExpand: false,
	              showIcon: false
	          },
	          data: {
	              key: {
	                  name: "codeText"
	              },
	              simpleData: {
	                  enable: true,
	                  idKey: "code",
	                  pIdKey: "parentId",
	                  rootPId: 0
	              }
	          },
	          callback: {
	              onClick: onRegularRemarkClick
	          }
	      };
	      function onRegularRemarkClick(e, treeId, treeNode) { // 选择元素触发
	          $scope.model.regularRemarkText = treeNode.codeText;
	          $scope.model.regularRemark = treeNode.id;
	          $scope.hideMenu();
	          $scope.$apply();
	      }

	      $scope.showRegularRemarkMenu = function () {

	          $('#regularRemarkContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      //离开中共组织类型
	      var leavePartySetting = {
	          view: {
	              dblClickExpand: false,
	              showIcon: false
	          },
	          data: {
	              key: {
	                  name: "codeText"
	              },
	              simpleData: {
	                  enable: true,
	                  idKey: "code",
	                  pIdKey: "parentId",
	                  rootPId: 0
	              }
	          },
	          callback: {
	              onClick: onLeavePartyClick
	          }
	      };
	      function onLeavePartyClick(e, treeId, treeNode) { // 选择元素触发
	          $scope.model.leavePartyText = treeNode.codeText;
	          $scope.model.leavePartyLevel = treeNode.id;
	          $scope.hideMenu();
	          $scope.$apply();
	      }

	      $scope.showLeavePartyMenu = function () {
	          $('#leavePartyContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      //出党原因配置
	      var leaveReasonSetting = {
	          view: {
	              dblClickExpand: false,
	              showIcon: false
	          },
	          data: {
	              key: {
	                  name: "codeText"
	              },
	              simpleData: {
	                  enable: true,
	                  idKey: "code",
	                  pIdKey: "parentId",
	                  rootPId: 0
	              }
	          },
	          callback: {
	              onClick: onLeaveReasonClick
	          }
	      };
	      function onLeaveReasonClick(e, treeId, treeNode) { // 选择元素触发
	          $scope.model.leaveReasonText = treeNode.codeText;
	          $scope.model.leaveReason = treeNode.id;
	          $scope.hideMenu();
	          $scope.$apply();
	      }

	      $scope.showLeaveReasonMenu = function () {

	          $('#leaveReasonContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }
	      $scope.hideMenu = function () {
	          $('#depContent').fadeOut('fast');
	          $('#joinPartyContent').fadeOut('fast');
	          $('#regularRemarkContent').fadeOut('fast');
	          $('#leaveReasonContent').fadeOut('fast');
	          $('#leavePartyContent').fadeOut('fast');
	          $('body').unbind('mousedown', onBodyDown);
	      }

	      function onBodyDown(event) {

	          var e = e || window.event; //浏览器兼容性   
	          var elem = e.target || e.srcElement;
	          while (elem) { //循环判断至跟节点，防止点击的是div子元素   
	              if (elem.id && elem.id == 'depContent' || elem.id == 'regularRemarkContent' || elem.id == 'joinPartyContent' || elem.id == 'leaveReasonContent' || elem.id == 'leavePartyContent') {
	                  return;
	              }
	              elem = elem.parentNode;
	          }
	          $scope.hideMenu();
	      }

	      // 日期
	      function setDate() {

	          var date = new Date;
	          var year = date.getFullYear();
	          console.log(year);

	          //加入日期
	          laydate({
	              elem: '#joinDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  console.log(datas);
	                  $scope.model.joinDate = datas;

	              }

	          });
	          //转正日期
	          laydate({
	              elem: '#regularDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              // max: laydate.now(0, "YYYY/MM/DD"),
	              choose: function (datas) {
	                  console.log(datas)
	                  $scope.model.regularDate = datas;
	                  if (datas != '') {
	                      var _date = datas.substr(0, 4);
	                      $scope.model.partyAge = (year - _date) < 0 ? 0 : (year - _date);
	                  } else {
	                      $scope.model.partyAge = '';
	                  }
	                  $scope.$apply();
	              }

	          });
	          //离开中共日期A
	          laydate({
	              elem: '#leavePartyDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.model.leavePartyDate = datas;
	              }

	          });
	          //恢复党籍日期
	          laydate({
	              elem: '#recoveryPartyDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.model.recoveryPartyDate = datas;
	              }

	          });
	      }
	      setDate();

	      //表单验证
	      function validateParty() {
	          var validator = jQuery('form').validate({
	              ignore: "",
	              rules: {
	                  deptId: { required: true },
	                  joinDeptName: {
	                      required: true,
	                      maxlength: 50
	                  },
	                  activityRenark: {
	                      required: true,
	                      maxlength: 500
	                  },
	                  regularRemark: { required: true }
	                  //content: {
	                  //    date: true
	                  //},


	              },
	              messages: {
	                  deptId: { required: '请选择入党时所在支部' },
	                  joinDeptName: {
	                      required: '请填写入党时所在支部名称',
	                      maxLength: "入党时所在支部名称50个字"
	                  },
	                  activityRenark: {
	                      required: '请选择参加组织生活情况',
	                      maxlength: "参加组织生活情况不能超过500字"
	                  },
	                  regularRemark: { required: '请选择转正情况' }
	                  //content: {
	                  //    required: '汇报内容不能为空'
	                  //},

	              },
	              submitHandler: function () {
	                  $scope.submitParty();
	              }
	          });

	      }
	      $scope.submitParty = function () {
	          var postData = angular.copy($scope.model);

	          debugger;
	          if (!postData.deptText) {
	              alertDialog("入党时所在支部不能为空", 2);
	              return;
	          } else if (!postData.regularDate) {
	              alertDialog("转正日期不能为空", 2);
	              return;
	          }

	          $scope.btnInfo = '提交中...';
	          $scope.btnState = true;
	          console.log(angular.toJson(postData));
	          $.ajax({
	              type: 'post',
	              url: '/iBase4J-SYS-Web/userParty/update',
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