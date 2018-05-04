'use strict';

angular.module('app')
	.controller('articleListController', ['$rootScope', '$scope', '$http', '$state',
	     function ($rootScope, $scope, $http, $state) {


	         $scope.param = {};
	         $scope.param.typeCode = $state.params.typeCode;
	         //=======================================验证权限 statr===================================
	         //权限模块代码
	         $scope.permissionCode = $state.$current.name + '.' + $scope.param.typeCode;
	         //if ($state.$current.name == "main.faults.article") {

	         //} else {
	             $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
	             $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	             $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
	             $scope.hasCheck = $.inArray($scope.permissionCode + '.check', $rootScope.permissionList) != -1;

	             $scope.HasQureyType = $.inArray($scope.permissionCode + '.queryType', $rootScope.permissionList) != -1;
	             $scope.HasUpdateType = $.inArray($scope.permissionCode + '.deleteType', $rootScope.permissionList) != -1;
	             $scope.HasDeleteType = $.inArray($scope.permissionCode + '.updateType', $rootScope.permissionList) != -1;

	         //}
	         if (!$scope.hasQuery) {
	             layer.alert("未经授权，禁止访问！", { icon: 2 });
	             history.go(-1);
	             return false;
	         }
	         $scope.imgSrc = 'res/img/np.png';
	         //=======================================验证权限 end===================================

	         $scope.url = $rootScope.baseUrl + '/article/list';
	         $scope.categoryId = '0';
	         console.log($state.$current.name);
	         //$scope.mId = '';
	         $scope.menuName = "栏目管理";
	         $scope.categoryUrl = "main.article.category";
	         switch ($scope.param.typeCode) {
	             case '1':
	                 $scope.title = '作风建设';
	                 break;
	             case '2':
	                 $scope.title = '制度查询';
	                 break;
	             case '3':
	                 $scope.title = '文明创建';
	                 break;
	             case '4':
	                 $scope.title = '党建快报';
	                 break;
	             case '5':
	                 $scope.title = '党员风采';
	                 break;
	             case '6':
	                 $scope.title = '每月一星';
	                 break;
	             case '7':
	                 $scope.title = '精彩推荐';
	                 break;
	             case '8':
	                 $scope.title = '精准惠民';
	                 break;
	             case '9':
	                 $scope.title = '党内政策';
	                 break;
	             case '10':
	                 $scope.title = '党务公开';
	                 break;
	             case '11':
	                 $scope.title = '我要入党';
	                 break;
	             case '12':
	                 $scope.title = '两优一先';
	                 break;
	             case '13':
	                 $scope.title = '先进模范';
	                 break;
	             case '14':
	                 $scope.title = '活动剪影';
	                 break;
	             case '15':
	                 $scope.title = '两学一做';
	                 break;
	             case '16':
	                 $scope.title = '学习园地';
	                 break;
	             case '17':
	                 $scope.title = '群团活动';
	                 break;
	             case '18':
	                 $scope.title = '先锋示范岗';
	                 break;
	             case '19':
	                 $scope.title = '活动介绍';
	                 $scope.menuName = "党员身边事";
	                 $scope.categoryUrl = "main.partyner.category";
	                 break;
	             case '20':
	                 $scope.title = '发展资料';
	                 $scope.menuName = "党员发展";
	                 $scope.categoryUrl = "main.faults.category";
	                 break;
	             default:
	                 $scope.title = '党建快报';
	                 break;

	         }

	         //判断是否有专题与分类
	         $.ajax({
	             type: 'PUT',
	             dataType: 'json',
	             async: false,
	             contentType: 'application/json;charset=UTF-8',
	             url: $rootScope.baseUrl + '/articleType/query',
	             data: angular.toJson({ "code": $scope.param.typeCode })
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 console.log(result.data);
	                 $scope.cateAndImg = result.data;
	                 //$scope.mId = $scope.cateAndImg.isSpecial == 1?$scope.cateAndImg.id:'';

	             } else {
	                 alertDialog(result.msg, 2);
	             }
	             //$scope.$apply();
	         });

	         //分类		
	         if ($scope.cateAndImg.isCategory == 1) {
	             $.ajax({
	                 type: 'PUT',
	                 dataType: 'json',
	                 async: false,
	                 contentType: 'application/json;charset=UTF-8',
	                 url: $rootScope.baseUrl + '/articleCategory/list',
	                 data: angular.toJson({ "typeId": $scope.cateAndImg.id })
	             }).then(function (result) {
	                 if (result.httpCode == 200) {
	                     $scope.typeList = result.data;
	                 } else {
	                     alertDialog(result.msg, 2);
	                 }
	                 //$scope.$apply();
	             });
	         }

	         $scope.goSearch = function () {
	             $scope.param.pageNum = 1;
	             $rootScope.search($scope.url, $scope.param);
	         }

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

	         $rootScope.pageInfo = []; // 请求数据前清空
	         $rootScope.search($scope.url, $scope.param);
	         console.log($rootScope.pageInfo);


	         //审核
	         $scope.audit = function (id) {

	             if (confirm('审核通过后数据将显示给前端用户，是否确认审核？')) {
	                 $scope.loading = true;
	                 $.ajax({
	                     type: 'post',
	                     url: '/iBase4J-SYS-Web/article/check',
	                     data: angular.toJson({ "id": id })
	                 }).then(function (result) {
	                     $scope.loading = false;
	                     //console.log(result);
	                     if (result.httpCode == 200) {
	                         tipDialog("审核成功", 1, 0.8 * 1000, function () {
	                            
	                             $rootScope.search($scope.url, $scope.param);
	                         });
	                     } else {
	                         alertDialog(result.msg, 2);
	                     }
	                     $scope.$apply();
	                 });
	             }
	         }

	         //删除
	         $scope.delete = function (id) {

	             if (confirm('确认要删除？')) {
	                 $scope.loading = true;
	                 $.ajax({
	                     type: 'delete',
	                     url: '/iBase4J-SYS-Web/article',
	                     data: angular.toJson({ "id": id })
	                 }).then(function (result) {
	                     $scope.loading = false;
	                     //console.log(result);
	                     if (result.httpCode == 200) {
	                         tipDialog("删除成功", 1, 0.8 * 1000, function () {
	                             //如果当前删除数据是第11条，意味着当前页码为2，删除后继续请求第二页数据会返回空数据
	                             if ($rootScope.pageInfo.data.length == 1 && $scope.param.pageNum > 1) {
	                                 $scope.param.pageNum = $scope.param.pageNum - 1;
	                             }
	                             $rootScope.search($scope.url, $scope.param);
	                         });
	                     } else {
	                         alertDialog(result.msg, 2);
	                     }
	                     $scope.$apply();
	                 });
	             }
	         }


	         $scope.changeType = function (categoryId) {
	             if (categoryId == '0') {
	                 $scope.param.categoryId = '';
	             } else {
	                 $scope.param.categoryId = categoryId;
	             }
	             $rootScope.search($scope.url, $scope.param);
	         }

	         //置顶
	         $scope.changeIsTop = function (id, topId) {
	             var isTopFlag = false;
	             if (topId == 1) {
	                 var confirmInfo = '确认要置顶吗？';
	             } else {
	                 var confirmInfo = '确认要取消置顶吗？';
	             }
	             if (confirm(confirmInfo)) {
	                 isTopFlag = true;
	             }
	             if (isTopFlag) {
	                 $.ajax({
	                     type: 'post',
	                     dataType: 'json',
	                     async: false,
	                     contentType: 'application/json;charset=UTF-8',
	                     url: $rootScope.baseUrl + '/article/top',
	                     data: angular.toJson({ "id": id, "isTop": topId, "typeCode": $scope.param.typeCode })
	                 }).then(function (result) {
	                     //console.log(result);
	                     if (result.httpCode == 200) {
	                         tipDialog("操作成功", 1, 0.8 * 1000, function () {
	                             //console.log("ss");
	                             $rootScope.search($scope.url, $scope.param);
	                         });
	                     }
	                         //else if (result.httpCode == 20510) {
	                         // alertDialog(result.msg, 2);
	                         //}
	                     else {
	                         alertDialog(result.msg, 2);
	                     }
	                     //$scope.$apply();
	                 });
	             }
	         }

	         //添加提示
	         $scope.addInfo = function () {
	             if ($scope.cateAndImg.isCategory == 1) {//有分类
	                 var typeLength = $scope.typeList.length;
	                 if (typeLength > 0) {
	                     $state.go('main.article.form', { typeCode: $scope.param.typeCode, id: '', mId: $scope.cateAndImg.id });
	                 } else {
	                     alertDialog("请先添加分类", 2);

	                 }
	             } else {
	                 $state.go('main.article.form', { typeCode: $scope.param.typeCode, id: '', mId: '' });
	             }


	         }
	     }]);