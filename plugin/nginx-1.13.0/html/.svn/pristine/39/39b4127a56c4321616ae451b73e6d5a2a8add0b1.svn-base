'use strict';

angular.module('app')
	.controller('careReportController', ['$rootScope', '$scope', '$http', '$state',
	       function ($rootScope, $scope, $http, $state) {
	           $scope.title = '党员关爱';

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

	           // 基于准备好的dom，初始化echarts实例
	           var myChart = echarts.init(document.getElementById('main'));


	           myChart.showLoading();

	           // 文件流转详情
	           $.ajax({
	               type: 'get',
	               url: '/iBase4J-SYS-Web/sysUserHeart/getHeartCountList'
	           }).then(function (result) {
	               myChart.hideLoading();
	               if (result.httpCode == 200) {
	                   var list = result.data;
	                   var key = [];
	                   var value = [];
	                   $.each(list, function (i, item) {
	                       key.push(item.tname);
	                       value.push(item.count);

	                   });
	                   // 指定图表的配置项和数据
	                   var option = {
	                       title: {
	                           text: '发送统计'
	                       },
	                       tooltip: {
	                           trigger: 'item',
	                           formatter: "{a} <br/>{c}"
	                       },
	                   
	                       legend: {
	                           data: ['发送量']
	                       },
	                       xAxis: {
	                           data: key
	                       },
	                       yAxis: {},
	                       series: [{
	                           name: '发送量',
	                           type: 'bar',
	                           data: value
	                       }]
	                   };

	                   // 使用刚指定的配置项和数据显示图表。
	                   myChart.setOption(option);


	               } else {
	                   // $scope.msg = result.msg;
	                   alertDialog(result.msg, 2);
	               }
	               $scope.$apply();
	           });

	          
	         
	       }]);