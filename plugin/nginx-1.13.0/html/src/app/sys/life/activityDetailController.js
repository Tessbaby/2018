'use strict';

angular.module('app')
	.controller('activityDetailController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {

	      if ($state.includes('**.lifes.activityDetail')) {
	          $scope.title = '详情';
	          $scope.isEnd = false;
	      } else if ($state.includes('**.lifes.fcAdd')) {
	          $scope.title = '添加风采';
	          $scope.isEnd = true;
	          $scope.btnInfo = '确定';
	          $scope.btnState = false;
	      }
	      $scope.id = $state.params.id;
	      $scope.type = $state.params.typeId;
	      getDetail($scope.id);
	      getTypeName();

	      // 获取类型
	      function getTypeName() {
	          $.ajax({
	              type: 'PUT',
	              url: '/iBase4J-SYS-Web/activityType/list',
	              data: angular.toJson({ 'type': $scope.type })
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.typeName = result.data.name;
	                  $scope.$apply();
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });
	      }

	      function getDetail() {
	          $.ajax({
	              type: 'put',
	              url: '/iBase4J-SYS-Web/activity/detail',
	              contentType: 'application/json;charset=UTF-8',
	              data: angular.toJson({ id: $scope.id })
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.infoList = result.data;
	                  if ($scope.isEnd && $scope.infoList.activityStyle) {
	                      var ue = UE.getEditor('activeEditor');
	                      ue.ready(function () {
	                          activeEditor.setContent($scope.infoList.activityStyle);
	                      })
	                  }
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	              $scope.$apply();
	          });
	      }

	      //活动风采
	      var activeEditor = UE.getEditor("activeEditor", {
	          topOffset: 0,
	          autoFloatEnabled: false,
	          autoHeightEnabled: false,
	          wordCount: false,
	          autotypeset: {
	              removeEmptyline: true
	          },
	          toolbars: [
                [
                              'source', //源代码
                              'bold', //加粗
                              'forecolor', //字体颜色
                              'indent', //首行缩进
                              'italic', //斜体
                              'underline', //下划线
                              //'simpleupload', //单图上传
                              //'inserttable', //插入表格
                              'link', //超链接
                              'removeformat',//清除格式
                              'huodong',

                ]
	          ]
	      });

	      $scope.submit = function () {
	          var content = activeEditor.getContent();
	          if (content) {
	              $scope.btnInfo = '提交中...';
	              $scope.btnState = true;
	              var m = {};
	              m.remark = content;
	              m.activityid = $scope.id;
	              $.ajax({
	                  type: 'post',
	                  url: '/iBase4J-SYS-Web/activityStyle/updateActivityStyle',
	                  contentType: 'application/json;charset=UTF-8',
	                  data: angular.toJson(m)
	              }).then(function (result) {
	                  if (result.httpCode == 200) {
	                      tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                          history.go(-1);
	                      });

	                  } else {

	                      $scope.btnInfo = '确定';
	                      $scope.btnState = false;
	                      alertDialog(result.msg, 2);
	                  }
	                  $scope.$apply();
	              });
	          } else {
	              layer.alert('活动风采不能为空');
	          }
	      }

	      $scope.cancel = function () {
	      	layer.confirm('您确认放弃本次编辑吗？' ,function (index) {
		     		layer.close(index);
		     		history.go(-1);
		     	})
	      }

	  }])