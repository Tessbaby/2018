/**
 * Created by Administrator on 2018/1/29.
 */
app.register.controller('manageCtrl', function ($rootScope, $scope, $http, $window) {
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
                    setTimeout(function () {
                        getTable ();
                    }, 1000);

                } else {
                    layer.msg('删除失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
            layer.msg('删除失败', {time: 3000, icon:2});
        })
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
                        getTable ();
                    }
                });
            },
            error: function () {
                layer.msg('二维码获取失败', {time: 3000, icon:2});
            }
        })
    }

})