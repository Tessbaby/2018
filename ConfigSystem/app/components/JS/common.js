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
app.controller('loginCtrl', function ($scope, $rootScope, $cookies) {
    // 设置登录样式
    var w_width = $('body').width(),
        w_height = $('body').height();
    $('.login').width(w_width).height(w_height);

    // 长链接请求
    var ws = new WebSocket("ws://192.168.1.16:8443/websockets");

    ws.onopen = function(){
        console.log("Socket has been opened!");

    };

    ws.onmessage = function(message) {
        console.log(message);
    };
    ws.onclose = function(evt){
        console.log("WebSocketClosed!");
        //window.location = '#/classify';
    };
    ws.onerror = function(evt){console.log("WebSocketError!");};

    // 先清除cookies
    $cookies.put('openId', '');
})





















/* 分类 */
app.controller('classifyCtrl', function ($rootScope, $scope, httpAjax, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);

    // 设置查询参数
    $scope.search = {};
    $scope.search.id = '';
    $scope.search.name = '';

    $scope.showImg = false;

    // 获取表格
    $rootScope.searchTable('8060/goods/class/back/query?rootid=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8060/goods/class/back/query?rootid=' + $scope.search.id + '&page='+ $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    // 获取下拉菜单分类
    httpAjax.postData($rootScope.default.ClassifyPath, '').then(function (data) {
        $scope.dummyData = data;
    })
    /* 获取下拉选中项 有多个下拉时 暂时定义多个 如果有其他方法在做修改*/
    $scope.allSelectFun = {
        changeMainClassify : function (val) {
            if(val) {
                $('.se_class').addClass('block');
            } else {
                $scope.search.id = '';
                $('.se_class').removeClass('block');
            }
        },
        getMainClassify : function (id, name) {
            // 查询参数
            $scope.search.name = name
            $scope.search.id = id;
            $('.se_class').removeClass('block');
        },
        changeEditClassify : function (val) {
            if(val) {
                $('.ed_class').addClass('block');
            } else {
                $scope.param.classRootId = '';
                $('.ed_class').removeClass('block');
            }
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
        }
        // 获取下拉二级菜单分类
        httpAjax.postData($rootScope.default.ClassifyPath, '').then(function (data) {
            $scope.dummyData = data;
        })
        layer.open({
            type: 1,
            title: $scope.title,
            content: $('#editClassLayer'),
            area: ['50%', '500px']
        })
        $('.layui-layer-shade').addClass('hide');
    }
    $scope.saveClassify = function () {
        var saveUrl = '';
        saveUrl = $scope.title == '添加' ? $rootScope.default.dPath + '8060/goods/class/add' : $rootScope.default.dPath + '8060/goods/class/edit';

        // 保存数据
        $http.post(saveUrl, $scope.param, {'Content-Type':'application/x-www-form-urlencoded'})
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.alert('保存成功');
                    $scope.search.searchFun();
                } else {
                    layer.alert('保存失败');
                }
            })
            .error(function () {
                layer.closeAll();
                layer.alert('保存失败');
            })
    }
    $scope.changeDisabled = function (id, dis) {
        var url = '',
            tip = '';
        url = dis == 1 ? $rootScope.default.dPath + '8060/goods/class/enabled?id=' + id : $rootScope.default.dPath + '8060/goods/class/del?id=' + id;
        tip = dis == 1 ? '启用' : '禁用';
        $http.post(url, {})
            .success(function (data) {
                if(data == 0) {
                    layer.alert(tip + '成功');
                    $scope.search.searchFun();
                } else {
                    layer.alert(tip + '失败');
                }
            }).error(function (err) {
                layer.alert(tip + '失败');
            });
    }

    /* 图片上传 */
    $scope.imgName = '';
    $scope.isRightImg = false; // 是否正确格式
    $scope.fileChange = function (elem) {
        $scope.imgName = angular.element('#' + elem)[0].value;
        //checkImgName($scope.imgName);
        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
            .success(function (data) {
                console.log(data);
                //setImgUrl(data);
            }).error(function () {
            console.log('error')
        })
    }

    // 生成路径
    /*function setImgUrl (data) {
        var key = data.key + $scope.imgName;
        var formData = {
            'key': key,
            'Content-Disposition': 'attachment;filename=' + key,
            'OSSAccessKeyId': data.OSSAccessKeyId,
            'policy': data.policy,
            'Signature': data.Signature,
            'Content-Disposition: form-data; name="file"; filename="': key,
            'Content-Type: application/octet-stream': ''
        }

        $http.post(data.url, formData, {
            headers: {
                'User-Agent': data.UserAgent,
                'Content-Type': data.ContentType
            }
        }).success(function (result) {
            console.log(result);
        }).error(function () {
            console.log('error')
        })
    }*/

    /*function setImgUrl(data) {
        var _data = data;
        var uploader = new plupload.Uploader({
            runtimes : 'html5,flash,silverlight,html4',
            browse_button : 'fileName',
            container: document.getElementById('addImg'),
            //flash_swf_url : 'lib/plupload-2.1.2/js/Moxie.swf',
            //silverlight_xap_url : 'lib/plupload-2.1.2/js/Moxie.xap',
            url : data.url,
            init: {
                //PostInit: function () {
                //    console.log('postInit')
                //    set_upload_param(uploader, $scope.imgName, false, _data);
                //    return false;
                //},
                BeforeUpload: function(up, file) {
                    console.log('beforeupload')
                    set_upload_param(up, file.name, true);
                },
                FileUploaded: function(up, file, info) {
                    console.log(info);
                }
            }
        });
        uploader.init();
    }

    function set_upload_param(up, filename, ret, data){
        console.log(up);
        var key = data.key + checkImgExtName(filename);
        var formData = {
            'key': key,
            'Content-Disposition': 'attachment;filename=' + key,
            'OSSAccessKeyId': data.OSSAccessKeyId,
            'policy': data.policy,
            'Signature': data.Signature,
            'Content-Disposition: form-data; name="file"; filename="': key,
            'Content-Type: application/octet-stream': ''
        }

        up.setOption({
            'url': data.url,
            'multipart_params': formData
        });

        up.start();
    }

    function checkImgExtName(fileName) {
        var extName
        if (fileName.indexOf(".png") > 0) {
            extName = fileName.slice(fileName.indexOf(".png"), fileName.length)
        } else if (fileName.indexOf(".jpg") > 0) {
            extName = fileName.slice(fileName.indexOf(".jpg"), fileName.length)
        } else if (fileName.indexOf(".jpeg") > 0) {
            extName = fileName.slice(fileName.indexOf(".jpeg"), fileName.length)
        } else {
            layer.alert( '图片格式错误')
        }
        return extName
    }*/
})





