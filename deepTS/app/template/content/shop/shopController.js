app.register.controller('shopCtrl', function ($rootScope, $scope, httpAjax, $cookies, $location, $http) {
    layer.closeAll();
    var height = $(window).height() - 160;
    var width = $(window).width();
    $('.con-main').height(height);
    $('.bg').height(height + 60).width(width);
    $rootScope.checkIn()//验证

    // 设置查询参数
    $scope.search = {};
    $scope.search.name = null;
    $scope.search.isAudit = 0;
    $scope.search.isDisable = 0;
    $scope.search.page = 0;

    $rootScope.pageClick2 = function (page) {
        $scope.search.page = page;
        $scope.search.searchFun();
    }

    // 是否爆款选框
    $scope.isChecked = function (event) {
        var target = window.event;
        var _this = $(target.srcElement)
        if (_this[0].tagName == 'LABEL') {
            _this.toggleClass('checked');
            $scope.search.isAudit = $scope.search.isAudit == 0 ? 1 : 0;
        }
    }
    // 是否禁用
    $scope.isCheckedDis = function (event) {
        var target = window.event;
        var _this = $(target.srcElement)
        if (_this[0].tagName == 'LABEL') {
            _this.toggleClass('checked');
            $scope.search.isDisable = $scope.search.isDisable == 0 ? 1 : 0;
        }
    }


    // 获取表格
    $rootScope.searchTable('8070', '/shop/back/query?name=null&page=0&isaudit=0&disable=0'); // &isAudit=0
    /* 点击查询 */
    $scope.search.searchFun = function () {
        if ($scope.search.name) {$rootScope.table.pageInfo.number = 0;};
        $scope.tableUrl = '/shop/back/query?name=' + $scope.search.name + '&page='+ ($scope.search.page == 0 ? 0 : ($scope.search.page - 1)) + '&isaudit=' + $scope.search.isAudit + '&disable=' + $scope.search.isDisable; // 
        $rootScope.searchTable('8070', $scope.tableUrl);
    }

    // 获取二维码
    $scope.getCode = function (shopId) {
        $.ajax({
            url:  $rootScope.setPath(9070) + '/qrcode',
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

    // 添加、编辑
    $scope.goEditShop = function (id) {
        $location.path('/shops/detail/' + (id ? id : -1) );
    }

    // 启用&禁用
    $scope.changeDisabled = function (id, dis) {
        var url = '',
        tip = '';
        url = dis == 1 ? $rootScope.setPath(8070) + '/shop/enabled?id=' + id : $rootScope.setPath(8070) + '/shop/disable?id=' + id;
        tip = dis == 1 ? '启用' : '禁用';
        $http.post(url, {})
        .success(function (data) {
            if(data == 0) {
                layer.msg(tip + '成功', {time: 3000, icon:1});
                setTimeout(function () {
                    $scope.search.name = null;
                    $scope.search.isAudit = 0;
                    $scope.search.isDisable = 0;
                    $scope.search.searchFun();
                }, 1000);
            } else {
                layer.msg(tip + '失败', {time: 3000, icon:2});
            }
        }).error(function (err) {
            layer.msg(tip + '失败', {time: 3000, icon:2});
        });
    }

    // 审核
    $scope.setAudit = function (id) {
        var url = $rootScope.setPath(8070) + '/shop/isAudit?id=' + id;
        $http.post(url, {})
        .success(function (data) {
            if(data == 0) {
                layer.msg('审核成功', {time: 3000, icon:1});
                setTimeout(function () {
                    $scope.search.name = null;
                    $scope.search.isAudit = 0;
                    $scope.search.isDisable = 0;
                    $scope.search.searchFun();
                }, 1000);
            } else {
                layer.msg('审核失败', {time: 3000, icon:2});
            }
        }).error(function (err) {
            layer.msg('审核失败', {time: 3000, icon:2});
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
