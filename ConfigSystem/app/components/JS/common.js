/**
 * Created by Administrator on 2018/1/3.
 */
'use strict'

/* 导航 */
app.controller('navCtrl', function ($scope, $http, $rootScope, $location) {
    $rootScope.navList = [
        //{
        //    permission: '#/index',
        //    name: '首页',
        //    id: 1,
        //    children: []
        //},
        {
            permission: '#/classify',
            name: '分类',
            id: 2,
            icon: 'iconfont icon-fenlei',
            children: [
                /*{permission: '#/classify', name: '分类1', id: 2, children: []}*/
            ]
        },
        {
            permission: '#/shop',
            name: '店铺',
            id: 3,
            icon: 'iconfont icon-dianpu',
            children: []
        },
        {
            permission: '#/waresPatrol',
            name: '商品巡查',
            id: 4,
            icon: 'iconfont icon-shangpin',
            children: []
        },
        {
            permission: '#/ticketCenter',
            name: '卡券中心',
            id: 5,
            icon: 'iconfont icon-youhuiquan',
            children: []
        },
        {
            permission: '#/banner',
            name: '活动banner',
            id: 6,
            icon: 'iconfont icon-tubiao-',
            children: []
        },
        {
            permission: '#/order',
            name: '订单',
            id: 7,
            icon: 'iconfont icon-dingdan',
            children: []
        },
        {
            permission: '#/manage',
            name: '管理员',
            id: 8,
            icon: 'iconfont icon-guanliyuan',
            children: []
        }
    ];

    $('.drop').on('click', function () {
        var target = event.target;
        $(target).next().slideToggle();
    })
})

/* login */
app.controller('loginCtrl', function ($scope, $rootScope, $cookies, $http, $window) {
    // 设置登录样式
    var w_width = $('body').width(),
        w_height = $('body').height();
    $('.login').width(w_width).height(w_height);
    $cookies.put('uuid', '');

    $.ajax({
        url: $rootScope.default.dPath + '8066/auth/create/uuid',
        method: 'get',
        headers: {
            "content-type": "text/plain"
        },
        success:function (data) {
            $cookies.put('uuid',data);
            $rootScope.wxConnect = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + $rootScope.default.appid + '&redirect_uri=http%3A%2F%2F' + $rootScope.default.yPath + '%2Fauth%2Fread%2Fwx%2Fopenid&response_type=code&scope=snsapi_base&state=' + data
            $.ajax({
                url: $rootScope.default.dPath + '9070/qrcode',
                method: 'post',
                data: $rootScope.wxConnect,
                //dataType: "text",
                withCredentials: true,//跨域
                headers: {
                    'content-type': 'application/json'
                },
                success: function (_data) {
                    $scope.loginImg = _data;
                    $scope.$apply();
                    setWS();
                },
                error: function () {
                    layer.msg('二维码获取失败', {time: 3000, icon:2});
                }
            })
        },
        error: function (err) {
        }
    })

    function setWS () {
        $cookies.put('openId', '');// 先清除cookies
        $scope.isLogin = false;
        // 长链接请求
        var ws = new WebSocket($rootScope.default.ws);
        ws.onopen = function(){
            console.log($cookies.get('uuid'))
            var uuid = $cookies.get('uuid');
            ws.send(uuid);
        };
        ws.onmessage = function(message) {
            console.log(message);
            $scope.isLogin = true;
            if(message.data == 'error') {
                layer.msg('非授权用户！', {time: 3000, icon:2});
                return;
            }
            if (message.data) {
                $cookies.put('openId', message.data);
                layer.msg('登录成功', {time: 3000, icon:1})
                setTimeout(function () {
                    window.location = '#/classify';
                }, 1000);
            }
        };
        ws.onclose = function(evt){
            if (!$scope.isLogin) {
                layer.msg('请求超时, 正在重新生成二维码！', {time: 3000, icon:2});
                $window.location.reload();
            }
        };
        ws.onerror = function(evt){
            layer.msg('登录失败，请重新登录！', {time: 3000, icon:2});
            $window.location.reload();
        };
    }
})


