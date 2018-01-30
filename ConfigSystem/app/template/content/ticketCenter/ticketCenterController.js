/**
 * Created by Administrator on 2018/1/29.
 */
app.register.controller('ticketCenterCtrl', function ($rootScope, $scope, $http) {
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
        //$scope.search.date = $rootScope.compareDate(date);
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8093/coupon/back/query?date=' + $scope.search.date + '&brandid=' + $scope.search.brandid + '&page=' + $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    /* 点击巡查 */
    $scope.showCard = function (img) {
        if (img) {
            layer.open({
                type: 1,
                shade: false,
                title: false, //不显示标题
                content: '<div style="width: 300px; height: 300px; padding: 20px;"><img src="' +  img + '" alt="图片加载失败" style="width: 100%; height: 100%;"></div>'
            });
        } else {
            layer.msg('无巡查二维码', {time: 3000, icon:2})
        }

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
            if (val == '') {
                $scope.search.brandid = '';
            }
            $('.se_brand').addClass('block');
        },
        blurMainBrand: function () {
            $('.se_brand').removeClass('block');
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
                    setTimeout(function () {
                        $scope.search.searchFun();
                    }, 1000);
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