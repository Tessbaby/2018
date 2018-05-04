'use strict';

angular.module('app')
	.controller('baseInfoAddController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {

	      $scope.record = {};
	      $scope.btnInfo = '提交';
	      $scope.btnState = false;

	      validate();
	      var userId = Number($state.params.userId);
	      var type = Number($state.params.type);
	      console.log("baseInfoAdd userId=" + userId);

	      if (userId) {
	          $scope.title = '编辑';
	          getModel(userId);
	      } else {
	          $scope.title = '提交';
	      }
	      switch (type) {
	          //党员
	          case 5:
	              $scope.url = '/iBase4J-SYS-Web/user';
	              console.log("党员");
	              break;
	              //入党申请
	          case 1:
	              $scope.url = '/iBase4J-SYS-Web/user/apply/updateApply';
	              console.log("入党申请");
	              break;
	              //积极分子
	          case 2:
	              $scope.url = '/iBase4J-SYS-Web/user/active/updateActive';
	              console.log("积极分子");
	              break;
	          default:

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


	      //------------------------------上传图片处理----------------------
	      $scope.imgData = [];
	      $scope.imgUpFlag = true;
	      //自定义上传标题图
	      var imgArrType = ['image/png', 'image/jpg', 'image/jpeg'];
	      $scope.imgSrc = $rootScope.defaultAvatar;

	      $scope.img_upload = function (evt) {    //单次提交图片的函数
	          $scope.reader = new FileReader();  //创建一个FileReader接口
	          var fileInfo = evt.currentTarget.files[0];

	          $scope.reader.readAsDataURL(fileInfo); //FileReader的方法，把图片转成base64
	          if ($.inArray(fileInfo.type, imgArrType) == -1) {//判断图片类型
	              alert("不支持该图片类型上传，请重新选择！");
	              fileInfo = {};
	          } else if (fileInfo.size > 2 * 1024 * 1024) {
	              alert("大小不超过2M!");
	              fileInfo = {};
	          } else {
	              $scope.reader.onload = function (ev) {
	                  $scope.$apply(function () {
	                      $scope.imgSrc = ev.target.result;
	                      $scope.imgData.push({
	                          file: ev.target.result,
	                          filename: fileInfo.name
	                      });

	                  });
	              };
	          }
	      };
	      angular.element(document.querySelector('#uploadImg')).on('change', $scope.img_upload);
	      $('.upload-pic-box a').click(function () {
	          $('#uploadImg').click();
	      });

	      $scope.img_del = function (key) {  //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
	          $scope.imgData = [];
	          $scope.imgSrc = 'res/img/np.png';
	          $('#uploadImg').val('');
	          $scope.record.avatar = "";
	          //$("#user_form")[0].reset();
	      };
	      //---------------------------------------------------------------------------

	      // 日期
	      function setDate() {
	          //加入其他党团日期
	          laydate({
	              elem: '#otherPartyDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.record.otherPartyDate = datas;

	              }
	          });
	          //出生日期
	          laydate({
	              elem: '#birthDay',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.record.birthDay = datas;

	              }
	          });
	          //参加工作日期
	          laydate({
	              elem: '#worktdate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.record.worktdate = datas;
	              }

	          });
	      }
	      setDate();
	      //获取党员详情
	      function getModel(id) {
	          // 文件流转详情
	          $.ajax({
	              type: 'PUT',
	              url: '/iBase4J-SYS-Web/user/read/detail',
	              data: angular.toJson({ id: id })
	          }).then(function (result) {
	              $scope.loading = false;
	              if (result.httpCode == 200) {
	                  $scope.record = result.data;
	                  $scope.imgSrc = $scope.record.avatar;
	                  //个人简介
	                  if ($scope.record.remark != "") {
	                      myEditor.ready(function () {//编辑器初始化完成再赋值  
	                          myEditor.setContent($scope.record.remark);  //赋值给UEditor  
	                      });
	                  }
	                  /*//所属部门
	                  $('#deptId').attr('value', $scope.record.deptName);
	                  $('#treeids').attr('value', $scope.record.deptId);
	                  //籍贯
	                  $('#cityId').attr('value', $scope.record.cityName);
	                  $('#cityTreeids').attr('value', $scope.record.cityId);
	                  //最高学位
	                  $('#degree').attr('value', $scope.record.degreeName);
	                  $('#degreeTreeids').attr('value', $scope.record.degree);
	                  //最高学历
	                  $('#education').attr('value', $scope.record.educationName);
	                  $('#educationTreeids').attr('value', $scope.record.education);*/

	              } else {
	                  // $scope.msg = result.msg;
	                  alertDialog(result.msg, 2);
	              }

	              $scope.$apply();
	          });
	      }

	      function getSexList() {
	          var infoParam = {
	              enable: 1,
	              type: "SEX"
	          };
	          $.ajax({
	              type: 'PUT',
	              url: '/iBase4J-SYS-Web/dic/read/list',
	              dataType: 'json',
	              //async: false,
	              contentType: 'application/json;charset=UTF-8',
	              data: angular.toJson(infoParam)
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.sexList = result.data;

	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });

	      }
	      $scope.dropdowmList = {};
	      $scope.dropdowmList.cityList = [];
	      getSexList();

	      var zNodes, cityNodes, degreeNodes, educationNodes;
	      getDropdowmList();

	      //获取页面下拉框配置
	      function getDropdowmList() {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/user/getAllSelect',
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.dropdowmList = result.data;
	                  //console.log(result);
	                  // debugger;
	                  zNodes = $scope.dropdowmList.deptList;
	                  $.fn.zTree.init($('#treeDemo'), setting, zNodes);
	                  /* 籍贯 */
	                  cityNodes = $scope.dropdowmList.cityList;
	                  $.fn.zTree.init($('#cityTreeDemo'), citySetting, cityNodes);
	                  /* 最高学位 */
	                  degreeNodes = $scope.dropdowmList.degreeList;
	                  $.fn.zTree.init($('#degreeTreeDemo'), degreeSetting, degreeNodes);
	                  /* 最高学历 */
	                  educationNodes = $scope.dropdowmList.educationList;
	                  $.fn.zTree.init($('#educationTreeDemo'), educationSetting, educationNodes);

	                  $scope.$apply();
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });
	      }

	      /*********************** 所属组织 *******************************/
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
	          $scope.record.deptName = treeNode.codeText;
	          $scope.record.deptId = treeNode.id;
	          $scope.$apply();
	      }

	      $scope.showMenu = function () {
	          var idObj = $('#deptId');
	          var idOffset = $('#deptId').offset();
	          $('#menuContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      /********************** END ***********************/

	      /************************ 籍贯 *********************/

	      var citySetting = {
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
	              onClick: onCityClick
	          }
	      };
	      function onCityClick(e, treeId, treeNode) { // 选择元素触发
	          $scope.record.cityName = treeNode.codeText;
	          $scope.record.cityId = treeNode.id;
	          $scope.$apply();
	      }

	      $scope.showCityMenu = function () {
	          var idObj = $('#cityId');
	          var idOffset = $('#cityId').offset();
	          $('#cityMenuContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      /****************************** END ***************************/

	      /************************ 最高学位 *********************/

	      var degreeSetting = {
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
	              onClick: onDegreeClick
	          }
	      };
	      function onDegreeClick(e, treeId, treeNode) { // 选择元素触发
	          $scope.record.degreeName = treeNode.codeText;
	          $scope.record.degree = treeNode.id;
	          $scope.$apply();
	      }

	      $scope.showDegreeMenu = function () {
	          var idObj = $('#degree');
	          var idOffset = $('#degree').offset();
	          $('#degreeMenuContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      /****************************** END ***************************/

	      /************************ 最高学历 *********************/

	      var educationSetting = {
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
	              onClick: onEducationClick
	          }
	      };
	      function onEducationClick(e, treeId, treeNode) { // 选择元素触发
	          $scope.record.educationName = treeNode.codeText;
	          $scope.record.education = treeNode.id;
	          $scope.$apply();
	      }

	      $scope.showEducationMenu = function () {
	          var idObj = $('#education');
	          var idOffset = $('#education').offset();
	          $('#educationMenuContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      /****************************** END ***************************/

	      $scope.hideMenu = function () {
	          $('#menuContent').fadeOut('fast');
	          $('#cityMenuContent').fadeOut('fast');
	          $('#degreeMenuContent').fadeOut('fast');
	          $('#educationMenuContent').fadeOut('fast');
	          $('body').unbind('mousedown', onBodyDown);
	      }

	      function onBodyDown(event) {
	          // if (!event.target.id == 'menuContent' || $(event.target).parents('#menuContent').length == 0) {
	          //     if (event.target.id != 'deptId' || event.target.id != 'cityId') {
	          //         $scope.hideMenu();
	          //     }
	          // }
	          var e = e || window.event; //浏览器兼容性   
	          var elem = e.target || e.srcElement;
	          while (elem) { //循环判断至跟节点，防止点击的是div子元素   
	              if (elem.id && elem.id == 'menuContent' || elem.id == 'cityMenuContent' || elem.id == 'degreeMenuContent' || elem.id == 'educationMenuContent') {
	                  return;
	              }
	              elem = elem.parentNode;
	          }
	          $scope.hideMenu();
	      }



	      $scope.submit = function () {


	          if ($scope.imgData.length > 0) {
	              $scope.imgUpFlag = false;
	              $.ajax({
	                  type: 'POST',
	                  url: $rootScope.upFileUrl,
	                  async: false,
	                  contentType: 'application/json;charset=UTF-8',
	                  data: angular.toJson($scope.imgData)
	              }).then(function (result) {
	                  // var resultNew = $.parseJSON(result);
	                  var resultNew = result;
	                  if (resultNew && resultNew.httpCode == 200) {//成功
	                      $scope.record.avatar = resultNew.data[0].fileUrlPath;

	                      $scope.imgUpFlag = true;

	                  } else if (resultNew && resultNew.httpCode == 400) {
	                      $scope.imgUpFlag = false;
	                      alertDialog("上传图片失败", 2);
	                  }
	              });
	          }
	          if ($scope.imgUpFlag) {
	              $scope.$apply();
	              $scope.record.remark = myEditor.getContent();
	              var postData = angular.copy($scope.record);

	             
	              if (userId) postData.userId = userId;
	              if (!postData.deptId) {
	                  alertDialog("所属组织不能为空", 2);

	                  return;
	              } else if (!postData.birthDay) {
	                  alertDialog("出生日期不能为空", 2);
	                  return;
	              }
	              //else if (!postData.rddate) {
	              //    alertDialog("入党日期不能为空", 2);
	              //    return;
	              //}

	              $scope.btnInfo = '提交中...';
	              $scope.btnState = true;
	              console.log(angular.toJson(postData));
	              $.ajax({
	                  type: 'post',
	                  url: $scope.url,
	                  data: angular.toJson(postData)
	              }).then(function (result) {
	                  console.log(result);
	                  if (result.httpCode == 200) {
	                      tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                          $state.go('main.partyners.update', { type: type, userId: result.data });
	                      });
	                  } else {
	                      alertDialog(result.msg, 2);
	                  }
	                  $scope.btnInfo = '添加';
	                  $scope.btnState = false;
	                  $scope.$apply();
	              });
	          }
	      }



	      // 表单验证
	      function validate() {
	          var validator = jQuery('form').validate({
	              ignore: "",
	              rules: {
	                   userCode: {
	                       //required: true,
	                       maxLengthB: [50]
	                   },
	                  userName: {
	                      required: true,
	                      maxLengthB: [10]
	                  },
	                  birthDay: { required: true, date: true },
	                  worktdate: { date: true },
	                  zzdate: { date: true },
	                  deptId: { required: true, },
	                  phone: { required: true, isMobile: true }, // 手机号
	                  sex: { required: true },

	                  //wxNumber: { maxlength: 60 },
	                  identifiesNumber: { isIdCardNo: true }, // 身份证号
	                  hkPolice: { maxLengthB: [50] },
	                  address: { maxLengthB: [60] },
	                  unitDuty: { maxlength: 50 },
	                  // dnzw: { required: true, },
	                  email: { maxLengthB: [60], email: true },
	                  remark1: { maxLengthB: [1000] },
	                  remark2: { maxLengthB: [1000] },
	                  remark3: { maxLengthB: [1000] },
	                  myEditor: {
	                      maxLengthB: [1024]

	                  },
	                  age: { digits: true },
	                  partyMoney: { amtCheck: true }
	              },
	              messages: {
	                   userCode: {
	                       //required: "党员编号不能为空",
	                       maxLengthB: "党员编号长度不能超过50个字符"
	                   },
	                  unitDuty: { maxlength: '长度不能超过50个字' },
	                  userName: {
	                      required: '请填写姓名',
	                      maxLengthB: '长度不能超过10个字符'
	                  },
	                  birthDay: { required: '出生日期为必填', date: '日期格式不正确' },
	                  worktdate: { date: '日期格式不正确' },
	                  zzdate: { date: '日期格式不正确' },
	                  deptId: { required: '请选择所属组织' },
	                  phone: { required: '请填写手机号码' },
	                  sex: { required: '请选择性别' },
	                  // dnzw: { required: '请选择党内职务' },
	                  //wxNumber: { maxlength: '微信号长度不能超过60个字符' },
	                  hkPolice: { maxLengthB: '长度不能超过50个字符' },
	                  address: { maxLengthB: '长度不能超过60个字符' },
	                  email: { maxLengthB: '长度不能超过[60]个字符', email: '请输入正确的邮箱' },
	                  remark: { maxLengthB: '长度不能超过60个字符' },
	                  myEditor: {
	                      maxLengthB: "简介不得超过{0}个字符"

	                  },
	                  age: { digits: '请输入正确的数字' },
	                  // partyMoney: { amtCheck: 'aa' }
	              },
	              submitHandler: function () {
	                  $scope.submit();
	              }
	          })
	          validator.focusInvalid = function () {
	              if (this.settings.focusInvalid) {
	                  try {
	                      var toFocus = $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []);
	                      if (toFocus.is("textarea")) {
	                          UE.getEditor('myEditor').focus()
	                      } else {
	                          toFocus.filter(":visible").focus();
	                      }
	                  } catch (e) {
	                  }
	              }
	          }
	      }

	      $scope.cancel = function () {
	      	layer.confirm('您确认放弃本次编辑吗？' ,function (index) {
		     		layer.close(index);
		     		$state.go('main.partyner.list', {type: type});
		     	})
	      }

	      // // 编辑时获取详情
	      // function activate(userId) {
	      //     var id = parseInt(userId)
	      //     $.ajax({
	      //         type: 'put',
	      //         url: '/iBase4J-SYS-Web/user/read/detail',
	      //         dataType: 'json',
	      //         contentType: 'application/json;charset=UTF-8',
	      //         data: angular.toJson({ id: id })
	      //     }).then(function (result) {
	      //         console.log(result);
	      //         if (result.httpCode == 200) {
	      //             $scope.record = result.data;
	      //             if ($scope.record.remark != "") {
	      //                 myEditor.ready(function () {//编辑器初始化完成再赋值  
	      //                     myEditor.setContent($scope.record.remark);  //赋值给UEditor  
	      //                 });
	      //             }
	      //             $('#deptId').attr('value', $scope.record.deptName);
	      //             $('#treeids').attr('value', $scope.record.deptId);
	      //             // console.log($scope.record.sex)
	      //         } else {
	      //             alertDialog(result.msg, 2);
	      //         }
	      //         $scope.$apply();
	      //     });
	      // }

	      // $scope.cancel = function () {
	      // 	layer.confirm('您确认放弃本次编辑吗？' ,function (index) {
	      // 		layer.close(index);
	      // 		$state.go('main.partyner');
	      // 	})
	      // }

	      // // 比较时间先后 a > b;
	      // function diffCompare(aTime, aTxt, bTime, bTxt) {
	      //     var d1 = new Date(aTime.replace(/\-/g, "\/"));
	      //     var d2 = new Date(bTime.replace(/\-/g, "\/"));
	      //     if (aTime != '' && bTime != '' && d1 >= d2) {
	      //         layer.alert(aTxt + '不能超过' + bTxt + '或与' + bTxt + '相同', { icon: -1 })
	      //         // return false;
	      //         dateState = false;
	      //     }
	      // }
	      // // 与现在比较
	      // function curCompare(time) {
	      //     var current = new Date();
	      //     var _time = time;
	      //     var d1 = new Date(_time.replace(/\-/g, "\/"));
	      //     if (_time != "" && current != "" && d1 > current) {
	      //         layer.alert('不能超过今天', { icon: -1 })
	      //         // return false;
	      //         dateState = false;
	      //     }
	      // }
	  }]);