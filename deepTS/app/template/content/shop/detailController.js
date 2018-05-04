app.register.controller('shopDetailCtrl', function ($rootScope, $scope, httpAjax, $cookies, $location, $http, $routeParams) {
	 layer.closeAll();
  var height = $(window).height() - 160;
  $('.con-main').height(height);
  $rootScope.checkIn()//验证
  validate();

  var id = $routeParams.id;
  $scope.param = {};
  $scope.wareCode = '';
  $scope.mapValue = '';

  if(id != -1) {
	  // 获取详情
	  $http.post($rootScope.setPath(8070) + '/shop/query/enityShopid?shopid=' + id, {})
    .success(function (data) {
      $scope.param = {
        className: data.className,
        createTime: data.createTime,
        id: id,
        appId: data.appId,
        cityName: data.cityName,
        classId:  data.classId,
        countyName: data.countyName,
        disable: data.disable,
        latitude: data.latitude,
        logo: data.logo,
        longitude: data.longitude,
        phone: data.phone,
        provinceName: data.provinceName,
        shopAddress: data.shopAddress,
        shopName: data.shopName,
        brandId: data.brandId,
        consumptionPerPerson: data.consumptionPerPerson,
        shopSign: data.shopSign,
        url: data.list.length > 0 ? data.list[0].uploadImgSrc : '',
        isAudit: data.isAudit,
        backModuleId: data.backModuleId
      };
      $scope.isShowImg = true;
      $scope.isShowBannerImg = true;
    }).error(function (err) {
      layer.msg('获取失败', {time: 3000, icon:2});
    })
  } else {
   $scope.param = {
     className: '',
     createTime: '',
     appId:'',
     appSecret:'',
     cityName:'',
     classId: '',
     countyName:'',
     disable: 0,
     latitude:'',
     logo:'',
     longitude:'',
     phone: '',
     provinceName:'',
     shopAddress: '',
     shopName: '',
     mchId:'',
     mchKey:'',
     brandId: '',
     consumptionPerPerson: '',
     shopSign: '',
     url: '',
     isAudit: 0,
     backModuleId: $rootScope.backModuleId
   };
   $scope.isShowImg = false;
   $scope.isShowBannerImg = false;
  }

	// 获取下拉框值 // 一级分类
  $http.post($rootScope.default.ClassifyPath, {})
  .success(function (data) {
    $scope.classData = data;
  }).error(function (err) {
    layer.msg('未获取到分类信息', {time: 3000, icon:2});
  })

  $scope.allSelectFun = {
    // 分类
    changeEditShopClass : function (val) {
      $('.ed_shop_class').addClass('block');
    },
    blurEditShopClass: function () {
      $('.ed_shop_class').removeClass('block');
    },
    getEditShopClass : function (id, val) {
      $scope.param.className = val;
      $scope.param.classId = id;
      $('.ed_shop_class').removeClass('block');
    }
  }

  // 初始化底图
  var map = new qq.maps.Map(document.getElementById("shopMap"), {
      center: new qq.maps.LatLng(39.63048, 118.18058),      // 地图的中心地理坐标。
      zoom:13                                                 // 地图的中心地理坐标。
    });
  //添加监听事件   获取鼠标单击事件
  qq.maps.event.addListener(map, 'click', function(event) {
    var marker=new qq.maps.Marker({
      position:event.latLng, 
      map:map
    });    
    qq.maps.event.addListener(map, 'click', function(event) {
      marker.setMap(null);      
    });
    $scope.param.latitude = event.latLng.getLat();
    $scope.param.longitude = event.latLng.getLng();
    console.log(event.latLng.getLat(), event.latLng.getLng())
  });
  //调用地址解析类
  geocoder = new qq.maps.Geocoder({
    complete : function(result){
      console.log(result);
      map.setCenter(result.detail.location);
    }
  });
  $scope.getLocation = function () {
  	geocoder.getLocation($scope.mapValue);
  }


  // 店铺logo图片上传
  $scope.isShowImg = false;
  var uploader = new plupload.Uploader({
      browse_button: 'selectfiles',
      url: 'anything'
    });
  uploader.init();
  uploader.bind('FilesAdded',function(uploader, files){

    var reader = new FileReader();
    reader.readAsDataURL(files[0].getNative());
    reader.onload = (function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        if (this.width >= 266 && this.height >= 266 && this.width == this.height) {
          var imgFileName = files[0].name;
          var fileName = '';
          $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
          .success(function (data) {
            fileName = data.key + checkImgExtName(imgFileName);
            $scope.currentLogo = data.url + '/' + fileName;
            var _param = {
              'key': fileName,
              'OSSAccessKeyId': data.OSSAccessKeyId,
              'policy': data.policy,
              'Signature': data.Signature
            }
            uploader.setOption({
              'url': data.url,
              'multipart_params': _param
            })
            uploader.start();
          }).error(function () {
            layer.msg('获取图片路径失败', {time: 3000, icon:2});
          })

        } else {
          layer.msg('尺寸不符', {time: 3000, icon:2});
        }

      };
    });

  });
  uploader.bind('FileUploaded', function (uploader,file,responseObject) {
    if(responseObject.status == 204) {
      $scope.isShowImg = true;
      $scope.param.logo = $scope.currentLogo;
      $scope.$apply();
    }
  })

  $scope.isShowBannerImg = false;
  var uploader1 = new plupload.Uploader({
      browse_button: 'selectBannerImg', //触发文件选择对话框的按钮，为那个元素id或者元素本身
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
        if (this.width == 450 && this.height == 300) {
          var imgFileName = files[0].name;
          var fileName = '';
          $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
          .success(function (data) {
            fileName = data.key + checkImgExtName(imgFileName);
            $scope.bannerImg = data.url + '/' + fileName;
            var _param = {
              'key': fileName,
              //'Content-Disposition': 'attachment;filename=' + fileName,
              'OSSAccessKeyId': data.OSSAccessKeyId,
              'policy': data.policy,
              'Signature': data.Signature,
              //'Content-Disposition: form-data; name="file"; filename=': fileName
            }
            uploader1.setOption({
              'url': data.url,
              'multipart_params': _param
            })
            uploader1.start();
          }).error(function () {
            layer.msg('获取图片路径失败', {time: 3000, icon:2});
          })

        } else {
          layer.msg('尺寸不符', {time: 3000, icon:2});
        }

      };
    });

  });
  uploader1.bind('FileUploaded', function (uploader,file,responseObject) {
    if(responseObject.status == 204) {
      $scope.isShowBannerImg = true;
      $scope.param.url = $scope.bannerImg;
      $scope.$apply();
    }
  })

  // 表单验证
  function validate() {
    $('#editForm').validate({
      rules: {
        shopName: { required: true },
        consumptionPerPerson: { required: true },
        shopAddress: { required: true },
        phone: { required: true },
        shopSign: { required: true, maxlength: 15 }
      },
      messages: {
        shopName: { required: '请添加品牌' },
        consumptionPerPerson: { required: '请填写人均消费' },
        shopAddress: { required: '请填写店铺地址' },
        phone: { required: '请填写电话' },
        shopSign: { required: '请填写店铺招牌', maxlength: '字数不能超过15字' }
      },
      submitHandler: function () {
        saveShop();
      }
    })
  }

    // 保存数据
    function saveShop () {
      console.log($scope.param);
      if ($scope.param.logo == '') {
        layer.msg('请上传店铺logo', {time: 3000, icon:0});
        return;
      } else if ($scope.param.url == '') {
        layer.msg('请上传店铺宣传图', {time: 3000, icon:0});
        return;
      } else if ($scope.param.className == '') {
        layer.msg('请选择分类', {time: 3000, icon:0});
        return;
      } else if ($scope.param.latitude == '') {
        layer.msg('请在地图上选择店铺地址', {time: 3000, icon:0});
        return;
      } else {
        // 保存数据
        var saveUrl = '';
        saveUrl = id == -1 ? $rootScope.setPath(8070) + '/shop/add' : $rootScope.setPath(8070) + '/shop/edit';
        // layer.load(1, {shade: [0.2,'#000']});
        // 保存数据
        $http.post(saveUrl, angular.toJson($scope.param), {'Content-Type':'application/x-www-form-urlencoded'})
          .success(function (data) {
              layer.closeAll();
              if (data == 0) {
                  layer.msg('保存成功', {time: 3000, icon:1});
                  $location.path('/shop');
              } else {
                  layer.msg('保存失败', {time: 3000, icon:2});
              }
          })
          .error(function () {
            layer.msg('保存失败', {time: 3000, icon:2});
          })

      }

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

    $scope.goShop = function () {
    	$location.path('/shop');
    }
  })