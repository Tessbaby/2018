'use strict';

angular.module('app')
    .controller('forwardController', ['$rootScope', '$scope', '$http', '$state', 
          function ($rootScope, $scope, $http, $state) {

              /*初始化页面*/
              $scope.title = "转发";
              $scope.id = $state.params.id;
              $scope.param = {};
              $scope.thumb = [];
              $scope.record = {};
              $scope.record.isPublic = "1";
              $scope.loading = true;

              $scope.item = [];
              $scope.checkdList = [];//已选择列表
              $scope.checkdIds = [];
              $scope.isSelected = false;
              $scope.infoLength = 0;//数据加载后需初始化为0
              $scope.info = {};

              //党组织结构设置
              var setting = {
                  data: {
                      key: {
                          id: "id",
                          children: "children",
                          name: "deptName"
                      }
                  },
                  callback: {
                      onClick: onClick
                  }
              };

              //获取选中子级
              function onClick(e, treeId, treeNode) {
                  $scope.param.deptid = treeNode.id;
                  $scope.searchPerson();
              }

              //党组织结构树
              $.ajax({
                  type: 'get',
                  dataType: 'json',
                  contentType: 'application/json;charset=UTF-8',
                  url: '/iBase4J-SYS-Web/dept/deptTree',
                  data: ''
              }).then(function (result) {
                  $scope.loading = false;
                  console.log(result);
                  if (result.httpCode == 200) {
                      //console.log(result);
                      var zNodes = result.data;
                      var treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                      treeObj.expandAll(true);
                  } else {
                      alertDialog(result.msg, 2);
                  }
                  $scope.$apply();
              });

              $scope.searchPerson = function () {
                  $scope.isSelected = false;
                  $.ajax({
                      type: 'PUT',
                      dataType: 'json',
                      contentType: 'application/json;charset=UTF-8',
                      url: '/iBase4J-SYS-Web/user/read/list',
                      data: angular.toJson({ deptId: $scope.param.deptid })
                  }).then(function (result) {
                      $scope.loading = false;
                      console.log(result);
                      if (result.httpCode == 200) {
                          if ($scope.checkdIds.length > 0) {
                              var infoNew = [];
                              console.log($scope.checkdIds);
                              //$.each(result.data, function (i, item) {
                              //    if ($.inArray(item.id, $scope.checkdIds) == -1) {
                              //        if (item.dnzwText != "") {
                              //            infoNew.push({ id: item.id, userName: item.userName + '-' + item.dnzwText });
                              //        } else {
                              //            infoNew.push({ id: item.id, userName: item.userName + '-' + item.dnzwText });

                              //        }

                              //    }
                              //});
                              for (var i in result.data) {
                                  var num = $.inArray(result.data[i].id, $scope.checkdIds);
                                  if (num == -1) {

                                      infoNew.push(result.data[i]);
                                  }
                              }
                              $scope.info.data = infoNew;
                          } else {
                              $scope.info.data = result.data;
                          }



                      } else {
                          alertDialog(result.msg, 2);
                      }
                      $scope.$apply();
                  });
              }

              //点击待选人员->已选中列表
              $scope.checkInfo = function (key) {
                  var moveInfo = $scope.info.data.slice(key, key + 1);
                  $scope.info.data.splice(key, 1);
                  $scope.checkdList.unshift(moveInfo[0]);
                  $scope.checkdIds.unshift(moveInfo[0].id);

              }
              //点击删除已选中->待选列表
              $scope.delChecked = function (key) {
                  $scope.isSelected = false;
                  var moveInfo = $scope.checkdList.slice(key, key + 1);
                  $scope.checkdList.splice(key, 1);
                  $scope.info.data.unshift(moveInfo[0]);
                  $scope.checkdIds.splice(key, 1);
              }

              //全选/取消全选
              $scope.checkAll = function () {
                  if ($scope.isSelected) {
                      $scope.isSelected = false;
                      var moveInfo = $scope.checkdList.slice(0, $scope.infoLength);
                      $scope.checkdList.splice(0, $scope.infoLength);
                      $scope.checkdIds.splice(0, $scope.infoLength);
                      $scope.info.data = moveInfo;

                  } else {
                      $scope.infoLength = $scope.info.data.length;
                      var arrTmp = angular.copy($scope.info.data);
                      $.merge(arrTmp, $scope.checkdList);
                      $scope.checkdList = arrTmp;
                      var ids = [];
                      for (var i in $scope.info.data) {
                          ids.push($scope.info.data[i].id);
                      }
                      var strIds = angular.copy($scope.checkdIds);
                      $.merge(ids, strIds);
                      $scope.checkdIds = ids;
                      $scope.info.data = [];
                      $scope.isSelected = true;
                  }
              }


              //提交表单
              $scope.submit = function () {
                  $scope.loading = true;
                  if ($scope.checkdIds.length == 0) {
                      alert("文件不公开时可见人员不能为空");
                      return;
                  }
                  saveData();
              };

              function saveData() {
                  $scope.loading = true;
                  $scope.item.push({
                      id: $scope.id,
                      userList: $scope.checkdIds.join(","),
                  });
                  if ($scope.item) {
                      $scope.isDisabled = true;//提交disabled
                      $.ajax({
                          type: 'POST',
                          url: '/iBase4J-SYS-Web/file/updateFile',
                          dataType: 'json',
                          contentType: 'application/json;charset=UTF-8',
                          data: angular.toJson($scope.item)
                      }).then(callback);
                  }
                  function callback(result) {
                      if (result.httpCode == 200) {//成功
                          tipDialog("保存成功", 1, 0.8 * 1000, function () {
                              $state.go('main.party.files');
                          });
                      } else {
                        
                          $scope.isDisabled = false;
                          alertDialog(result.msg, 2);
                      }
                      $scope.loading = false;
                  }
              }

              $scope.cancel = function () {
                layer.confirm('您确认放弃本次编辑吗？' ,function (index) {
                  layer.close(index);
                  $state.go('main.party.files');
                })
               }
          }]);