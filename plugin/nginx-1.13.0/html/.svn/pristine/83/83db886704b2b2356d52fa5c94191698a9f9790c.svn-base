'use strict';

angular.module('app')
	.controller('setImageController', ['$rootScope', '$scope', '$http', '$state',
		function($rootScope, $scope, $http, $state) {

			$scope.title = '宣传图管理';

			//=======================================验证权限 statr===================================
			//权限模块代码
			$scope.permissionCode = $state.$current.name;
			$scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
			$scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
			$scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;

			if (!$scope.hasQuery) {
				layer.alert("未经授权，禁止访问！", {
					icon: 2
				});
				return false;
			}
			//=======================================验证权限 end===================================

			$scope.param = {};
			$scope.param.keyword = '';
			$scope.url = '/iBase4J-SYS-Web/sysImgsSetting/read/list';

			$rootScope.search($scope.url, $scope.param);

			$scope.clearSearch = function() {
				$scope.param.keyword = null;
				$rootScope.search($scope.url, $scope.param);
			}

			// 翻页 - 排序翻页数据与此一致
			$scope.pagination = function(page) {
				$scope.param.pageNum = page;
				$scope.param.asc = $rootScope.changeAsc();
				$rootScope.search($scope.url, $scope.param);
			};

			// 删除
			$scope.cancelImg = function(id) {
				var id = Number(id);
				layer.confirm('确认删除吗？', function(index) {
					layer.close(index);
					$.ajax({
						type: 'delete',
						dataType: 'json',
						contentType: 'application/json;charset=UTF-8',
						url: '/iBase4J-SYS-Web/sysImgsSetting',
						data: angular.toJson({id: id})
					}).then(function(result) {
						if (result.httpCode == 200) {
							tipDialog("删除成功", 1, 0.8 * 1000, function() {
								var infoLength = $rootScope.pageInfo.data.length - 1;
								if (infoLength == 0 && $scope.param.pageNum != 1) {
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

			// 图片放大显示
			$scope.boostImg = function(imgPath) {
				var imgHtml = '<img src="' + imgPath + '" style="width: 720px; height: 240px">';
				layer.open({
					type: 1, //page层
					title: '',
					shade: 0.5, //遮罩透明度
					moveType: 1, //拖拽风格，0是默认，1是传统拖动
					shift: 1, //0-6的动画形式，-1不开启
					area: ['720px', '240px'],
					closeBtn: 1,
					skin: 'layer-add',
					content: imgHtml
				})
			}

		}
	])