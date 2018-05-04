'use strict';

angular.module('app')
    .controller('topicController', ['$rootScope', '$scope', '$http', '$state', '$location',
         function ($rootScope, $scope, $http, $state, $location) {

             /*初始化页面*/

             $scope.param = {};
             $scope.thumb = [];
             $scope.title = "专题编辑";

             $scope.loading = true;
             $scope.record = {};
             $scope.param.typeCode = $state.params.typeCode;
             $scope.record.id = $state.params.mId;
             $scope.param.specialImg = [];

            // 判断是list 还是 list2，包含topic2 为list2
            $scope.isTopic2 = ($location.absUrl().indexOf('topic2') != -1) ? true : false;

             //初始化编辑数据
             $.ajax({
                 type: 'put',
                 url: $rootScope.baseUrl + '/articleType/queryDetail',
                 dataType: 'json',
                 contentType: 'application/json;charset=UTF-8',
                 data: angular.toJson({ 'id': $scope.record.id })
             }).then(function (result) {
                 console.log(result);
                 $scope.loading = false;
                 if (result.httpCode == 200) {
                     $scope.record = result.data;
                     console.log(result);
                     if ($scope.record.specialImg != '') {
                         $scope.param.specialImg = $.parseJSON($scope.record.specialImg);
                     }

                 } else {
                     alertDialog(result.msg, 2);
                 }
                 $scope.$apply();

             });

             //自定义上传附件
             var imgArrType = ['image/png', 'image/jpg', 'image/jpeg'];

             $scope.file_upload = function (evt) {    //单次提交图片的函数
                 $scope.reader2 = new FileReader();  //创建一个FileReader接口 
                 var fileInfo2 = evt.currentTarget.files[0];
                 $scope.reader2.readAsDataURL(fileInfo2); //FileReader的方法，把图片转成base64

                 if ($.inArray(fileInfo2.type, imgArrType) == -1) {//判断图片类型
                     alert("不支持该图片类型上传，请重新选择！");
                     fileInfo2 = {};
                 } else if (fileInfo2.size > 2 * 1024 * 1024) {
                     alert("大小不超过2M!");
                     fileInfo = {};
                 } else {
                     $scope.reader2.onload = function (ev) {
                         if ($scope.param.specialImg.length < 3) {
                             $scope.$apply(function () {
                                 $.ajax({
                                     type: 'POST',
                                     url: $rootScope.upFileUrl,
                                     async: false,
                                     contentType: 'application/json;charset=UTF-8',
                                     data: angular.toJson([{ file: ev.target.result, filename: fileInfo2.name }])
                                 }).then(function (result) {
                                     //var resultNew = $.parseJSON(result);
                                     var resultNew = result;
                                     if (resultNew && resultNew.httpCode == 200) {//成功

                                         $scope.param.specialImg.push(resultNew.data[0]);
                                     } else if (resultNew && resultNew.httpCode == 400) {
                                         alertDialog(result.msg, 2);
                                     }
                                 });
                             });
                         } else {
                             alert("最多可上传3张");
                         }

                     };

                 }
             };
             angular.element(document.querySelector('#uploadFiles')).on('change', $scope.file_upload);
             $('.upload-file-box a').click(function () {
                 $('#uploadFiles').click();
             });

             $scope.file_del = function (key) {  //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
                 $scope.param.specialImg.splice(key, 1);

             };

             //提交表单
             $scope.submit = function () {
                 $scope.loading = true;
                 if ($scope.param.specialImg.length < 1) {
                     alert("专题图最少一张");
                 } else {
                     $scope.record.specialImg = $scope.param.specialImg;
                     var m = $scope.record;
                     console.log(m);
                     if (m) {
                         $scope.isDisabled = true;//提交disabled
                         $.ajax({
                             type: 'POST',
                             url: $rootScope.baseUrl + '/articleType/update',
                             dataType: 'json',
                             contentType: 'application/json;charset=UTF-8',
                             data: angular.toJson(m)
                         }).then(callback);
                     }

                 }

             };

             function callback(result) {
                 $scope.loading = false;
                 if (result.httpCode == 200) {//成功
                     tipDialog("保存成功", 1, 0.8 * 1000, function () {
                        if ($scope.isTopic2) {
                            $state.go('main.article.list2', { typeCode: $scope.param.typeCode });
                        } else {
                            $state.go('main.article.list', { typeCode: $scope.param.typeCode });
                        }
                        // $state.go('main.article.list', { typeCode: $scope.param.typeCode });
                     });
                 } else {
                     alertDialog(result.msg, 2);
                     $scope.isDisabled = false;
                     $scope.$apply();
                 }

             }


         }]);