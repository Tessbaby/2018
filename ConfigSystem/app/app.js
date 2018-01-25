'use strict';

// Declare app level module which depends on views, and components
var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ngWebSocket', 'ui.bootstrap'])
    .config(['$locationProvider', '$routeProvider', '$httpProvider',
        function($locationProvider, $routeProvider, $httpProvider) {

            $httpProvider.defaults.headers.post = {"content-type": "application/json"}



            app.asyncjs = function (js) {
                return ["$q", "$route", "$rootScope", function ($q, $route, $rootScope) {
                    var deferred = $q.defer();
                    var dependencies = js;
                    if (Array.isArray(dependencies)) {
                        for (var i = 0; i < dependencies.length; i++) {
                            dependencies[i];
                        }
                    } else {
                        dependencies
                    }
                    $script(dependencies, function () {
                        $rootScope.$apply(function () {
                            deferred.resolve();
                        });
                    });
                    return deferred.promise;
                }];
            }

            $routeProvider.otherwise({redirectTo: '/login'})
                .when('/login', {
                    templateUrl: 'template/content/login.html',
                    //controller: 'loginCtrl'
                })
                .when('/index', {
                    templateUrl: 'template/content/main.html'
                })
                .when('/shop', {
                    templateUrl: 'template/content/shop.html',
                    //controller: 'shopCtrl'
                })
                .when('/classify', {
                    templateUrl: 'template/content/classify.html',
                    //controller: 'classifyCtrl',
                    /*resolve: {
                        load: app.asyncjs('template/content/classController.js')
                    }*/
                })
                .when('/waresPatrol', {
                    templateUrl: 'template/content/waresPatrol.html',
                    //controller: 'waresPatrolCtrl'
                })
                .when('/ticketCenter', {
                    templateUrl: 'template/content/ticketCenter.html',
                    //controller: 'ticketCenterCtrl'
                })
                .when('/banner', {
                    templateUrl: 'template/content/banner.html',
                    //controller: 'bannerCtrl'
                })
                .when('/order', {
                    templateUrl: 'template/content/order.html',
                    //controller: 'orderCtrl'
                })
                .when('/manage', {
                    templateUrl: 'template/content/manage.html',
                    //controller: 'manageCtrl'
                });
        }
    ]);

/* 页面加载即调用 */
app.run(['$rootScope', '$location', '$rootElement', '$http', '$cookies', function ($rootScope, $location, $rootElement, $http, $cookies) {

    $rootScope.personalMsg = ''; // 用于存储用户信息
    $rootScope.headers = {
        withCredentials: true,//跨域
        headers: {
            'content-type': 'application/json'
        }//跨域
    }

    // 用于验证是否超时
    $rootScope.wxConnect = '';
    $rootScope.checkIn = function () {
        var uuid = $cookies.get('uuid');
        $.ajax({
            url: $rootScope.default.dPath + '8066/auth/check?sequence=' + uuid,
            method: 'get',
            //data: $rootScope.wxConnect,
            withCredentials: true,//跨域
            headers: {
                'content-type': 'application/json'
            },
            success: function (data) {
                if(data == 'false') {
                    layer.msg('登录超时！', {time: 3000, icon:2});
                    /*setTimeout(function () {
                        window.location = '#/login';
                    }, 1000);*/
                    //window.location = '#/login';
                } else {
                    // 判断是否有用户信息
                    if ($rootScope.personalMsg == '') {
                        var openId = $cookies.get('openId');
                        $http.post($rootScope.default.dPath + '8062/admin/check?openid=' + openId, {})
                            .success(function (data) {
                                $rootScope.personalMsg = data;
                            }).error(function (err) {
                                layer.msg('获取用户信息失败', {time: 3000, icon:2});
                            })
                    }
                }
            },
            error: function () {
                window.location = '#/login';
            }
        })
    }
    $rootScope.logout = function () {
        $.ajax({
            url: $rootScope.default.dPath + '8066/auth/exit?sequence=123',
            method: 'get',
            headers: {
                "content-type": "text/plain"
            },
            success:function (data) {
                window.location = '#/login';
            },
            error: function (err) {
                layer.alert('退出失败');
            }
        })
    }

    /* 设置默认路径 */
    $rootScope.default = {};
    $rootScope.default.Img = '';
    $rootScope.default.dPath = 'http://192.168.1.200:'; // 设置接口域名端口
    $rootScope.default.yPath = 'rubusteam.xicp.io'; // 设置域名 验证用
    $rootScope.default.appid = 'wx63d033e879c445f2'; // 设置appid 验证用
     $rootScope.default.ws = 'ws://192.168.1.200:8443/websockets' // 长链接

    $rootScope.default.imgPath = $rootScope.default.dPath + '9070/img'; // 图片上传接口
    $rootScope.default.ClassifyPath = $rootScope.default.dPath + '8060/goods/class/father/downlist'; // 获取一级分类下拉菜单接口
    $rootScope.default.ClassifyPath2 = $rootScope.default.dPath + '8060/goods/class/back/root/downlist' // 获取二级分类下拉菜单接口
    $rootScope.default.ClassifyPath3 = $rootScope.default.dPath + '8060/goods/class/back/goodsclass/downlist'; // 获取3级分类下拉菜单接口
    $rootScope.default.brandPath = $rootScope.default.dPath + '8070/shop/brand/list'; // 获取品牌下拉菜单接口

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
        //console.log(_arr)
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

    /* 获取下拉框选项，可随时调用 */
    $rootScope.getCheckboxVal = function (value) {
        return value;
    }

    function appendTransform(defaults,transform){
        defaults:angular.isArray(defaults)?defaults:[defaults];
        return defaults.concat(transform);
    }

    /* 获取表格数据 */
    $rootScope.table = {};
    $rootScope.searchTable = function (_url) {
        layer.load(1, {shade: [0.2,'#000']}); // loading
        $rootScope.table.tableList = [];
        $rootScope.table.pageInfo = {};
        $rootScope.table.pageInfo.number = 0;
        var url = '';
        url = $rootScope.default.dPath + _url;
        $.ajax({
            url: url,
            method: 'get',
            headers: {
                "content-type": "application/json"
            },
            success: function (result) {
                $rootScope.table.tableList = result.content ?  result.content : [];
                $rootScope.table.pageInfo = {
                    number: result.number + 1,
                    totalPages: args(result.totalPages)
                };
                $rootScope.$apply();
                layer.closeAll();
                //console.log($rootScope.table.tableList)
            },
            error: function (err) {
                //layer.alert(err);
            }
        })
    }

    // 创建数组
    function args(num) {
        var arr = [];
        for(var i = 1; i < num + 1; i++) {
            arr.push(1);
        }
        return arr;
    }

    // 对比时间
    $rootScope.compareDate = function (date) {
        var today = Date.parse(new Date());
        var _date = Date.parse(new Date(date));
        if (today < _date) {
            layer.msg('日期不能超过今天', {time: 3000, icon:0});
            return '';
        } else {
            return date;
        }
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
                if ($rootScope.breadList.list.length > 1) {
                    var _this = $(this);
                    var prevLi = _this.parent().parent().prev('li');
                    var prevHref = '';

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
                }

            })
        }

    }
});
// 配合使用 循环结束后的监听
app.directive('onFinishRenderFilters', function ($timeout) {
    return {
        restrict: 'A',
        link: function(scope, element, attr) {
            if (scope.$last === true) {
                $timeout(function() {
                    scope.$emit('ngRepeatFinished');
                });
            }
        }
    };
});

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
        });
        return defer.promise;
    }
    return loadData;
})





