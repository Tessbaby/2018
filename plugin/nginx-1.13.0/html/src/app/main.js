'use strict';

var app = angular.module('app', ['ui.load', 'ui.router', 'ui.bootstrap', 'ngStorage', 'brantwills.paging', 'oc.lazyLoad', 'uiSwitch', 'ngCookies', 'uiCropper']);

/* Controllers */
angular.module('app')
  .controller('AppCtrl', ['$scope', '$localStorage', '$window', '$http', '$state', '$rootScope', '$location', '$cookieStore',
    function ($scope, $localStorage, $window, $http, $state, $rootScope, $location, $cookieStore) {
        // add 'ie' classes to html
        var isIE = !!navigator.userAgent.match(/MSIE/i);
        isIE && angular.element($window.document.body).addClass('ie');
        isSmartDevice($window) && angular.element($window.document.body).addClass('smart');
        $rootScope.baseUrl = '/iBase4J-SYS-Web';
        //$rootScope.upFileUrl = $rootScope.upFileUrl;
      

        $rootScope.config = {
            bbsUrl: "",
            homeWords: "",
            imgSaveUrl: "",
            pubWxServer: "",
            studyServer: "",
            wxServer: ""
        };
        //获取配置文件地址
        //function getConfig() {
        $.ajax({
            type: 'get',
            url: '/iBase4J-App-Web/app/configure/list'
        }).then(function (result) {
            if (result.httpCode == 200) {
                $rootScope.config = result.data;
                $rootScope.upFileUrl = $rootScope.config.wxpicsaveurl;
            }
        })
        //}
        // config
        $scope.app = {
            name: 'iBase4J',
            version: '0.0.2',
            // for chart colors
            color: {
                primary: '#7266ba',
                info: '#23b7e5',
                success: '#27c24c',
                warning: '#fad733',
                danger: '#f05050',
                light: '#e8eff0',
                dark: '#3a3f51',

                black: '#1c2b36'
            },
            settings: {
                themeID: 1,
                navbarHeaderColor: 'bg-black-only',
                navbarCollapseColor: 'bg-dark-blue-only',
                asideColor: 'bg-black',

                headerFixed: true,
                asideFixed: true,
                asideFolded: false,
                asideDock: false,
                container: false
            }
        }
        $scope.defaultAvatar = $rootScope.defaultAvatar = 'res/img/avatar.png';

        // 注销
        $scope.logout = function () {
            return $http({
                method: 'get',
                url: '/iBase4J-SYS-Web/logout'
            }).then(function (result) {
                var d = result.data;
                if (d.httpCode == 200) {//注销成功
                    //deleteUserInfo();
                    $cookieStore.put("account", "");
                    $state.go('access.login', { returnUrl: "" });
                }
            });
            //function deleteUserInfo() {
            //    $.cookie('_ihome_uid', null); // 删除cookie，通过传递null作为cookie的值
            //}
        }
        // 修改密码
        $scope.changePassWord = function () {
            var host = $location.host();
            var port = $location.port();
            var protocol = $location.protocol();
            layer.open({
                type: 2,
                title: '修改密码',
                shadeClose: true,
                shade: 0.8,
                area: ['580px', '520px'],
                content: ['/index.html#/access/change', 'no'] //iframe的url
            })
        }


        $localStorage.settings = $scope.app.settings;

        // save settings to local storage  暂不支持自定义布局
        /*if (angular.isDefined($localStorage.settings)) {
            $scope.app.settings = $localStorage.settings;
        } else {
            $localStorage.settings = $scope.app.settings;
        }*/
        $scope.$watch('app.settings', function () {
            if ($scope.app.settings.asideDock && $scope.app.settings.asideFixed) {
                // aside dock and fixed must set the header fixed.
                $scope.app.settings.headerFixed = true;
            }
            // save to local storage
            $localStorage.settings = $scope.app.settings;
        }, true);

        // angular translate
        //$scope.lang = { isopen: false };
        //$scope.langs = {en:'English', de_DE:'German', it_IT:'Italian'};
        function isSmartDevice($window) {
            // Adapted from http://www.detectmobilebrowsers.com
            var ua = $window['navigator']['userAgent'] || $window['navigator']['vendor'] || $window['opera'];
            // Checks for iOs, Android, Blackberry, Opera Mini, and Windows mobile devices
            return (/iPhone|iPod|iPad|Silk|Android|BlackBerry|Opera Mini|IEMobile/).test(ua);
        }

        $.ajaxSetup({
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            beforeSend: function (evt, request, settings) {
                //request.url = 'iBase4J-Web' + request.url;
            },
            dataFilter: function (result) {
                try {
                    result = JSON.parse(result);
                    if (result.httpCode == 401) {
                        $cookieStore.put("account", "");
                        $state.go('access.login');
                        return null;
                    } else if (result.httpCode == 303) {
                    } else if (result.httpCode == 200) {
                    } else if (result.httpCode == 403) {
                        // layer.alert("未经授权，禁止访问！", { icon: 2 });
                    }
                    else if (result) {
                        layer.msg(result.msg, { icon: 2 });
                        //  //toaster.clear('*');
                        // //toaster.pop('error', '', result.msg);
                    }
                    return JSON.stringify(result);
                } catch (e) {
                    return result;
                }
            },
            error: function (jqXHR, textStatus, errorThrown) {
                switch (jqXHR.status) {
                    case (0):
                        ////toaster.clear('*');
                        // //toaster.pop('error', '', "请从新登录");
                        layer.msg("登录已超时，请从新登录", { icon: 2 });
                        $cookieStore.put("account", "");
                        parent.layer.closeAll();
                        if (!$state.includes('**.access.login')) {
                            $state.go('access.login', { returnUrl: escape($location.absUrl()) });
                        }

                        break;
                    // case (403):
                    //     layer.alert("未经授权，禁止访问！", { icon: 2 });
                    //     break
                    // case (404):
                    //     $window.location.href = "/src/tpl/error404.html";
                    //     break;
                    // case (405):
                    //     $state.go('access.login');
                    //     break;
                    // case (500):
                    //     $window.location.href = "/src/tpl/error500.html";
                    //     break;

                }
            }
        });

        /***
        获取权限列表
        **/
        $rootScope.getPermissionList = function () {
            var account = $cookieStore.get("account");
            if (account) {
                $.ajax({
                    type: 'get',
                    async: false,
                    url: '/iBase4J-SYS-Web/user/read/permission',
                }).then(function (result) {
                    $rootScope.permissionList = result.data;
                    //console.log($rootScope.permissionList);
                })
            }
        }

        if ($rootScope.permissionList == undefined) {
            $rootScope.getPermissionList();
        }

        // 排序需要的参数
        $rootScope.oParam = {};
        $rootScope.oParam.asc = '';
        $rootScope.baseAsc = true;

        // 初始化表格
        $rootScope.search = function (url, param) {
            $scope.loading = true;
            // 请求表格数据
            $.ajax({
                url: url,
                type: 'put',
                contentType: 'application/json;charset=UTF-8',
                data: angular.toJson(param)
            }).then(function (result) {
                $scope.loading = false;
                if (result.httpCode == 200) {
                    $rootScope.pageInfo = new Object(result);
                    //console.log($rootScope.pageInfo);
                } else {
                    $scope.msg = result.msg;
                    //toaster.clear('*');
                    //toaster.pop('error', '', "查询失败");
                }
                $rootScope.$apply();
            })
        }

        // 表格排序 参数：url: 请求路径，value: 排序关键字，param: 其他排序条件(js中的$scope.param)
        $scope.sortData = function (url, value, param, $event) {
            // param.orderBy = value;
            $rootScope.oParam.orderBy = value;
            $rootScope.oParam.asc = $rootScope.baseAsc;

            // 请求表格数据
            $.ajax({
                url: url,
                type: 'put',
                contentType: 'application/json;charset=UTF-8',
                data: angular.toJson(angular.extend(param, $rootScope.oParam)) // 如有冲突，后值覆盖前值
            }).then(function (result) {
                if (result.httpCode == 200) {
                    console.log(result)
                    $rootScope.pageInfo = new Object(result);
                    $('th.sortable').removeClass('desc').removeClass('asc').addClass('both'); // 添加箭头样式

                    if ($rootScope.baseAsc) {
                        //if ($('#' + value).hasClass('both') || $('#' + value).hasClass('desc')) {
                        $($event.target).removeClass('both').removeClass('desc').addClass('asc');

                        //}

                        $rootScope.baseAsc = false;
                    } else {
                        //if ($('#' + value).hasClass('both') || $('#' + value).hasClass('asc')) {
                        $($event.target).removeClass('both').removeClass('asc').addClass('desc')
                        //}
                        $rootScope.baseAsc = true;
                    }
                } else {
                    $scope.msg = result.msg;
                }
                $rootScope.$apply();
            })
        }

        // 分页内判断排序方式
        $rootScope.changeAsc = function () {
            var aBool;
            if ($rootScope.oParam.asc != '' && $rootScope.oParam.asc != undefined) {
                aBool = $rootScope.oParam.asc ? true : false;
            } else {
                aBool = '';
            }
            return aBool;
        }


        $rootScope.baseFun = {};
        // 根据level循环
        $rootScope.range = function (n) {
            if (n) {
                n = n - 0;
                return new Array(n);
            }
        }

        // 查找字符或字符串在字符串中的第n个位置
        $rootScope.baseFun.find = function(str,cha,num){
            var x=str.indexOf(cha);
            for(var i=0;i<num-1;i++){
                x=str.indexOf(cha,x+1);
            }
            return x;
        }

        // 数组去重
        $rootScope.baseFun.removeArrSame = function(arr){
            var res = [];
            var json = {};
            for (var i = 0; i < arr.length; i++) {
                if (!json[arr[i]] && arr[i] != '') {
                    res.push(arr[i]);
                    json[arr[i]] = 1;
                }
            }
            return res;
        }

        // 加法 & 减法
        $rootScope.baseFun.accAdd = function (arg1, arg2) {
            var r1, r2, m;
            try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
            try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
            m = Math.pow(10, Math.max(r1, r2))
            var result = ((arg1 * m + arg2 * m) / m).toFixed(2);
            result = window.parseFloat(result);
            return result;
        }
        // 日期加减
        $rootScope.baseFun.calcDate = function (days, val){ 
            var d = val ? new Date(val) : new Date();
            d.setDate(d.getDate()+days); 
            var m=d.getMonth()+1; 
            return d.getFullYear()+'-'+m+'-'+d.getDate(); 
        }
        $rootScope.baseFun.calcMonth = function (months, val){ 
            var d = val ? new Date(val) : new Date(); 
            d.setMonth(d.getMonth() + months + 1); 
            return d.getFullYear()+'-' + d.getMonth(); 
        }
        $rootScope.baseFun.compareDate = function (date1, date2){
            var aMore = true;
            var oDate1 = new Date(date1);
            var oDate2 = new Date(date2);
            if(oDate1.getTime() > oDate2.getTime()){
                aMore = true; // 第一个大
            } else {
                aMore = false;
            }
            return aMore;
        }

    }]);
app.filter('trustHtml', function ($sce) {
    return function (input) {
        return $sce.trustAsHtml(input);
    }

});
