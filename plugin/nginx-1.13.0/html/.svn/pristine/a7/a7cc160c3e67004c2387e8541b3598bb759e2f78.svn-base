 'use strict';

angular.module('app')
    .controller('groupMemListController', ['$rootScope', '$scope', '$http', '$state',
    function ($rootScope, $scope, $http, $state) {
        $scope.title = '人员列表';
        $scope.btnInfo = '保存';
        $scope.btnState = false;
        $scope.groupId = $state.params.id;
        $scope.keyword = '';
        $scope.person = {};
        $scope.person.setList = [];//已选择列表
        $scope.checkdIds = [];    //已选人员ID列表
        $scope.person.sourceList = [];//已选择列表
        $scope.deptId = '';
        getDetail($scope.groupId);

        // 获取分组名称
        $.ajax({
          type: 'GET',
          dataType: 'json',
          contentType: 'application/json;charset=UTF-8',
          url: '/iBase4J-SYS-Web/group/detail',
          data: {id: $scope.groupId}
        }).then(function (result) {
          if (result.httpCode == 200) {
              $scope.subTitle = result.data.name;
          } else {
              alertDialog(result.msg, 2);
          }
          $scope.$apply();
        });

        // 获取人员列表
        function getDetail(id) {
            $.ajax({
                type: 'GET',
                url: '/iBase4J-SYS-Web/groupUser/list',
                data: { id: id }
            }).then(function (result) {
                $scope.record = result.data;

                $.each(result.data.userList, function (index, item) {
                    var person = {};
                    person.userName = item.userName;
                    person.dnzwText = item.dutyName;
                    $scope.person.setList.push(person);
                    $scope.checkdIds.push(item.userId);
                })
                $scope.$apply();
            });
        }

        //党组织结构设置
        var setting = {
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
                onClick: onClick
            }
        };

        //获取选中子级
        function onClick(e, treeId, treeNode) {
            $scope.deptid = treeNode.id;
            $scope.searchPerson();
        }
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            url: '/iBase4J-SYS-Web/dept/read/treelist2',
            data: ''
        }).then(function (result) {
            $scope.loading = false;
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

        //初始化人员池
        $scope.searchPerson = function () {
            $.ajax({
                type: 'PUT',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: '/iBase4J-SYS-Web/user/read/list',
                data: angular.toJson({ deptId: $scope.deptid, keyword: $scope.keyword })
            }).then(function (result) {
                $scope.loading = false;
                // console.log(result);
                if (result.httpCode == 200) {
                    $scope.isSelected = false;
                    //排除已选人员
                    if ($scope.checkdIds.length > 0) {
                        var sourceList = [];
                        for (var i in result.data) {
                            var num = $.inArray(result.data[i].id, $scope.checkdIds);
                            if (num == -1) {
                                sourceList.push(result.data[i]);
                            }
                        }
                        $scope.person.sourceList = sourceList;
                    } else {
                        $scope.person.sourceList = result.data;
                    }

                } else {
                    alertDialog(result.msg, 2);
                }
                console.log($scope.person.sourceList);
                $scope.$apply();
            });
        }

        //点击待选人员->已选中列表
        $scope.checkInfo = function (key) {
            var moveInfo = $scope.person.sourceList.slice(key, key + 1);
            $scope.person.sourceList.splice(key, 1);
            $scope.person.setList.unshift(moveInfo[0]);
            $scope.checkdIds.unshift(moveInfo[0].id);

        }
        //点击删除已选中->待选列表
        $scope.delChecked = function (key) {
            $scope.isSelected = false;
            var moveInfo = $scope.person.setList.slice(key, key + 1);
            $scope.person.setList.splice(key, 1);
            $scope.person.sourceList.unshift(moveInfo[0]);
            $scope.checkdIds.splice(key, 1);
        }

        //全选/取消全选
        $scope.checkAll = function () {
            if ($scope.isSelected) {
                $scope.isSelected = false;
                var moveInfo = $scope.person.setList.slice(0, $scope.infoLength);
                $scope.person.setList.splice(0, $scope.infoLength);
                $scope.checkdIds.splice(0, $scope.infoLength);
                $scope.person.sourceList = moveInfo;

            } else {
                $scope.infoLength = $scope.person.sourceList.length;
                var arrTmp = angular.copy($scope.person.sourceList);
                $.merge(arrTmp, $scope.person.setList);
                $scope.person.setList = arrTmp;
                var ids = [];
                for (var i in $scope.person.sourceList) {
                    ids.push($scope.person.sourceList[i].id);
                }
                var strIds = angular.copy($scope.checkdIds);
                $.merge(ids, strIds);
                $scope.checkdIds = ids;
                $scope.person.sourceList = [];
                $scope.isSelected = true;
            }
        }

        /* 保存 */
        $scope.submit = function () {
            if ($scope.checkdIds.length > 0) {
                var param = {};
                param.groupId = $scope.groupId;
                param.userIds = $scope.checkdIds;
                $.ajax({
                  type: 'POST',
                  dataType: 'json',
                  contentType: 'application/json;charset=UTF-8',
                  url: '/iBase4J-SYS-Web/groupUser/update',
                  data: angular.toJson(param)
                }).then(function (result) {
                  if (result.httpCode == 200) {
                      tipDialog("保存成功", 1);
                      $state.go('main.group');
                  } else {
                      alertDialog(result.msg, 2);
                  }
                  $scope.$apply();
                });
            } else {
                alertDialog('请选择人员', 2);
            }
            
        }

        /* 取消 */
        $scope.cancel = function () {
            layer.confirm('确认要退出？', function () {
                layer.closeAll();
                $state.go('main.group');
            })
        }
    }
])