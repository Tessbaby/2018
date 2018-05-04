'use strict';

angular.module('app')
    .controller('updateController', ['$rootScope', '$scope', '$http', '$state',
             function ($rootScope, $scope, $http, $state) {

                 /*初始化页面*/
                 var title = "添加汇报";
                 var defaultAva = $rootScope.defaultAvatar;
                 $scope.thumb = [];
                 $scope.record = {};
                 //控制按钮显示状态
                 $scope.btnInfo = '添加';
                 $scope.btnState = false;
                 validate();
                 $scope.title = $rootScope.title = title;
                 $scope.fileUpFlag = true;
                 $scope.thumb = [];
                 $scope.thumbLength = 0;


                 //文本框剩余字数
                 //$scope.count = 0;
                 //$scope.tolCount = function () {

                 //    $scope.count = $scope.record.content.length;
                 //}

                 // 获取汇报类型
                 var getReportList = function () {
                     var postData = {
                         enable: 1,
                         type: 'REPORTTYPE'
                     };
                     $.ajax({
                         type: 'PUT',
                         url: '/iBase4J-SYS-Web/dic/read/list',
                         dataType: 'json',
                         contentType: 'application/json;charset=UTF-8',
                         data: angular.toJson(postData)
                     }).then(function (result) {
                         $scope.reportList = result.data;
                         $scope.record.type = $scope.reportList[0].code;
                         $scope.$apply();
                     });
                 }
                 getReportList();

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

                 //自定义上传附件
                 $scope.file_upload = function (evt) {    //单次提交图片的函数
                     $scope.reader2 = new FileReader();  //创建一个FileReader接口 
                     var fileInfo2 = evt.currentTarget.files[0];
                     $scope.reader2.readAsDataURL(fileInfo2); //FileReader的方法，把图片转成base64
                     if (fileInfo2.size > 20 * 1024 * 1024) {//判断图片类型
                         alert("文件大小不超过2M!");
                         fileInfo2 = {};
                     } else {
                         $scope.reader2.onload = function (ev) {
                             if ($scope.thumbLength < 5) {
                                 $scope.$apply(function () {
                                     $scope.thumb.push({
                                         file: ev.target.result,
                                         filename: fileInfo2.name
                                     });
                                     $scope.thumbLength = $scope.thumb.length;
                                 });
                             } else {
                                 alert("支持最多上传5个附件");
                             }
                         };
                     }
                 };
                 angular.element(document.querySelector('#uploadFiles')).on('change', $scope.file_upload);
                 $('.upload-file-box a').click(function () {
                     $('#uploadFiles').click();
                 });

                 $scope.file_del = function (key) {  //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
                     $scope.thumb.splice(key, 1);
                     $scope.thumbLength = $scope.thumb.length;
                     $('#uploadFiles').val('');
                 };
                 //提交表单
                 $scope.submit = function () {
                    if ($scope.thumb.length > 0) {
                         $scope.fileUpFlag = false;
                         $.ajax({
                             type: 'POST',
                             url: $rootScope.upFileUrl,
                             async: false,
                             contentType: 'application/json;charset=UTF-8',
                             data: angular.toJson($scope.thumb)
                         }).then(function (result) {
                             //var resultNew = $.parseJSON(result);
                             var resultNew = result;
                             if (resultNew && resultNew.httpCode == 200) {//成功

                                 $scope.record.filePath = resultNew.data;
                                 //"filePath": "[{\"id\":1495763676232,\"fileName\":\"九一八事变.docx\",\"fileUrlPath\":\"http://118.190.172.83:8012/九一八事变.docx\"},{\"id\":1495763684089,\"fileName\":\"图片1.png\",\"fileUrlPath\":\"http://118.190.172.83:8012/图片1.png\"}]"
                                 $scope.fileUpFlag = true;
                                 //$scope.record['avatar'] =result.fileNames[0];
                                 //saveData();
                             } else if (resultNew && resultNew.httpCode == 400) {
                                 //saveData();
                             }
                         });
                     }
                     if ($scope.fileUpFlag) {
                         saveData();
                     }
                 };

                 function saveData() {
                    console.log($scope.record);
                     $scope.loading = true;
                     $scope.btnInfo = '提交中...';
                     $scope.btnState = true;
                     $scope.record.content = myEditor.getContent();
                     $.ajax({
                         type: 'POST',
                         url: '/iBase4J-SYS-Web/report/updateReport',
                         dataType: 'json',
                         contentType: 'application/json;charset=UTF-8',
                         data: angular.toJson($scope.record)
                     }).then(function (result) {
                         $scope.loading = false;
                         if (result.httpCode == 200) {//成功
                             tipDialog("保存成功", 1, 0.8 * 1000, function () {
                                 $state.go('main.party.hb');
                             });
                         } else {
                             $scope.btnInfo = '提交汇报';
                             $scope.btnState = false;
                             alertDialog(result.msg, 2);
                           
                         }
                     });
                 }



                 //表单验证
                 function validate() {
                     var validator = jQuery('form').validate({
                         ignore: "",
                         rules: {
                             title: {
                                 required: true,
                                 maxlength: 128
                             },
                             //content: {
                             //    required: true
                             //},
                             myEditor: {
                                 required: true
                               
                             }

                         },
                         messages: {
                             title: {
                                 required: '请输入标题',
                                 maxLength: "标题不得超过128个字符"
                             },
                             //content: {
                             //    required: '汇报内容不能为空'
                             //},
                             myEditor: {
                                 required: '汇报内容不能为空',
                               
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

                 $scope.cancel = function () {
                    layer.confirm('您确认放弃本次编辑吗？' ,function (index) {
                        layer.close(index);
                        $state.go('main.party.hb');
                    })
                 }


             }]);