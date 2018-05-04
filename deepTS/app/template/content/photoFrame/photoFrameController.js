app.register.controller('photoFrameCtrl', function ($rootScope, $scope, httpAjax, $http) {
  $rootScope.isLogin = false;
  layer.closeAll();
  var height = $(window).height() - 160;
  $('.con-main').height(height);
  $rootScope.checkIn()

  $scope.imgArr = [];
  $scope.param = {"backModuleId": $rootScope.backModuleId,"photoUrl":""};
  getImgs();

  function getImgs() {
    var url = $rootScope.setPath(8062) + '/admin/back/compound/photo/query?backModuleId=' + $rootScope.backModuleId;
    $http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        if (data) {
          $scope.imgArr = data;
        }
      })
      .error(function () {
        layer.msg('获取失败', {time: 3000, icon:2});
      })
  }

  var uploader = new plupload.Uploader({
    browse_button: 'selectfiles', 
    url: 'anything', 
  });
  uploader.init();
  uploader.bind('FilesAdded',function(uploader, files){
    var reader = new FileReader();
    reader.readAsDataURL(files[0].getNative());
    reader.onload = (function (e) {
      var image = new Image();
      image.src = e.target.result;
      image.onload = function () {
        var imgFileName = files[0].name;
        var fileName = '';
        $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
        	.success(function (data) {
            fileName = data.key + checkImgExtName(imgFileName);
            $scope.currentImg = data.url + '/' + fileName;
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
      };
	  });
	});
  uploader.bind('FileUploaded', function (uploader,file,responseObject) {
    if(responseObject.status == 204) {
      saveImg();
    }
  })

  function saveImg() {
    $scope.param.photoUrl = $scope.currentImg;
  	var url = $rootScope.setPath(8062) + '/admin/back/compound/photo';
    $http.post(url, $scope.param, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        layer.closeAll();
        if (data == 0) {
          layer.msg('保存成功', {time: 3000, icon:1});
          getImgs();
        } else {
          layer.msg('保存失败', {time: 3000, icon:2});
          $scope.imgArr.pop();
        }
      })
      .error(function () {
        layer.closeAll();
        layer.msg('保存失败', {time: 3000, icon:2});
        $scope.imgArr.pop();
      })
  }

  $scope.delPhoto = function (index, id) {
    var url = $rootScope.setPath(8062) + '/admin/back/photo/del?id=' + id;
    $http.post(url, $scope.param, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        layer.closeAll();
        if (data == 0) {
          layer.msg('删除成功', {time: 3000, icon:1});
          getImgs();
        } else {
          layer.msg('删除失败', {time: 3000, icon:2});
        }
      })
      .error(function () {
        layer.closeAll();
        layer.msg('删除失败', {time: 3000, icon:2});
      })
  }

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