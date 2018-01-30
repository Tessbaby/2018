/**
 * Created by Administrator on 2018/1/29.
 */

app.register.controller('shopCtrl', function ($rootScope, $scope, httpAjax, $cookies, $location, $http) {
    var height = $(window).height() - 160;
    var width = $(window).width();
    $('.con-main').height(height);
    $('.bg').height(height + 60).width(width);
    $rootScope.checkIn()//验证
    validate();

    // 设置查询参数
    $scope.search = {};
    $scope.search.name = '';

    // 获取表格
    $rootScope.searchTable('8070/shop/back/query?name=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8070/shop/back/query?name=' + $scope.search.name + '&page='+ $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    $scope.allSelectFun = {
        // 品牌
        changeEditShop : function (val) {
            $('.ed_shop').addClass('block');
        },
        blurEditShop: function () {
            $('.ed_shop').removeClass('block');
        },
        getEditShop : function (id, val) {
            $scope.param.shopName = val;
            $scope.param.brandId = id;
            $('.ed_shop').removeClass('block');
        },
        // 分类
        changeEditShopClass : function (val) {
            $('.ed_shop_class').addClass('block');
        },
        blurEditShopClass: function () {
            $('.ed_shop_class').removeClass('block');
        },
        getEditShopClass : function (id, val) {
            $scope.param.className = val;
            $scope.param.classId = id;
            $('.ed_shop_class').removeClass('block');
        }
    };

    // 获取二维码
    $scope.getCode = function (shopId) {
        $.ajax({
            url:  $rootScope.default.dPath + '9070/qrcode',
            method: 'post',
            data: 'shop-manage-add:' + shopId,
            withCredentials: true,//跨域
            headers: {
                'content-type': 'application/json'
            },
            success: function (data) {
                window.location.href = data;
            },
            error: function () {
                layer.msg('二维码获取失败', {time: 3000, icon:2});
            }
        })
    }

    // 添加&编辑
    $scope.editShop = function (id) {
        $scope.id = id; // 店铺id
        var title = id ? '编辑' : '添加';
        if(id) {
            // 获取详情
            $http.post($rootScope.default.dPath + '8070/shop/query/enityShopid?shopid=' + id, {})
                .success(function (data) {
                    $scope.param = {
                        className: data.className,
                        id: id,
                        appId: data.appId,
                        cityName: data.cityName,
                        classId:  data.classId,
                        countyName: data.countyName,
                        disable: data.disable,
                        latitude: data.latitude,
                        logo: data.logo,
                        longitude: data.longitude,
                        phone: data.phone,
                        provinceName: data.provinceName,
                        shopAddress: data.shopAddress,
                        shopName: data.shopName,
                        //brandId: data.brandId
                    };
                    $scope.isShowImg = true;
                    // getCode(); 获取二维码
                }).error(function (err) {
                layer.msg('获取失败', {time: 3000, icon:2});
            })
        } else {
            $scope.param = {
                className: '',
                appId:'',
                appSecret:'',
                cityName:'',
                classId: '',
                countyName:'',
                disable: 0,
                latitude:'',
                logo:'',
                longitude:'',
                phone: '',
                provinceName:'',
                shopAddress: '',
                shopName: '',
                mchId:'',
                mchKey:'',
                brandId: ''
            };
            $scope.isShowImg = false;
        }

        // 获取下拉框值 // 一级分类
        $http.post($rootScope.default.brandPath, {})
            .success(function (data) {
                $scope.brandData = data;
            }).error(function (err) {
            layer.msg('未获取到品牌信息', {time: 3000, icon:2});
        })
        $http.post($rootScope.default.ClassifyPath, {})
            .success(function (data) {
                $scope.classData = data;
            }).error(function (err) {
            layer.msg('未获取到分类信息', {time: 3000, icon:2});
        })

        layer.open({
            type: 1,
            title: title,
            content: $('#editShopLayer'),
            area: ['50%', '650px'],
            cancel: function () {
            }
        })
        $('.layui-layer-shade').addClass('hide');
    }

    // 启用&禁用
    $scope.changeDisabled = function (id, dis) {
        var url = '',
            tip = '';
        url = dis == 1 ? $rootScope.default.dPath + '8070/shop/enabled?id=' + id : $rootScope.default.dPath + '8070/shop/disable?id=' + id;
        tip = dis == 1 ? '启用' : '禁用';
        $http.post(url, {})
            .success(function (data) {
                if(data == 0) {
                    layer.msg(tip + '成功', {time: 3000, icon:1});
                    setTimeout(function () {
                        $scope.search.searchFun();
                    }, 1000);
                } else {
                    layer.msg(tip + '失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
            layer.msg(tip + '成功', {time: 3000, icon:2});
        });
    }

    // 图片上传
    $scope.isShowImg = false;
    var uploader = new plupload.Uploader({
        browse_button: 'selectfiles', //触发文件选择对话框的按钮，为那个元素id或者元素本身
        url: 'anything', //文件上传url地址,
    });
    uploader.init();
    uploader.bind('FilesAdded',function(uploader, files){
        var imgFileName = files[0].name;
        var fileName = '';
        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
            .success(function (data) {
                fileName = data.key + checkImgExtName(imgFileName);
                $scope.currentLogo = data.url + '/' + fileName;
                var _param = {
                    'key': fileName,
                    //'Content-Disposition': 'attachment;filename=' + fileName,
                    'OSSAccessKeyId': data.OSSAccessKeyId,
                    'policy': data.policy,
                    'Signature': data.Signature,
                    //'Content-Disposition: form-data; name="file"; filename=': fileName
                }
                uploader.setOption({
                    'url': data.url,
                    'multipart_params': _param
                })
                uploader.start();
            }).error(function () {
            layer.msg('获取图片路径失败', {time: 3000, icon:2});
        })
    });
    uploader.bind('FileUploaded', function (uploader,file,responseObject) {
        if(responseObject.status == 204) {
            $scope.isShowImg = true;
            $scope.param.logo = $scope.currentLogo;
            $scope.$apply();
        }
    })

    // 分页
    $scope.goPage = function (page) {
        $rootScope.table.pageInfo.number = page;
        $scope.search.searchFun();
    }
    $scope.goNextPage = function () {
        if($rootScope.table.pageInfo.totalPages.length != $rootScope.table.pageInfo.number) {
            $rootScope.table.pageInfo.number += 1;
            $scope.search.searchFun();
        }
    }
    $scope.goPrePage = function () {
        if($rootScope.table.pageInfo.number != 1) {
            $rootScope.table.pageInfo.number -= 1;
            $scope.search.searchFun();
        }
    }

    // 表单验证
    function validate() {
        $('#editForm').validate({
            rules: {
                shopName: { required: true },
                className: { required: true },
                address: { required: true },
                phone: { phone: true }
            },
            messages: {
                shopName: { required: '请添加品牌' },
                className: { required: '请添加分类' },
                address: { required: '请填写地址' },
            },
            submitHandler: function () {
                saveShop();
            }
        })
    }

    // 保存数据
    function saveShop () {
        // 保存数据
        var saveUrl = '';
        saveUrl = $scope.id ? $rootScope.default.dPath + '8070/shop/edit' : $rootScope.default.dPath + '8070/shop/add';

        // 保存数据
        $http.post(saveUrl, angular.toJson($scope.param), {'Content-Type':'application/x-www-form-urlencoded'})
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.msg('保存成功', {time: 3000, icon:1});
                    setTimeout(function () {
                        $scope.search.searchFun();
                    }, 1000);
                } else {
                    layer.msg('保存失败', {time: 3000, icon:2});
                }
            })
            .error(function () {
                layer.closeAll();
                layer.msg('保存失败', {time: 3000, icon:2});
            })
        layer.closeAll();
    }

    // 截取图片名
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
