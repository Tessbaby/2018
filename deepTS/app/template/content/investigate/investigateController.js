app.register.controller('investigateCtrl', function ($rootScope, $scope, $http) {
	layer.closeAll();
  var height = $(window).height() - 160;
  $('.con-main').height(height);
  $rootScope.checkIn()
  $scope.page = 0;
  $rootScope.pageClick2 = function (page) {
    $scope.page = page;
    table();
  }

  table();
  function table() { 
    var url = $rootScope.setPath(8051) + '/research/back/release/query?backModuleId=' + $rootScope.backModuleId + '&page=' + ($scope.page == 0 ? 0 : $scope.page - 1);
    $http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (result) {
        $scope.tableList = result.content ? result.content : [];
        $scope.option = {
          curr: result.number + 1, 
          all: result.totalPages, 
          count: 10, 
          click: function (page) {}
        }
      })
      .error(function () {
        layer.closeAll();
        layer.msg('获取数据失败', {time: 3000, icon:2});
      })
  }

  $scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
    $(':input').labelauty(); 
  });

  $scope.showInvest = function (id) {
    var url = $rootScope.setPath(8051) + '/research/back/release/entity?id=' + id;
    $http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        if (data) {
          $scope.showInvestData = data;
          layer.open({
            type: 1,
            title: '查看调查问卷',
            content: $('#watchInvestLayer'),
            area: ['50%', '600px']
          })
          $('.layui-layer-shade').addClass('hide');
        } else {
          $scope.showInvestData = [];
        }
      })
      .error(function () {
        layer.msg('获取数据失败', {time: 3000, icon:2});
      })

  }

  $scope.closeInvest =function (id) {
    var url = $rootScope.setPath(8051) + '/research/back/close?id=' + id;
    $http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        if (data == 0) {
          layer.closeAll();
          layer.msg('删除成功', {time: 3000, icon:1});
          table();
        } else {
          $scope.showInvestData = [];
          layer.msg('删除失败', {time: 3000, icon:2});
          table();
        }
      })
      .error(function () {
        layer.msg('删除失败', {time: 3000, icon:2});
      })
  }

  $scope.sendResearch = function (id) {
    var url = $rootScope.setPath(8051) + '/research/back/release?id=' + id + '&backModuleId=' + $rootScope.backModuleId;
    $http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        if (data == 0) {
          layer.closeAll();
          layer.msg('投放成功', {time: 3000, icon:1});
          table();
        } else {
          $scope.showInvestData = [];
          layer.msg('投放失败', {time: 3000, icon:2});
          table();
        }
      })
      .error(function () {
        layer.msg('投放失败', {time: 3000, icon:2});
      })
  }



  $scope.addNewInvest = function () {
    layer.open({
      type: 1,
      title: '添加调查问卷',
      content: $('#editInvestLayer'),
      area: ['70%', '600px']
    })
    $('.layui-layer-shade').addClass('hide');
    $scope.edit = {"backModuleId": $rootScope.backModuleId,"disable":0,"name":"","researchTemplateList":[{"backModuleId": $rootScope.backModuleId,"content":"","researchId":"","researchSelectList":[{"researchTemplateId":"","selectContent":""}]}],"sendResearch":0};
    var obj = {"backModuleId": $rootScope.backModuleId,"content":"","researchId":"","researchSelectList":[{"researchTemplateId":"","selectContent":""}]};
    $scope.contentArr = [];
    $scope.contentArr.push(obj);
  }

  
  $scope.addContent = function () {
    obj = {"backModuleId": $rootScope.backModuleId,"content":"","researchId":"","researchSelectList":[{"researchTemplateId":"","selectContent":""}]};
    $scope.contentArr.push(obj);
  }
  $scope.delContent = function (index) {
    $scope.contentArr.splice(index, 1);
  }
  $scope.delOptions = function (parent, index) {
    $scope.contentArr[parent].researchSelectList.splice(index, 1);
  }
  $scope.addOptions = function (parent, index) {
    var child = {"researchTemplateId":"","selectContent":""};
    $scope.contentArr[parent].researchSelectList.splice((index + 1), 0, child);
  }

  $scope.saveContent = function () {
    $scope.edit.researchTemplateList = $scope.contentArr;
    var url = $rootScope.setPath(8051) + '/research/back/create';
    $http.post(url, $scope.edit, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        if (data == 0) {
          layer.closeAll();
          layer.msg('保存成功', {time: 3000, icon:1});
          table();
        } else {
          $scope.showInvestData = [];
          layer.msg('保存失败', {time: 3000, icon:2});
          table();
        }
      })
      .error(function () {
        layer.msg('保存失败', {time: 3000, icon:2});
      })
  }
})