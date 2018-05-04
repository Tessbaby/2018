app.register.controller('waresPatrolDetailCtrl', function ($rootScope, $scope, $http, $routeParams, $location) {
  layer.closeAll();
  var height = $(window).height() - 160;
  $('.con-main').height(height);
  $rootScope.checkIn()//验证

  var id = $routeParams.id;
  $scope.param = {};

	/*if(id != -1) {
	  // 获取详情
	  $http.post($rootScope.setPath(8070) + '/shop/query/enityShopid?shopid=' + id, {})
      .success(function (data) {
        $scope.param = {
            title: data.title,
            id: id,
            remark: data.remark,
            banner: data.banner,
            specs: data.specs
        };
        UE.getEditor('editDetail').addListener("ready", function () {
            $scope.param.detail = UE.getEditor('editDetail').setContent(data.detail);
        })
        UE.getEditor('editNotes').addListener("ready", function () {
            $scope.param.notes = UE.getEditor('editNotes').setContent(data.notes);
        })
          // getCode(); 获取二维码
      }).error(function (err) {
          layer.msg('获取失败', {time: 3000, icon:2});
      })
	} else {*/
	    $scope.param = {
	        title: '',
	        remark: '',
	        banner: [],
	        detail: '',
	        notes: '',
	        specs: []
	    };
	// }

  $scope.banner = [];
    var uploader = new plupload.Uploader({
        browse_button: 'uploadBanner', //触发文件选择对话框的按钮，为那个元素id或者元素本身
        url: 'anything', //文件上传url地址,
    });
    uploader.init();
    uploader.bind('FilesAdded',function(uploader, files){
        
        var reader = new FileReader();
        reader.readAsDataURL(files[0].getNative());
        reader.onload = (function (e) {
            var image = new Image();
            image.src = e.target.result;
            image.onload = function () {
                //if (this.width == 150 && this.height == 75) { //this.width < 72 && this.height < 36

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

                //} else {
                    //layer.msg('尺寸不符', {time: 3000, icon:2});
                //}

            };
        });

    });
    uploader.bind('FileUploaded', function (uploader,file,responseObject) {
        if(responseObject.status == 204) {
            $scope.param.banner.push($scope.currentImg);
            console.log($scope.param.banner)
            $scope.$apply();
        }
    })

    $scope.delBanner = function (index) {
        $scope.param.banner.splice(index, 1);
    }

    // 添加规格
    $scope.addSpec = function () {
        var arr = {
            subTitle: '',
            price: '',
            prevPrice: '',
            img: ''
        }
        $scope.param.specs.push(arr);
    }

    $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
        var idArr = [];
        angular.forEach($scope.param.specs, function(value, index){
            idArr.push('specfiles_' + index);
            $scope.specIndex = index;
        });
        var uploader1 = new plupload.Uploader({
            browse_button: idArr, //触发文件选择对话框的按钮，为那个元素id或者元素本身
            url: 'anything', //文件上传url地址,
        });
        uploader1.init();
        uploader1.bind('FilesAdded',function(uploader, files){
            
            var reader1 = new FileReader();
            reader1.readAsDataURL(files[0].getNative());
            reader1.onload = (function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    //if (this.width == 150 && this.height == 75) { //this.width < 72 && this.height < 36

                        var imgFileName = files[0].name;
                        var fileName = '';
                        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
                            .success(function (data) {
                                fileName = data.key + checkImgExtName(imgFileName);
                                $scope.specImg = data.url + '/' + fileName;
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

                    //} else {
                        //layer.msg('尺寸不符', {time: 3000, icon:2});
                    //}

                };
            });

        });
        uploader1.bind('FileUploaded', function (uploader,file,responseObject) {
            if(responseObject.status == 204) {
                $scope.param.specs[$scope.specIndex].img = $scope.specImg;
                $scope.$apply();
            }
        })
    })

    // 删除规格
    $scope.delSpec = function (index) {
        $scope.param.specs.splice(index, 1);
    }

    // 编辑器
    $(document).ready(function () {
        var ue = UE.getEditor('editDetail'); // 商品详情
        var notes = UE.getEditor('editNotes'); // 购买须知
    })

    $scope.uploadImg = function () {
        var uploader2 = new plupload.Uploader({
            browse_button: 'plupload', //触发文件选择对话框的按钮，为那个元素id或者元素本身
            url: 'anything', //文件上传url地址,
        });
        uploader2.init();
        uploader2.bind('FilesAdded',function(uploader, files){
            
            var reader2 = new FileReader();
            reader2.readAsDataURL(files[0].getNative());
            reader2.onload = (function (e) {
                var image = new Image();
                image.src = e.target.result;
                image.onload = function () {
                    //if (this.width == 150 && this.height == 75) { //this.width < 72 && this.height < 36

                        var imgFileName = files[0].name;
                        var fileName = '';
                        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
                            .success(function (data) {
                                fileName = data.key + checkImgExtName(imgFileName);
                                $scope.detailImg = data.url + '/' + fileName;
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

                    //} else {
                        //layer.msg('尺寸不符', {time: 3000, icon:2});
                    //}

                };
            });

        });
        uploader2.bind('FileUploaded', function (uploader,file,responseObject) {
            if(responseObject.status == 204) {
                var html = '<img src="' + $scope.detailImg + '" width="400px">'
                UE.getEditor('editDetail').setContent(html, true);
                $scope.$apply();
            }
        })
    }

    // 表单验证
    function validate() {
        $('#editForm').validate({
            rules: {
                /*shopName: { required: true },
                className: { required: true },
                address: { required: true },
                phone: { required: true }*/
            },
            messages: {
                /*shopName: { required: '请添加品牌' },
                className: { required: '请添加分类' },
                address: { required: '请填写地址' },
                phone: { required: '请填写电话' }*/
            },
            submitHandler: function () {
                saveShop();
            }
        })
    }

    // 保存数据
    $scope.saveShop = function () {
        $scope.param.detail = UE.getEditor('editDetail').getContent();
        $scope.param.notes = UE.getEditor('editNotes').getContent();
        // 保存数据
        var saveUrl = '';
        saveUrl = $scope.id ? $rootScope.setPath(8070) + '/shop/edit' : $rootScope.setPath(8070) + '/shop/add';
        console.log(angular.toJson($scope.param))
        // 保存数据
        /*$http.post(saveUrl, angular.toJson($scope.param), {'Content-Type':'application/x-www-form-urlencoded'})
            .success(function (data) {
                layer.closeAll();
                if (data == 0) {
                    layer.msg('保存成功', {time: 3000, icon:1});
                    setTimeout(function () {
                        $scope.search.name = '';
                        $scope.search.searchFun();
                    }, 1000);
                } else {
                    layer.msg('保存失败', {time: 3000, icon:2});
                }
            })
            .error(function () {
                layer.closeAll();
                layer.msg('保存失败', {time: 3000, icon:2});
            })*/
        layer.closeAll();
    }

    $scope.goPrev = function () {
    	$location.path('/waresPatrol');
    }

    // 截取图片名
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