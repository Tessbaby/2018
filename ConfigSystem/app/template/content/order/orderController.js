/**
 * Created by Administrator on 2018/1/29.
 */
app.register.controller('orderCtrl', function ($rootScope, $scope, $http) {
    layer.closeAll();
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

    // 设置查询参数
    $scope.search = {};
    $scope.search.date = '';
    $scope.search.brandName = '';
    $scope.search.brandid = '';
    $scope.search.ordercode = '';
    $scope.search.page = 0;

    $rootScope.pageClick2 = function (page) {
        $scope.search.page = page;
        $scope.search.searchFun();
    }

    // 获取表格
    $rootScope.searchTable('8096', '/goods/activity/back/order/query?date=&brandid=&ordercode=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        $scope.search.date = angular.element('#date')[0].value;
        //$scope.search.date = $rootScope.compareDate(date);
        if ($scope.search.date || $scope.search.brandid || $scope.search.ordercode) {$scope.search.page = 0;};
        $scope.tableUrl = '/goods/activity/back/order/query?date=' + $scope.search.date + '&brandid=' + $scope.search.brandid + '&ordercode=' + $scope.search.ordercode + '&page=' + ($scope.search.page - 1);
        $rootScope.searchTable('8096', $scope.tableUrl);
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
        changeMainBrand : function (val) {
            if (val == '') {
                $scope.search.brandid = '';
            }
            $('.se_brand').addClass('block');
        },
        blurMainBrand: function () {
            $('.se_brand').removeClass('block');
        },
        getMainBrand : function (id, val) {
            $scope.search.brandName = val;
            $scope.search.brandid = id;
            $('.se_brand').removeClass('block');
        }
    };

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