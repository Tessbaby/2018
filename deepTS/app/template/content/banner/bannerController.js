/**
 * Created by Administrator on 2018/1/29.
 */
app.register.controller('bannerCtrl', function ($rootScope, $scope, $http) {
    layer.closeAll();
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证

    // 获取表格
    function getTable () {
        layer.load(1, {shade: [0.2,'#000']}); // loading
        $http.post($rootScope.setPath(8061) + '/benner/query/list/admin/all', {})
            .success(function (data) {
                $scope.tableList = data;
                $scope.newArr = [];
                angular.forEach(data, function (item, i) {
                    $scope.newArr.push('reload_' + item.id);
                })
                layer.closeAll();
            }).error(function (err) {
            layer.msg('未获取到表格信息', {time: 3000, icon:2});
        })
    }
    getTable ();

    // 发布
    $scope.releaseBanner = function (id) {
        $http.post($rootScope.setPath(8061) + '/benner/release?id=' + id, {})
            .success(function (data) {
                if(data == 0) {
                    layer.msg('发布成功', {time: 3000, icon:1});
                    setTimeout(function () {
                        getTable ();
                    }, 1000);
                } else {
                    layer.msg('发布失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
            layer.msg('发布失败', {time: 3000, icon:2});
        })
    }

    // 编辑
    $scope.editBanner = function (id, release) {
        $scope.wareCode = '';
        $scope.platformBennerId = ''; // 判断是编辑还是添加时用
        $scope.bennerRelease = 0;
        var title = id ? '编辑' : '添加';
        if (id) {
            $scope.bennerRelease = release; // 用于保存时
            $scope.platformBennerId = id; // 用于保存时
            $http.post($rootScope.setPath(8061) + '/benner/query/list?id=' + id, {})
                .success(function (data) {
                    $scope.beforeBennerGoodList = angular.copy(data.platformBennerGoodList); // 用作比对编辑时删除的原有数据
                    $scope.platformBennerGoodList = angular.copy(data.platformBennerGoodList);
                    $scope.img.bottomImg = data.bottomImg;
                    $scope.img.topImg = data.topImg;
                    $scope.img.titleImg = data.titleImg;
                    $scope.isShowTopImg = true;
                    $scope.isShowBottomImg = true;
                    $scope.title = data.title
                }).error(function (err) {
                layer.msg('未获取到详情信息', {time: 3000, icon:2});
            })
        } else {
            $scope.isShowTopImg = false;
            $scope.isShowBottomImg = false;
            $scope.img = {};
            $scope.img.topImg = '';
            $scope.img.bottomImg = '';
            $scope.img.titleImg = '';
            $scope.platformBennerGoodList = [];
            $scope.title = '';
        }
        layer.open({
            type: 1,
            title: title,
            content: $('#editBannerLayer'),
            area: ['50%', '600px'],
            cancel: function () {}
        })
        $('.layui-layer-shade').addClass('hide');
    }
    $scope.goStep = function () {
        $scope.isNextStep = !$scope.isNextStep;
    }
    $scope.cancel = function () {
        layer.closeAll();
    }

    $scope.datePicker = { // 日期配置
        date: '',
        format: "yyyy-MM-dd",
        altInputFormats: ['yyyy-M!-d!'],
        opened: false,
        openPicker: function () {
            this.opened = true;
        }
    };

    // 根据编号获取信息
    $scope.platformBennerGoodList = [];
    $scope.wareCode = '';
    $scope.getWare = function () {
        $http.post($rootScope.setPath(8096) + '/goods/activity/query/code/?code=' + $scope.wareCode, {})
            .success(function (data) {
                if(data) {
                    $scope.goodList = {
                        img: data.img,
                        name: data.name
                    }
                }
            }).error(function (err) {
            layer.msg('查询失败', {time: 3000, icon:2});
        })
    }

    // 取消选择
    $scope.delGoodItem = function (aData) {
        $scope.goodList = {
            img: '',
            name: ''
        }
    }

    // 保存编辑
    $scope.saveEdit = function () {

        if ($scope.title =='') {
            layer.msg('请输入活动名称', {time: 3000, icon:0});
            return;
        } else if ($scope.title.length > 20) {
            layer.msg('活动名称不能超过20字', {time: 3000, icon:0});
            return;
        }

        var url = '';
        url = $scope.platformBennerId ? $rootScope.setPath(8061) + '/benner/edit' : $rootScope.setPath(8061) + '/benner/add';
        var obj = {};
        var param = {};
        param.bennerRelease = $scope.bennerRelease;
        param.bottomImg = $scope.img.bottomImg;
        param.titleImg = $scope.img.titleImg;
        param.topImg = $scope.img.topImg;
        param.platformBennerGoodList = [];
        param.title = $scope.title;
        //param.delGoodList = [];

        if ($scope.platformBennerId) { // 编辑时判断
            param.id = $scope.platformBennerId;
            // 查找是否删掉了原有数据
            var isInList = false;
            var newList = [];
            angular.forEach($scope.beforeBennerGoodList, function (item, i) {
                isInList = false;
                angular.forEach($scope.platformBennerGoodList, function (aItem, j) {
                    if (item.goodsActivityId == aItem.goodsActivityId) {
                        isInList = true; // 不在platformBennerGoodList中 说明已经被删除
                        return;
                    }
                })
                if (!isInList) {
                    newList.push(item.id);
                }
            })
            param.delGoodList = angular.copy(newList);
        }

        angular.forEach($scope.platformBennerGoodList, function (item, i) {
            obj = {
                goodsActivityId: item.goodsActivityId,
                id: item.id,
                platformBennerId: $scope.platformBennerId,
                sort: item.sort,
                code: item.code
            }
            param.platformBennerGoodList.push(obj);
        })

        $http.post(url, angular.toJson(param))
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.msg('保存成功', {time: 3000, icon:1});
                    setTimeout(function () {
                        getTable();
                    }, 1000);
                } else {
                    layer.msg('保存失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
            layer.closeAll();
            layer.msg('保存失败', {time: 3000, icon:2});
        });
    };

    // 删除
    $scope.delBanner = function (id) {
        $http.post($rootScope.setPath(8061) + '/benner/del?id=' + id,{})
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.msg('删除成功', {time: 3000, icon:1});
                    setTimeout(function () {
                        getTable();
                    }, 1000);
                } else {
                    layer.msg('删除失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
            layer.closeAll();
            layer.msg('删除失败', {time: 3000, icon:2});
        });
    }

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) { // 循环完成后 必须加在这 否则会出找不到元素的问题（与onFinishRenderFilters共用）

        // 循环给重新上传的按钮加监听（为了获取id）
        angular.forEach($scope.newArr, function (item) {
            $(document).on('click', '#'+ item, function () {
                var index = item.indexOf('_');
                $scope.reloadId = item.substring(index + 1, item.length);
            })
        })
        var uploader3 = new plupload.Uploader({
            browse_button: $scope.newArr, //触发文件选择对话框的按钮，为那个元素id或者元素本身
            url: 'anything', //文件上传url地址,
        });
        uploader3.init();
        uploader3.bind('FilesAdded',function(uploader, files){

            var reader = new FileReader();
            reader.readAsDataURL(files[0].getNative());
            reader.onload = (function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    if (this.width == 700 && this.height == 372) {
                        layer.load(1, {shade: [0.2,'#000']}); // loading
                        var imgFileName = files[0].name;
                        var fileName = '';
                        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
                            .success(function (data) {
                                fileName = data.key + checkImgExtName(imgFileName);
                                $scope.reloadImg = data.url + '/' + fileName;
                                var _param = {
                                    'key': fileName,
                                    'OSSAccessKeyId': data.OSSAccessKeyId,
                                    'policy': data.policy,
                                    'Signature': data.Signature,
                                }
                                uploader3.setOption({
                                    'url': data.url,
                                    'multipart_params': _param
                                })
                                uploader3.start();
                            }).error(function () {
                            layer.msg('获取图片路径失败', {time: 3000, icon:2});
                        })
                        
                    } else {
                        layer.msg('尺寸不符', {time: 3000, icon:2});
                    }

                };
            });

        });
        uploader3.bind('FileUploaded', function (uploader,file,responseObject) {
            if(responseObject.status == 204) {
                var param = {
                    titleImg: $scope.reloadImg,
                    id: $scope.reloadId
                }
                $http.post($rootScope.setPath(8061) + '/benner/upload/img', param)
                    .success(function (data) {
                        layer.closeAll();
                        if (data == 0) {
                            layer.msg('保存成功', {time: 3000, icon:1});
                            setTimeout(function () {
                                getTable();
                            }, 1000);

                        } else {
                            layer.msg('保存失败', {time: 3000, icon:2});
                        }
                    }).error(function (err) {
                    layer.closeAll();
                    layer.msg('保存失败', {time: 3000, icon:2});
                });
            }
        })
    })

    function checkImgExtName (fileName) {
        var extName
        if (fileName.indexOf(".png") > 0) {
            extName = fileName.slice(fileName.indexOf(".png"), fileName.length)
        } else if (fileName.indexOf(".jpg") > 0) {
            extName = fileName.slice(fileName.indexOf(".jpg"), fileName.length)
        } else if (fileName.indexOf(".jpeg") > 0) {
            extName = fileName.slice(fileName.indexOf(".jpeg"), fileName.length)
        } else {
            layer.msg('图片格式错误', {time: 3000, icon:0});
        }
        return extName;
    }
})