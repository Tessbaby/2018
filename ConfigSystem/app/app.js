'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngWebSocket', 'ui.bootstrap'])
    .config(['$locationProvider', '$routeProvider',
        function($locationProvider, $routeProvider) {

            $routeProvider.otherwise({redirectTo: '/login'})
                .when('/login', {
                    templateUrl: 'template/content/login.html',
                    controller: 'loginCtrl'
                })
                .when('/index', {
                    templateUrl: 'template/content/main.html'
                })
                .when('/shop', {
                    templateUrl: 'template/content/shop.html',
                    controller: 'shopCtrl'
                })
                .when('/classify', {
                    templateUrl: 'template/content/classify.html',
                    controller: 'classifyCtrl'
                })
                .when('/waresPatrol', {
                    templateUrl: 'template/content/waresPatrol.html',
                    controller: 'waresPatrolCtrl'
                })
                .when('/ticketCenter', {
                    templateUrl: 'template/content/ticketCenter.html',
                    controller: 'ticketCenterCtrl'
                })
                .when('/banner', {
                    templateUrl: 'template/content/banner.html',
                    controller: 'bannerCtrl'
                })
                .when('/order', {
                    templateUrl: 'template/content/order.html',
                    controller: 'orderCtrl'
                })
                .when('/manage', {
                    templateUrl: 'template/content/manage.html',
                    controller: 'manageCtrl'
                });
        }
    ]);

/* 页面加载即调用 */
app.run(['$rootScope', '$location', '$rootElement', function ($rootScope, $location, $rootElement) {

    /* 各种假数据 */
    $rootScope.dummyData = {};
    $rootScope.dummyData.selectSlide = [
        {name: '大一数据对比改变', id: '1001'},
        {name: 'fjfkjek', id: '1002'},
        {name: '卡复活点', id: '1003'},
        {name: '爱乱丢放', id: '1004'}
    ];

    /* 声明表格数据、分页 */
    $rootScope.table = {};
    $rootScope.table.dataList = [];
    $rootScope.table.pageInfo = [];

    /* 设置默认路径 */
    $rootScope.default = {};
    $rootScope.default.Img = '';
    $rootScope.default.dPath = 'http://192.168.1.200:8060'; //设置接口域名端口
    $rootScope.default.imgPath = 'http://192.168.1.15:8070/shop/manage/enity?openid=111'; // 设置获取图片url的路径http://192.168.1.200:9070/img

    /* 菜单切换联动顶部菜单效果 */
    var _path;
    $rootScope.breadList = {};
    $rootScope.breadList.list = []; // 保存点击过的菜单
    $rootScope.breadList.current = ''; // 当前页面
    $rootScope.$on('$routeChangeSuccess', function(evt, current, previous) {
        var _arr = $rootScope.breadList.list,
            currentObj,
            isIn = false; // 是否已经存在

        _path = '#' + $location.path();
        $rootScope.breadList.current = _path;

        if (previous && previous.$$route.originalPath != '/login') { // 如果不是刚进站
            angular.forEach(_arr, function (obj1, index) {
                if(obj1.permission == _path) {
                    isIn = true;
                    return;
                }
            });
            if (!isIn) {
                currentObj = newObj(_path);
                currentObj && _arr.push(currentObj);
            }
        } else {
            currentObj = newObj(_path)
            currentObj && _arr.push(currentObj);
        }
        console.log(_arr)
        function newObj(a) {
            var newArr;
            angular.forEach($rootScope.navList, function (obj, index) {
                if (obj.children.length != 0 ) {
                    obj = obj.children;
                }
                //console.log(obj)
                if(a == obj.permission) {
                    newArr = {
                        name: obj.name,
                        id: obj.id,
                        permission: obj.permission
                    };
                }
            });
            return newArr;
        }
    });

    /* 复选框点击效果 */
    $rootScope.isChecked = function (event) {
        var target = window.event;
        var _this = $(target.srcElement)
        if (_this[0].tagName == 'LABEL') {
            _this.toggleClass('checked');
        }
    }

    /* 获取下拉框选项，可随时调用 */
    $rootScope.getCheckboxVal = function (value) {
        return value;
    }
}])

/* 左侧菜单栏 */
app.directive('uiNav', function() {
    return {
        restrict: 'AC',
        link: function(scope, el, attr) {
            el.on('click', 'a', function(e) {
                var _this = $(this);
                _this.parent().siblings( ".active" ).toggleClass('active');
                _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
            });
        }
    };
})
/* 顶部面包屑导航 */
app.directive('eleBread', function ($rootScope, $location) {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        template: '<div class=""><ul class="nav nav-tabs ele-bread">'
                    + '<li ng-repeat="li in breadList.list" ng-class="{ active: breadList.current == li.permission }" data-id="{{ li.id }}"><a ng-href="{{ li.permission }}">{{ li.name }}<i class="fa fa-close"></i></a></li>'
                    + '</ul>',
        link: function (scope, el, attr) {
            el.on('click', '.fa-close', function () {
                var _this = $(this);
                var dataId = _this.parent().parent().attr('data-id');
                var thisArr = [];

                _this.parent().parent().prev().addClass('active');
                _this.parent().parent().remove();

                angular.forEach($rootScope.breadList.list, function (o, index) {
                    if (dataId != o.id) {
                        thisArr.push(o);
                    }
                })
                $rootScope.breadList.list = angular.copy(thisArr);
                //console.log($rootScope.breadList.list)
            })
        }

    }
});
/* 分页 功能还不完善 */
app.directive('pageInfo', function () {
    return {
        restrict: 'EA',
        replace: true,
        transclude: true,
        template: '<div class="footer">'
                    + '<nav aria-label="Page navigation">'
                    + '<ul class="pagination pull-right">'
                    + '<li>'
                    + '<a href="#" aria-label="Previous">'
                    + '<span aria-hidden="true">&laquo;</span>'
                    + '</a>'
                    + '</li>'
                    + '<li class="active"><a href="#">1</a></li>'
                    + '<li>'
                    + '<a href="#" aria-label="Next">'
                    + '<span aria-hidden="true">&raquo;</span>'
                    + '</a>'
                    + '</li>'
                    + '</ul>'
                    + '</nav>'
                    + '</div>',
        link: function () {}
    }
})

/* 定义get或post请求函数 */
app.factory('httpAjax', function ($rootScope, $cookies, $http, $q) {
    var loadData = {};
    var defer = $q.defer();

    // get 数据
    loadData.getData = function (_url) {
        $http({
            url: _url,
            method: 'GET'
        }).success(function (response) {
            defer.resolve(response);
        }).error(function () {
            defer.reject(function () {
                layer.alert('error'); // 这里用来写error时的事件
            })
        });
        return defer.promise;
    }

    // post 数据
    loadData.postData = function (_url, _data) {
        $http({
            url: _url,
            data: _data,
            method: 'POST'
        }).success(function (response) {
            defer.resolve(response);
        }).error(function () {
            defer.reject(function () {
                layer.alert('error');
            })
        })
    }

    // 获取表格数据
    loadData.getTable = function (_url, _postData) {
        // 调用之前先清空数据
        $rootScope.dataList = [];
        $rootScope.pageInfo = [];
        $http({
            url: _url,
            method: 'GET',
            data: _postData
        }).success(function (result) {
            $rootScope.dataList = result;
            $rootScope.pageInfo = result.page;
        }).error(function () {
            layer.alert('error'); // 这里用来写error时的事件
        })
    }

    return loadData;

})




