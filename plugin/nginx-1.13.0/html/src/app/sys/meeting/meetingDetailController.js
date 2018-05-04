'use strict';

angular.module('app')
	.controller('meetingDetailController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {




	      $scope.id = $state.params.id;

	      $scope.title = '详情';


	      getMeetingInfo($scope.id);
	      getPersonList();

	      /*  获取详情 */
	      function getMeetingInfo(id) {
	          $.ajax({
	              type: 'PUT',
	              url: '/iBase4J-SYS-Web/sysMeeting/read/detail',
	              data: angular.toJson({ id: $scope.id })
	          }).then(function (result) {

	              if (result.httpCode == 200) {
	                  $scope.meetingInfo = result.data;
	                  if ($scope.meetingInfo.notherepersons == '' && $scope.meetingInfo.notHerePersonlist != '') {
	                      var html = '';
	                      angular.forEach($scope.meetingInfo.notHerePersonlist, function (item, i) {
	                          html += item + '<br/>';
	                      })
	                      $scope.meetingInfo.notherepersons = html;
	                  }
	                  if (result.data.mcontent != '') {
	                      myEditor.ready(function () {//编辑器初始化完成再赋值  
	                          myEditor.setContent(result.data.mcontent);  //赋值给UEditor  
	                      });
	                  }
	                  if (result.data.missue != '') {
	                      missueEditor.ready(function () {
	                          missueEditor.setContent(result.data.missue);
	                      });
	                  }
	                  if (result.data.remark != '') {
	                      remarkEditor.ready(function () {
	                          remarkEditor.setContent(result.data.remark);
	                      });
	                  }
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	              $scope.$apply();
	          })
	      }

	      function getPersonList() {
	          $.ajax({
	              type: 'PUT',
	              url: '/iBase4J-SYS-Web/sysMeetingUser/read/list',
	              async: false,
	              data: angular.toJson({ id: $scope.id })
	          }).then(function (result) {
	              $scope.personList = result.data;
	          })
	      }

	      $scope.showDetail = function () {
	          getPersonList();
	          var html = '';
	          var qd = '';
	          var fColor = '';
	          $.each($scope.personList, function (index, item) {

	              if (item.qdstatus == -1) {
	                  qd = '未签';
	                  fColor = 'red';
	              } else if (item.qdstatus == 1) {
	                  qd = '已签';
	                  fColor = 'green';
	              } else if (item.qdstatus == 1) {
	                  qd = '迟到';
	                  fColor = 'yellow';
	              }
	              html += '<div class="form-group" style="height: 20px;">'
                                  + '<span class="col-xs-3 col-md-3 text-center" style="color:' + fColor + '">' + qd + '</span>'
                                  + '<span class="col-xs-3 col-md-3">' + (item.username ? item.username : ' ') + '</span>'
                                  + '<span class="col-xs-6 col-md-6">' + (item.duty ? item.duty : ' ') + '</span></div>'
	          })
	          layer.open({
	              type: 1, //page层
	              shade: 0.5, //遮罩透明度
	              moveType: 1, //拖拽风格，0是默认，1是传统拖动
	              shift: 1, //0-6的动画形式，-1不开启
	              area: ['550px', '300px'],
	              skin: 'layer-add',
	              content: html
	          })
	      }

	      //百度编辑器
	      var myEditor = UE.getEditor("myEditor", {
	          topOffset: 0,
	          autoFloatEnabled: false,
	          autoHeightEnabled: false,
	          wordCount: false,
	          autotypeset: {
	              removeEmptyline: true
	          },
	          readonly: true,
	          toolbars: [
                 	[
					//'source', //源代码
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

	      //百度编辑器
	      var missueEditor = UE.getEditor("missueEditor", { //议定事项
	          topOffset: 0,
	          autoFloatEnabled: false,
	          autoHeightEnabled: false,
	          wordCount: false,
	          autotypeset: {
	              removeEmptyline: true
	          },
	          readonly: true,
	          toolbars: [
							[
								//'source', //源代码
								'bold', //加粗
								'forecolor', //字体颜色
								'indent', //首行缩进
								'italic', //斜体
								'underline', //下划线
							  'insertvideo', //视频                          
                'simpleupload', //单图上传
                'insertimage', //多图上传
								//'inserttable', //插入表格
								'link', //超链接
								'removeformat',//清除格式
								'huodong',

							]
	          ]
	      });

	      // //百度编辑器
	      var remarkEditor = UE.getEditor("remarkEditor", { // 会议备注
	          topOffset: 0,
	          autoFloatEnabled: false,
	          autoHeightEnabled: false,
	          wordCount: false,
	          autotypeset: {
	              removeEmptyline: true
	          },
	          readonly: true,
	          toolbars: [
	          	[
								//'source', //源代码
								'bold', //加粗
								'forecolor', //字体颜色
								'indent', //首行缩进
								'italic', //斜体
								'underline', //下划线
							 'insertvideo', //视频                          
			                      'simpleupload', //单图上传
			                         'insertimage', //多图上传
								//'inserttable', //插入表格
								'link', //超链接
								'removeformat',//清除格式
								'huodong',

	          	]
	          ]
	      });

	      $scope.cancel = function () {
	          history.go(-1);
	      }
	      $scope.export = function () {

	          $.ajax({
	              url: '/iBase4J-SYS-Web/sysMeeting/export/meetingSingle',
	              type: 'put',
	              data: angular.toJson({ id: $scope.id })
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  alertDialog("导出成功&nbsp;<a href=" + result.data + ">点击此下载文档</a>", 1);
	              } else {
	                  alertDialog(result.msg, 2);
	              }

	          })
	      }

	  }])