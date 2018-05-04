app.register.controller('energyCtrl', function ($rootScope, $scope, httpAjax, $http) {
  $rootScope.isLogin = false;
  layer.closeAll();
  var height = $(window).height() - 160;
  $('.con-main').height(height);
  $rootScope.checkIn()
  validate();

  $scope.param = {};

  getData();

  function getData() {
    var url = $rootScope.setPath(8062) + '/admin/back/sys/set/query?backModuleId=' + $rootScope.backModuleId;
  	$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        if (data) {
          $scope.param = data;
        } else {
          $scope.param = {"backModuleId": $rootScope.backModuleId,"id":0,"initValue":0,"markValue":0,"researchValue":0,"shareShopValue":0,"singValue":0}
        }
      })
      .error(function () {
        layer.closeAll();
        layer.msg('获取失败', {time: 3000, icon:2});
      })
  }

  function validate() {
  	$('#energy').validate({
      rules: {
        begin: { required: true },
        share: { required: true},
        mark: { required: true},
        markShare: { required: true},
        sign: { required: true }
      },
      messages: {
        begin: { required: '初始能量值不能为空' },
        share: { required: '值不能为空' },
        mark: { required: '值不能为空' },
        markShare: { required: '值不能为空' },
        sign: { required: '值不能为空' }
      },
      submitHandler: function () {
          saveEnergy();
      }
    })
  }

  function saveEnergy() {
  	var url = $rootScope.setPath(8062) + '/admin/back/sys/set';
  	$http.post(url, $scope.param, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        layer.closeAll();
      if (data == 0) {
          layer.msg('保存成功', {time: 3000, icon:1});
        } else {
          layer.msg('保存失败', {time: 3000, icon:2});
        }
      })
      .error(function () {
          layer.closeAll();
          layer.msg('保存失败', {time: 3000, icon:2});
      })
  }
})