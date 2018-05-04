/**
 * Created by Administrator on 2018/1/29.
 */
app.register.controller('waresPatrolCtrl', function ($rootScope, $scope, $http) {
    layer.closeAll();
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证

    // 是否爆款选框
    $scope.isChecked = function (event) {
        var target = window.event;
        var _this = $(target.srcElement)
        if (_this[0].tagName == 'LABEL') {
            _this.toggleClass('checked');
            $scope.search.isHot = $scope.search.isHot == 1 ? '' : 1;
            $scope.search.page = 0;
        }
    }

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
    $scope.search.goodsclassid = '';
    $scope.search.className = '';
    $scope.search.brandName = '';
    $scope.search.brandid = '';
    $scope.search.isHot = '';
    $scope.search.page = 0;

    $rootScope.pageClick2 = function (page) {
        $scope.search.page = page;
        $scope.search.searchFun();
    }

    // 获取表格
    $rootScope.searchTable('8096', '/goods/activity/back/activity/query?date=&goodsclassid=&brandid=&ishot=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        $scope.search.date = angular.element('#date')[0].value;
        //$scope.search.date = $rootScope.compareDate(date);
        $scope.tableUrl = '/goods/activity/back/activity/query?date=' + $scope.search.date + '&goodsclassid=' + $scope.search.goodsclassid + '&brandid=' + $scope.search.brandid + '&ishot=' + $scope.search.isHot + '&page=' + ($scope.search.page - 1);
        $rootScope.searchTable('8096', $scope.tableUrl);
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
    $http.post($rootScope.default.ClassifyPath3, {})
        .success(function (data) {
            $scope.classData = data;
        }).error(function (err) {
        layer.msg('未获取到分类信息', {time: 3000, icon:2});
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
        },
        // 分类
        changeMainClass: function (val) {
            if (val == '') {
                $scope.search.goodsclassid = '';
            }
            $('.se_class').addClass('block');
        },
        blurMainClass: function () {
            $('.se_class').removeClass('block');
        },
        getMainClass: function (id, val) {
            $scope.search.className = val;
            $scope.search.goodsclassid = id;
            $('.se_class').removeClass('block');
        }
    };

    $scope.changeDisabled = function (id, shopid, dis) {
        var url = '',
            tip = '';
        url = dis == 1 ? $rootScope.setPath(8096) + '/goods/activity/enabled?id=' + id + '&shopid=' + shopid : $rootScope.setPath(8096) + '/goods/activity/disable?id=' + id + '&shopid=' + shopid;
        tip = dis == 1 ? '上架' : '下架';
        $http.post(url, {})
            .success(function (data) {
                if (data == 0) {
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

    // // 分页
    // $scope.goPage = function (page) {
    //     $rootScope.table.pageInfo.number = page;
    //     $scope.search.searchFun();
    // }
    // $scope.goNextPage = function () {
    //     if($rootScope.table.pageInfo.totalPages.length != $rootScope.table.pageInfo.number) {
    //         $rootScope.table.pageInfo.number += 1;
    //         $scope.search.searchFun();
    //     }
    // }
    // $scope.goPrePage = function () {
    //     if($rootScope.table.pageInfo.number != 1) {
    //         $rootScope.table.pageInfo.number -= 1;
    //         $scope.search.searchFun();
    //     }
    // }


})