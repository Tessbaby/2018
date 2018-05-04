app.register.controller('lotteryCtrl', function ($rootScope, $scope, $http) {
  layer.closeAll();
  var height = $(window).height() - 160;
  $('.con-main').height(height);
  $rootScope.checkIn();
  
	$scope.keyword = 'basic';
	getBasicData();

	$scope.changeTab = function (event, val) {
		$scope.keyword = val;
  	var tagName = $(event.target)[0].tagName;
  	var url = '';
  	disabled = true;
		$scope.tableList = [];
		$scope.option = {};
		if (val == 'basic') {
			getBasicData();
			$('.lottery-nav li').removeClass('active');
			if (tagName == 'A') {
				$(event.target).parent().addClass('active');
			} else if (tagName == 'LI') {
				$(event.target).addClass('active');
			}
			$('.lottery-tab > div').addClass('hide');
			$('#' + val).removeClass('hide');
		} else if (val == 'jackpot') {
			var basicUrl = $rootScope.setPath(8050) + '/win/back/set/get?backModuleId=' + $rootScope.backModuleId;
			$http.post(basicUrl, {}, {'Content-Type':'application/x-www-form-urlencoded'})
	      .success(function (data) {
	      	if (data.length == 0) {
	      		layer.msg('请填写基础设置', {time: 3000, icon:0});
	      	} else {
	      		getJackpotData();
	      		$('.lottery-nav li').removeClass('active');
						if (tagName == 'A') {
							$(event.target).parent().addClass('active');
						} else if (tagName == 'LI') {
							$(event.target).addClass('active');
						}
						$('.lottery-tab > div').addClass('hide');
						$('#' + val).removeClass('hide');
	      	}
	      })
	      .error(function () {
	        layer.closeAll();
	        layer.msg('获取数据失败', {time: 3000, icon:2});
	      })
		} else if (val == 'appoint') {
			var basicUrl = $rootScope.setPath(8050) + '/win/back/set/get?backModuleId=' + $rootScope.backModuleId;
			$http.post(basicUrl, {}, {'Content-Type':'application/x-www-form-urlencoded'})
	      .success(function (data) {
	      	if (data.length == 0) {
	      		layer.msg('请填写基础设置', {time: 3000, icon:0});
	      	} else {
	      		var jackpotUrl = $rootScope.setPath(8050) + '/win/back/prize/query?backModuleId=' + $rootScope.backModuleId;
						$http.post(jackpotUrl, {}, {'Content-Type':'application/x-www-form-urlencoded'})
				      .success(function (data2) {
				      	if (data2.length == 0) {
				      		layer.msg('请填写奖品信息', {time: 3000, icon:0});
				      	} else {
				      		getAppointData();
				      		$('.lottery-nav li').removeClass('active');
									if (tagName == 'A') {
										$(event.target).parent().addClass('active');
									} else if (tagName == 'LI') {
										$(event.target).addClass('active');
									}
									$('.lottery-tab > div').addClass('hide');
									$('#' + val).removeClass('hide');
				      	}
				      })
				      .error(function () {
				        layer.closeAll();
				        layer.msg('获取数据失败', {time: 3000, icon:2});
				      })
				  }
	      	
	      })
	      .error(function () {
	        layer.closeAll();
	        layer.msg('获取数据失败', {time: 3000, icon:2});
	      })

		} else if (val == 'constantly') {
			getConstantlyData();
			$('.lottery-nav li').removeClass('active');
			if (tagName == 'A') {
				$(event.target).parent().addClass('active');
			} else if (tagName == 'LI') {
				$(event.target).addClass('active');
			}
			$('.lottery-tab > div').addClass('hide');
			$('#' + val).removeClass('hide');
		} else if (val == 'winningList') {
			getWinningData();
			$('.lottery-nav li').removeClass('active');
			if (tagName == 'A') {
				$(event.target).parent().addClass('active');
			} else if (tagName == 'LI') {
				$(event.target).addClass('active');
			}
			$('.lottery-tab > div').addClass('hide');
			$('#' + val).removeClass('hide');
			
		} else if (val == 'lotteryRecord') {
			getLotteryData();
			$('.lottery-nav li').removeClass('active');
			if (tagName == 'A') {
				$(event.target).parent().addClass('active');
			} else if (tagName == 'LI') {
				$(event.target).addClass('active');
			}
			$('.lottery-tab > div').addClass('hide');
			$('#' + val).removeClass('hide');
		}
	}

	function getBasicData() {
		var url = $rootScope.setPath(8050) + '/win/back/set/get?backModuleId=' + $rootScope.backModuleId;
		$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
      	if (data.length > 0) {
	      	$scope.basicParam = data[0];
	      	$scope.showBasicImg = true;
      	} else {
      		$scope.basicParam = {"acceptImg":"","acceptTheWay":0,"address":"","backModuleId": $rootScope.backModuleId,"expend":0,"maxLottery":0,"openWin":1};
      		$scope.showBasicImg = false;
      	}
      	if ($scope.basicParam && $scope.basicParam.acceptTheWay == 0) {
      		$('input[data-name="0"]').attr('checked', true);
      	} else {
      		$('input[data-name="1"]').attr('checked', true);
      	}
      })
      .error(function () {
        layer.closeAll();
        layer.msg('获取数据失败', {time: 3000, icon:2});
      })
	}

	function getJackpotData() {
		var url = $rootScope.setPath(8050) + '/win/back/prize/query?backModuleId=' + $rootScope.backModuleId;
		$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
      	if (data) {
      		$scope.wareArr = data;
      	} else {
      		$scope.wareArr = [];
      	}
      })
      .error(function () {
        layer.closeAll();
        layer.msg('获取数据失败', {time: 3000, icon:2});
      })
	}
	function getAppointData() {
		var tableUrl = '/win/back/person/fuzzy/query?backModuleId=' + $rootScope.backModuleId;
		var param = {name: $scope.appointName, page: ($scope.appointPage == 0 ? 0 : $scope.appointPage - 1)};
    table(param, tableUrl);
	}
	function getConstantlyData() {
		var url = $rootScope.setPath(8050) + '/win/back/analyze?backModuleId=' + $rootScope.backModuleId;
		$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
      	if (data) {
      		$scope.constantParam = data;
      	} else {
      		$scope.constantParam = [];
      	}
      })
      .error(function () {
        layer.closeAll();
        layer.msg('获取数据失败', {time: 3000, icon:2});
      })
	}
	function getWinningData() {
		var tableUrl = '/win/back/prize/record/query?backModuleId=' + $rootScope.backModuleId;
		var param = {name: $scope.winningName, page: ($scope.winningListPage == 0 ? 0 : $scope.winningListPage - 1)};
    table(param, tableUrl);
	}
	function getLotteryData() {
		var tableUrl = '/win/back/draw/lottery/query?backModuleId=' + $rootScope.backModuleId;
		var param = {name: $scope.lotteryName, page: ($scope.lotteryRecordPage == 0 ? 0 : $scope.lotteryRecordPage - 1)};
    table(param, tableUrl);
	}
	function table(param, url) {
		var url = $rootScope.setPath(8050) + url;
		$http.post(url, param, {'Content-Type':'application/x-www-form-urlencoded'})
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


/* 基础设置 start---------------------------------------------------------------------------------------------------------------*/

	$(':input').labelauty();
	switchEvent("#open",function(){
		$scope.basicParam.openWin = 1;
		$('#open').removeClass('switch-self');
	},function(){
		$scope.basicParam.openWin = 0;
	});

	var basicCurrentImg = '';
	$scope.showBasicImg = false;
	var basicImg = new plupload.Uploader({
    browse_button: 'selectBasicImg',
    url: 'anything',
  });
  basicImg.init();
  basicImg.bind('FilesAdded',function(uploader, files){
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
          basicCurrentImg = data.url + '/' + fileName;
          var _param = {
            'key': fileName,
            'OSSAccessKeyId': data.OSSAccessKeyId,
            'policy': data.policy,
            'Signature': data.Signature
          }
          basicImg.setOption({
            'url': data.url,
            'multipart_params': _param
          })
          basicImg.start();
        }).error(function () {
          layer.msg('获取图片路径失败', {time: 3000, icon:2});
        })
      };
    });
  });
  basicImg.bind('FileUploaded', function (uploader,file,responseObject) {
    if(responseObject.status == 204) {
    	$scope.basicParam.acceptImg = basicCurrentImg;
      $scope.showBasicImg = true;
      $scope.$apply();
    }
  })
	$scope.showAddress = false;
	$('#consume input[type="radio"] + label').on('click', function (event) {
		var target = event.target;
		var tag = $(target)[0].tagName;
		if (tag == 'LABEL') {
			var txt = $(target).prev().attr('data-name');
			$scope.showAddress = txt == 0 ? false : true;
			$scope.basicParam.acceptTheWay = txt == 0 ? 0 : 1;
			$scope.basicParam.address = txt == 0 ? '' : $scope.basicParam.address;
		} else if (tag == 'SPAN') {
			var txt = $(target).text();
			$scope.showAddress = txt == '邮寄' ? false : true;
			$scope.basicParam.acceptTheWay = txt == '邮寄' ? 0 : 1;
			$scope.basicParam.address = txt == '邮寄' ? '' : $scope.basicParam.address;
		}
		$scope.$apply();
	});
	$scope.saveBasic = function () {
		var url = $rootScope.setPath(8050) + '/win/back/set/save';
		$http.post(url, $scope.basicParam, {'Content-Type':'application/x-www-form-urlencoded'})
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

/* 基础设置 end-----------------------------------------------------------------------------------------------------------------*/
/* 奖池设置 start-------------------------------------------------------------------------------------------------------------- */
	$('.add-prisent').on('mouseover', function () {
		$('.add-tooltip').removeClass('hide')
	}).on('mouseout', function(event) {
		$('.add-tooltip').addClass('hide')
	});

	var ware;
	$scope.addJackpot = function () {
		ware = { url: '',	name: '',	num: 0,	max: 0, winSetId: '', backModuleId: $rootScope.backModuleId, returnState: 1, id: '' };
		$scope.wareArr.push(ware);
	}

	$scope.delWare = function (item, index) {
		if (item.id) {
			var url = $rootScope.setPath(8050) + '/win/back/prize/del?id=' + item.id;
			$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
	      .success(function (data) {
	        layer.closeAll();
	        if (data == 0) {
	          layer.msg('删除成功', {time: 3000, icon:1});
	          $scope.wareArr.splice(index, 1);
	        } else {
	          layer.msg('删除失败', {time: 3000, icon:2});
	        }
	      })
	      .error(function () {
	        layer.closeAll();
	        layer.msg('保存失败', {time: 3000, icon:2});
	      })
		} else {
			$scope.wareArr.splice(index, 1);
		}
	}
	
	$scope.$on('ngRepeatFinished', function (ngRepeatFinishedEvent) {
		var new_arr = [];
    angular.forEach($scope.wareArr, function (item, index) {
      new_arr.push('prisent_' + index);
    })
    var jackpotUpload = new plupload.Uploader({
        browse_button: new_arr,
        url: 'anything',
    });
    jackpotUpload.init();
    jackpotUpload.bind('FilesAdded',function(uploader, files){
      var reader = new FileReader();
      reader.readAsDataURL(files[0].getNative());
      reader.onload = (function (e) {
        var image = new Image();
        image.src = e.target.result;
        image.onload = function () {
          layer.load(1, {shade: [0.2,'#000']});
          var imgFileName = files[0].name;
          var fileName = '';
          $http.post($rootScope.default.imgPath, {}, $rootScope.headers)
            .success(function (data) {
              fileName = data.key + checkImgExtName(imgFileName);
              $scope.jackpotImg = data.url + '/' + fileName;
              var _param = {
                'key': fileName,
                'OSSAccessKeyId': data.OSSAccessKeyId,
                'policy': data.policy,
                'Signature': data.Signature,
              }
              jackpotUpload.setOption({
                'url': data.url,
                'multipart_params': _param
              })
              jackpotUpload.start();
            }).error(function () {
            layer.msg('获取图片路径失败', {time: 3000, icon:2});
          })
        };
      });

    });
    jackpotUpload.bind('FileUploaded', function (uploader,file,responseObject) {
      if(responseObject.status == 204) {
      	var elem = uploader.settings.browse_button;
      	var id = $(elem).attr('id');
      	var index = id.substring((id.indexOf('_') + 1) , id.length);
      	$scope.wareArr[index].url = $scope.jackpotImg;
        $scope.$apply($scope.wareArr);
        layer.closeAll();
      }
    })
  })

	$scope.saveWare = function (_data, index) {
		_data.returnState = 0;
		var url = $rootScope.setPath(8050) + '/win/back/prize/create';
		$http.post(url, _data, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        layer.closeAll();
        if (data == 0) {
          layer.msg('保存成功', {time: 3000, icon:1});
        } else {
          layer.msg('保存失败', {time: 3000, icon:2});
          _data.returnState = 1;
        }
      })
      .error(function () {
        layer.closeAll();
        layer.msg('保存失败', {time: 3000, icon:2});
      })
	}


