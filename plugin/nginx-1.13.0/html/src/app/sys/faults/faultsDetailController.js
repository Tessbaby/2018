'use strict';

angular.module('app')
	.controller('faultsDetailController', ['$rootScope', '$scope', '$http', '$state',
	       function ($rootScope, $scope, $http, $state) {
	           $scope.title = '事件详情';

	           $scope.id = $state.params.id;
	           //=======================================验证权限 statr===================================
	           ////权限模块代码
	           //$scope.permissionCode = $state.$current.name;
	           //$scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
	           //$scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	           //$scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;
	           //$scope.hasShare = $.inArray($scope.permissionCode + '.share', $rootScope.permissionList) != -1;
	           //if (!$scope.hasQuery) {
	           //    layer.alert("未经授权，禁止访问！", { icon: 2 });
	           //    return false;
	           //}
	           //=======================================验证权限 end===================================	          

	           getModel($scope.id);

              
	           /*  获取详情 */
	           function getModel(id) {
	               $.ajax({
	                   type: 'PUT',
	                   url: '/iBase4J-SYS-Web/issue/detail',
	                   data: angular.toJson({ id: $scope.id })
	               }).then(function (result) {

	                   if (result.httpCode == 200) {
	                       $scope.model = result.data;
	                      $scope.model.img = eval($scope.model.img);
	                   } else {
	                       alertDialog(result.msg, 2);
	                   }
	                   $scope.$apply();
	               })
	           }
	         
	           // 图片放大显示
	           $scope.boostImg = function (imgPath) {
	               var imgHtml = '<img src="' + imgPath + '" style="width: 400px; height: 400px">';
	               layer.open({
	                   type: 1, //page层
	                   title: '',
	                   shade: 0.5, //遮罩透明度
	                   moveType: 1, //拖拽风格，0是默认，1是传统拖动
	                   shift: 1, //0-6的动画形式，-1不开启
	                   area: ['400px', '400px'],
	                   closeBtn: 1,
	                   skin: 'layer-add',
	                   content: imgHtml
	               })
	           }

	       }]);