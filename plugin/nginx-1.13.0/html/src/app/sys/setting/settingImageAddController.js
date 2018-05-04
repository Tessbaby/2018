'use strict';

angular.module('app')
	.controller('setImageAddController', ['$rootScope', '$scope', '$http', '$state',
	 function ($rootScope, $scope, $http, $state) {

	     $scope.title = '宣传图设置';

	     //图片处理所需
	     $scope.imgData = [];
	     $scope.imgUpFlag = true;
	     $scope.record = {};
	     $scope.btnInfo = '提交';
	     $scope.btnState = false;
	     getImageTypes();
	     validate();
	     var id = $state.params.id;
	     if (id) {
	         $scope.title = '编辑';
	         $scope.record.id = id;
	         getData(id);

	     } else {
	         $scope.title = '提交';
	         $scope.imgSrc = 'res/img/np.png';
	     }

	     // 编辑获取数据
	     function getData(id) {
	         $.ajax({
	             type: 'put',
	             url: '/iBase4J-SYS-Web/sysImgsSetting/read/detail',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             data: angular.toJson({ id: id })
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 //console.log(result);
	                 //$scope.imgSrc = result.data.imgs;
	                 $scope.record = result.data;
	                 //$scope.record.imgs = result.data.imgs;
	                 $scope.myCroppedImage = result.data.imgs;
	             } else {
	                 alertDialog(result.msg, 2);
	             }
	         });
	     }
	     //获取图片应用位置
	     function getImageTypes() {
	         $.ajax({
	             type: 'get',
	             url: '/iBase4J-SYS-Web/sysImgsSetting/getAllSelect',
	             data: {}
	         }).then(function (result) {
	             if (result.httpCode == 200) {

	                 $scope.imageTypes = result.data.imgsList;
	                 $scope.$apply();
	             } else {
	                 alertDialog(result.msg, 2);
	             }
	         });
	     }
	     $scope.myImage = '';
	     $scope.myCroppedImage = '';
	     $scope.reader = new FileReader();  //创建一个FileReader接口
	     $scope.img_upload = function (evt) {    //单次提交图片的函数
	         var fileInfo = evt.currentTarget.files[0];
	         var index = fileInfo.name.indexOf('.') + 1;
	         var imgType = fileInfo.name.substr(index, fileInfo.name.length - 1);
	         if (imgType.toUpperCase() == 'PNG' || imgType.toUpperCase() == 'JPG' || imgType.toUpperCase() == 'JPEG') {
	             $scope.guid = (new Date()).valueOf();
	             $scope.reader.readAsDataURL(fileInfo); //FileReader的方法，把图片转成base64
	             $scope.reader.onload = function (ev) {
	                 $scope.$apply(function () {
	                     $scope.myImage = ev.target.result;
	                     $scope.imgData.push({
	                         file: ev.target.result,
	                         filename: fileInfo.name
	                     });
	                 });
	             };
	         } else {
	             alertDialog("文件格式错误", 2);
	             return false;
	         }
	     };
	     angular.element(document.querySelector('#uploadImg')).on('change', $scope.img_upload);
	     $('.upload-pic-box a').click(function () {
	         $('#uploadImg').click();
	     });

	     $scope.img_del = function (key) {  //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
	         $scope.imgData = [];
	         $scope.imgSrc = 'res/img/np.png';
	         $scope.myImage = '';
	         $scope.myCroppedImage = '';
	     };

	     $scope.submit = function () {
	     		console.log($scope.myCroppedImage);
	     		console.log($scope.imgData[0].filename);
	     		
	         if ($scope.imgData.length > 0) {
	             $scope.imgUpFlag = false;
	             $.ajax({
	                 type: 'POST',
	                 url: $rootScope.upFileUrl,
	                 async: false,
	                 contentType: 'application/json;charset=UTF-8',
	                 data: angular.toJson([{ file: $scope.myCroppedImage, filename: $scope.imgData[0].filename }])
	             }).then(function (result) {
	             	debugger;
	                 var resultNew = result;
	                 if (resultNew && resultNew.httpCode == 200) {//成功
	                     $scope.record.imgs = resultNew.data[0].fileUrlPath;


	                     saveData();
	                 } else {
	                     tipDialog("上传图片失败！", 2);
	                 }
	             });
	         } else if (!$scope.record.imgs) {
	             tipDialog("请选择图片！", 2);
	             $scope.imgUpFlag = false;
	         }
	         if ($scope.imgUpFlag) {
	             saveData();
	         }
	     }

	     //表单验证
	     function validate() {
	         var validator = jQuery('form').validate({
	             ignore: "",
	             rules: {
	                 position: {
	                     required: true,

	                 },
	                 remark: {

	                     maxLengthB: [1024]
	                 }
	             },
	             messages: {
	                 position: {
	                     required: '请选择图片应用位置',

	                 },
	                 remark: {

	                     maxLengthB: "简介不得超过{0}个字符"
	                 }
	             },
	             submitHandler: function () {
	                 $scope.submit();
	             }
	         });
	     }


	     function saveData() {
	         $scope.btnInfo = '提交中...';
	         $scope.btnState = true;
	         $.ajax({
	             type: 'POST',
	             url: '/iBase4J-SYS-Web/sysImgsSetting',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             data: angular.toJson($scope.record)
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                     $state.go('main.setting.banner');
	                 });
	             } else {
	                 $scope.btnInfo = '提交';
	                 $scope.btnState = false;
	                 alertDialog(result.msg, 2);
	                 $scope.$apply();
	             }
	         });
	     }

	     $scope.cancel = function () {
	         layer.confirm('您确认放弃本次编辑吗？', function (index) {
	             layer.close(index);
	             $state.go('main.setting.banner');
	         })
	     }

	 }])