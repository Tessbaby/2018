'use strict';

angular.module('app')
	.controller('memberController', ['$rootScope', '$scope', '$http', '$state',
		function ($rootScope, $scope, $http, $state) {



		    //=======================================验证权限 statr===================================

		    //区分是是党员 还是入党申请 等状态
		    $scope.type = Number($state.params.type);
		    //权限模块代码
		    $scope.permissionCode = $state.$current.name + '.' + $scope.type;
		    $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
		    $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
		    $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
		    $scope.hasGiverole = $.inArray($scope.permissionCode + '.giverole', $rootScope.permissionList) != -1;
		    $scope.hasChangeActive = $.inArray($scope.permissionCode + '.changeActive', $rootScope.permissionList) != -1;

		    $scope.hasReset = $.inArray($scope.permissionCode + '.reset', $rootScope.permissionList) != -1;

		    if (!$scope.hasQuery) {
		        layer.alert("未经授权，禁止访问！", { icon: 2 });
		        return false;
		    }
		    $scope.homeName = "党员发展";
		    switch ($scope.type) {
		        //党员
		        case 5:
		            $scope.url = '/iBase4J-SYS-Web/user/read/listPage';
		            $scope.homeName = "党员";
		            $scope.title = '党员列表';
		            break;
		            //入党申请
		        case 1:
		            $scope.url = '/iBase4J-SYS-Web/user/apply/read/listPage';
		            $scope.title = '入党申请列表';
		            break;
		            //积极分子
		        case 2:
		            $scope.url = '/iBase4J-SYS-Web/user/active/read/listPage';
		            $scope.title = '积极分子列表';
		            break;
		        default:

		    }

		    //=======================================验证权限 end===================================


		    //==================================执行查询 start==================================

		    //$scope.excelUrl = "";

		    //getExcel();
		    //function getExcel() {
		    //    //党组织结构树
		    //    $.ajax({
		    //        type: 'get',
		    //        url: '/iBase4J-SYS-Web/user/update/exportUser',

		    //    }).then(function (result) {

		    //        if (result.httpCode == 200) {
		    //            $scope.excelUrl = result.data;
		    //        } else {
		    //            toaster.clear('*');
		    //            toaster.pop('error', '', result.msg);
		    //        }
		    //        $scope.$apply();
		    //    });
		    //}
		    //=======================================部门Tree statr===================================
		    //党组织结构设置
		    var setting = {
		        check: {
		            enable: false
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
		            //beforeClick: beforeClick,
		            onClick: onClick
		        }
		    };

		    //获取选中子级
		    function onClick(e, treeId, treeNode) {

		        $scope.param.deptId = treeNode.id;
		        $scope.param.pageNum = 1;
		        $rootScope.search($scope.url, $scope.param);
		    }


		    //党组织结构树
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
		    //=======================================部门Tree end===================================

		    $scope.param = {};  // 列表请求传入的参数
		    $scope.param.deptId = '';
		    //$scope.url = '/iBase4J-SYS-Web/user/read/list';


		    $rootScope.pageInfo = []; // 请求数据前清空
		    $rootScope.search($scope.url, $scope.param);

		    $scope.goSearch = function () {
		        $scope.param.pageNum = 1;
		        $rootScope.search($scope.url, $scope.param);
		    }

		    $scope.clearSearch = function () {
		        $scope.param.pageNum = 1;
		        $scope.param.keyword = null;
		        $rootScope.search($scope.url, $scope.param);
		    }

		    // 翻页 - 排序翻页数据与此一致
		    $scope.pagination = function (page) {
		        $scope.param.pageNum = page;
		        $scope.param.asc = $rootScope.changeAsc();
		        $rootScope.search($scope.url, $scope.param);
		    };

		    //==================================执行查询 end==================================

		    // 删除
		    $scope.cancel = function (id) {
		        var id = Number(id);
		        layer.confirm('确认删除吗？', function (index) {
		            layer.close(index);
		            $.ajax({
		                type: 'delete',
		                dataType: 'json',
		                contentType: 'application/json;charset=UTF-8',
		                url: '/iBase4J-SYS-Web/user',
		                data: angular.toJson({ id: id })
		            }).then(function (result) {
		                if (result.httpCode == 200) {
		                    tipDialog("删除成功", 1, 0.8 * 1000, function () {
		                        var infoLength = $rootScope.pageInfo.data.length - 1;
		                        if (infoLength == 0 && $scope.param.pageNum > 1) {
		                            $scope.param.pageNum = $scope.param.pageNum - 1;
		                        }
		                        $rootScope.search($scope.url, $scope.param);
		                    });
		                } else {
		                    alertDialog(result.msg, 2);
		                }
		                $scope.$apply();
		            });
		        })
		    }

		    // 重置密码
		    $scope.setPassWord = function (id) {
		        var id = Number(id);
		        layer.confirm('重置后恢复初始密码，确定重置吗？', function () {
		            $.ajax({
		                type: 'post',
		                dataType: 'json',
		                contentType: 'application/json;charset=UTF-8',
		                url: '/iBase4J-SYS-Web/user/update/resetPassword',
		                data: angular.toJson({ id: id })
		            }).then(function (result) {
		                if (result.httpCode == 200) {
		                    alertDialog('重置成功', 1);
		                } else {
		                    alertDialog(result.msg, 2);
		                }
		            })
		        })
		    }
		    //解除绑定
		    $scope.unBind = function (id) {
		        var id = Number(id);
		        layer.confirm('确认解除绑定吗？', function (index) {
		            layer.close(index);
		            $.ajax({
		                type: 'put',
		                dataType: 'json',
		                contentType: 'application/json;charset=UTF-8',
		                url: '/iBase4J-SYS-Web/user/unbindMobile',
		                data: angular.toJson({ id: id })
		            }).then(function (result) {
		                if (result.httpCode == 200) {
		                    tipDialog("绑定已成功解除", 1, 0.8 * 1000, function () {

		                        $rootScope.search($scope.url, $scope.param);
		                    });
		                } else {
		                    alertDialog(result.msg, 2);
		                }
		                $scope.$apply();
		            });
		        })
		    }
		    //显示添加页面
		    $scope.showAddForm = function () {
		        switch ($scope.type) {
		            //党员
		            case 5:
		                $state.go('main.partyners.add', { type: $scope.type });
		                break;
		                //入党申请
		            case 1:
		                $state.go('main.partyners.add', { type: $scope.type });
		                break;
		                //积极分子
		            case 2:
		                $state.go('main.partyners.add', { type: $scope.type });
		                break;
		            default:

		        }
		    }
		    $scope.goUp = function (id) {
		        //页面层
		        layer.open({
		            type: 2,
		            skin: 'layui-layer-rim', //加上边框
		            area: ['600px', '600px'], //宽高
		            content: ['/index.html#/access/ApplygoUp/' + id, 'no'],
		            end: function () {
		                var infoLength = $rootScope.pageInfo.data.length - 1;
		                if (infoLength == 0 && $scope.param.pageNum > 1) {
		                    $scope.param.pageNum = $scope.param.pageNum - 1;
		                }
		                $rootScope.search($scope.url, $scope.param);
		            }
		        });
		    }
		}])