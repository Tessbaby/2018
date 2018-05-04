'use strict';

angular.module('app')
	.controller('memDetailController', ['$rootScope', '$scope', '$http', '$state',
		function ($rootScope, $scope, $http, $state) {

		    $scope.title = '详情';
		    var id = $state.params.id;
		    $scope.id = id;
		    getData();
		    var myEditor = UE.getEditor("myEditor", {
		        topOffset: 0,
		        autoFloatEnabled: false,
		        autoHeightEnabled: false,
		        wordCount: false,
		        readonly: true,
		        autotypeset: {
		            removeEmptyline: true
		        },
		        toolbars: [
                    [
                        //'source', //源代码
                        'bold', //加粗
                        'forecolor', //字体颜色
                        'indent', //首行缩进
                        'italic', //斜体
                        'underline', //下划线
                        //'simpleupload', //单图上传
                        //'inserttable', //插入表格
                        'link', //超链接
                        'removeformat',//清除格式
                        'huodong',

                    ]
		        ]
		    });
		    function getData() {
		        $.ajax({
		            type: 'put',
		            url: '/iBase4J-SYS-Web/user/read/detail',
		            dataType: 'json',
		            contentType: 'application/json;charset=UTF-8',
		            data: angular.toJson({ id: id })
		        }).then(function (result) {
		            console.log(result);
		            if (result.httpCode == 200) {
		                $scope.result = result.data;
		                if (result.data.remark != '') {
		                    myEditor.ready(function () {//编辑器初始化完成再赋值  
		                        myEditor.setContent(result.data.remark);  //赋值给UEditor  
		                    });
		                }
		            } else {
		                alertDialog(result.msg, 2);
		            }
		            $scope.$apply();
		        });
		    }
		}])