/* 店铺 */
app.controller('shopCtrl', function ($rootScope, $scope, httpAjax, $cookies, $location, $http) {
    var height = $(window).height() - 160;
    var width = $(window).width();
    $('.con-main').height(height);
    $('.bg').height(height + 60).width(width);

    // 设置查询参数
    $scope.search = {};
    $scope.search.name = '';

    // 获取表格
    $rootScope.searchTable('8070/shop/back/query?name=&page=2');
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
                }).error(function (err) {
                    layer.alert('获取失败！')
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
        }

        // 获取下拉框值
        $http.post($rootScope.default.brandPath, {})
            .success(function (data) {
                $scope.brandData = data;
            }).error(function (err) {
                layer.alert('获取品牌失败')
            })
        $http.post($rootScope.default.ClassifyPath, {})
            .success(function (data) {
                $scope.classData = data;
            }).error(function (err) {
                layer.alert('获取分类失败')
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
    $scope.saveClassify = function () {
        // 保存数据
        var saveUrl = '';
        saveUrl = $scope.id ? $rootScope.default.dPath + '8070/shop/edit' : $rootScope.default.dPath + '8070/shop/add';

        // 保存数据
        $http.post(saveUrl, angular.toJson($scope.param), {'Content-Type':'application/x-www-form-urlencoded'})
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.alert('保存成功');
                    $scope.search.searchFun();
                } else {
                    layer.alert('保存失败');
                }
            })
            .error(function () {
                layer.closeAll();
                layer.alert('保存失败');
            })
        layer.closeAll();
    }
    $scope.changeDisabled = function (id, dis) {
        var url = '',
            tip = '';
        url = dis == 1 ? $rootScope.default.dPath + '8070/shop/enabled?id=' + id : $rootScope.default.dPath + '8070/shop/disable?id=' + id;
        tip = dis == 1 ? '启用' : '禁用';
        $http.post(url, {})
            .success(function (data) {
                if(data == 0) {
                    layer.alert(tip + '成功');
                    $scope.search.searchFun();
                } else {
                    layer.alert(tip + '失败');
                }
            }).error(function (err) {
                layer.alert(tip + '失败');
            });
    }


    /*$scope.changePage = function (e) {
        var target = event.target;
        var page = $(target).text();
        if (page == '第一页') {
            $rootScope.table.pageInfo.number = 0;
        } else if (page == '最后页') {
            $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.totalPages;
        }
    }*/


})



