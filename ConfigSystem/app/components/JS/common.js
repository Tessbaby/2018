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

    // 设置保存&修改 参数
    $scope.param = {};
    $scope.param.name = '';
    $scope.param.rootId = '';
    $scope.param.rootName = '';
    $scope.param.img = '';
    $scope.param.disable = 0;
    $scope.param.id = 0;
    // 设置查询参数
    $scope.searchId = '';
    $scope.showImg = false;

    // 是编辑还是添加
    $scope.title = '';

    /* 点击查询 */
    //$scope.searchTable = httpAjax.getTable('aaa', {a: 1});

    /* 获取下拉选中项 有多个下拉时 暂时定义多个 如果有其他方法在做修改*/
    $scope.allSelectFun = {};
    $scope.allSelectFun.changeMainClassify = function () {
        $('.se_class').addClass('block');
    }
    $scope.allSelectFun.getMainClassify = function (id, name) {
        // 查询参数
        $scope.searchId = name;
        $('.se_class').removeClass('block');
    }
    $scope.allSelectFun.changeEditClassify = function () {
        $('.ed_class').addClass('block');
    }
    $scope.allSelectFun.getEditClassify = function (id, val) {
        $scope.param.rootName = val;
        $scope.param.rootId = id;
        $('.ed_class').removeClass('block');
    }

    $scope.editClassify = function (type) {
        $scope.title = type ? '编辑' : '添加';
        layer.open({
            type: 1,
            title: $scope.title,
            content: $('#editClassLayer'),
            area: ['50%', '500px'],
            cancel: function () {}
        })
        $('.layui-layer-shade').addClass('hide');
    }
    $scope.saveClassify = function () {
        // 保存数据
        $http.post('http://192.168.1.200:8060/goods/class/add', {data: $scope.param}, {'Content-Type':'application/x-www-form-urlencoded'})
            .success(function (data) {
                console.log(data);
                layer.closeAll();
            })
            .error(function () {
                layer.closeAll();
            })
    }

    /* 图片上传 */
    $scope.fileChange = function () {
        $http.post($rootScope.default.imgPath, {},
            {
                withCredentials: true,//跨域
                headers: {
                    'content-type': 'application/json',
                }//跨域
            }).success(function (data) {
                console.log(data);
            }).error(function () {
                console.log('error')
            })
    }
})

/* 店铺 */
app.controller('shopCtrl', function ($rootScope, $scope, httpAjax, $cookies, $location) {
    var height = $(window).height() - 160;
    var width = $(window).width();
    $('.con-main').height(height);
    $('.bg').height(height + 60).width(width);

    // 进入页面前获取id
    /*httpAjax.getData().then(function (result) {
        if(result.openId) {
            // 先判断dataId是否相同
            if(result.dataId != $cookies.get('openId')) {
                $location.href = '/login'; // 不同跳转到login
            }
        }
    });*/

    // 设置参数
    $scope.searchId = '';
    $scope.param = {};
    $scope.param.classId = '';
    $scope.param.className = '';

    // 下拉框的方法 好几个
    $scope.allSelectFun = {};
    $scope.allSelectFun.changeEditShop = function () {
        $('.ed_shop').addClass('block');
    }
    $scope.allSelectFun.getEditShop = function (id, val) {
        $scope.param.classId = id;
        $scope.param.className = val;
        $('.ed_shop').removeClass('block');
    }
    $scope.allSelectFun.changeMainShop = function () {
        $('.se_shop').addClass('block');
    }
    $scope.allSelectFun.getMainShop = function (id, val) {
        $scope.searchId = val;
        $('.se_shop').removeClass('block');
    }


    $scope.editShop = function (type) {
        layer.open({
            type: 1,
            title: type ? '编辑' : '添加',
            content: $('#editShopLayer'),
            area: ['50%', 'auto'],
            cancel: function () {
            }
        })
        $('.layui-layer-shade').addClass('hide');
    }
    $scope.saveClassify = function () {
        // 保存数据
        layer.closeAll();
    }
})

/* 商品巡查 */
app.controller('waresPatrolCtrl', function ($rootScope, $scope) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    console.log($('.date'))
    $('.date').datepicker();
})

/* 卡券中心 */
app.controller('ticketCenterCtrl', function ($rootScope, $scope) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
})
/* 活动banner */
app.controller('bannerCtrl', function ($rootScope, $scope) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $scope.isNextStep = false;
    $scope.editBanner = function (type) {
        layer.open({
            type: 1,
            title: type ? '编辑' : '添加',
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
})
/* 订单 */
app.controller('orderCtrl', function ($rootScope, $scope) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
})
/* 管理员 */
app.controller('manageCtrl', function ($rootScope, $scope) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
})
