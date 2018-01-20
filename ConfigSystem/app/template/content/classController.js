/**
 * Created by Administrator on 2018/1/16.
 */
function oClassifyCtrl($rootScope, $scope, httpAjax, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);

    // 获取下拉菜单分类
    httpAjax.postData($rootScope.default.selectPath, '').then(function (data) {
        console.log(data);
    })

    // 设置保存&修改 参数
    $scope.param = {};
    $scope.param.name = '';
    $scope.param.rootId = '';
    $scope.param.rootName = '';
    $scope.param.img = '';
    $scope.param.disable = 0;
    $scope.param.id = 0;
    // 设置查询参数
    $scope.searchId = '';
    $scope.showImg = false;

    // 是编辑还是添加
    $scope.title = '';

    /* 点击查询 */
    //$scope.searchTable = httpAjax.getTable('aaa', {a: 1});

    /* 获取下拉选中项 有多个下拉时 暂时定义多个 如果有其他方法在做修改*/
    $scope.allSelectFun = {};
    $scope.allSelectFun.changeMainClassify = function () {
        $('.se_class').addClass('block');
    }
    $scope.allSelectFun.getMainClassify = function (id, name) {
        // 查询参数
        $scope.searchId = name;
        $('.se_class').removeClass('block');
    }
    $scope.allSelectFun.changeEditClassify = function () {
        $('.ed_class').addClass('block');
    }
    $scope.allSelectFun.getEditClassify = function (id, val) {
        $scope.param.rootName = val;
        $scope.param.rootId = id;
        $('.ed_class').removeClass('block');
    }

    $scope.editClassify = function (type) {
        $scope.title = type ? '编辑' : '添加';
        layer.open({
            type: 1,
            title: $scope.title,
            content: $('#editClassLayer'),
            area: ['50%', '500px'],
            cancel: function () {}
        })
        $('.layui-layer-shade').addClass('hide');
    }
    $scope.saveClassify = function () {
        // 保存数据
        $http.post('http://192.168.1.200:8060/goods/class/add', {data: $scope.param}, {'Content-Type':'application/x-www-form-urlencoded'})
            .success(function (data) {
                console.log(data);
                layer.closeAll();
            })
            .error(function () {
                layer.closeAll();
            })
    }

    /* 图片上传 */
    $scope.fileChange = function () {
        $http.post($rootScope.default.imgPath, {},
            {
                withCredentials: true,//跨域
                headers: {
                    'content-type': 'application/json',
                }//跨域
            }).success(function (data) {
            console.log(data);
        }).error(function () {
            console.log('error')
        })
    }
}