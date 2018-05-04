'use strict';

angular.module('app')
	.controller('democraticFormController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {


	      $scope.btnInfo = '提交';
	      $scope.btnState = false;
	      $scope.model = {};
	      $scope.model.userId = $state.params.userId;
	      var id = Number($state.params.id);
	      getDropdowmList();
	      setDate();
	      validate();
	      if (id) {
	          getModel(id);
	      }
	      //获取评议详情
	      function getModel() {
	          // 文件流转详情
	          $.ajax({
	              type: 'get',
	              url: '/iBase4J-SYS-Web/userComment/detail',
	              data: { id: id }
	          }).then(function (result) {
	              $scope.loading = false;
	              if (result.httpCode == 200) {

	                  $scope.model = result.data;
	                  console.log($scope.model);


	              } else {
	                  // $scope.msg = result.msg;
	                  alertDialog(result.msg, 2);
	              }

	              $scope.$apply();
	          });
	      }
	      // 日期
	      function setDate() {
	          //开展评议日期
	          laydate({
	              elem: '#commentBeginDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.model.commentBeginDate = datas;
	              }

	          });
	          //结束评议日期
	          laydate({
	              elem: '#commentEndDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.model.commentEndDate = datas;
	              }

	          });
	      }
	      //获取页面下拉框配置
	      function getDropdowmList() {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/userComment/getAllSelect',
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  debugger;
	                  $scope.dropdowmList = result.data;

	                  var commentRewardNodes = $scope.dropdowmList.commentRewardList;
	                  $.fn.zTree.init($('#treeCommentReward'), setting, commentRewardNodes);

	                  var rewardReasonNodes = $scope.dropdowmList.commentRewardReasonList;
	                  $.fn.zTree.init($('#treeRewardReason'), RewardReasonSetting, rewardReasonNodes);

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
	              onClick: onClick
	          }
	      };
	      function onClick(e, treeId, treeNode) { // 选择元素触发

	          $scope.model.commentRewardText = treeNode.codeText;
	          $scope.model.commentReward = treeNode.id;
	          $scope.$apply();
	      }

	      $scope.showCommentReward = function () {

	          $('#commentRewardContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }
	      $scope.showRewardReason = function () {

	          $('#rewardReasonContent').slideDown('fast');

	          $('body').bind('mousedown', onBodyDown);
	      }
	      $scope.hideMenu = function () {
	          $('#commentRewardContent').fadeOut('fast');
	          $('#rewardReasonContent').fadeOut('fast');
	          $('body').unbind('mousedown', onBodyDown);
	      }

	      function onBodyDown(event) {

	          var e = e || window.event; //浏览器兼容性   
	          var elem = e.target || e.srcElement;
	          while (elem) { //循环判断至跟节点，防止点击的是div子元素   
	              if (elem.id && elem.id == 'commentRewardContent' || elem.id == 'rewardReasonContent') {
	                  return;
	              }
	              elem = elem.parentNode;
	          }
	          $scope.hideMenu();
	      }

	      var RewardReasonSetting = {
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
	              onClick: onRewardReasonClick
	          }
	      };
	      function onRewardReasonClick(e, treeId, treeNode) { // 选择元素触发

	          $scope.model.commentRewardReasonText = treeNode.codeText;
	          $scope.model.commentRewardReason = treeNode.id;
	          $scope.$apply();
	      }
	      //表单验证
	      function validate() {
	          var validator = jQuery('form').validate({
	              ignore: "",
	              rules: {
	                  commentResult: {

	                      required: true
	                  }


	              },
	              messages: {
	                  commentResult: {

	                      required: "请选择评议结果"
	                  }

	              },
	              submitHandler: function () {
	                  submit();
	              }
	          });

	      }
	      function submit() {

	          var postData = angular.copy($scope.model);

	          debugger;

	          $scope.btnInfo = '提交中...';
	          $scope.btnState = true;
	          console.log(angular.toJson(postData));
	          $.ajax({
	              type: 'post',
	              url: '/iBase4J-SYS-Web/userComment/update',
	              data: angular.toJson(postData)
	          }).then(function (result) {
	              console.log(result);
	              if (result.httpCode == 200) {
	                  tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                      $scope.cancel();
	                  });
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	              $scope.btnInfo = '提交';
	              $scope.btnState = false;
	              $scope.$apply();
	          });
	      }
	      $scope.cancel = function () {
	          parent.layer.closeAll();
	      }
	  }])