/* 奖池设置 end---------------------------------------------------------------------------------------------------------------- */
/* 指定中奖 start-------------------------------------------------------------------------------------------------------------- */
	
	$scope.appointName = '';
	$scope.appointAddMsg = [];
	$scope.appointWaresMsg = [];
	$scope.appointParam = {"backModuleId": $rootScope.backModuleId,"num":0,"openId":"","winPrizeId":""};

	$scope.searchAppointList = function () {
		getAppointData();
	}

	$scope.appointLottery = function (id) {
		layer.open({
      type: 1,
      title: '指定中奖人',
      content: $('#editAppointLayer'),
      area: ['900px', '600px']
    })
    $('.layui-layer-shade').addClass('hide');
    getWaresData();
	}

	function getWaresData() {
		var url = $rootScope.setPath(8050) + '/win/back/prize/query?backModuleId=' + $rootScope.backModuleId;
		$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
      	if (data) {
	      	$scope.appointWaresMsg = data;
      	} else {
      		layer.msg('暂无商品数据', {time: 3000, icon:0});
      	}
      })
      .error(function () {
        layer.msg('获取数据失败', {time: 3000, icon:2});
      })
	}

	$scope.appointAddWX = function () {
		var url = $rootScope.setPath(8095) + '/consumer/nackname/query?nickName=' + $scope.wxNickName + '&backModuleId=' + $rootScope.backModuleId;
		$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
      	if (data.length > 0) {
	      	$scope.appointAddMsg = data;
	      	var len = data.length;
	      	$('#setWidth').width(len * 142);
	      	angular.forEach($scope.appointAddMsg, function(value, key){
	      		value.chooseTxt = '未选中';
	      	});
      	} else {
      		layer.msg('未找到用户', {time: 3000, icon:0});
      	}
      })
      .error(function () {
        layer.closeAll();
        layer.msg('获取数据失败', {time: 3000, icon:2});
      })
	}

	$scope.chooseUser = function (openId, index) {
		angular.forEach($scope.appointAddMsg, function(value, key){
  		if (value.chooseTxt == '已选中') value.chooseTxt = '未选中';
  	});
  	$scope.appointAddMsg[index].chooseTxt = '已选中';
  	$scope.appointParam.openId = openId;
  	layer.msg('已选中', {time: 3000, icon:1});
	}

	$scope.chooseWare = function (event, winPrizeId) {
		if ($scope.appointParam.openId != '') {
			var tag = event.target;
			var name = $(tag)[0].tagName;
			$('.ware').removeClass('active');
			if (name == 'A') {
				$(tag).parent().addClass('active');
			} else if (name == 'I') {
				$(tag).parent().parent().addClass('active');
			}
			$scope.appointParam.winPrizeId = winPrizeId;
		} else {
			layer.msg('请先选择用户', {time: 3000, icon:0});
		}
	}

	$scope.saveAppointWares = function () {
		if ($scope.appointParam.winPrizeId == '') {
			layer.msg('请选择奖品', {time: 3000, icon:0});
		} else if ($scope.appointParam.openId == '') {
			layer.msg('请选择用户', {time: 3000, icon:0});
		} else {
			var url = $rootScope.setPath(8050) + '/win/back/person/create';
			$http.post(url, $scope.appointParam, {'Content-Type':'application/x-www-form-urlencoded'})
	      .success(function (data) {
	      	if (data == 0) {
		      	layer.closeAll();
		      	layer.msg('指定成功', {time: 3000, icon:1});
		      	getAppointData();
	      	} else {
	      		layer.msg('指定失败', {time: 3000, icon:0});
	      	}
	      })
	      .error(function () {
	        layer.closeAll();
	        layer.msg('指定失败', {time: 3000, icon:2});
	      })
		}
	}

	$scope.delAppoint = function (id) {
		var url = $rootScope.setPath(8050) + '/win/back/person/del?id=' + id;
		$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
      	if (data == 0) {
	      	layer.msg('删除成功', {time: 3000, icon:1});
	      	getAppointData();
      	} else {
      		layer.msg('删除失败', {time: 3000, icon:0});
      	}
      })
      .error(function () {
        layer.msg('删除失败', {time: 3000, icon:2});
      })
	}

