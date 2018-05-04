'use strict';

angular.module('app')
	.controller('orgAddController', ['$rootScope', '$scope', '$http', '$state',
	 function ($rootScope, $scope, $http, $state) {

	     var zNodes;
	     var title = '';
	     var funInit = {};
	     $scope.myImage = '';
	     $scope.record = {};


	     //图片处理所需
	     //自定义上传标题图
	     var imgArrType = ['image/png', 'image/jpg', 'image/jpeg'];
	     $scope.imgSrc = 'res/img/np.png';
	     var imgInfo = [];
	     $scope.imgUpFlag = true;
	     $scope.myImage = '';
	     $scope.myCroppedImage = '';
	     //$scope.$watch('myCroppedImage', function () {
	     //    console.log($scope.myArray);
	     //});

	     var handleFileSelect = function (evt) {
	         var file = evt.currentTarget.files[0];
	         var reader = new FileReader();
	         if ($.inArray(file.type, imgArrType) == -1) {//判断图片类型
	             alert("不支持该图片类型上传，请重新选择！");
	             fileInfo = {};
	         } else if (file.size > 2 * 1024 * 1024) {
	             alert("大小不超过2M!");
	             file = {};
	         } else {
	             reader.onload = function (evt) {
	                 $scope.$apply(function ($scope) {
	                     $scope.myImage = evt.target.result;

	                     imgInfo[0] = {
	                         file: evt.target.result,
	                         filename: file.name
	                     };
	                 });
	             };
	             reader.readAsDataURL(file);
	         }
	     };
	     angular.element(document.querySelector('#uploadImg')).on('change', handleFileSelect);
	     $('.upload-pic-box a').click(function () {
	         $('#uploadImg').click();
	     });

	     $scope.img_del = function (key) {
	         $scope.myImage = '';
	         $scope.myCroppedImage = '';
	         $scope.record.img = "";
	         imgInfo = [];
	     };

	     //自定义上传签章
	     $scope.sealImage = '';
	     $scope.sealCroppedImage = '';
	     $scope.qzData = [];
	     $scope.qzUpFlag = true;
	     $scope.qzReader = new FileReader();  //创建一个FileReader接口
	     $scope.qzSrc = 'res/img/np.png';
	     $scope.qz_upload = function (evt) {    //单次提交图片的函数
	         var fileInfo2 = evt.currentTarget.files[0];
	         var index = fileInfo2.name.indexOf('.') + 1;
	         var imgType = fileInfo2.name.substr(index, fileInfo2.name.length - 1);
	         if (imgType.toUpperCase() == 'PNG' || imgType.toUpperCase() == 'JPG' || imgType.toUpperCase() == 'JPEG') {
	             $scope.guid = (new Date()).valueOf();
	             $scope.qzReader.readAsDataURL(fileInfo2); //FileReader的方法，把图片转成base64
	             $scope.qzReader.onload = function (ev) {
	                 $scope.$apply(function () {
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


	     // 获取数据字典-组织类别
	     funInit.getDeptType = function () {
	         var m = {
	             enable: 1,
	             keyword: '',
	             type: 'DEPTTYPE'
	         };
	         $.ajax({
	             type: 'PUT',
	             url: '/iBase4J-SYS-Web/dic/read/list',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             async: false,
	             data: angular.toJson(m)
	         }).then(function (result) {
	             $scope.deptType = result;

	             if ($scope.deptType.data.length > 0) {
	                 $scope.record.deptType = $scope.deptType.data[0].code; // 给组织类别添加组织默认值
	             }

	         });
	     }
	     // 获取数据字典-组织性质
	     funInit.depPropertyList = function () {
	         var m = {
	             enable: 1,
	             keyword: '',
	             type: 'ORGPROPERTY'
	         };
	         $.ajax({
	             type: 'PUT',
	             url: '/iBase4J-SYS-Web/dic/read/list',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             async: false,
	             data: angular.toJson(m)
	         }).then(function (result) {
	             $scope.depPropertyList = result.data;
	             if ($scope.depPropertyList.length > 0) {
	                 $scope.record.dept_proper = $scope.depPropertyList[0].code;
	             }

	         });
	     }

	     // 获取党组织树 dept/read/treelist
	     funInit.getTreeList = function () {
	         $.ajax({
	             type: 'PUT',
	             url: '/iBase4J-SYS-Web/dept/read/treelist2',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             //async: false,
	             data: angular.toJson({})
	         }).then(function (result) {
	             zNodes = result.data;
	             $.fn.zTree.init($('#treeDemo'), setting, zNodes);

	             $scope.$apply();
	         });
	     }

	     funInit.getDeptType();
	     funInit.getTreeList();
	     funInit.depPropertyList();

	     // $scope.myCroppedImage=$scope.myCroppedImage ;
	     var btnStateMessage = "";
	     //$scope.myCroppedImage = '';
	     if ($state.includes('**.commynity.update')) {
	         title = '编辑';
	         btnStateMessage = "提交修改"
	         var id = $state.params.id;
	         activate(id);

	     } else if ($state.includes('**.commynity.create')) {
	         title = '添加';
	         btnStateMessage = "添加组织"
	     }

	     //控制按钮显示状态
	     $scope.btnInfo = btnStateMessage;
	     $scope.btnState = false;
	     validate();
	     $scope.title = $rootScope.title = title;
	     $scope.loading = true;

	     // 日期
	     laydate({
	         elem: '#deptCreatedate',
	         format: 'YYYY-MM-DD',
	         choose: function (dates) {
	             $scope.record.deptCreatedate = dates;
	         }
	     })

	     var setting = {
	         view: {
	             dblClickExpand: false,
	             showIcon: false
	         },
	         data: {
	             key: {
	                 name: "deptName"
	             },
	             simpleData: {
	                 enable: true,
	                 idKey: "id",
	                 pIdKey: "parentId",
	                 rootPId: 0
	             }
	         },
	         callback: {
	             onClick: onClick
	         }

	     };

	     function onClick(e, treeId, treeNode) { // 选择元素触发
	         var zTree = $.fn.zTree.getZTreeObj('treeDemo'),
             nodes = zTree.getSelectedNodes(),
             v = '',
             ids = '';
	         nodes.sort(function compare(a, b) { return a.id - b.id; });

	         for (var i = 0, l = nodes.length; i < l; i++) {
	             v += nodes[i].deptName + ',';
	             ids += nodes[i].id + ',';
	         }

	         if (v.length > 0) v = v.substring(0, v.length - 1);
	         var idObj = $('#parentId');
	         idObj.attr('value', v);

	         // 将选中的id放到隐藏的文本域中
	         if (ids.length > 0) {
	             ids = ids.substring(0, ids.length - 1);
	         }
	         var treeids = $('#treeids');
	         treeids.attr('value', ids);
	         $scope.record.parentId = ids;
	     }

	     $scope.showMenu = function () {
	         var idObj = $('#parentId');
	         var idOffset = $('#parentId').offset();
	         $('#menuContent').slideDown('fast');
	         $('body').bind('mousedown', onBodyDown);
	     }

	     $scope.hideMenu = function () {
	         $('#menuContent').fadeOut('fast');
	         $('body').unbind('mousedown', onBodyDown);
	     }

	     function onBodyDown(event) {
	         if (!event.target.id == 'menuContent' || $(event.target).parents('#menuContent').length == 0) {
	             if (event.target.id != 'parentId') {
	                 $scope.hideMenu();
	             }
	         }
	     }

	     //点击上传图片
	     /*angular.element(document.querySelector('#imgInput')).on('change',handleFileSelect);
	     $('.upload-pic-box a').click(function() {
	         $('#imgInput').click();
	     });

	     var handleFileSelect = function(evt) {
	         var file=evt.currentTarget.files[0];
	         if(!/image\/\w+/.test(file.type)){
	             return false;
	         }
	         var reader = new FileReader();
	         reader.onload = function (evt) {
	             $scope.$apply(function($scope){
	                 $scope.myImage=evt.target.result;
	             });
	         };
	         reader.readAsDataURL(file);
	     };*/

	     //初始化验证
	     //validate($scope);
	     $scope.submit = function () {
	         $scope.loading = true;
	         /*$.ajax({
                 type: 'POST',
                     url : '/upload/imageData',
                     data: {fileData:$scope.myCroppedImage},
                 }).then(function(result){
             if(result && result.httpCode ==200){//成功
                 // $scope.record['avatar'] =result.fileNames[0];
                 $scope.record['imgpath'] =result.fileNames[0];
                 saveData();
             }else if(result && result.httpCode ==400){
                 saveData();
             }
             });*/
	         if (imgInfo.length > 0) {
	             $scope.imgUpFlag = false;
	             $.ajax({
	                 type: 'POST',
	                 url: $rootScope.upFileUrl,
	                 async: false,
	                 contentType: 'application/json;charset=UTF-8',
	                 data: angular.toJson([{ file: $scope.myCroppedImage, filename: imgInfo[0].filename }])
	             }).then(function (result) {
	                 // var resultNew = $.parseJSON(result);
	                 var resultNew = result;
	                 if (resultNew && resultNew.httpCode == 200) {//成功
	                     $scope.record.imgpath = resultNew.data[0].fileUrlPath;

	                     $scope.imgUpFlag = true;

	                 } else {
	                     tipDialog("上传图片失败！", 2, 0.8 * 1000);
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

	     };

	     function saveData() { // 提交数据
	         if ($scope.record.parentId || $scope.record.parentId == 0) {
	             $scope.record.parentId = parseInt($scope.record.parentId);
	         } else {
	             tipDialog('请选择所属组织', 2);
	             return false;
	         }

	         console.log($scope.record.parentId)
	         $scope.record.remark = myEditor.getContent();
	         var m = $scope.record;
	         if (m) {

	             $scope.btnInfo = '提交中...';
	             $scope.btnState = true;
	             $.ajax({
	                 type: 'POST',
	                 url: '/iBase4J-SYS-Web/dept',
	                 dataType: 'json',
	                 contentType: 'application/json;charset=UTF-8',
	                 data: angular.toJson(m)
	             }).then(callback);
	         }
	         function callback(result) {
	             $scope.loading = false;
	             if (result.httpCode == 200) {//成功
	                 tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                     $state.go('main.commynity.info');
	                 });
	             } else {

	                 $scope.btnInfo = btnStateMessage;
	                 $scope.btnState = false;
	                 $scope.$apply();
	                 alertDialog(result.msg, 2);
	             }

	         }
	     }
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
                   'insertvideo', //视频                          
                             'simpleupload', //单图上传
                             'insertimage', //多图上传
                     //'inserttable', //插入表格
                     'link', //超链接
                     'removeformat',//清除格式
                     'huodong',

                 ]
	         ]
	     });
	     function validate() {

	         var validator = jQuery('form').validate({
	             rules: {
	                 deptAllname: {
	                     required: true,
	                     maxlength: 50
	                 },
	                 deptName: {
	                     required: true,
	                     maxlength: 7
	                 },
	                 deptType: {
	                     required: true
	                 },

	                 parentId: {
	                     required: true
	                 },
	                 toUnit: {
	                     maxlength: 200
	                 },
	                 lxr: {

	                     maxlength: 100
	                 },
	                 lxPhone: {

	                     isTel: true
	                 },
	                 mobile: {

	                     isMobile: true
	                 },
	                 email: {
	                     required: true,
	                     email: true
	                 },
	                 address: {
	                     maxlength: 200
	                 },
	                 remark: {
	                     maxLengthB: [1024]
	                 },
	                 myEditor: {
	                     maxLengthB: [1024]

	                 }

	             },
	             messages: {
	                 deptAllname: {
	                     required: '请填写组织名称',
	                     maxlength: '组织名称不得超过50个字符'
	                 },
	                 deptName: {
	                     required: '请填写组织名称简称',
	                     maxlength: '组织名称不得超过7个字符'
	                 },
	                 deptType: {
	                     required: '选择组织类别'
	                 },
	                 parentId: {
	                     required: '选择所属组织'
	                 },
	                 toUnit: {
	                     maxlength: '所在单位不得超过200个字符'
	                 },
	                 lxr: {
	                     maxlength: '联系人不得超过100个字符'
	                 },

	                 email: {
	                     required: '请填写组织Emali',
	                     email: '请输入正确的Email地址(xx@xx.xx)'
	                 },
	                 address: {
	                     maxlength: '地址不得超过200字符'
	                 },
	                 remark: {
	                     maxlength: '简介不得超过200字符'
	                 },
	                 myEditor: {
	                     maxLengthB: "简介不得超过{0}个字符"

	                 }
	             },
	             submitHandler: function () {
	                 $scope.submit();
	             }
	         });
	         validator.focusInvalid = function () {
	             if (this.settings.focusInvalid) {
	                 try {
	                     var toFocus = $(this.findLastActive() || this.errorList.length && this.errorList[0].element || []);
	                     if (toFocus.is("textarea")) {
	                         UE.getEditor('myEditor').focus()
	                     } else {
	                         toFocus.filter(":visible").focus();
	                     }
	                 } catch (e) {
	                 }
	             }
	         }
	     }

	     // 初始化页面 - 编辑时
	     function activate(id) {
	         $scope.loading = true;
	         $.ajax({
	             type: 'PUT',
	             url: '/iBase4J-SYS-Web/dept/read/detail',
	             dataType: 'json',
	             contentType: 'application/json;charset=UTF-8',
	             data: angular.toJson({ 'id': id })
	         }).then(function (result) {

	             $scope.loading = false;
	             if (result.httpCode == 200) {
	                 $scope.record = result.data;
	                 $('#parentId').attr('value', $scope.record.parentName);
	                 $('#treeids').attr('value', $scope.record.parentId);
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
	                 $scope.msg = result.msg;
	             }
	             $scope.$apply();

	         });
	     }

	     // 取消编辑
	     $scope.cancel = function () {
	         layer.confirm('您确认放弃本次编辑吗？', function (index) {
	             layer.close(index);
	             $state.go('main.commynity.info');
	         })
	     }

	 }]);