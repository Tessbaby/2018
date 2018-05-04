﻿'use strict';

angular.module('app')
	.controller('RAPInfoFormController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {




	      $scope.model = {};
	      $scope.model.userId = $state.params.userId;
	      var id = Number($state.params.id);
	      console.log("奖惩信息 userid=" + $scope.model.userId);

	      validate()
	      $scope.btnInfo = '提交';
	      $scope.btnState = false;
	      getDropdowmList();
	      if (id) {
	          getModel();
	      }
	      //获取详情
	      function getModel() {
	          // 文件流转详情
	          $.ajax({
	              type: 'get',
	              url: '/iBase4J-SYS-Web/userReward/detail',
	              data: { id: id }
	          }).then(function (result) {
	              $scope.loading = false;
	              if (result.httpCode == 200) {

	                  $scope.model = result.data;
	                  $scope.myCroppedImage = $scope.model.imgUrl;
	                  //$scope.imgSrc = $scope.model.imgUrl;
	                  console.log($scope.model);


	              } else {
	                  // $scope.msg = result.msg;
	                  alertDialog(result.msg, 2);
	              }

	              $scope.$apply();
	          });
	      }
	      //------------------------------上传图片处理----------------------
	      $scope.imgData = [];
	      $scope.imgUpFlag = true;
	      $scope.myImage = '';
	      $scope.myCroppedImage = '';
	      //自定义上传标题图
	      var imgArrType = ['image/png', 'image/jpg', 'image/jpeg'];
	      $scope.imgSrc = 'res/img/np.png';
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
	                      $scope.myImage = ev.target.result;
	                      $scope.imgData[0] = {
	                          file: ev.target.result,
	                          filename: fileInfo.name
	                      };

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
	          $scope.model.imgUrl = "";
	          $scope.myImage = '';
	          $scope.myCroppedImage = '';
	      };


	      // 日期
	      function setDate() {
	          //奖惩批准日期
	          laydate({
	              elem: '#rewardApprovalDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.model.rewardApprovalDate = datas;
	              }

	          });
	          //奖惩撤销日期
	          laydate({
	              elem: '#rewardRevokeDate',
	              format: 'YYYY-MM-DD',
	              istoday: false,
	              isclear: false,
	              choose: function (datas) {
	                  $scope.model.rewardRevokeDate = datas;
	              }

	          });

	      }
	      setDate();

	      ////获取页面下拉框配置
	      function getDropdowmList() {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/userReward/getAllSelect',
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.dropdowmList = result.data;
	                  console.log(result);
	                  //原因
	                  var reasonNodes = $scope.dropdowmList.rewardReasonList;
	                  $.fn.zTree.init($('#treeReason'), setting, reasonNodes);

	                  //名称
	                  var rewardNodes = $scope.dropdowmList.rewardList;
	                  $.fn.zTree.init($('#treeRewardContent'), Rewardsetting, rewardNodes);

	                  $scope.$apply();
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });
	      }
	      //----------------------树配置-------------------------------
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

	          $scope.model.rewardReasonText = treeNode.codeText;
	          $scope.model.rewardReason = treeNode.id;
	          $scope.$apply();
	      }
	      ////----------------------树配置 end-----------------------------

	      var Rewardsetting = {
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
	              onClick: onRewardClick
	          }
	      };
	      function onRewardClick(e, treeId, treeNode) { // 选择元素触发	

	          $scope.model.rewardText = treeNode.codeText;
	          $scope.model.reward = treeNode.id;
	          $scope.$apply();
	      }
	      //function showRewardContent(e, treeId, treeNode) { // 选择元素触发	

	      //    $scope.model.rewardText = treeNode.codeText;
	      //    $scope.model.reward = treeNode.id;
	      //    $scope.$apply();
	      //}




	      //显示所在部门
	      $scope.showReasonContent = function () {
	          $('#reasonContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }

	      //显示奖惩名称
	      $scope.showRewardContent = function () {
	          $('#rewardContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }


	      $scope.hideMenu = function () {
	          $('#reasonContent').fadeOut('fast');
	          $('#rewardContent').fadeOut('fast');
	          $('body').unbind('mousedown', onBodyDown);
	      }

	      function onBodyDown(e) {
	          var e = e || window.event; //浏览器兼容性   
	          var elem = e.target || e.srcElement;
	          while (elem) { //循环判断至跟节点，防止点击的是div子元素   
	              if (elem.id && elem.id == 'reasonContent' || elem.id == "rewardContent") {
	                  return;
	              }
	              elem = elem.parentNode;
	          }
	          $scope.hideMenu();

	      }

	      //表单验证
	      function validate() {
	          var validator = jQuery('form').validate({
	              ignore: "",
	              rules: {

	                  reward: {
	                      required: true,
	                  },

	                  rewardApprovalDate: {
	                      required: true
	                  },

	                  rewadApprovalDept: {
	                      required: true,
	                      maxlength: 20
	                  },
	                  approvalDeptLevel: {
	                      required: true,
	                  },
	                  remark: {
	                      maxlength: 1024
	                  }
	              },
	              messages: {

	                  reward: {
	                      required: '请选奖惩名称'
	                  },
	                  rewardApprovalDate: {
	                      required: '请选择奖惩批准日期'
	                  },
	                  rewadApprovalDept: {
	                      required: '请输入奖惩批准机关',
	                      maxlength: "奖惩批准机关名称不能超过20个字"
	                  },
	                  approvalDeptLevel: {
	                      required: '请选择转入奖惩批准机关级别'
	                  },
	                  remark: {
	                      maxlength: "奖惩说明不能超过1024个字"
	                  }

	              },
	              submitHandler: function () {
	                  submit();
	              }
	          });

	      }


	      function submit() {
	          if (!$scope.model.rewardApprovalDate) {
	              alertDialog('请选择奖惩批准日期', 2);
	              return;
	          }
	          if ($scope.imgData.length > 0) {
	              $scope.imgUpFlag = false;
	              $.ajax({
	                  type: 'POST',
	                  url: $rootScope.upFileUrl,
	                  async: false,
	                  contentType: 'application/json;charset=UTF-8',
	                  data: angular.toJson([{ file: $scope.myCroppedImage, filename: $scope.imgData[0].filename }])
	              }).then(function (result) {
	                  // var resultNew = $.parseJSON(result);
	                  var resultNew = result;
	                  if (resultNew && resultNew.httpCode == 200) {//成功
	                      $scope.model.imgUrl = resultNew.data[0].fileUrlPath;

	                      $scope.imgUpFlag = true;

	                  } else if (resultNew && resultNew.httpCode == 400) {
	                      $scope.imgUpFlag = false;
	                      alertDialog("上传图片失败", 2);
	                  }
	              });
	          }
	          if ($scope.imgUpFlag) {
	              var postData = angular.copy($scope.model);



	              $scope.btnInfo = '提交中...';
	              $scope.btnState = true;
	              console.log(angular.toJson(postData));
	              $.ajax({
	                  type: 'post',
	                  url: '/iBase4J-SYS-Web/userReward/update',
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

	      }
	      $scope.cancel = function () {
	          parent.layer.closeAll();
	      }
	  }])