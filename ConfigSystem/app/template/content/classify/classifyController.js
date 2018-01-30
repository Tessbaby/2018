/**
 * Created by Administrator on 2018/1/29.
 */

app.register.controller('classifyCtrl', function ($rootScope, $scope, httpAjax, $http) {
    var height = $(window).height() - 160;
    $('.con-main').height(height);
    $rootScope.checkIn()//验证
    validate();

    /* 设置查询参数 */
    $scope.search = {};
    $scope.search.rootid = '';
    $scope.search.name = '';

    /* 获取表格 */
    $rootScope.searchTable('8060/goods/class/back/query?rootid=&page=0');
    /* 点击查询 */
    $scope.search.searchFun = function () {
        $rootScope.table.pageInfo.number = $rootScope.table.pageInfo.number == 0 ? 0 : $rootScope.table.pageInfo.number - 1
        $scope.tableUrl = '8060/goods/class/back/query?rootid=' + $scope.search.rootid + '&page='+ $rootScope.table.pageInfo.number;
        $rootScope.searchTable($scope.tableUrl);
    }

    /* 获取下拉菜单分类 二级分类*/
    httpAjax.postData($rootScope.default.ClassifyPath2, '').then(function (data) {
        $scope.dummyData = data;
    })
    /* 获取下拉选中项 有多个下拉时 暂时定义多个 如果有其他方法在做修改*/
    $scope.allSelectFun = {
        changeMainClassify : function (val) {
            if (val == '') {
                $scope.search.rootid = '';
            }
            $('.se_class').addClass('block');
        },
        blurMainClassify: function () {
            $('.se_class').removeClass('block');
        },
        getMainClassify : function (id, name) {
            // 查询参数
            $scope.search.name = name
            $scope.search.rootid = id;
            $('.se_class').removeClass('block');
        },
        changeEditClassify : function (val) {
            $('.ed_class').addClass('block');
        },
        blurEditClassify: function () {
            $('.ed_class').removeClass('block');
        },
        getEditClassify : function (id, val) {
            $scope.param.classRootName = val;
            $scope.param.classRootId = id;
            $('.ed_class').removeClass('block');
        }
    };

    $scope.editClassify = function (item) {
        // 设置保存&修改 参数
        $scope.param = {};
        if (item) {
            $scope.param.name = item.name;
            $scope.param.classRootId = item.classRootId;
            $scope.param.classRootName = item.classRootName;
            $scope.param.classFatherId = item.classFatherId;
            $scope.param.classFatherName = item.classFatherName;
            $scope.param.img = item.img;
            $scope.param.disable = item.disable;
            $scope.param.id = item.id;
            $scope.title = '编辑';
            $scope.isShowImg = true;
        } else {
            $scope.param.name = '';
            $scope.param.classRootId = '';
            $scope.param.classRootName = '';
            $scope.param.classFatherId = '';
            $scope.param.classFatherName = '';
            $scope.param.img = '';
            $scope.param.disable = '';
            $scope.param.id = '';
            $scope.title = '添加';
            $scope.isShowImg = false;
        }
        // 获取下拉二级菜单分类
        httpAjax.postData($rootScope.default.ClassifyPath, '').then(function (data) {
            $scope.dummyData = data;
        })
        layer.open({
            type: 1,
            title: $scope.title,
            content: $('#editClassLayer'),
            area: ['50%', '550px']
        })
        $('.layui-layer-shade').addClass('hide');
    }

    // 启用&禁用
    $scope.changeDisabled = function (id, dis) {
        var url = '',
            tip = '';
        url = dis == 1 ? $rootScope.default.dPath + '8060/goods/class/enabled?id=' + id : $rootScope.default.dPath + '8060/goods/class/del?id=' + id;
        tip = dis == 1 ? '启用' : '禁用';
        $http.post(url, {})
            .success(function (data) {
                if(data == 0) {
                    layer.msg(tip + '成功', {time: 3000, icon:1});
                    $scope.search.searchFun();
                } else {
                    layer.msg(tip + '失败', {time: 3000, icon:2});
                }
            }).error(function (err) {
            layer.msg(tip + '失败', {time: 3000, icon:2});
        });
    }

    // 图片上传
    $scope.isShowImg = false;
    var uploader = new plupload.Uploader({
        browse_button: 'selectfiles', //触发文件选择对话框的按钮，为那个元素id或者元素本身
        url: 'anything', //文件上传url地址,
    });
    uploader.init();
    uploader.bind('FilesAdded',function(uploader, files){
        var imgFileName = files[0].name;
        var fileName = '';
        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
            .success(function (data) {
                fileName = data.key + checkImgExtName(imgFileName);
                $scope.currentImg = data.url + '/' + fileName;
                var _param = {
                    'key': fileName,
                    //'Content-Disposition': 'attachment;filename=' + fileName,
                    'OSSAccessKeyId': data.OSSAccessKeyId,
                    'policy': data.policy,
                    'Signature': data.Signature,
                    //'Content-Disposition: form-data; name="file"; filename=': fileName
                }
                uploader.setOption({
                    'url': data.url,
                    'multipart_params': _param
                })
                uploader.start();
            }).error(function () {
            layer.msg('获取图片路径失败', {time: 3000, icon:2});
        })
    });
    uploader.bind('FileUploaded', function (uploader,file,responseObject) {
        if(responseObject.status == 204) {
            $scope.isShowImg = true;
            $scope.param.img = $scope.currentImg;
            $scope.$apply();
        }
    })

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

    // 表单验证
    function validate() {
        $('#editForm').validate({
            rules: {
                classRootName: { required: true },
                name: { required: true }
            },
            messages: {
                classRootName: { required: '请选择分类' },
                name: { required: '请输入子分类' }
            },
            submitHandler: function () {
                saveClassify();
            }
        })
    }

    // 保存数据
    function saveClassify () {
        var saveUrl = '';
        saveUrl = $scope.title == '添加' ? $rootScope.default.dPath + '8060/goods/class/add' : $rootScope.default.dPath + '8060/goods/class/edit';

        // 保存数据
        $http.post(saveUrl, $scope.param, {'Content-Type':'application/x-www-form-urlencoded'})
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.msg('保存成功', {time: 3000, icon:1});
                    setTimeout(function () {
                        $scope.search.searchFun();
                    }, 1000);
                } else {
                    layer.msg('保存失败', {time: 3000, icon:2});
                }
            })
            .error(function () {
                layer.closeAll();
                layer.msg('保存失败', {time: 3000, icon:2});
            })
    }

    // 截取url
    function checkImgExtName (fileName) {
        var extName
        if (fileName.indexOf(".png") > 0) {
            extName = fileName.slice(fileName.indexOf(".png"), fileName.length)
        } else if (fileName.indexOf(".jpg") > 0) {
            extName = fileName.slice(fileName.indexOf(".jpg"), fileName.length)
        } else if (fileName.indexOf(".jpeg") > 0) {
            extName = fileName.slice(fileName.indexOf(".jpeg"), fileName.length)
        } else {
            layer.msg('图片格式错误', {time: 3000, icon:0});
        }
        return extName;
    }

})