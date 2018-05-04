'use strict';

angular.module('app')
	.controller('meetingRecordController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {


	      $scope.id = $state.params.id;
	      $scope.qdShow = true; // 用户为管理员时显示
	      $scope.qdUserList = []; // 签到人员详情列表数据
	      $scope.record = {};
	      $scope.title = '填写备注';
	      $scope.btnInfo = '提交备注';
	      $scope.btnState = false;


	      getMeetingInfo($scope.id);

	      validate();
	      /*  获取详情 */
	      function getMeetingInfo(id) {
	          $.ajax({
	              type: 'PUT',
	              url: '/iBase4J-SYS-Web/sysMeeting/read/remarkPrer',
	              data: angular.toJson({ id: Number($scope.id) })
	          }).then(function (result) {

	              if (result.httpCode == 200) {
	                  $scope.meetingInfo = result.data;
	                  // $scope.record.missue = $scope.meetingInfo.missue;
	                  // $scope.record.remark = $scope.meetingInfo.remark;
	                  // if (result.data.mcontent != '') {
	                  //     myEditor.ready(function () {//编辑器初始化完成再赋值  
	                  //         myEditor.setContent(result.data.mcontent);  //赋值给UEditor  
	                  //     });
	                  // }
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
	                  $scope.applyers = '';
	                  if (result.data.applyers && result.data.applyers.length > 0) {
	                      $scope.applyers = result.data.applyers.join(',');
	                  }
	                  //if (result.data.notherepersons != '') {
	                  //    //notherepersonsEditor.ready(function () { 
	                  //    //    notherepersonsEditor.setContent(result.data.notherepersons);  
	                  //    //});
	                  //} else if (result.data.notherepersons == '' && result.data.notHerePersonlist != '') {
	                  //    var html = '';
	                  //    angular.forEach(result.data.notHerePersonlist, function (item, i) {
	                  //        html += item.username + ' - ' + item.duty + '<br/>';
	                  //    })
	                  //    console.log(html)
	                  //    //	notherepersonsEditor.ready(function () { 
	                  //    //    notherepersonsEditor.setContent(html);  
	                  //    //});
	                  //}
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
	              if (result.httpCode == 200) {
	                  $scope.personList = result.data;
	              } else {
	                  alertDialog(result.msg, 2);
	              }

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
	      var myEditor = UE.getEditor("myEditor", { //会议内容
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

	      //var notherepersonsEditor = UE.getEditor("notherepersonsEditor", { //缺席人
	      //    topOffset: 0,
	      //    autoFloatEnabled: false,
	      //    autoHeightEnabled: false,
	      //    wordCount: false,
	      //    autotypeset: {
	      //        removeEmptyline: true
	      //    },
	      //    toolbars: [
	      //  				[
	      //  					'indent', //首行缩进
	      //  					'italic', //斜体
	      //  					'underline', //下划线
	      //  					//'inserttable', //插入表格
	      //  					'removeformat',//清除格式
	      //  					'huodong',

	      //  				]
	      //    ]
	      //});
	      //百度编辑器
	      var missueEditor = UE.getEditor("missueEditor", { //议定事项
	          topOffset: 0,
	          autoFloatEnabled: false,
	          autoHeightEnabled: false,
	          wordCount: false,
	          autotypeset: {
	              removeEmptyline: true
	          },
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
	          if ($scope.record.remark == "" && $scope.record.missue == "") {
	              history.go(-1);
	          } else {
	              if (confirm('确定退出编辑？')) {
	                  history.go(-1);
	              }
	          }
	      }
	      /*  编辑 END */

	      // 表单验证
	      function validate() {
	          jQuery('form').validate({
	              rules: {
	                  remark: { maxlength: 1024 },
	                  missue: { maxlength: 1000 },

	              },
	              messages: {
	                  remark: { maxlength: '长度不能超过1024个字符' },
	                  missue: { maxlength: '长度不能超过1000个字符' },

	              },
	              submitHandler: function () {
	                  submit();
	              }
	          })
	      }
	      // 提交
	      var submit = function () {
	          $scope.record.remark = remarkEditor.getContent();
	          $scope.record.missue = missueEditor.getContent();
	          //$scope.record.notherepersons = notherepersonsEditor.getContent();

	          if ($scope.record.remark == "" && $scope.record.missue == "") {
	              alertDialog("没有可提交的数据", 2);

	          } else {
	              // var html = myEditor.getContent();
	              // $scope.record.mcontent = $(html).text();
	              $scope.record.id = $scope.id;
	              $scope.btnInfo = '提交中...';
	              $scope.btnState = true;
	              $.ajax({
	                  type: 'post',
	                  url: '/iBase4J-SYS-Web/sysMeeting/update/remark',
	                  data: angular.toJson($scope.record)
	              }).then(function (result) {

	                  if (result.httpCode == 200) {
	                      tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                          $state.go('main.life.meeting');
	                      });

	                  } else {
	                      $scope.btnInfo = '提交备注';
	                      $scope.btnState = false;
	                      alertDialog(result.msg, 2);
	                  }
	              })

	          }

	      }


	  }])