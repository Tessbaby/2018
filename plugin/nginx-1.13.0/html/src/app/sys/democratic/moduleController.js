'use strict';

angular.module('app')
	.controller('demoModuleController', ['$rootScope', '$scope', '$http', '$state', '$timeout',
    function ($rootScope, $scope, $http, $state, $timeout) {
    	$scope.title = '评议规则设置';
        $scope.btnInfo = '保存';
        $scope.btnState = true;
        $scope.percentTxt = '控制百分比';
        // $scope.showPercent = false;

        // 查看最新评议模板
        $.ajax({
            type: 'get',
            url: $rootScope.baseUrl + '/sysDeptComment/newtemplate',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            data: ''
        }).then(function (result) {
            // console.log(result);
            if (result.httpCode == 200) {
                $scope.info = result.data;
                // console.log()
                if ($scope.info.percentum) {
                    var index;
                    angular.forEach($scope.info.percentum, function (item) {
                        if (item != null) {
                            index = $.inArray(item, $scope.info.percentum);
                        }
                    })
                }
                
                // console.log($scope.info)
            } else {
                alertDialog(result.msg, 2);
            }
            $scope.$apply();
            if ($scope.info.percentum.length > 0) {
                // console.log(index)
                $scope.info.percentum[index] = $scope.info.percentum[index].substr(0, $scope.info.percentum.length)
                $('#in' + (index)).removeClass('hide').val($scope.info.percentum[index]);
                $('#sp' + (index)).removeClass('hide');
            }
        });

        // 删除内容
        $scope.removeOptions = function (key) {
            if ($scope.info.contents.length > 1) {
                $scope.info.contents.splice(key, 1);
            } else {
                alert("内容最少一项");
            }
        }
        // 添加内容
        $scope.addOptions = function (key) {
            $scope.info.contents.splice(key, 0, {
                content: "",
                enable: "1",
                id: "",
                remark: ""
            });
            // console.log($scope.info.contents)
        }

        // 删除评级
        $scope.removeLevel = function (key) {
            if ($scope.info.levels.length > 1) {
                $scope.info.levels.splice(key, 1);
            } else {
                alert("内容最少一项");
            }
        }
        // 添加评级
        $scope.addLevel = function (key) {
            $scope.info.levels.splice(key, 0, '');
        }

        // 选择百分比
        $scope.choosePer = function (val) {
            $('input.per-input').val('');
            $('.per-input').addClass('hide');
            $('#in' + val).removeClass('hide');
            $('#sp' + val).removeClass('hide');
        }

        $scope.submit = function () {
            var _data = setData();
            console.log(_data);
            if (_data) {
                $scope.btnInfo = '发布中...';
                $scope.btnState = false;
                $.ajax({
                  url: '/iBase4J-SYS-Web/sysDeptComment/newtemplate',
                  type: 'post',
                  data: angular.toJson(_data)
                }).then(function (result) {
                    if (result.httpCode == 200) {
                        tipDialog("保存成功", 1, 0.8 * 1000, function () {
                            $state.go('main.party.comment');
                        });
                    } else {
                        $scope.btnInfo = '发布';
                        $scope.btnState = true;
                        alertDialog(result.msg, 2);
                    }
                    $scope.$apply();
                })
            }
        }

    	$scope.showModule = function () {
            var _data = setData();
            if (_data) {
                $scope.moduleList = {}; // 预览模板数据
                $scope.colspan = _data.levels.length;
                $scope.moduleList.contents = angular.copy(_data.contents);
                $scope.moduleList.levels = [];
                angular.forEach(_data.contents, function (item, i) {
                    angular.forEach(_data.levels, function (value, i) {
                        $scope.moduleList.levels.push(value);
                    })
                    
                })
                layer.open({
                    type: 1,
                    title: '民主评议党员测评表预览',
                    area: ['80%', '500px'],
                    content: $('#moduleTable')
                })
            }
    		
    	}

        // 取消
        $scope.cancel = function () {
            layer.confirm('确认取消吗?', function (index) {
                layer.close(index);
                $state.go('main.party.comment');
            })
        }

        function setData() {
            var go = true;
            var param = {};
            param.contents = [];
            angular.forEach($scope.info.contents, function (item, i) {
                param.contents[i] = {};
                param.contents[i].content = item.content;
                param.contents[i].isAll = item.isAll == 1 ? parseInt(item.isAll) : -1;
            })
            var elems = $('#level textarea');
            var levels = [],
                level = '';
            angular.forEach(elems, function (item, i) {
                level = item.value;
                if (level == '') {
                    go = false;
                    tipDialog("评议级别不能为空", 2);
                }
                levels.push(level);
            })
            param.levels = levels;
            angular.forEach(param.contents, function (item, i) {
                if (item.content == '') {
                    go = false;
                    tipDialog("评议内容不能为空", 2);
                    return;
                }
            })
            param.id = $scope.info.id == null ? '' : $scope.info.id;
            param.percentum = [];
            var elems = $('.per');
            angular.forEach(elems, function (item) {
                if (item.value < 0 || item.value > 100) {
                    go = false;
                    tipDialog("百分比请输入大于0小于100的数", 2);
                    return;
                }
                // } else if (!Number(item.value)) {
                //     go = false;
                //     tipDialog("百分比请输入数字", 2);
                //     return;
                // }
                param.percentum.push(item.value == '' ? null : item.value + '%');
            })
            if ($('input.per-radio:checked').length == 0) {
                go = false;
                tipDialog("评议百分比控制至少选择一个", 2);
            }
            if (go) {
                return param;
            } else {
                return go;
            }
        }
    }])