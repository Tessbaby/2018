app.register.controller('shopDetailCtrl', function ($rootScope, $scope, httpAjax, $cookies, $location, $http, $routeParams) {
	layer.closeAll();
  var height = $(window).height() - 160;
  $('.con-main').height(height);
  $rootScope.checkIn()//验证
  validate();

  var id = $routeParams.id;
  $scope.param = {};

  if(id != -1) {
  	// 获取详情
	  /*$http.post($rootScope.setPath(8070) + '/shop/query/enityShopid?shopid=' + id, {})
      .success(function (data) {
        $scope.param = {
            className: data.className,
            id: id,
            appId: data.appId,
            cityName: data.cityName,
            classId:  data.classId,
            countyName: data.countyName
        };
      }).error(function (err) {
          layer.msg('获取失败', {time: 3000, icon:2});
        })*/
    } else {
     $scope.param = {
      brandName: '',
      brandid: '',
      id: id,
      appId: '',
      cityName: '',
      classId:  '',
      countyName: ''
    };
  }
    
  $scope.startDate = { // 日期配置
    date: '',
    format: "yyyy-MM-dd",
    altInputFormats: ['yyyy-M!-d!'],
    opened: false,
    openPicker: function () {
      this.opened = true;
    }
  };
  $scope.endDate = { // 日期配置
    date: '',
    format: "yyyy-MM-dd",
    altInputFormats: ['yyyy-M!-d!'],
    opened: false,
    openPicker: function () {
      this.opened = true;
    }
  };

  $scope.allSelectFun = {
    // 品牌
    changeMainBrand: function (val) {
      if (val == '') {
        $scope.param.brandid = '';
      }
      $('.se_brand').addClass('block');
    },
    blurMainBrand: function () {
      $('.se_brand').removeClass('block');
    },
    getMainBrand: function (id, val) {
      $scope.param.brandName = val;
      $scope.param.brandid = id;
      $('.se_brand').removeClass('block');
    }
  }

  // 表单验证
  function validate() {
    $('#editForm').validate({
      rules: {
        shopName: { required: true },
        className: { required: true },
        address: { required: true },
        phone: { required: true }
      },
      messages: {
        shopName: { required: '请添加品牌' },
        className: { required: '请添加分类' },
        address: { required: '请填写地址' },
        phone: { required: '请填写电话' }
      },
      submitHandler: function () {
        //saveShop();
      }
    })
  }

  // 保存数据
  function saveShop () {
      // 保存数据
      var saveUrl = '';
      saveUrl = $scope.id ? $rootScope.setPath(8070) + '/shop/edit' : $rootScope.setPath(8070) + '/shop/add';

      /*// 保存数据
      $http.post(saveUrl, angular.toJson($scope.param), {'Content-Type':'application/x-www-form-urlencoded'})
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

          $scope.goTicketCenter = function () {
           $location.path('/ticketCenter');
         }

       })