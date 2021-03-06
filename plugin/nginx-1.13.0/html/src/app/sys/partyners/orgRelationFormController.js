﻿'use strict';

angular.module('app')
	.controller('orgRelationFormController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {

	      $scope.model = {};
	      var id = Number($state.params.id);
	      if (id) {
	          $scope.model.id = id;
	          getModel(id);
	      }

	      $scope.model.userId = $state.params.userId;;

	      validate()
	      $scope.btnInfo = '提交';
	      $scope.btnState = false;
	      getDropdowmList();

	      //获取党员详情
	      function getModel(id) {
	          // 文件流转详情
	          $.ajax({
	              type: 'get',
	              url: '/iBase4J-SYS-Web/userOrg/detail',
	              data: { id: id }
	          }).then(function (result) {
	              $scope.loading = false;
	              if (result.httpCode == 200) {

	                  $scope.model = result.data;
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

	      var begin = {
          elem: '#joinDeptDate',
          format: 'YYYY-MM-DD',
          max: '2099-06-16', //最大日期
          istoday: false,
          isclear: false,
          choose: function (datas) {
              $scope.model.joinDeptDate = datas;
              end.min = datas;
              end.start = datas;
          }
        }
        var end = {
          elem: '#leaveDeptDate',
          format: 'YYYY-MM-DD',
          max: '2099-06-16', //最大日期
          istoday: false,
          isclear: false,
          choose: function (datas) {
              $scope.model.leaveDeptDate = datas;
              begin.max = datas;
          }
        }
        laydate(begin);
        laydate(end);

	      // 日期
	      // function setDate() {
	      //     //进入党支部日期
	      //     laydate({
	      //         elem: '#joinDeptDate',
	      //         format: 'YYYY-MM-DD',
	      //         choose: function (datas) {
	      //             $scope.model.joinDeptDate = datas;
	      //         }

	      //     });
	      //     //转离党支部日期
	      //     laydate({
	      //         elem: '#leaveDeptDate',
	      //         format: 'YYYY-MM-DD',
	      //         choose: function (datas) {
	      //             $scope.model.leaveDeptDate = datas;
	      //         }

	      //     });

	      // }
	      // setDate();

	      //获取页面下拉框配置
	      function getDropdowmList() {
	          $.ajax({
	              type: "get",
	              url: '/iBase4J-SYS-Web/userOrg/getAllSelect',
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.dropdowmList = result.data;
	                  //console.log(result);
	                  //党员所在支部
	                  var depNodes = $scope.dropdowmList.deptList;
	                  $.fn.zTree.init($('#depTree'), setting, depNodes);

	                  //党员转入支部
	                  var JoinDeptNodes = $scope.dropdowmList.joinDeptLevelList;
	                  var treeJoinDept = $.fn.zTree.init($('#treeJoinDeptLevel'), joinDeptsetting, JoinDeptNodes);
	                  treeJoinDept.expandAll(true);

	                  //党员转出支部类型
	                  var LevelDeptNodes = $scope.dropdowmList.leaveDeptLevelList;
	                  var treeLevel = $.fn.zTree.init($('#treeLevelContent'), leveDeptsetting, LevelDeptNodes);
	                  treeLevel.expandAll(true);

	                  //党员原所在支部
	                  var beforeDepNodes = $scope.dropdowmList.userBeforeDeptList;
	                  var treeOldDep = $.fn.zTree.init($('#treeOldDep'), oldDepSetting, beforeDepNodes);
	                  treeOldDep.expandAll(true);

	                  $scope.$apply();
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	          });
	      }
	      //----------------------部门树配置-------------------------------
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

	          var idObj = $('#deptId');
	          idObj.attr('value', treeNode.deptName);
	          var treeids = $('#treeids');
	          treeids.attr('value', treeNode.id);
	          $scope.model.deptId = treeNode.id;
	      }
	      //----------------------部门树配置 end-----------------------------
	      //----------------------部门树配置-------------------------------
	      var oldDepSetting = {
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
	                  idKey: "id",
	                  pIdKey: "parentId",
	                  rootPId: 0
	              }
	          },
	          callback: {
	              onClick: onOldDepClick
	          }
	      };
	      function onOldDepClick(e, treeId, treeNode) { // 选择元素触发	      

	       
	          $scope.model.userBeforeDeptText = treeNode.deptName;
	          $scope.model.userBeforeDeptId = treeNode.id;
	          $scope.$apply();
	      }
	      //----------------------部门树配置 end-----------------------------


	      //----------------------进入支部类型-------------------------------
	      //进入支部类型
	      var joinDeptsetting = {
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
	              onClick: onJoinDeptClick
	          }
	      };
	      function onJoinDeptClick(e, treeId, treeNode) { // 选择元素触发	      

	          var idObj = $('#joinDeptLevelText');
	          idObj.attr('value', treeNode.codeText);
	          var treeids = $('#joinDeptLevelList');
	          treeids.attr('value', treeNode.id);
	          $scope.model.joinDeptLevel = treeNode.id;
	      }
	      //----------------------进入支部类型 end-----------------------------

	      //----------------------离开支部类型-------------------------------
	      //进入支部类型
	      var leveDeptsetting = {
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
	              onClick: onLeveDeptClick
	          }
	      };
	      function onLeveDeptClick(e, treeId, treeNode) { // 选择元素触发	      

	          var idObj = $('#levelDepText').val(treeNode.codeText);

	          $scope.model.leaveDeptLevel = treeNode.id;
	      }
	      //----------------------进入支部类型 end-----------------------------

	      //----------------------树配置-------------------------------
	      //显示所在部门
	      $scope.showMenu = function () {

	          $('#depContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }
	      //显示进入党支部类型
	      $scope.showJoiDeptContent = function () {

	          $('#JoiDeptContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }
	      //显示离开党支部类型
	      $scope.showDeptLevel = function () {

	          $('#deptLevelContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }
	      //显示离开党支部类型
	      $scope.showOldDep = function () {

	          $('#oldDepContent').slideDown('fast');
	          $('body').bind('mousedown', onBodyDown);
	      }


	      $scope.hideMenu = function () {
	          $('#depContent').fadeOut('fast');
	          $('#JoiDeptContent').fadeOut('fast');
	          $('#deptLevelContent').fadeOut('fast');
	          $('#oldDepContent').fadeOut('fast');
	          $('body').unbind('mousedown', onBodyDown);
	      }

	      function onBodyDown(e) {
	          var e = e || window.event; //浏览器兼容性   
	          var elem = e.target || e.srcElement;
	          while (elem) { //循环判断至跟节点，防止点击的是div子元素   
	              if (elem.id && elem.id == 'depContent' || elem.id == 'JoiDeptContent' || elem.id == 'deptLevelContent' || elem.id == 'oldDepContent') {
	                  return;
	              }
	              elem = elem.parentNode;
	          }
	          $scope.hideMenu();

	          //if (!event.target.id == 'depContent' || $(event.target).parents('#depContent').length == 0) {
	          //    if (event.target.id != 'deptId') {
	          //        $scope.hideMenu();
	          //    }
	          //}
	      }

	      //表单验证
	      function validate() {
	          var validator = jQuery('form').validate({
	              ignore: "",
	              rules: {
	                  joinDeptName: {

	                      maxlength: 50
	                  },
	                  removeStatus: {
	                      required: true,
	                  },
	                  partyName: {
	                      maxlength: 50
	                  },
	                  beforeBranchName: {
	                      maxlength: 50
	                  },

	              },
	              messages: {
	                  joinDeptName: {

	                      maxLength: "入党时所在支部名称不能超过50个字"
	                  },
	                  removeStatus: {
	                      required: '请选择转入转出状态'
	                  },
	                  partyName: {
	                      maxLength: "党委名称不能超过50个字"
	                  },
	                  beforeBranchName: {
	                      maxLength: "原党支部名称不能超过50个字"
	                  },

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
	          }

	          $scope.btnInfo = '提交中...';
	          $scope.btnState = true;
	          console.log(angular.toJson(postData));
	          $.ajax({
	              type: 'post',
	              url: '/iBase4J-SYS-Web/userOrg/update',
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