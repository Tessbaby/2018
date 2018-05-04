/**
 * Created by Administrator on 2018/1/29.
 */
app.register.controller('loginCtrl', function ($scope, $rootScope, $cookies, $http, $window) {
    layer.closeAll();
    // 设置登录样式
    var w_width = $('body').width(),
        w_height = $('body').height();
    $('.login').width(w_width).height(w_height);
    console.log(w_width, $(document).width())

    $(window).resize(function(event) {
        /* Act on the event */
        var w_width = $('body').width(),
        w_height = $('body').height();
        $('.login').width(w_width).height(w_height);
    });

    $scope.isShowLayer = false;
    $rootScope.breadList.list = []; // 初始化面包屑导航
    $cookies.put('uuid', '');
    getCode();
    function getCode() {
        $.ajax({
            url: $rootScope.setPath(8066) + '/auth/create/uuid',
            method: 'get',
            headers: {
                "content-type": "text/plain"
            },
            success:function (data) {
                $cookies.put('uuid',data);
                $rootScope.wxConnect = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=' + $rootScope.default.appid + '&redirect_uri=http%3A%2F%2F' + $rootScope.default.yPath + '%2Fauth%2Fread%2Fwx%2Fopenid&response_type=code&scope=snsapi_base&state=' + data
                $.ajax({
                    url: $rootScope.setPath(9070) + '/qrcode',
                    method: 'post',
                    data: $rootScope.wxConnect,
                    //dataType: "text",
                    withCredentials: true,//跨域
                    headers: {
                        'content-type': 'application/json'
                    },
                    success: function (_data) {
                        $scope.isShowLayer = false;
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
    }


    function setWS () {
        $cookies.put('openId', '');// 先清除cookies
        $scope.isLogin = false;
        // 长链接请求
        var ws = new WebSocket($rootScope.default.ws);
        ws.onopen = function(){
            var uuid = $cookies.get('uuid');
            ws.send(uuid);
        };
        ws.onmessage = function(message) {
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
                    $('#nav > li').removeClass('active')
                    var as = $('#nav > li > a');
                    angular.forEach(as, function (item, i) {
                        if ($(item).attr('href') == '#/classify') {
                            $(item).parent().addClass('active');
                        }
                    })
                }, 1000);
            }
        };
        ws.onclose = function(evt){
            if (!$scope.isLogin) {
                layer.msg('请求超时！', {time: 3000, icon:2});
                $scope.isShowLayer = true;
                $scope.$apply();
            }
        };
        ws.onerror = function(evt){
            layer.msg('登录失败，请重新登录！', {time: 3000, icon:2});
            $scope.isShowLayer = true;
            $scope.$apply();
        };
    }

    $scope.reload = function () {
        getCode();
    }

})