'use strict';

angular.module('app')
    .controller('categoryController', ['$rootScope', '$scope', '$http', '$state', '$location',
        function ($rootScope, $scope, $http, $state, $location) {
            $scope.param = {};
            $scope.param.typeCode = $state.params.typeCode;

            // 判断是list 还是 list2，包含category2 为list2
            //$scope.isCate2 = ($location.absUrl().indexOf('category2') != -1) ? true : false;

            //=======================================验证权限 statr===================================
            //权限模块代码
            //判断是否普通文章模块
            if ($state.includes('main.article.category2')) {
                $scope.isCate2 = true;
                $scope.permissionCode = 'main.article.list2.' + $scope.param.typeCode;
            } else if ($state.includes('main.article.category')) {
                $scope.isCate2 = false;
                $scope.permissionCode = 'main.article.list.' + $scope.param.typeCode;
            }
                //判断是否事件文章模块 faults.article
            else if ($state.includes('main.faults.category')) {
                $scope.isCate2 = false;
                $scope.permissionCode = 'main.faults.article.' + $scope.param.typeCode;
            }
            else if ($state.includes('main.faults.category2')) {
                $scope.isCate2 = false;
                $scope.permissionCode = 'main.faults.article2.' + $scope.param.typeCode;
            }
                //判断是否党员文章模块 faults.article
            else if ($state.includes('main.partyner.category')) {
                $scope.isCate2 = false;
                $scope.permissionCode = 'main.partyner.article.' + $scope.param.typeCode;
            }
            else if ($state.includes('main.partyner.category2')) {
                $scope.isCate2 = false;
                $scope.permissionCode = 'main.partyner.article2.' + $scope.param.typeCode;
            }
            //if ($scope.isCate2) {
            //    $scope.permissionCode = 'main.article.list2.' + $scope.param.typeCode;
            //}
            //else {
            //    $scope.permissionCode = 'main.article.list.' + $scope.param.typeCode;
            //}

            $scope.hasQuery = $.inArray($scope.permissionCode + '.query', $rootScope.permissionList) != -1;
            $scope.hasUpdate = $.inArray($scope.permissionCode + '.update', $rootScope.permissionList) != -1;
            $scope.hasDelete = $.inArray($scope.permissionCode + '.delete', $rootScope.permissionList) != -1;

            $scope.HasQureyType = $.inArray($scope.permissionCode + '.queryType', $rootScope.permissionList) != -1;
            $scope.HasUpdateType = $.inArray($scope.permissionCode + '.deleteType', $rootScope.permissionList) != -1;
            $scope.HasDeleteType = $.inArray($scope.permissionCode + '.updateType', $rootScope.permissionList) != -1;

            if (!$scope.HasQureyType) {
                layer.alert("未经授权，禁止访问！", { icon: 2 });
                history.go(-1);
                return false;
            }

            /*初始化页面*/



            $scope.title = "分类管理";

            $scope.loading = true;
            //validate(null);
            $scope.param.typeCode = $state.params.typeCode;
            $scope.param.id = $state.params.mId;
            $scope.record = {};
            $scope.record.particlecategoryform = [];

            //初始化编辑数据
            $.ajax({
                type: 'put',
                url: $rootScope.baseUrl + '/articleCategory/list',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                data: angular.toJson({ 'typeId': $scope.param.id })
            }).then(function (result) {
                console.log(result);
                $scope.loading = false;
                if (result.httpCode == 200) {
                    $scope.info = result.data;
                    console.log(result);


                } else {
                    alertDialog(result.msg, 2);
                }
                $scope.$apply();

            });

            //删除选项
            $scope.removeOptions = function (key) {
                if ($scope.info.length > 1) {
                    $scope.info.splice(key, 1);
                } else {
                    alert("分类最少一项");
                }

            }

            //添加选项
            $scope.addOptions = function () {
                $scope.info.push({
                    id: '',
                    name: ""
                });
                console.log($scope.info);
            }

            //上移
            $scope.removeUp = function (key) {
                if (key > 0) {
                    var moveInfo = $scope.info.slice(key, key + 1);
                    $scope.info.splice(key, 1);
                    $scope.info.splice(key - 1, 0, moveInfo[0]);
                } else {
                    alert("已经是第一个了");
                }
            }
            //下移
            $scope.removeDown = function (key) {
                if (key < $scope.info.length - 1) {
                    var moveInfo = $scope.info.slice(key, key + 1);
                    $scope.info.splice(key, 1);
                    $scope.info.splice(key + 1, 0, moveInfo[0]);
                } else {
                    alert("已经是最后一个了");
                }
            }

            //提交表单
            $scope.submit = function () {
                $scope.loading = true;
                for (var i in $scope.info) {
                    if ($scope.info[i].name == '') {
                        alert("分类名称不能为空");
                        return;
                    }
                    if ($scope.info[i].name.length > 7) {
                        alert("分类名称不能超过7个字符");
                        return;
                    }
                }
                $scope.record.particlecategoryform = $scope.info;
                $scope.record.typeId = $scope.param.id;
                if ($scope.record) {
                    $scope.isDisabled = true;//提交disabled
                    $.ajax({
                        type: 'POST',
                        url: $rootScope.baseUrl + '/articleCategory/update',
                        dataType: 'json',
                        contentType: 'application/json;charset=UTF-8',
                        data: angular.toJson($scope.record)
                    }).then(callback);
                }
                function callback(result) {
                    if (result.httpCode == 200) {//成功
                        tipDialog("保存成功", 1, 0.8 * 1000, function () {
                            $scope.goArticleList();
                        });
                    } else {

                        $scope.isDisabled = false;
                        $scope.$apply();
                        alertDialog(result.msg, 2);
                    }
                    $scope.loading = false;
                }


            };

            //表单验证
            /*function validate(){
                var validator = jQuery('form').validate({
                    rules: {
                        categoryName: {
                            required: true,
                            maxLengthB:[20]
                        }
                    },
                    messages: {
                        categoryName: {
                            required: '请输入分类名称',
                            maxLengthB:"名称不得超过{0}个字符"
                        }
                    },
                    submitHandler: function() {
                        $scope.submit();
                    }
                });
            }*/


            $scope.goArticleList = function () {

                if ($state.includes('main.article.category2')) {
                    $state.go('main.article.list2', { typeCode: $scope.param.typeCode });

                } else if ($state.includes('main.article.category')) {
                    $state.go('main.article.list', { typeCode: $scope.param.typeCode });
                }
                    //判断是否事件文章模块 faults.article
                else if ($state.includes('main.faults.category')) {
                    $state.go('main.faults.article', { typeCode: $scope.param.typeCode });

                }
                else if ($state.includes('main.faults.category2')) {
                    $state.go('main.faults.article2', { typeCode: $scope.param.typeCode });
                }
                    //判断是否党员文章模块 faults.article
                else if ($state.includes('main.partyner.category')) {
                    $state.go('main.partyner.article', { typeCode: $scope.param.typeCode });
                }
                else if ($state.includes('main.partyner.category2')) {
                    $state.go('main.partyner.article2', { typeCode: $scope.param.typeCode });
                }

            }

        }]);