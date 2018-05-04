'use strict';

angular.module('app')
	.controller('activityAddController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {
	      console.log($rootScope.upFileUrl)

	      if ($state.includes('**.lifes.activityAdd')) {
	          $scope.title = '发布活动';
	          $scope.openSign = false;
	          $scope.isEnd = false;
	      } else if ($state.includes('**.lifes.activityUpdate')) {
	          $scope.title = '编辑活动';
	          $scope.id = $state.params.id;
	          getDetail($scope.id);
	      }
	      $scope.btnInfo = '确定';
	      $scope.btnState = false;
	      $scope.isOpenShow = true;
	      $scope.type = $state.params.typeId;
	      $scope.activity = {};
	      $scope.activity.type = $scope.type; // 获取活动类型
	      validate();

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

	      function getDetail(id) {
	          $.ajax({
	              type: 'put',
	              url: '/iBase4J-SYS-Web/activity/detail',
	              contentType: 'application/json;charset=UTF-8',
	              data: angular.toJson({ id: id })
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  var data = angular.copy(result.data);
	                  if (data.remark) {
	                      var ue = UE.getEditor('remark');
	                      ue.ready(function () {
	                          remark.setContent(data.remark)
	                      })
	                  };
	                  if (data.activityStyle) {
	                      var ue = UE.getEditor('activeEditor');
	                      ue.ready(function () {
	                          activeEditor.setContent(data.activityStyle);
	                      })

	                  }
	                  data.allowsign = data.allowsign != 0 ? true : false;
	                  if (data.allowsign) {
	                      $scope.openSign = true;
	                      data.allowsign = result.data.allowsign;
	                  }
	                  data.isPublic = data.isPublic == 1 ? true : false;
	                  data.remandtop = data.remandtop == 1 ? true : false;
	                  //$scope.coverSrc = data.titleimg ? data.titleimg : 'res/img/np.png';
	                  //$scope.listSrc = data.listimg ? data.listimg : 'res/img/np.png';
	                  $scope.myCroppedImage = data.titleimg;
	                  $scope.listCroppedImage = data.listimg;
	                  $scope.activity = data;
	                  //console.log(data);
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	              $scope.$apply();
	          });
	      }

	      /*********************************************** 配置时间 *****************************************/

	      //function timeStamp2String(time) {
	      //    var datetime = new Date();
	      //    datetime.setTime(time);
	      //    var year = datetime.getFullYear();
	      //    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
	      //    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
	      //    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
	      //    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
	      //    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
	      //    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
	      //}
	      var start = {
	          elem: '#begintime',
	          format: 'YYYY/MM/DD hh:mm:00',
	          //min: laydate.now(0, "YYYY/MM/DD hh:mm:00"), //设定最小日期为当前日期
	          max: '2099-06-16 23:59', //最大日期
	          istime: true,
	          issure: true, //是否显示确认
	          festival: true, //是否显示节日
	          istoday: false,
	          isclear: false,
	          choose: function (dates) {
	              //var time = new Date(dates);
	              //time.setMinutes(time.getMinutes() + 5, time.getSeconds(), 0);
	              //end.min = timeStamp2String(time); //开始日选好后，重置结束日的最小日期
	              end.start = dates;		//将结束日的初始值设定为开始日
	              $scope.activity.begintime = dates;
	              //if ($scope.activity.endtime) {
	              //    curCompare2(dates, $scope.activity.endtime) 		// 判断开始时间和当前时间
	              //}
	              //signend.max = dates; 	//设置报名截止时间最大为开始时间
	          }
	      };
	      var end = {
	          elem: '#endtime',
	          format: 'YYYY/MM/DD hh:mm:00',
	          //min: laydate.now(0, "YYYY/MM/DD hh:mm:00"),
	          max: '2099-06-16 23:59',
	          istime: true,
	          istoday: false,
	          choose: function (dates) {
	              //start.max = dates; //结束日选好后，重置开始日的最大日期
	              $scope.activity.endtime = dates;
	              //if ($scope.activity.begintime) {
	              //    curCompare2($scope.activity.begintime, dates) 		// 判断开始时间和当前时间
	              //}
	          }
	      };
	      var signend = {
	          elem: '#signendtime',
	          format: 'YYYY/MM/DD hh:mm:00',
	          //min: laydate.now(0, "YYYY/MM/DD hh:mm:00"),
	          max: '2099-06-16 23:59',
	          istime: true,
	          istoday: false,
	          choose: function (dates) {
	              $scope.activity.signendtime = dates;
	          }
	      };
	      laydate(start);
	      laydate(end);
	      laydate(signend);
	      /*********************************************** 配置时间END **************************************/


	      /*********************************************** 图片上传 *****************************************/

	      // 图片上传 - 封面图
	      $scope.coverData = [];
	      $scope.coverUpFlag = true;
	      //自定义上传标题图
	      $scope.reader = new FileReader();  //创建一个FileReader接口
	      $scope.coverSrc = 'res/img/np.png';
	      $scope.myImage = '';
	      $scope.myCroppedImage = '';

	      $scope.cover_upload = function (evt) {    //单次提交图片的函数
	          var fileInfo = evt.currentTarget.files[0];
	          var index = fileInfo.name.indexOf('.') + 1;
	          var coverType = fileInfo.name.substr(index, fileInfo.name.length - 1);
	          if (coverType.toUpperCase() == 'PNG' || coverType.toUpperCase() == 'JPG' || coverType.toUpperCase() == 'JPEG') {

	              $scope.guid = (new Date()).valueOf();
	              $scope.reader.readAsDataURL(fileInfo); //FileReader的方法，把图片转成base64
	              $scope.reader.onload = function (ev) {
	                  $scope.$apply(function () {
	                      $scope.coverSrc = ev.target.result;
	                      $scope.myImage = ev.target.result;
	                      $scope.coverData[0] = {
	                          file: ev.target.result,
	                          filename: fileInfo.name
	                      };
	                  });
	              };
	          } else {
	              layer.msg('文件格式错误');
	              return false;
	          }
	      };
	      angular.element(document.querySelector('#uploadCover')).on('change', $scope.cover_upload);
	      $('.upload-pic-box a').click(function () {
	          $('#uploadCover').click();
	      });

	      $scope.cover_del = function (key) {  //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
	          $scope.coverData = [];
	          $scope.coverSrc = 'res/img/np.png';
	          $scope.activity.titleimg = '';
	          $scope.myImage = '';
	          $scope.myCroppedImage = '';
	      };

	      // 图片上传 - 列表图
	      $scope.listData = [];
	      $scope.listUpFlag = true;
	      //自定义上传标题图
	      $scope.reader2 = new FileReader();  //创建一个FileReader接口
	      $scope.listSrc = '';
	      $scope.listCroppedImage = '';

	      $scope.list_upload = function (evt) {    //单次提交图片的函数
	          var fileInfo2 = evt.currentTarget.files[0];
	          var index2 = fileInfo2.name.indexOf('.') + 1;
	          var listType = fileInfo2.name.substr(index2, fileInfo2.name.length - 1);
	          if (listType.toUpperCase() == 'PNG' || listType.toUpperCase() == 'JPG' || listType.toUpperCase() == 'JPEG') {

	              $scope.guid2 = (new Date()).valueOf();
	              $scope.reader2.readAsDataURL(fileInfo2); //FileReader的方法，把图片转成base64
	              $scope.reader2.onload = function (ev) {
	                  $scope.$apply(function () {
	                      $scope.listSrc = ev.target.result;
	                      $scope.listData.push({
	                          file: ev.target.result,
	                          filename: fileInfo2.name
	                      });
	                  });
	              };
	          } else {
	              layer.msg('文件格式错误');
	              return false;
	          }
	      };
	      angular.element(document.querySelector('#uploadList')).on('change', $scope.list_upload);
	      $('.upload-pic-box2 a').click(function () {
	          $('#uploadList').click();
	      });

	      $scope.list_del = function (key) {  //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
	          $scope.listData = [];
	          $scope.listSrc = 'res/img/np.png';
	          $scope.activity.listimg = '';
	          $scope.listCroppedImage = '';
	      };

	      /*********************************************** 图片上传 END *************************************/


	      /*********************************************** 百度编辑器设置 *****************************************/

	      //活动描述
	      var remark = UE.getEditor("remark", {
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
                               'insertvideo', //视频                          
                             'simpleupload', //单图上传
                             'insertimage', //多图上传
                              'link', //超链接
                              'removeformat',//清除格式
                              'huodong',

                ]
	          ]
	      });

	      /*********************************************** 百度编辑器设置 END *************************************/

	      // 判断是否允许报名
	      $scope.signChange = function () {
	          if ($scope.activity.allowsign) {
	              $scope.openSign = true;
	              $scope.activity.allowsign = 1; // 开启时默认为1
	          } else {
	              $scope.openSign = false;
	              $scope.activity.allowsign = 0;
	          }
	      }

	      // 表单验证
	      function validate() {
	          jQuery('form').validate({
	              rules: {
	                  aname: { required: true, maxlength: 500 },
	                  begintime: { required: true, date: true },
	                  endtime: { required: true, date: true },
	                  place: { required: true, maxlength: 200 },
	                  mcontent: { maxlength: 1000 }

	              },
	              messages: {
	                  aname: { required: '请填写活动名称', maxlength: '长度不能超过500个字符' },
	                  begintime: { required: '开始时间为必填', date: '日期格式不正确' },
	                  endtime: { required: '结束时间为必填', date: '日期格式不正确' },
	                  place: { required: '请填写活动地点', maxlength: '活动地点不能超过200字' },
	                  mcontent: { maxlength: '不能超过1000字' }
	              },
	              submitHandler: function () {
	                  submit();
	              }
	          })
	      }

	      var submit = function () {
	          if ($scope.coverData.length > 0) {
	              $scope.coverUpFlag = false;
	              $.ajax({
	                  type: 'POST',
	                  url: $rootScope.upFileUrl,
	                  async: false,
	                  contentType: 'application/json;charset=UTF-8',
	                  data: angular.toJson([{ file: $scope.myCroppedImage, filename: $scope.coverData[0].filename }])

	              }).then(function (result) {
	                  var resultNew = result;
	                  if (resultNew && resultNew.httpCode == 200) {//成功
	                      $scope.activity.titleimg = resultNew.data[0].fileUrlPath;
	                      $scope.coverUpFlag = true;
	                  } else if (resultNew && resultNew.httpCode == 400) {
	                  }
	              });
	          }
	          if ($scope.listData.length > 0) {
	              $scope.listUpFlag = false;
	              $.ajax({
	                  type: 'POST',
	                  url: $rootScope.upFileUrl,
	                  async: false,
	                  contentType: 'application/json;charset=UTF-8',
	                  data: angular.toJson([{ file: $scope.listCroppedImage, filename: $scope.listData[0].filename }])
	              }).then(function (result) {
	                  var resultNew = result;
	                  if (resultNew && resultNew.httpCode == 200) {//成功
	                      $scope.activity.listimg = resultNew.data[0].fileUrlPath;
	                      $scope.listUpFlag = true;
	                  } else if (resultNew && resultNew.httpCode == 400) {
	                  }
	              });
	          }
	          if ($scope.coverUpFlag && $scope.listUpFlag) {
	              saveData();
	          }
	      }

	      var saveData = function () {

	          var m = angular.copy($scope.activity);
	          m.isPublic = m.isPublic ? 1 : 2;   // 是否公开
	          m.remandtop = m.remandtop ? 1 : 0; // 是否置顶
	          if (!m.allowsign) { m.allowsign = 0 }// 不允许报名时
	          m.remark = remark.getContent();
	          if ($scope.isEnd) { m.activityStyle = activeEditor.getContent(); }

	          /*非空判断 validate不起作用的项*/
	          if (m.begintime == '' || m.begintime == undefined) {
	              layer.alert('开始时间不能为空');
	              return false;
	          }
	          if (m.endtime == '' || m.endtime == undefined) {
	              layer.alert('结束时间不能为空');
	              return false;
	          }
	          if (m.endtime <= m.begintime) {
	              layer.alert('结束时间不能等于或小于开始时间');
	              return false;
	          }
	          if (m.allowsign!=0) {
	              if (m.signendtime > m.endtime) {
	                  layer.alert('活动截止报名时间不能大小于结束时间');
	                  return false;
	              }
	          }
	          if (m.listimg == '' || m.listimg == undefined) {
	              layer.alert('列表图片不能为空');
	              return false;
	          }
	          if (m.allowsign != 0 && (m.signendtime == '' || m.signendtime == undefined)) {
	              layer.alert('报名截止时间不能为空');
	              return false;
	          }
	          if (m.remark == '') {
	              layer.alert('活动描述不能为空');
	              return false;
	          }

	          $scope.btnInfo = '提交中...';
	          $scope.btnState = true;
	          //console.log(m);
	          $.ajax({
	              type: 'POST',
	              url: '/iBase4J-SYS-Web/activity/updateActivity',
	              contentType: 'application/json;charset=UTF-8',
	              data: angular.toJson(m)
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                      $state.go('main.life.activity', { typeId: $scope.type });
	                  });
	              } else {
	                  $scope.btnInfo = '确定';
	                  $scope.btnState = false;
	                  alertDialog(result.msg, 2);
	              }
	              $scope.$apply();
	          });

	      }

	      $scope.cancel = function () {
	          layer.confirm('您确认放弃本次编辑吗？', function (index) {
	              layer.close(index);
	              $state.go('main.life.activity', { typeId: $scope.type });
	          })
	      }

	      // 与现在比较 开始时间和结束时间都大于当前时间时 不能添加活动风采
	      /*function curCompare(time) {
            var current = new Date();
            var _time = time;
            var d1 = new Date(_time.replace(/\-/g, "\/"));
            if(_time != "" && current != "") {
                if(d1 > current) {
                    // 开始时间大于当前时间时
                  $scope.isEnd = false;
                } else {
                    $scope.isEnd = true;
                }
              $scope.$apply()
            }
          }*/
	      function curCompare2(time1, time2) {
	          var current = new Date();
	          var d1 = new Date(time1.replace(/\-/g, "\/")); // 开始时间
	          var d2 = new Date(time2.replace(/\-/g, "\/")); // 结束时间

	          if (time1 != "" && time2 != "" && current != "") {
	              if (d1 > current && d2 > current) { // 未开始
	                  $scope.isEnd = false;
	                  $scope.isOpenShow = true;
	              } else if (d1 < current && d2 > current) { // 进行中
	                  $scope.isEnd = false;
	                  $scope.isOpenShow = true;
	              } else { //已结束
	                  $scope.isEnd = true;
	                  $scope.isOpenShow = false;
	              }
	              $scope.$apply()
	          }
	      }
	  }])