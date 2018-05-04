'use strict';

angular.module('app')
	.controller('orgPositionController', ['$rootScope', '$scope', '$http', '$state',
	 function ($rootScope, $scope, $http, $state) {

	     $scope.title = '职务信息';
	     //=======================================验证权限 statr===================================
	     //权限模块代码
	     $scope.permissionCode = $state.$current.name;
	     $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;	    
	     $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
	     $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;

	     if (!$scope.hasQuery) {
	         layer.alert("未经授权，禁止访问！", { icon: 2 });
	         return false;
	     }
	     //=======================================验证权限 end===================================

	     $scope.param = {};  // 列表请求传入的参数
	     $scope.param.enable = 1;
	     $scope.param.type = 'DUTYTYPE';
	   
	     $scope.url = '/iBase4J-SYS-Web/dic/read/listPage';
	     $rootScope.pageInfo = []; // 请求数据前清空
	     $rootScope.search($scope.url, $scope.param);

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

	     // 添加
	     $scope.adPosition = function (id, code, codeText) {
	         var layTitle = id ? '编辑' : '添加';
	         var _id = id ? id : '';
	         var _code = code ? code : '';
	         var _codeText = codeText ? codeText : '';

	         var html = '<form class="form-horizontal"><div class="form-group" style="width: 500px; margin: 40px 0 20px 20px;">'
                                     + '<label class="col-lg-2 col-sm-4 control-label" for="code" style="width: 120px;"><span class="text-danger wrapper-sm">*</span>职务编码</label>'
                                     + '<div class="col-sm-7">'
                                     + '<input type="text" class="form-control" value="' + _code + '" name="code" id="code" required placeholder="请输入职务编码">'
                                     + '<span class="help-block m-b-none"></span>'
                                     + '</div></div><div class="form-group" style="width: 500px; margin: 10px 0 20px 20px;">'
                                     + '<label class="col-lg-2 col-sm-4 control-label" for="codeText" style="width: 120px;"><span class="text-danger wrapper-sm">*</span>职务名称</label>'
                                     + '<div class="col-sm-7">'
                                     + '<input type="text" class="form-control" value="' + _codeText + '"  name="codeText" id="codeText" placeholder="请输入职务名称">'
                                     + '<span class="help-block m-b-none"></span>'
                                     + '</div></div><form>';

	         layer.open({
	             type: 1, //page层
	             title: layTitle, //显示标题
	             shade: 0.5, //遮罩透明度
	             moveType: 1, //拖拽风格，0是默认，1是传统拖动
	             shift: 1, //0-6的动画形式，-1不开启
	             area: ['550px', '300px'],
	             closeBtn: 0,
	             skin: 'layer-add',
	             content: html,
	             btn: ['确认', '取消'],

	             yes: function (index, layero) {


	                 var _code = $('#code').val();
	                 var _codeText = $('#codeText').val();
	                 if (_code == '' || _code == undefined) {
	                     layer.alert('请填写职务编码', { icon: 2 });
	                     return false;
	                 }
	                 if (_code.length > 50) {
	                     layer.alert('职务编码最多50个字符', { icon: 2 });
	                     return false;
	                 }
	                 if (_codeText == '' || _codeText == undefined) {
	                     layer.alert('请填写职务名称', { icon: 2 });
	                     return false;
	                 }
	                 if (_codeText.length > 100) {
	                     layer.alert('职务名称最多100个字符', { icon: 2 });
	                     return false;
	                 }
	                 var obj = angular.copy($scope.param);
	                 var aParam = {
	                     sortNo: '',
	                     code: $('#code').val(),
	                     codeText: $('#codeText').val()
	                 };
	                 if (_id != '') aParam.id = _id;
	                 var m = angular.extend(obj, aParam);
	                 $.ajax({
	                     type: 'post',
	                     dataType: 'json',
	                     contentType: 'application/json;charset=UTF-8',
	                     url: '/iBase4J-SYS-Web/dic',
	                     data: angular.toJson(m),
	                     error: function (result) {
	                         layer.close();
	                         var text = JSON.parse(result.responseText);
	                         var msg = text.msg;
	                         alertDialog(result.msg, 2);
	                     }
	                 }).then(function (result) {
	                     $scope.loading = false;
	                     layer.close(index);

	                     if (result.httpCode == 200) {
	                         tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                             $rootScope.search($scope.url, $scope.param);
	                         });
	                     } else {
	                         alertDialog(result.msg, 2);
	                     }
	                     $scope.$apply();
	                 });
	             },

	             cancel: function (index) {
	                 layer.close(index);
	             }
	         })
	     } 

	    $scope.cancelPosition = function (id, code, codeText) {
	     	layer.confirm('确认要删除？', function (index) {
	     		layer.close(index);
					var data = {
						enable: -1,
						code: code,
						codeText: codeText,
						id: id,
					};
					$.ajax({
						type: 'delete',
						dataType: 'json',
						contentType: 'application/json;charset=UTF-8',
						url: '/iBase4J-SYS-Web/dic/delete/depttype',
						data: angular.toJson(data)
					}).then(function(result) {
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

	 }])