/* 分类 */
app.controller('classifyCtrl', function ($rootScope, $scope, httpAjax, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证
    validate();

    /* 设置查询参数 */
    $scope.search = {};
    $scope.search.rootid = '';
    $scope.search.name = '';

    /* 获取表格 */
    $rootScope.searchTable('8060/goods/class/back/query?rootid=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8060/goods/class/back/query?rootid=' + $scope.search.rootid + '&page='+ $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    /* 获取下拉菜单分类 二级分类*/
    httpAjax.postData($rootScope.default.ClassifyPath2, '').then(function (data) {
        $scope.dummyData = data;
    })
    /* 获取下拉选中项 有多个下拉时 暂时定义多个 如果有其他方法在做修改*/
    $scope.allSelectFun = {
        changeMainClassify : function (val) {
            if(val) {
                $('.se_class').addClass('block');
            } else {
                $scope.search.rootid = '';
                $('.se_class').removeClass('block');
            }
        },
        getMainClassify : function (id, name) {
            // 查询参数
            $scope.search.name = name
            $scope.search.rootid = id;
            $('.se_class').removeClass('block');
        },
        changeEditClassify : function (val) {
            $('.ed_class').addClass('block');
        },
        getEditClassify : function (id, val) {
            $scope.param.classRootName = val;
            $scope.param.classRootId = id;
            $('.ed_class').removeClass('block');
        }
    };

    $scope.editClassify = function (item) {
        // 设置保存&修改 参数
        $scope.param = {};
        if (item) {
            $scope.param.name = item.name;
            $scope.param.classRootId = item.classRootId;
            $scope.param.classRootName = item.classRootName;
            $scope.param.classFatherId = item.classFatherId;
            $scope.param.classFatherName = item.classFatherName;
            $scope.param.img = item.img;
            $scope.param.disable = item.disable;
            $scope.param.id = item.id;
            $scope.title = '编辑';
            $scope.isShowImg = true;
        } else {
            $scope.param.name = '';
            $scope.param.classRootId = '';
            $scope.param.classRootName = '';
            $scope.param.classFatherId = '';
            $scope.param.classFatherName = '';
            $scope.param.img = '';
            $scope.param.disable = '';
            $scope.param.id = '';
            $scope.title = '添加';
            $scope.isShowImg = false;
        }
        // 获取下拉二级菜单分类
        httpAjax.postData($rootScope.default.ClassifyPath, '').then(function (data) {
            $scope.dummyData = data;
        })
        layer.open({
            type: 1,
            title: $scope.title,
            content: $('#editClassLayer'),
            area: ['50%', '550px']
        })
        $('.layui-layer-shade').addClass('hide');
    }

    // 启用&禁用
    $scope.changeDisabled = function (id, dis) {
        var url = '',
            tip = '';
        url = dis == 1 ? $rootScope.default.dPath + '8060/goods/class/enabled?id=' + id : $rootScope.default.dPath + '8060/goods/class/del?id=' + id;
        tip = dis == 1 ? '启用' : '禁用';
        $http.post(url, {})
            .success(function (data) {
                if(data == 0) {
                    layer.msg(tip + '成功', {time: 3000, icon:1});
                    $scope.search.searchFun();
                } else {
                    layer.msg(tip + '失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
                layer.msg(tip + '失败', {time: 3000, icon:2});
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
                $scope.param.img = data.url + '/' + fileName;
                //console.log(fileName);
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
        console.log(responseObject);
        if(responseObject.status == 204) {
            $scope.isShowImg = true;
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
                classRootName: { required: true },
                name: { required: true }
            },
            messages: {
                classRootName: { required: '请选择分类' },
                name: { required: '请输入子分类' }
            },
            submitHandler: function () {
                saveClassify();
            }
        })
    }

    // 保存数据
    function saveClassify () {
        var saveUrl = '';
        saveUrl = $scope.title == '添加' ? $rootScope.default.dPath + '8060/goods/class/add' : $rootScope.default.dPath + '8060/goods/class/edit';

        // 保存数据
        $http.post(saveUrl, $scope.param, {'Content-Type':'application/x-www-form-urlencoded'})
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.msg('保存成功', {time: 3000, icon:1});
                    $scope.search.searchFun();
                } else {
                    layer.msg('保存失败', {time: 3000, icon:2});
                }
            })
            .error(function () {
                layer.closeAll();
                layer.msg('保存失败', {time: 3000, icon:2});
            })
    }

    // 截取url
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


/* 店铺 */
app.controller('shopCtrl', function ($rootScope, $scope, httpAjax, $cookies, $location, $http) {
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
        getEditShop : function (id, val) {
            $scope.param.shopName = val;
            $scope.param.brandId = id;
            $('.ed_shop').removeClass('block');
        },
        // 分类
        changeEditShopClass : function (val) {
            $('.ed_shop_class').addClass('block');
        },
        getEditShopClass : function (id, val) {
            $scope.param.className = val;
            $scope.param.classId = id;
            $('.ed_shop_class').removeClass('block');
        }
    };

    // 添加&编辑
    $scope.editShop = function (id) {
        $scope.id = id;
        var title = id ? '编辑' : '添加';
        if(id) {
            // 获取详情
            $http.post($rootScope.default.dPath + '8070/shop/query/enityShopid?shopid=' + id, {})
                .success(function (data) {
                    //console.log(data);
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
            area: ['50%', 'auto'],
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
                    $scope.search.searchFun();
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
                $scope.param.logo = data.url + '/' + fileName;
                //console.log(fileName);
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
        console.log(responseObject);
        if(responseObject.status == 204) {
            $scope.isShowImg = true;
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
                    $scope.search.searchFun();
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



/* 商品巡查 */
app.controller('waresPatrolCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证

    // 是否爆款选框
    $scope.isChecked = function (event) {
        var target = window.event;
        var _this = $(target.srcElement)
        if (_this[0].tagName == 'LABEL') {
            _this.toggleClass('checked');
            $scope.search.isHot = $scope.search.isHot == 1 ? 0 : 1;
        }
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

    // 设置查询参数
    $scope.search = {};
    $scope.search.date = '';
    $scope.search.goodsclassid = '';
    $scope.search.className = '';
    $scope.search.brandName = '';
    $scope.search.brandid = '';
    $scope.search.isHot = 0;

    // 获取表格
    $rootScope.searchTable('8096/goods/activity/back/activity/query?date=&goodsclassid=&brandid=&ishot=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        var date = angular.element('#date')[0].value
        $scope.search.date = $rootScope.compareDate(date);
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8096/goods/activity/back/activity/query?date=' + $scope.search.date + '&goodsclassid=' + $scope.search.goodsclassid + '&brandid=' + $scope.search.brandid + '&ishot=' + $scope.search.isHot + '&page=' + $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    /* 点击巡查 */
    $scope.showCard = function (img) {
        layer.open({
            type: 1,
            shade: false,
            title: false, //不显示标题
            content: '<div style="width: 300px; height: 300px; padding: 20px;"><img src="' +  img + '" alt="图片加载失败" style="width: 100%; height: 100%;"></div>'
        });
    }

    // 获取下拉框值
    $http.post($rootScope.default.brandPath, {})
        .success(function (data) {
            $scope.brandData = data;
        }).error(function (err) {
            layer.msg('未获取到品牌信息', {time: 3000, icon:2});
        })
    $http.post($rootScope.default.ClassifyPath3, {})
        .success(function (data) {
            $scope.classData = data;
        }).error(function (err) {
            layer.msg('未获取到分类信息', {time: 3000, icon:2});
        })

    $scope.allSelectFun = {
        // 品牌
        changeMainBrand: function (val) {
            if (val) {
                $('.se_brand').addClass('block');
            } else {
                $scope.search.brandid = '';
                $('.se_brand').removeClass('block');
            }
        },
        getMainBrand: function (id, val) {
            $scope.search.brandName = val;
            $scope.search.brandid = id;
            $('.se_brand').removeClass('block');
        },
        // 分类
        changeMainClass: function (val) {
            if (val) {
                $('.se_class').addClass('block');
            } else {
                $scope.search.brandid = '';
                $('.se_class').removeClass('block');
            }
        },
        getMainClass: function (id, val) {
            $scope.search.className = val;
            $scope.search.goodsclassid = id;
            $('.se_class').removeClass('block');
        }
    };

    $scope.changeDisabled = function (id, shopid, dis) {
        var url = '',
            tip = '';
        url = dis == 1 ? $rootScope.default.dPath + '8096/goods/activity/enabled?id=' + id + '&shopid=' + shopid : $rootScope.default.dPath + '8096/goods/activity/disable?id=' + id + '&shopid=' + shopid;
        tip = dis == 1 ? '上架' : '下架';
        $http.post(url, {})
            .success(function (data) {
                if (data == 0) {
                    layer.msg(tip + '成功', {time: 3000, icon:1});
                    $scope.search.searchFun();
                } else {
                    layer.msg(tip + '失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
                layer.msg(tip + '失败', {time: 3000, icon:2});
            });
    }

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


})



/* 卡券中心 */
app.controller('ticketCenterCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证

    $scope.datePicker = { // 日期配置
        date: '',
        format: "yyyy-MM-dd",
        altInputFormats: ['yyyy-M!-d!'],
        opened: false,
        openPicker: function () {
            this.opened = true;
        }
    };

    $scope.search = {};
    $scope.search.date = '';
    $scope.search.brandid = '';
    $scope.search.brandName = '';

    // 获取表格
    $rootScope.searchTable('8093/coupon/back/query?date=&brandid=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        var date = angular.element('#date')[0].value;
        $scope.search.date = $rootScope.compareDate(date);
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8093/coupon/back/query?date=' + $scope.search.date + '&brandid=' + $scope.search.brandid + '&page=' + $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    /* 点击巡查 */
    $scope.showCard = function (img) {
        layer.open({
            type: 1,
            shade: false,
            title: false, //不显示标题
            content: '<div style="width: 300px; height: 300px; padding: 20px;"><img src="' +  img + '" alt="图片加载失败" style="width: 100%; height: 100%;"></div>'
        });
    }

    // 获取下拉框值
    $http.post($rootScope.default.brandPath, {})
        .success(function (data) {
            $scope.brandData = data;
        }).error(function (err) {
            layer.msg('未获取到品牌信息', {time: 3000, icon:2});
        })

    $scope.allSelectFun = {
        // 品牌
        changeMainBrand: function (val) {
            if (val) {
                $('.se_brand').addClass('block');
            } else {
                $scope.search.brandid = '';
                $('.se_brand').removeClass('block');
            }
        },
        getMainBrand: function (id, val) {
            $scope.search.brandName = val;
            $scope.search.brandid = id;
            $('.se_brand').removeClass('block');
        }
    }

    $scope.changeDisabled = function (id, dis) {
        var url = '',
            tip = '';
        url = dis == 1 ? $rootScope.default.dPath + '8093/coupon/enabled?id=' + id : $rootScope.default.dPath + '8093/coupon/disable?id=' + id;
        tip = dis == 1 ? '启用' : '禁用';
        $http.post(url, {})
            .success(function (data) {
                if(data == 0) {
                    layer.msg(tip + '成功', {time: 3000, icon:1});
                    $scope.search.searchFun();
                } else {
                    layer.msg(tip + '失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
                layer.msg(tip + '失败', {time: 3000, icon:2});
            });
    }

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

})



/* 活动banner */
app.controller('bannerCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证

    // 获取表格
    function getTable () {
        layer.load(1, {shade: [0.2,'#000']}); // loading
        $http.post($rootScope.default.dPath + '8061/benner/query/list/all', {})
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
        $http.post($rootScope.default.dPath + '8061/benner/release?id=' + id, {})
            .success(function (data) {
                if(data == 0) {
                    layer.msg('发布成功', {time: 3000, icon:1});
                    getTable ();
                } else {
                    layer.msg('发布失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
                layer.msg('发布失败', {time: 3000, icon:2});
            })
    }

    // 编辑
    $scope.editBanner = function (id, release) {
        $scope.platformBennerId = ''; // 判断是编辑还是添加时用
        $scope.bennerRelease = 0;
        $scope.isNextStep = false;
        var title = id ? '编辑' : '添加';
        if (id) {
            $scope.bennerRelease = release; // 用于保存时
            $scope.platformBennerId = id; // 用于保存时
            $http.post($rootScope.default.dPath + '8061/benner/query/list?id=' + id, {})
                .success(function (data) {
                    $scope.beforeBennerGoodList = angular.copy(data.platformBennerGoodList); // 用作比对编辑时删除的原有数据
                    $scope.platformBennerGoodList = angular.copy(data.platformBennerGoodList);
                    $scope.img.bottomImg = data.bottomImg;
                    $scope.img.topImg = data.topImg;
                    $scope.isShowTopImg = true;
                    $scope.isShowBottomImg = true;
                    console.log(data);
                }).error(function (err) {
                    layer.msg('未获取到详情信息', {time: 3000, icon:2});
                })
        } else {
            $scope.isShowTopImg = false;
            $scope.isShowBottomImg = false;
            $scope.img = {};
            $scope.img.topImg = '';
            $scope.img.bottomImg = '';
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

    // 根据编号获取信息
    $scope.platformBennerGoodList = [];
    $scope.wareCode = '';
    $scope.getWare = function () {
        $http.post($rootScope.default.dPath + '8096/goods/activity/query/code/?code=' + $scope.wareCode, {})
            .success(function (data) {
                if(data) {
                    //var _data = angular.copy(data);
                    var isIn = false;
                    if ($scope.platformBennerGoodList) {
                        var arr = $scope.platformBennerGoodList,
                            aId = data.goodsActivityId;
                        angular.forEach(arr, function (item, i) {
                            if (item.goodsActivityId == aId) {
                                layer.msg('商品已添加', {time: 3000, icon:0});
                                isIn = true;
                            }
                        })
                    }
                    if (!isIn) {
                        var _data = {};
                        _data.id = '';
                        _data.sort = '';
                        _data.code = $scope.wareCode;
                        _data.platformBennerId = $scope.platformBennerId;
                        _data.goodsActivityId = data.goodsActivityId;
                        _data.goodsImg = data;
                        $scope.platformBennerGoodList.push(_data);
                        console.log($scope.platformBennerGoodList);
                    }
                }
            }).error(function (err) {
                layer.msg('查询失败', {time: 3000, icon:2});
            })
    }

    // 取消选择
    $scope.delGoodItem = function (aData) {
        var arr = $scope.platformBennerGoodList,
            aId = aData.goodsActivityId,
            newArr = [];
        angular.forEach(arr, function (item, i) {
            if (item.goodsActivityId != aId) {
                newArr.push(item);
            }
        })
        $scope.platformBennerGoodList = angular.copy(newArr);
        //console.log($scope.platformBennerGoodList)
    }

    // 保存编辑
    $scope.saveEdit = function () {
        var url = '';
        url = $scope.platformBennerId ? $rootScope.default.dPath + '8061/benner/edit' : $rootScope.default.dPath + '8061/benner/add';
        var obj = {};
        var param = {};
        param.bennerRelease = $scope.bennerRelease;
        param.bottomImg = $scope.img.bottomImg;
        param.titleImg = "";
        param.topImg = $scope.img.topImg;
        param.platformBennerGoodList = [];
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
                    getTable();
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
        $http.post($rootScope.default.dPath + '8061/benner/del?id=' + id,{})
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.msg('删除成功', {time: 3000, icon:1});
                    getTable();
                } else {
                    layer.msg('删除失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
                layer.closeAll();
                layer.msg('删除失败', {time: 3000, icon:2});
            });
    }

    // 图片上传
    $scope.isShowTopImg = false;
    $scope.isShowBottomImg = false;
    $scope.img = {};
    $scope.img.topImg = '';
    $scope.img.bottomImg = '';
    var uploader = new plupload.Uploader({
        browse_button: 'selectfiles1', //触发文件选择对话框的按钮，为那个元素id或者元素本身
        url: 'anything', //文件上传url地址,
    });
    uploader.init();
    uploader.bind('FilesAdded',function(uploader, files){
        var imgFileName = files[0].name;
        var fileName = '';
        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
            .success(function (data) {
                fileName = data.key + checkImgExtName(imgFileName);
                $scope.img.topImg = data.url + '/' + fileName;
                //console.log(fileName);
                var _param = {
                    'key': fileName,
                    'OSSAccessKeyId': data.OSSAccessKeyId,
                    'policy': data.policy,
                    'Signature': data.Signature,
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
            $scope.isShowTopImg = true;
            $scope.$apply();
        }
    })

    var uploader2 = new plupload.Uploader({
        browse_button: 'selectfiles2', //触发文件选择对话框的按钮，为那个元素id或者元素本身
        url: 'anything', //文件上传url地址,
    });
    uploader2.init();
    uploader2.bind('FilesAdded',function(uploader, files){
        var imgFileName = files[0].name;
        var fileName = '';
        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
            .success(function (data) {
                fileName = data.key + checkImgExtName(imgFileName);
                $scope.img.bottomImg = data.url + '/' + fileName;
                //console.log(fileName);
                var _param = {
                    'key': fileName,
                    'OSSAccessKeyId': data.OSSAccessKeyId,
                    'policy': data.policy,
                    'Signature': data.Signature,
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
    uploader2.bind('FileUploaded', function (uploader,file,responseObject) {
        if(responseObject.status == 204) {
            $scope.isShowBottomImg = true;
            $scope.$apply();
        }
    })

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
            layer.load(1, {shade: [0.2,'#000']}); // loading

            //console.log(uploader)
            var imgFileName = files[0].name;
            var fileName = '';
            $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
                .success(function (data) {
                    fileName = data.key + checkImgExtName(imgFileName);
                    $scope.reloadImg = data.url + '/' + fileName;
                    //console.log(fileName);
                    var _param = {
                        'key': fileName,
                        'OSSAccessKeyId': data.OSSAccessKeyId,
                        'policy': data.policy,
                        'Signature': data.Signature,
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
        uploader3.bind('FileUploaded', function (uploader,file,responseObject) {
            if(responseObject.status == 204) {
                var param = {
                    titleImg: $scope.reloadImg,
                    id: $scope.reloadId
                }
                $http.post($rootScope.default.dPath + '8061/benner/upload/img', param)
                    .success(function (data) {
                        layer.closeAll();
                        if (data == 0) {
                            layer.msg('保存成功', {time: 3000, icon:1});
                            getTable();
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



/* 订单 */
app.controller('orderCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证

    $scope.datePicker = { // 日期配置
        date: '',
        format: "yyyy-MM-dd",
        altInputFormats: ['yyyy-M!-d!'],
        opened: false,
        openPicker: function () {
            this.opened = true;
        }
    };

    // 设置查询参数
    $scope.search = {};
    $scope.search.date = '';
    $scope.search.brandName = '';
    $scope.search.brandid = '';
    $scope.search.ordercode = '';

    // 获取表格
    $rootScope.searchTable('8096/goods/activity/back/order/query?date=&brandid=&ordercode=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        var date = angular.element('#date')[0].value;
        $scope.search.date = $rootScope.compareDate(date);
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8096/goods/activity/back/order/query?date=' + $scope.search.date + '&brandid=' + $scope.search.brandid + '&ordercode=' + $scope.search.ordercode + '&page=' + $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    /* 点击巡查 */
    $scope.showCard = function (img) {
        layer.open({
            type: 1,
            shade: false,
            title: false, //不显示标题
            content: '<div style="width: 300px; height: 300px; padding: 20px;"><img src="' +  img + '" alt="图片加载失败" style="width: 100%; height: 100%;"></div>'
        });
    }


    // 获取下拉框值
    $http.post($rootScope.default.brandPath, {})
        .success(function (data) {
            $scope.brandData = data;
        }).error(function (err) {
            layer.msg('未获取到品牌信息', {time: 3000, icon:2});
        })

    $scope.allSelectFun = {
        // 品牌
        changeMainBrand : function (val) {
            if(val) {
                $('.se_brand').addClass('block');
            } else {
                $scope.search.brandid = '';
                $('.se_brand').removeClass('block');
            }
        },
        getMainBrand : function (id, val) {
            $scope.search.brandName = val;
            $scope.search.brandid = id;
            $('.se_brand').removeClass('block');
        }
    };

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

})



/* 管理员 */
app.controller('manageCtrl', function ($rootScope, $scope, $http, $window) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证

    // 获取表格
    function getTable () {
        $http.post($rootScope.default.dPath + '8062/admin/query', {})
            .success(function (data) {
                $scope.tableList = data.content;
                $scope.pageInfo = {
                    totalElements: data.totalElements,
                    number: data.number + 1,
                    size: data.size
                }
            }).error(function (err) {
            layer.msg('未获取到表格信息', {time: 3000, icon:2});
        })
    }
    getTable ();
    // 删除
    $scope.delManage = function (id) {
        $http.post($rootScope.default.dPath + '8062/admin/del?id=' + id, {})
            .success(function (data) {
                if(data == 0) {
                    layer.msg('删除成功', {time: 3000, icon:1});
                    getTable ();
                } else {
                    layer.msg('删除失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
            layer.msg('删除失败', {time: 3000, icon:2});
        })
    }

    /* 点击巡查 */
    $scope.showCard = function (img) {
        layer.open({
            type: 1,
            shade: false,
            title: false, //不显示标题
            content: '<div style="width: 300px; height: 300px; padding: 20px;"><img src="' +  img + '" alt="图片加载失败" style="width: 100%; height: 100%;"></div>'
        });
    }

    /* 授权二维码 */
    $scope.showPromise = function () {
        $.ajax({
            url:  $rootScope.default.dPath + '9070/qrcode',
            method: 'post',
            data: 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + $rootScope.default.appid + '&redirect_uri=http%3A%2F%2F' + $rootScope.default.yPath + '%2Fauth%2Fregister%2Fwx%2Fopenid&response_type=code&scope=snsapi_userinfo&state=123#wechat_redirect',
            //dataType: "text",
            withCredentials: true,//跨域
            headers: {
                'content-type': 'application/json'
            },
            success: function (data) {
                layer.open({
                    type: 1,
                    shade: false,
                    title: false, //不显示标题
                    content: '<div style="width: 300px; height: 300px; padding: 20px;"><img src="' + data + '" alt="图片加载失败" style="width: 100%; height: 100%;"></div>',
                    cancel: function (e) {
                        layer.close(e);
                        //$window.location.reload();
                    }
                });
            },
            error: function () {
                layer.msg('二维码获取失败', {time: 3000, icon:2});
            }
        })
    }

})
