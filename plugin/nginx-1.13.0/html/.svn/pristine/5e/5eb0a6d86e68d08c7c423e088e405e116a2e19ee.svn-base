'use strict';

angular.module('app')
	.controller('editArticleController', ['$rootScope', '$scope', '$http', '$state',
	     function ($rootScope, $scope, $http, $state) {
			 
			$scope.selectarticleadmin = function()
			{
				var str = '<a href="http://www.baidu.com ">百度链接</a>';
				editor.execCommand("inserthtml", str);//通知公告
				dialog.close(true);
				var index = parent.layer.getFrameIndex(window.name); //获取窗口索引
				parent.layer.close(index);    
				
			}

}]);