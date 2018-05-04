'use strict';
var app = angular.module('myApp', ['ngRoute', 'ngCookies', 'ui.bootstrap']).config(['$locationProvider', '$routeProvider', '$httpProvider', '$controllerProvider', function($locationProvider, $routeProvider, $httpProvider, $controllerProvider) {
    $httpProvider.defaults.headers.post = {"content-type": "application/json"}
    app.register = {
        controller: $controllerProvider.register, 
    };

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
            templateUrl: 'template/content/login/login.html',
            resolve: {
                load: app.asyncjs('template/content/login/loginController.js')
            }
        })
        
        .when('/shop', {
            templateUrl: 'template/content/shop/shop.html',
            resolve: {
                load: app.asyncjs('template/content/shop/shopController.js')
            }
        })
        .when('/classify', {
            templateUrl: 'template/content/classify/classify.html',
            resolve: {
                load: app.asyncjs('template/content/classify/classifyController.js')
            }
        })
        .when('/waresPatrol', {
            templateUrl: 'template/content/waresPatrol/waresPatrol.html',
            resolve: {
                load: app.asyncjs('template/content/waresPatrol/waresPatrolController.js')
            }
        })
        .when('/ticketCenter', {
            templateUrl: 'template/content/ticketCenter/ticketCenter.html',
            resolve: {
                load: app.asyncjs('template/content/ticketCenter/ticketCenterController.js')
            }
        })
        .when('/banner', {
            templateUrl: 'template/content/banner/banner.html',
            resolve: {
                load: app.asyncjs('template/content/banner/bannerController.js')
            }
        })
        .when('/order', {
            templateUrl: 'template/content/order/order.html',
            resolve: {
                load: app.asyncjs('template/content/order/orderController.js')
            }
        })
        .when('/manage', {
            templateUrl: 'template/content/manage/manage.html',
            resolve: {
                load: app.asyncjs('template/content/manage/manageController.js')
            }
        });
    }
]);

