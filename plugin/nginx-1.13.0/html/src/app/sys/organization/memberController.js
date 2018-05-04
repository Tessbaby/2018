'use strict';

angular.module('app')
	.controller('memberController', ['$rootScope', '$scope', '$http', '$state',
		function ($rootScope, $scope, $http, $state) {

		    $scope.title = '党员列表';

		    //=======================================验证权限 statr===================================
		    //权限模块代码
		    $scope.permissionCode = $state.$current.name;
		    $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
		    $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
		    $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
		    $scope.hasGiverole = $.inArray($scope.permissionCode + '.giverole', $rootScope.permissionList) != -1;

		    if (!$scope.hasQuery) {
		        layer.alert("未经授权，禁止访问！", { icon: 2 });
		        return false;
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
		            enable: true
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
		            onCheck: onCheck
		        }
		    };
		    //包含下级
		    function setCheck() {
		        var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
				sy = $("#sy").prop("checked");
		        var type;
		        if (sy) {
		            type = { "Y": "s", "N": "s" };
		        } else {
		            type = { "Y": "", "N": "" };
		        }
		        //console.log(type);
		        zTree.setting.check.chkboxType = type;
		    }
		    //获取选中子级
		    function onCheck(e, treeId, treeNode) {
		        var arrNodes = new Array();
		        var treeObj = $.fn.zTree.getZTreeObj("treeDemo"),
                nodes = treeObj.getCheckedNodes(true);
		        for (var i = 0; i < nodes.length; i++) {
		            arrNodes.push(nodes[i].id);
		        }
		        $scope.param.deptId = arrNodes.join(",");
		        //console.log($scope.param.sendDeptId);
		        $scope.param.pageNum = 1;
		        $rootScope.search($scope.url, $scope.param);
		    }
		    //点击文字选中复选框
		    function beforeClick(treeId, treeNode) {
		        var zTree = $.fn.zTree.getZTreeObj("treeDemo");
		        zTree.checkNode(treeNode, !treeNode.checked, null, true);
		        return false;
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
		            setCheck();
		            $("#sy").bind("change", setCheck);
		        } else {
		            alertDialog(result.msg, 2);
		        }
		        $scope.$apply();
		    });
		    //=======================================部门Tree end===================================

		    $scope.param = {};  // 列表请求传入的参数
		    $scope.param.deptId = '';
		    //$scope.url = '/iBase4J-SYS-Web/user/read/list';
		    $scope.url = '/iBase4J-SYS-Web/user/read/listPage';
		    $rootScope.pageInfo = []; // 请求数据前清空
		    $rootScope.search($scope.url, $scope.param);

		    $scope.clearSearch = function () {
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

		}])