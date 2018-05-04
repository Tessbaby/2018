'use strict';

angular.module('app')
	.controller('setInfoAddController', ['$rootScope', '$scope', '$http', '$state',
	 function ($rootScope, $scope, $http, $state) {

	     $scope.title = '编辑';
	     $scope.record = {};
	     $scope.btnInfo = '确定';
	     $scope.btnState = false;
	     //图片处理所需
	     $scope.imgData = [];
	     $scope.imgUpFlag = true;
	     //签章
	     $scope.qzData = [];
	     $scope.qzUpFlag = true;

	     validate();

	     // 获取信息
	     function getInfo() {
	         $.ajax({
	             type: 'put',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             url: '/iBase4J-SYS-Web/sysImgsSetting/read/baseinfo',
	             data: angular.toJson({})
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 console.log(result)
	                 $scope.record = result.data;
	                 $scope.imgSrc = $scope.record.imgpath;
	                 $scope.myCroppedImage = $scope.record.imgpath;
	                 $scope.qzSrc = result.data.signature; // 新增签章
	                 $scope.sealCroppedImage = result.data.signature; // 新增签章
	                 if ($scope.record.remark != "") {
	                     myEditor.ready(function () {//编辑器初始化完成再赋值  
	                         myEditor.setContent($scope.record.remark);  //赋值给UEditor  
	                     });
	                 }
	             } else {
	                 alertDialog(result.msg, 2);
	             }
	             $scope.$apply();
	         });
	     }
	     getInfo();

	     // 日期
	     laydate({
	         elem: '#deptCreatedate',
	         format: 'YYYY-MM-DD',
	         choose: function (dates) {
	             console.log(dates);
	             $scope.record.deptCreatedate = dates;
	         }
	     })

	     //百度编辑器
	     var myEditor = UE.getEditor("myEditor", {
	         topOffset: 0,
	         autoFloatEnabled: false,
	         autoHeightEnabled: false,
	         wordCount: false,
	         autotypeset: {
	             removeEmptyline: true
	         },
	         toolbars: [
             [
               //'source', //源代码
               'bold', //加粗
               'forecolor', //字体颜色
               'indent', //首行缩进
               'italic', //斜体
               'underline', //下划线
               //'simpleupload', //单图上传
               //'inserttable', //插入表格
               'link', //超链接
               'removeformat',//清除格式
               'huodong',

             ]
	         ]
	     });


	     //自定义上传标题图
	     $scope.reader = new FileReader();  //创建一个FileReader接口
	     $scope.imgSrc = 'res/img/np.png';
	     $scope.myImage = '';
	     $scope.myCroppedImage = '';

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
	                     $scope.imgData[0] = {
	                         file: ev.target.result,
	                         filename: fileInfo.name
	                     };
	                 });
	             };
	         } else {
	             layer.msg('文件格式错误');
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
	         $scope.record.imgpath = '';
	         $scope.myImage = '';
	         $scope.myCroppedImage = '';
	     };

	     //自定义上传签章
	     $scope.qzReader = new FileReader();  //创建一个FileReader接口
	     $scope.qzSrc = 'res/img/np.png';
	     $scope.sealImage = '';
	     $scope.sealCroppedImage = '';
	     $scope.qz_upload = function (evt) {    //单次提交图片的函数
	         var fileInfo2 = evt.currentTarget.files[0];
	         var index = fileInfo2.name.indexOf('.') + 1;
	         var imgType = fileInfo2.name.substr(index, fileInfo2.name.length - 1);
	         if (imgType.toUpperCase() == 'PNG' || imgType.toUpperCase() == 'JPG' || imgType.toUpperCase() == 'JPEG') {
	             $scope.guid = (new Date()).valueOf();
	             $scope.qzReader.readAsDataURL(fileInfo2); //FileReader的方法，把图片转成base64
	             $scope.qzReader.onload = function (ev) {
	                 $scope.$apply(function () {
	                     $scope.qzSrc = ev.target.result;
	                     $scope.sealImage = ev.target.result;
	                     $scope.qzData[0] = {
	                         file: ev.target.result,
	                         filename: fileInfo2.name
	                     };
	                 });
	             };
	         } else {
	             layer.msg('文件格式错误');
	             return false;
	         }

	     };
	     angular.element(document.querySelector('#qzUpload')).on('change', $scope.qz_upload);
	     $('.upload-qz-box a').click(function () {
	         $('#qzUpload').click();
	     });

	     $scope.qz_del = function (key) {  //删除，删除的时候record数据也同时删除
	         $scope.qzData = [];
	         $scope.qzSrc = 'res/img/np.png';
	         $scope.record.signature = '';
	         $scope.sealImage = '';
	         $scope.sealCroppedImage = '';
	     };

	     // 提交数据前判断图片上传
	     function submit() {
	         if ($scope.imgData.length > 0) {
	             $scope.imgUpFlag = false;
	             $.ajax({
	                 type: 'POST',
	                 url: $rootScope.upFileUrl,
	                 async: false,
	                 contentType: 'application/json;charset=UTF-8',
	                 data: angular.toJson([{ file: $scope.myCroppedImage, filename: $scope.imgData[0].filename }])

	             }).then(function (result) {
	                 var resultNew = result;
	                 if (resultNew && resultNew.httpCode == 200) {//成功
	                     $scope.record.imgpath = resultNew.data[0].fileUrlPath;

	                     $scope.imgUpFlag = true;

	                 } else if (resultNew && resultNew.httpCode == 400) {
	                     //saveData();
	                 }
	             });
	         }
	         if ($scope.qzData.length > 0) {
	             $scope.qzUpFlag = false;
	             $.ajax({
	                 type: 'POST',
	                 url: $rootScope.upFileUrl,
	                 async: false,
	                 contentType: 'application/json;charset=UTF-8',
	                 data: angular.toJson([{ file: $scope.sealCroppedImage, filename: $scope.qzData[0].filename }])
	             }).then(function (result) {
	                 var resultNew = result;
	                 if (resultNew && resultNew.httpCode == 200) {//成功
	                     $scope.record.signature = resultNew.data[0].fileUrlPath;
	                     //"picUrl": "http://sg.cotlife.cn:8006/appstreetsjz/upload/20170527042823.jpg",
	                     // console.log(resultNew);
	                     $scope.qzUpFlag = true;
	                     //$scope.record['avatar'] =result.fileNames[0];
	                     //saveData();
	                 } else if (resultNew && resultNew.httpCode == 400) {
	                     //saveData();
	                 }
	             });
	         }
	         if ($scope.imgUpFlag && $scope.qzUpFlag) {
	             saveData();
	         }
	     }

	     // 表单验证
	     function validate() {
	         jQuery('form').validate({
	             rules: {
	                 dept_proper: { maxlength: 500 },
	                 deptCreatedate: { date: true },
	                 lxr: { maxlength: 100 },
	                 mobile: { maxlength: 50 },
	                 lxPhone: { isMobile: true },
	                 address: { maxlength: 200 },
	                 email: { email: true },
	                 remark: { maxlength: 1024 },
	                 myEditor: { maxLengthB: [1024] }
	             },
	             messages: {
	                 dept_proper: { maxlength: '长度不能超过500个字符' },
	                 deptCreatedate: { date: '日期格式不正确' },
	                 lxr: { maxlength: '长度不能超过100个字符' },
	                 mobile: { maxlength: '长度不能超过50个字符' },
	                 lxPhone: { isMobile: '手机号码格式不正确' },
	                 address: { maxlength: '长度不能超过200个字符' },
	                 email: { email: '邮件格式不正确' },
	                 remark: { maxlength: '长度不能超过1024个字符' },
	                 myEditor: { maxLengthB: "简介不得超过{0}个字符" }
	             },
	             submitHandler: function () {
	                 submit();
	             }
	         })
	     }

	     // 保存数据
	     function saveData() {
	         $scope.record.remark = myEditor.getContent();
	         var m = angular.copy($scope.record);
	         $scope.btnInfo = '提交中...';
	         $scope.btnState = true;
	         $.ajax({
	             type: 'post',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             url: '/iBase4J-SYS-Web/sysImgsSetting/update/baseinfo',
	             data: angular.toJson(m)
	         }).then(function (result) {
	             if (result.httpCode == 200) {
	                 tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                     $state.go('main.setting.baseinfo');
	                 }, 1000);
	             } else {
	                 $scope.btnInfo = '确定';
	                 $scope.btnState = false;
	                 alertDialog(result.msg, 2);

	             }
	             $scope.$apply();
	         });
	     }

	     $scope.cancel = function () {
	         layer.confirm('您确认放弃本次编辑吗？', function (index) {
	             layer.close(index);
	             $state.go('main.setting.baseinfo');
	         })
	     }


	 }])