/* 商品巡查 */
app.controller('waresPatrolCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);

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
        $scope.search.date = angular.element('#date')[0].value;
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8096/goods/activity/back/activity/query?date=' + $scope.search.date + '&goodsclassid=' + $scope.search.goodsclassid + '&brandid=' + $scope.search.brandid + '&ishot=' + $scope.search.isHot + '&page=' + $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }


    // 获取下拉框值
    $http.post($rootScope.default.brandPath, {})
        .success(function (data) {
            $scope.brandData = data;
        }).error(function (err) {
            layer.alert('获取品牌失败')
        })
    $http.post($rootScope.default.ClassifyPath3, {})
        .success(function (data) {
            $scope.classData = data;
        }).error(function (err) {
            layer.alert('获取分类失败')
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
        },
        // 分类
        changeMainClass : function (val) {
            if(val) {
                $('.se_class').addClass('block');
            } else {
                $scope.search.brandid = '';
                $('.se_class').removeClass('block');
            }
        },
        getMainClass : function (id, val) {
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
                if(data == 0) {
                    layer.alert(tip + '成功');
                    $scope.search.searchFun();
                } else {
                    layer.alert(tip + '失败');
                }
            }).error(function (err) {
                layer.alert(tip + '失败');
            });
    }

})

/* 卡券中心 */
app.controller('ticketCenterCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);

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
        $scope.search.date = angular.element('#date')[0].value;
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8093/coupon/back/query?date=' + $scope.search.date + '&brandid=' + $scope.search.brandid + '&page=' + $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    // 获取下拉框值
    $http.post($rootScope.default.brandPath, {})
        .success(function (data) {
            $scope.brandData = data;
        }).error(function (err) {
            layer.alert('获取品牌失败')
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
                    layer.alert(tip + '成功');
                    $scope.search.searchFun();
                } else {
                    layer.alert(tip + '失败');
                }
            }).error(function (err) {
            layer.alert(tip + '失败');
        });
    }

})





/* 活动banner */
app.controller('bannerCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);

    // 获取表格
    function getTable () {
        $http.post($rootScope.default.dPath + '8061/benner/query/list/all', {})
            .success(function (data) {
                $scope.tableList = data;
            }).error(function (err) {
                layer.alert('获取失败')
            })
    }
    getTable ();

    // 发布
    $scope.releaseBanner = function (id) {
        $http.post($rootScope.default.dPath + '8061/benner/release?id=' + id, {})
            .success(function (data) {
                if(data == 0) {
                    layer.alert('发布成功');
                    getTable ();
                } else {
                    layer.alert('发布失败')
                }
            }).error(function (err) {
                layer.alert('发布失败')
            })
    }

    // 编辑
    $scope.isNextStep = false;
    $scope.editBanner = function (id) {
        $scope.platformBennerId = id;
        var title = id ? '编辑' : '添加';
        if (id) {
            $http.post($rootScope.default.dPath + '8061/benner/query/list?id=' + id, {})
                .success(function (data) {
                    $scope.platformBennerGoodList = angular.copy(data.platformBennerGoodList);
                    console.log(data);
                }).error(function (err) {
                    layer.alert('获取失败')
                })
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
                    var _data = angular.copy(data);
                    var isIn = false;
                    if ($scope.platformBennerGoodList) {
                        var arr = $scope.platformBennerGoodList,
                            aId = data.goodsActivityId;
                        angular.forEach(arr, function (item, i) {
                            if (item.goodsActivityId == aId) {
                                layer.alert('商品已添加');
                                isIn = true;
                            }
                        })
                    }
                    if (!isIn) {
                        _data.id = '';
                        _data.code = $scope.wareCode;
                        _data.platformBennerId = $scope.platformBennerId;
                        $scope.platformBennerGoodList.push(data);
                    }
                }
            }).error(function (err) {
                layer.alert('查询失败')
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
    }
})



/* 订单 */
app.controller('orderCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);

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
        $scope.search.date = angular.element('#date')[0].value;
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8096/goods/activity/back/order/query?date=' + $scope.search.date + '&brandid=' + $scope.search.brandid + '&ordercode=' + $scope.search.ordercode + '&page=' + $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }


    // 获取下拉框值
    $http.post($rootScope.default.brandPath, {})
        .success(function (data) {
            $scope.brandData = data;
        }).error(function (err) {
            layer.alert('获取品牌失败')
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



})

/* 管理员 */
app.controller('manageCtrl', function ($rootScope, $scope, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);

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
            layer.alert('获取失败')
        })
    }
    getTable ();
    // 删除
    $scope.delManage = function (id) {
        $http.post($rootScope.default.dPath + '8062/admin/del?id=' + id, {})
            .success(function (data) {
                if(data == 0) {
                    layer.alert('删除成功')
                    getTable ();
                } else {
                    layer.alert('删除失败')
                }
            }).error(function (err) {
            layer.alert('删除失败')
        })
    }
})