app.run(['$rootScope', '$location', '$rootElement', '$http', '$cookies', function ($rootScope, $location, $rootElement, $http, $cookies) {
    $rootScope.headers = {
        headers: {
            'content-type': 'application/json',
        }
    };

    $rootScope.wxConnect = '';
    $rootScope.checkIn = function () {
        var uuid = $cookies.get('uuid');
        $.ajax({
            url: $rootScope.setPath(8066) + '/auth/check?sequence=' + uuid,
            method: 'get',
            // 是否跨域
            withCredentials: true,
            headers: {
                'content-type': 'application/json'
            },
            success: function (data) {
                if(data == 'false') {
                    layer.msg('登录超时！', {time: 3000, icon:2});
                    setTimeout(function () {
                        window.location = '#/login';
                    }, 1000);
                } else {
                    
                    var openId = $cookies.get('openId');
                    $http.post($rootScope.setPath(8062) + '/admin/check?openid=' + openId, {})
                        .success(function (data) {
                            $rootScope.personalMsg = data;
                        }).error(function (err) {
                            layer.msg('获取用户信息失败', {time: 3000, icon:2});
                        })
                }
            },
            error: function () {
                window.location = '#/login';
            }
        })
    }
    $rootScope.logout = function () {
        var uuid = $cookies.get('uuid');
        $.ajax({
            url: $rootScope.setPath(8066) + '/auth/exit?sequence=' + uuid,
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

    $rootScope.setPath = function (port) {
        var basePath = 'http://192.168.0.113:' + port;
        var basePath2 = 'http://api.haochepaidui.com';
        return basePath2;
    }
    $rootScope.default = {};
    $rootScope.default.Img = '/components/Image/default.png';
    $rootScope.default.yPath = 'api.haochepaidui.com';
    $rootScope.default.appid = 'wx5def75f7381ab95b';
    $rootScope.default.ws = 'ws://sockets.haochepaidui.com:8443/websockets' // 长链接 线上
    $rootScope.default.imgPath = $rootScope.setPath(9070) + '/img'; 
    $rootScope.default.ClassifyPath = $rootScope.setPath(8060) + '/goods/class/father/downlist';
    $rootScope.default.ClassifyPath2 = $rootScope.setPath(8060) + '/goods/class/back/root/downlist';
    $rootScope.default.ClassifyPath3 = $rootScope.setPath(8060) + '/goods/class/back/goodsclass/downlist';
    $rootScope.default.brandPath = $rootScope.setPath(8070) + '/shop/brand/list';
    var _path;
    $rootScope.breadList = {};
    $rootScope.breadList.list = [];
    $rootScope.breadList.current = '';
    $rootScope.$on('$routeChangeSuccess', function(evt, current, previous) {
        var _arr = $rootScope.breadList.list, currentObj, isIn = false;
        _path = '#' + $location.path();
        $rootScope.breadList.current = _path;
        if (previous && previous.$$route.originalPath != '/login') {
            angular.forEach(_arr, function(obj1, index) {
                if (obj1.permission == _path) {
                    isIn = true;
                    return
                }
            });
            if (!isIn) {
                currentObj = newObj(_path);
                currentObj && _arr.push(currentObj)
            }
        } else {
            currentObj = newObj(_path)
            currentObj && _arr.push(currentObj);
        }
        
        function newObj(a) {
            var newArr;
            angular.forEach($rootScope.navList, function (obj, index) {
                if (obj.children.length != 0 ) {
                    obj = obj.children;
                }
                
                if(a == obj.permission) {
                    newArr = {
                        name: obj.name,
                        id: obj.id,
                        permission: obj.permission
                    }
                }
            });
            return newArr
        }
    });

    
    $rootScope.getCheckboxVal = function (value) {
        return value;
    }

    function appendTransform(defaults,transform){
        defaults:angular.isArray(defaults)?defaults:[defaults];
        return defaults.concat(transform);
    }

    $rootScope.table = {};
    $rootScope.option = {};
    $rootScope.searchTable = function (_port, _url) {
        layer.load(1, {shade: [0.2,'#000']}); 
        $rootScope.table.tableList = [];
        $rootScope.table.pageInfo = {};
        $rootScope.table.pageInfo.number = 0;
        var url = '';
        url = $rootScope.setPath(_port) + _url;
        $.ajax({
            url: url,
            method: 'get',
            headers: {
                "content-type": "application/json"
            },
            success: function (result) {
                $rootScope.table.tableList = result.content ? result.content : [];
                $rootScope.option = {
                    curr: result.number + 1,  //当前页数
                    all: result.totalPages,  //总页数
                    count: 10,  //最多显示的页数，默认为10
                    //点击页数的回调函数，参数page为点击的页数
                    click: function (page) {
                        //这里可以写跳转到某个页面等...
                    }
                }
                $rootScope.$apply();
                layer.closeAll();
                
            },
            error: function (err) {
                
            }
        })
    }

    function args(num) {
        var arr = [];
        for(var i = 1; i < num + 1; i++) {
            arr.push(1);
        }
        return arr;
    }

    
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


app.controller('navCtrl', function ($scope, $http, $rootScope, $location) {
    $rootScope.navList = [
        {
            permission: '#/classify',
            name: '分类',
            id: 2,
            icon: 'iconfont icon-fenlei',
            children: [
                
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
        /*{
            permission: '#/ticketCenter',
            name: '卡券中心',
            id: 5,
            icon: 'iconfont icon-youhuiquan',
            children: []
        },*/
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

    $scope.permission = '#' + $location.$$path;
    $('.drop').on('click', function () {
        var target = event.target;
        $(target).next().slideToggle();
    })
})


app.directive('uiNav', function() {
    return {
        restrict: 'AC',
        link: function(scope, el, attr) {
            el.on('click', 'a', function(e) {
                var _this = $(this);
                if (!$(this).parent().hasClass('nav-msg')) {
                    _this.parent().siblings( ".active" ).toggleClass('active');
                    _this.parent().addClass('active');
                    _this.next().is('ul') &&  _this.parent().toggleClass('active') &&  e.preventDefault();
                }
            });
        }
    };
})

app.directive('eleBread', function ($rootScope, $location) {
    return {
        restrict : 'EA',
        replace : true,
        transclude : true,
        template: '<div class=""><ul class="nav nav-tabs ele-bread">'
                    
        + '<li ng-repeat="li in breadList.list" ng-class="{ active: breadList.current == li.permission }" data-id="{{ li.id }}" style="position: relative;">'
        + '<a href="javascript:;" ng-href="{{ li.permission }}" style="padding-right: 30px;">{{ li.name }}</a>'
        + '<i class="iconfont icon-close" style="position: absolute; top: 15px; right: 10px; cursor: pointer; font-size: 16px;"></i>'
        + '</li>'
        + '</ul>',
        link: function (scope, el, attr) {
            el.on('click', '.icon-close', function () {
                if ($rootScope.breadList.list.length > 1) {
                    var _this = $(this);
                    var prevLi = _this.parent().prev('li');
                    var prevHref = '';
                    var nextLi = _this.parent().next('li');
                    var nextHref = '';
                    var dataId = _this.parent().attr('data-id');
                    var thisArr = [];
                    var as = $('#nav > li > a');
                    if (_this.parent().hasClass('active')) {
                        $('#nav > li').removeClass('active');
                        if ($(prevLi).length > 0) {
                            prevHref = $(prevLi).children('a').attr('href');
                            angular.forEach(as, function (item, i) {
                                if ($(item).attr('href') == prevHref) {
                                    $(item).parent().addClass('active');
                                }
                            })
                            window.location = prevHref;
                        } else if ($(prevLi).length == 0 && $(nextLi).length > 0) {
                            nextHref = $(nextLi).children('a').attr('href');
                            angular.forEach(as, function (item, i) {
                                if ($(item).attr('href') == nextHref) {
                                    $(item).parent().addClass('active');
                                }
                            })
                            window.location = nextHref;
                        }
                    }
                    _this.parent().remove();
                    angular.forEach($rootScope.breadList.list, function (o, index) {
                        if (dataId != o.id) {
                            thisArr.push(o);
                        }
                    })
                    $rootScope.breadList.list = angular.copy(thisArr);

                }
            });
        }

    }
});

app.directive('myPagination', function () {
    return {
        restrict : 'EA',
        replace : true,
        scope: {
            option: '=pageOption'
        },
        template: '<div class="footer">'
                + '<nav aria-label="Page navigation">'
                + '<ul class="pagination pull-right">'
                + '<li ng-class="{true : ' + "'active'" + '}[option.curr == p]" ng-repeat="p in page" ng-click="pageClick(p)">'
                + '<a href="javascript:;">{{ p }}</a>'
                + '</li>'
                + '</ul>'
                + '</nav>'
                + '</div>',
        controller: function ($scope, $rootScope){
            if (!$scope.option.curr || isNaN($scope.option.curr) || $scope.option.curr < 1) $scope.option.curr = 1;
            if (!$scope.option.all || isNaN($scope.option.all) || $scope.option.all < 1) $scope.option.all = 1;
            if ($scope.option.curr > $scope.option.all) $scope.option.curr = $scope.option.all;
            if (!$scope.option.count || isNaN($scope.option.count) || $scope.option.count < 1) $scope.option.count = 10;

            //得到显示页数的数组
            $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);
            //绑定点击事件
            $scope.pageClick = function (page) {
                // console.log(page)
                if (page == '«') {
                    page = parseInt($scope.option.curr) - 1;
                } else if (page == '»') {
                    page = parseInt($scope.option.curr) + 1;
                }
                if (page < 1) page = 1;
                else if (page > $scope.option.all) page = $scope.option.all;
                //点击相同的页数 不执行点击事件
                if (page == $scope.option.curr) return;
                if ($scope.option.click && typeof $scope.option.click === 'function') {
                    // $scope.option.click(page);
                    $rootScope.pageClick2(page);
                    $scope.option.curr = page;
                    $scope.page = getRange($scope.option.curr, $scope.option.all, $scope.option.count);
                }
            };

            //返回页数范围（用来遍历）
            function getRange(curr, all, count) {
                //计算显示的页数
                curr = parseInt(curr);
                all = parseInt(all);
                count = parseInt(count);
                var from = curr - parseInt(count / 2);
                var to = curr + parseInt(count / 2) + (count % 2) - 1;
                //显示的页数容处理
                if (from <= 0) {
                    from = 1;
                    to = from + count - 1;
                    if (to > all) {
                        to = all;
                    }
                }
                if (to > all) {
                    to = all;
                    from = to - count + 1;
                    if (from <= 0) {
                        from = 1;
                    }
                }
                var range = [];
                for (var i = from; i <= to; i++) {
                    range.push(i);
                }
                range.push('»');
                range.unshift('«');
                return range;
            }
        }
    }
})

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



app.factory('httpAjax', function ($rootScope, $cookies, $http, $q) {
    var loadData = {};
    var defer = $q.defer();
    loadData.getData = function (_url) {
        $http({
            url: _url,
            method: 'GET'
        }).success(function (response) {
            defer.resolve(response);
        }).error(function () {
            defer.reject(function () {
                layer.alert('error'); 
            })
        });
        return defer.promise;
    }

    
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