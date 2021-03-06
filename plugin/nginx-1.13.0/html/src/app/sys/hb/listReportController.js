'use strict';

angular.module('app')
	.controller('listReportController', [ '$rootScope', '$scope', '$http', '$state',
	                                function($rootScope, $scope, $http, $state) {
		$scope.title = '工作审核';
		$scope.param = {};
      
		$scope.url = '/iBase4J-SYS-Web/report/list';
		$rootScope.pageInfo = []; // 请求数据前清空
		$scope.param.tab = 2;
		$rootScope.search($scope.url, $scope.param);

		$scope.hasQuery = $.inArray('main.party.hb.query', $rootScope.permissionList) != -1;
		$scope.upLeaderSel = '';
		
		
		//上下级切换
		$scope.changeHeader = function(id){
			//if($scope.upLeaderSel==1){
					$state.go('main.party.hb');
			//}
		}
        
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
			callback:{
                //beforeClick: beforeClick,
				onCheck: onCheck
            }
		};
		//包含下级
		function setCheck() {
			var zTree = $.fn.zTree.getZTreeObj("treeDemo"),
			sy = $("#sy").prop("checked");
			var type;
			if(sy){
				type = { "Y" : "s", "N" : "s" };
			} else {
				type = { "Y" : "", "N" : ""};
			}
			//console.log(type);
			zTree.setting.check.chkboxType = type;
		}
		//获取选中子级
		function onCheck(e,treeId,treeNode){
			var arrNodes = new Array();
            var treeObj=$.fn.zTree.getZTreeObj("treeDemo"),
            nodes=treeObj.getCheckedNodes(true);
            for(var i=0;i<nodes.length;i++){
				arrNodes.push(nodes[i].id);
            }
			$scope.param.reportDeptId= arrNodes.join(",");
			console.log($scope.param.reportDeptId);
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
			contentType:'application/json;charset=UTF-8',
			url: '/iBase4J-SYS-Web/dept/read/treelist2',
			data: ''
		}).then(function(result) {
			
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
    
    $scope.goSearch = function () {
     	$scope.param.pageNum = 1;
     	$rootScope.search($scope.url, $scope.param);
    }
		
		$scope.clearSearch = function() {
			$scope.param.keyword= null;
			$rootScope.search($scope.url, $scope.param);
		}
		
		// 翻页 - 排序翻页数据与此一致
		$scope.pagination = function (page) {
		  $scope.param.pageNum = page;
		  $scope.param.asc = $rootScope.changeAsc();
		  $rootScope.search($scope.url, $scope.param);
		};

		
		
		
		
		
		
		
		
} ]);