/* 指定中奖 end---------------------------------------------------------------------------------------------------------------- */
/* 实时监控 start-------------------------------------------------------------------------------------------------------------- */

	$scope.editConsParam = {};
	$scope.editConsParam.winPoolListId = [];
	$scope.setZero = function() {
		layer.load(1, {shade: [0.2,'#000']});
		var url = $rootScope.setPath(8050) + '/win/back/pool/clear/count';
		$http.post(url, {}, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        layer.closeAll();
        if (data == 0) {
          layer.msg('清空成功', {time: 3000, icon:1});
          getConstantlyData();
        } else {
          layer.msg('清空失败', {time: 3000, icon:2});
        }
      })
      .error(function () {
        layer.closeAll();
        layer.msg('清空失败', {time: 3000, icon:2});
      })
	}

	$scope.beforeChangeCons = function (number) {
		$scope.editConsParam.winPoolListId.push(number);
	}

	$scope.afterChangeCons = function (event, prev, after, curr, data, parent) {
		var val = $(event.target).val();
		var can = true;
		if (curr == val) {
			can = false;
		} else {

			angular.forEach(parent, function(value, key){
				if (value.number == val) {
					$(event.target).val(curr);
					layer.msg('已存在', {time: 3000, icon:0});
					can = false;
				}
			});
			if (val < prev) {
				$(event.target).val(curr);
				layer.msg('不能小于前一位', {time: 3000, icon:0});
				can = false;
			} else if (after) {
				if (val > after) {
					$(event.target).val(curr);
					layer.msg('不能大于后一位', {time: 3000, icon:0});
					can = false;
				}
			}

		}

		if (can) {
			$scope.editConsParam.winPool = [];
			var obj = {
				"backModuleId": $rootScope.backModuleId,
				"name":data.name,
				"number": val,
				"url": data.url,
				"winPrizeId": data.winPrizeId,
				"winState": data.winState
			}
			$scope.editConsParam.winPool.push(obj);
			saveConsNew();
		}
		
	}

	function saveConsNew() {
		var url = $rootScope.setPath(8050) + '/win/back/pool/edit';
		$http.post(url, $scope.editConsParam, {'Content-Type':'application/x-www-form-urlencoded'})
      .success(function (data) {
        layer.closeAll();
        if (data == 0) {
          layer.msg('修改成功', {time: 3000, icon:1});
        } else {
          layer.msg('修改失败', {time: 3000, icon:2});
        }
      })
      .error(function () {
        layer.msg('修改失败', {time: 3000, icon:2});
      })
	}

/* 实时监控 end---------------------------------------------------------------------------------------------------------------- */
/* 中奖名单 start-------------------------------------------------------------------------------------------------------------- */
	$scope.winningName = '';
	$scope.searchWinningList = function () {
		getWinningData();
	}
/* 中奖名单 end-------------------------------------------------------------------------------------------------------------- */
/* 抽奖记录 start-------------------------------------------------------------------------------------------------------------- */
	$scope.lotteryName = '';
/* 抽奖记录 end-------------------------------------------------------------------------------------------------------------- */



	$scope.appointPage = 0;
	$scope.winningListPage = 0;
	$scope.lotteryRecordPage = 0;
	$rootScope.pageClick2 = function (page) {
		if ($scope.keyword == 'appoint') {
		  $scope.appointPage = page;
		  $scope.searchAppoint();
		} else if ($scope.keyword == 'winningList') {
			$scope.winningListPage = page;
		  $scope.searchWinningList();
		} else if ($scope.keyword == 'lotteryRecord') {
			$scope.lotteryRecordPage = page;
		  $scope.searchLotteryRecord();
		}
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