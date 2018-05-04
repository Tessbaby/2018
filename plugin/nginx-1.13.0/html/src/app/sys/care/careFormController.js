'use strict';

angular.module('app')
    .controller('careFormController', ['$rootScope', '$scope', '$http', '$state',
        function ($rootScope, $scope, $http, $state) {

            var id = $state.params.id;

            if (id) {
                $scope.title = '编辑';
                getModel(id);
            } else {
                $scope.title = '提交';
            }

            $scope.typeList = [{
                name: "公历事件",
                value: "-1"
            },
            {
                name: "农历事件",
                value: "1"
            }];
          
            //控制按钮显示状态
            $scope.btnInfo = '提交';
            $scope.btnState = false;
            $scope.isDefault = false;
            validate();
            $scope.record = {};
            $scope.record.isYl = -1;
            $scope.record.templateid = "";
            function getModel(id) {
                // 文件流转详情
                $.ajax({
                    type: 'PUT',
                    url: '/iBase4J-SYS-Web/sysUserHeart/read/detail',
                    data: angular.toJson({ id: id })
                }).then(function (result) {
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        $scope.record = result.data;
                        if ($scope.record.isdefault==1) {
                            $scope.isDefault = true;
                        }
                    } else {
                        // $scope.msg = result.msg;
                        alertDialog(result.msg, 2);
                    }
                    $scope.tolCount();
                    $scope.$apply();
                });
            }


            //文本框剩余字数
            $scope.count = 0;
            $scope.tolCount = function () {
                $scope.count = $scope.record.topic.length;
            }
            //提交表单
            $scope.submit = function () {
				//console.log($scope.record);
				if($scope.record.templateid==""){
				    alertDialog('请选择模板', 2);
				    return;
				}
                saveData();
            };
            $scope.MyDepartName = "党委";
            $.ajax({
                type: 'get',
                url: '/iBase4J-SYS-Web/sysUserHeart/getMyDepartName',
                data: angular.toJson($scope.record)
            }).then(function (result) {
              
                if (result.httpCode == 200) {//成功
                    $scope.MyDepartName = result.data;
                } else {
                  
                    alertDialog(result.msg, 2);

                }
            });

            function saveData() {
                ShowLoading();
                $scope.btnInfo = '提交中...';
                $scope.btnState = true;

                $scope.record.tdate = $("#tdate").val();
                $.ajax({
                    type: 'POST',
                    url: '/iBase4J-SYS-Web/sysUserHeart',
                    data: angular.toJson($scope.record)
                }).then(function (result) {
                    HideLoading();
                    if (result.httpCode == 200) {//成功
                        tipDialog("保存成功", 1, 0.8 * 1000, function () {
                            $state.go('main.care.list');
                        });
                    } else {
                        $scope.btnInfo = '提交';
                        $scope.btnState = false;
                        alertDialog(result.msg, 2);
                        $scope.$apply();
                    }
                });
            }


            new calendar({
                el: 'tdate',
                lunar: true
            });

            //表单验证
            function validate() {
                var validator = jQuery('form').validate({
                    ignore: "",
                    rules: {
                        title: {
                            required: true,
                            maxlength: 100
                        },
                        tname: {
                            required: true,
                            maxlength: 100
                        },
                        isYl: {
                            required: true
                        },

                        topic: {
                            required: true,
                            maxlength: 80
                        },
                        tdate: {
                            required: true,
                            date: true
                        }


                    },
                    messages: {
                        title: {
                            required: '请输入主题',
                            maxlength: "主题不得超过100个字符"
                        },
                        tname: {
                            required: '请输入节日名称',
                            maxlength: "节日名称不得超过100个字符"
                        },
                        isYl: {
                            required: '请选择事件类型'
                        },
                        topic: {
                            required: '请输入祝福语',
                            maxlength: "祝福语不得超过80个字符"
                        },

                        tdate: {
                            required: '请输入事件日期',
                            date: '事件日期必须为日期格式'
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                });

            }

            //var tdate = {
            //    elem: '#tdate',
            //    format: 'YYYY/MM/DD',
            //    //min: laydate.now(0, "YYYY/MM/DD hh:mm:00"), //设定最小日期为当前日期
            //    max: '2099-06-16', //最大日期
            //    istime: false,
            //    istoday: true, //是否显示今天
            //    issure: true, //是否显示确认
            //    festival: true, //是否显示节日
            //    choose: function (datas) {

            //        $scope.record.tdate = datas;

            //    }
            //};

            //laydate(tdate);
            $scope.cancel = function () {
                layer.confirm('您确认放弃本次编辑吗？', function (index) {
                    layer.close(index);
                    $state.go('main.care.list');
                })
            }

            //选择模板
            $scope.choseModel = function () {
                layer.open({
                    type: 1,
                    title: '选择模板',
                    shade: 0.5,
                    moveType: 1,
                    shift: 1,
                    skin: 'layer-add',
                    content: $('#modelId')
                });

            }
            //预览
            $scope.showDetail = function () {
                if (!$scope.record.templateid) {
                    layer.msg("请先选择模板！");
                    return;
                }
                layer.open({
                    type: 1,
                    title: false,
                    shade: 0.5,
                    moveType: 1,
                    shift: 1,
                    area: ['414px', '90%'],
                    skin: 'layer-add',
                    content: $('#preview')
                });

            }
            //选择模板后关闭层
            $scope.modelChange = function (val) {
				$("#templateInfo").text(val);
                layer.closeAll();
            }
        }]);