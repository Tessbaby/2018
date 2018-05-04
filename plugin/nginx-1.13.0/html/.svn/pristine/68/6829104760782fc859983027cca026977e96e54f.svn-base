'use strict';

angular.module('app')
	.controller('groupListController', ['$rootScope', '$scope', '$http', '$state',
    function ($rootScope, $scope, $http, $state) {
      //权限模块代码
       $scope.permissionCode = $state.$current.name;
       // console.log($scope.permissionCode)
       $scope.hasQuery = $.inArray($scope.permissionCode + '.list', $rootScope.permissionList) != -1;            
       $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
       $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
       $scope.hasUserList = $.inArray($scope.permissionCode + '.userList', $rootScope.permissionList) != -1;
       if (!$scope.hasQuery) {
           layer.alert("未经授权，禁止访问！", { icon: 2 });
           return false;
       }

      $scope.title = '分组管理';
      $scope.record = {};
      getList();

      function getList() {
        $.ajax({
            type: 'GET',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            url: '/iBase4J-SYS-Web/group/list',
        }).then(function (result) {
            if (result.httpCode == 200) {
                console.log(result);
                $scope.infoList = result.data;
            } else {
                alertDialog(result.msg, 2);
            }
            $scope.$apply();
        });
      }
      

    	/* 编辑名称 */
    	$scope.editName = function (id) {
        var _id = id;
        if (_id) {
          $.ajax({
              type: 'GET',
              dataType: 'json',
              contentType: 'application/json;charset=UTF-8',
              url: '/iBase4J-SYS-Web/group/detail',
              data: {id: _id}
          }).then(function (result) {
              if (result.httpCode == 200) {
                  $scope.record.name = result.data.name;
                  openLayer(_id);
              } else {
                  alertDialog(result.msg, 2);
              }
              $scope.$apply();
          });
        } else {
          openLayer('');
        }
    		
    	}

      function openLayer(id) {
        var html = '';
        if (id) {
          html = '编辑分组';
        } else {
          html = '添加分组';
          $scope.record.name = '';
        }
        layer.open({
          type: 1,
          title: html,
          area: ['500px', '300px'],
          content: $('#editName'),
          btn: ['确认', '取消'],
          yes: function (index) {
            if ($scope.record.name.length > 40) {
              alertDialog('分组名称不能超过40个字', 2);
            } else if ($scope.record.name) {
              $.ajax({
                  type: 'POST',
                  dataType: 'json',
                  contentType: 'application/json;charset=UTF-8',
                  url: '/iBase4J-SYS-Web/group/update',
                  data: angular.toJson({id: id, name: $scope.record.name})
              }).then(function (result) {
                  if (result.httpCode == 200) {
                      layer.close(index);
                      tipDialog("保存成功", 1);
                      getList();
                  } else {
                      alertDialog(result.msg, 2);
                  }
                  $scope.$apply();
              });
            } else {
              alertDialog('请填写分组名称', 2);
            }
          }
        })
      }

      /* 查看人员列表 */
      $scope.goMemberList = function (id) {
        $state.go('main.grouping.memberList', {id: id});
      }
    	$scope.cancel = function (id) {
    		layer.confirm('确认要删除？', function () {
      		$.ajax({
            url: '/iBase4J-SYS-Web/group',
            type: 'delete',
            data: angular.toJson({id: id})
          }).then(function (result) {
          	if (result.httpCode == 200) {
          		tipDialog("删除成功", 1);
              getList();
          	} else {
          		alertDialog(result.msg, 2);
          	}
          	$scope.$apply();
          })
      	})
    	}
    }])