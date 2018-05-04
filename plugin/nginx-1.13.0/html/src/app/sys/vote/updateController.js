'use strict';

angular.module('app')
    .controller('updateController', ['$rootScope', '$scope', '$http', '$state', '$stateParams',
         function ($rootScope, $scope, $http, $state, $stateParams) {

             /*初始化页面*/
             var serverUrl = $rootScope.upFileUrl;
             $scope.param = {};
             $scope.infoType = 1;
             $scope.infoList = {}
             $scope.infoList.contentlist = [];
             $scope.infoList.id = $stateParams.id;
             $scope.infoList.type = $stateParams.type;
             if ($scope.infoList.id) {
                 $scope.title = "编辑投票";
                 getInitData();
             } else {
                 $scope.title = "发布投票";
             }

             $scope.isDisabled = true;
             $scope.isSubDisabled = false;

             //投票是否公开按钮插件
             $scope.param.isPublic = false;
             //结果是否公开按钮插件
             $scope.param.ispuslish = true;
             getTypeName();					    //获取投票栏目名称（每月一星）
             validate();
             function getTypeName() {
                 $scope.loading = true;
                 $.ajax({
                     type: 'PUT',
                     url: '/iBase4J-SYS-Web/questionType/questionType',
                     data: angular.toJson({ 'type': $scope.infoList.type })
                 }).then(function (result) {
                     $scope.loading = false;
                     if (result.httpCode == 200) {
                         $scope.typeName = result.data.name;

                     } else {
                         alertDialog(result.msg, 2);
                     }

                 });
             }
             //上传文件
             $scope.reader2 = new FileReader();  //创建一个FileReader接口 
             $scope.file_upload = function (evt) {    //单次提交图片的函数
                 console.log();
                 var arrValue = evt.id.split("_");
                 var key = arrValue[1];
                 var qValue = arrValue[2];
                 var fileInfo2 = evt.files[0];

                 $scope.reader2.readAsDataURL(fileInfo2); //FileReader的方法，把图片转成base64

                 $scope.reader2.onload = function (ev) {
                     $scope.$apply(function () {
                         var obj = [{
                             file: ev.target.result,
                             filename: fileInfo2.name
                         }];
                         $.ajax({
                             type: 'POST',
                             url: $rootScope.upFileUrl,
                             async: false,
                             contentType: 'application/json;charset=UTF-8',
                             data: angular.toJson(obj)
                         }).then(function (result) {
                             if (result && result.httpCode == 200) {//成功
                                 $scope.infoList.contentlist[key].options[qValue].img = result.data[0].fileUrlPath;
                             } else if (resultNew && resultNew.httpCode == 400) {

                             }
                         });



                     });
                 };
             };

             //删除选题
             $scope.removeSubject = function (key) {
                 $scope.infoList.contentlist.splice(key, 1);
             }

             //添加选题
             $scope.addSubject = function (optiontype) {
                 $scope.infoList.contentlist.push({
                     "id": "",
                     "options": [
                         {
                             "img": "",
                             "imglist": null,
                             "ischeck": "0",
                             "qkey": "",
                             "qvalue": "0"
                         }
                     ],
                     "optiontype": optiontype,
                     "title": "",
                     "type": $scope.infoType
                 });
             }

             //添加选项
             $scope.addOptions = function (key) {
                 var arrInfo = $scope.infoList.contentlist[key].options;
                 var qvalue = arrInfo.length;
                 arrInfo.push({
                     "img": "",
                     "imglist": null,
                     "ischeck": "0",
                     "qkey": "",
                     "qvalue": qvalue
                 });
             }

             //删除选项
             $scope.removeOptions = function (key, qValue) {
                 $scope.infoList.contentlist[key].options.splice(qValue, 1);
                 var arrInfo = $scope.infoList.contentlist[key].options;
                 for (var i in arrInfo) {
                     arrInfo[i].qvalue = i;
                 }
             }

             //添加外链
             $scope.addLink = function (key, qValue) {
                 var strLink = $scope.infoList.contentlist[key].options[qValue].img;
                 layer.prompt({
                     title: '请输入链接地址',
                     value: strLink,
                     formType: 0
                 }, function (value, index) {
                     var urlReg = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
                     if (urlReg.test(value)) {
                         layer.close(index);
                         $scope.infoList.contentlist[key].options[qValue].img = value;
                         $scope.$apply();
                     } else {
                         layer.msg('请输入正确格式的网址');
                     }

                 });
             }

             //初始化编辑数据
             function getInitData() {
                 $.ajax({
                     type: 'put',
                     url: '/iBase4J-SYS-Web/question/detail',
                     dataType: 'json',
                     contentType: 'application/json;charset=UTF-8',
                     data: angular.toJson({ 'id': $scope.infoList.id })
                 }).then(function (result) {
                     //console.log(result);
                     $scope.loading = false;
                     if (result.httpCode == 200) {
                         $scope.infoList = result.data;

                         $scope.param.isPublic = $scope.infoList.isPublic == 1 ? true : false;
                         $scope.param.ispuslish = $scope.infoList.ispuslish == 1 ? true : false;
                     } else {
                         alertDialog(result.msg, 2);
                     }
                     $scope.$apply();

                 });
             }

             $scope.confirmCancel = function () {
                 //询问框
                 layer.confirm('您确认放弃本次编辑吗？', {
                     btn: ['确认', '取消'], //按钮
                     shade: false //不显示遮罩
                 }, function () {
                     layer.closeAll();
                     $state.go('main.party.vote', { typeId: 1 });
                 }, function () {
                     layer.msg('已取消', { icon: 1 });
                 });

             };
             //function timeStamp2String(time) {
             //    var datetime = new Date();
             //    datetime.setTime(time);
             //    var year = datetime.getFullYear();
             //    var month = datetime.getMonth() + 1 < 10 ? "0" + (datetime.getMonth() + 1) : datetime.getMonth() + 1;
             //    var date = datetime.getDate() < 10 ? "0" + datetime.getDate() : datetime.getDate();
             //    var hour = datetime.getHours() < 10 ? "0" + datetime.getHours() : datetime.getHours();
             //    var minute = datetime.getMinutes() < 10 ? "0" + datetime.getMinutes() : datetime.getMinutes();
             //    var second = datetime.getSeconds() < 10 ? "0" + datetime.getSeconds() : datetime.getSeconds();
             //    return year + "-" + month + "-" + date + " " + hour + ":" + minute + ":" + second;
             //}
             var start = {
                 elem: '#startTime',
                 format: 'YYYY/MM/DD hh:mm:ss',
                 min: laydate.now(0, "YYYY/MM/DD hh:mm:00"), //设定最小日期为当前日期
                 max: '2099-06-16 23:59:', //最大日期
                 istime: true,
                 istoday: false,
                 isclear: false,
                 issure: true, //是否显示确认
                 festival: true, //是否显示节日
                 choose: function (datas) {

                     //end.min = datas
                     end.start = datas;//将结束日的初始值设定为开始日
                     $scope.infoList.startTime = datas;

                     //console.log(new Date(datas));
                 }
             };
             var end = {
                 elem: '#endTime',
                 format: 'YYYY/MM/DD hh:mm:ss',
                 min: laydate.now(0, "YYYY/MM/DD hh:mm:00"),
                 max: '2099-06-16 23:59:59',
                 istime: true,
                 istoday: false,
                 isclear: false,
                 choose: function (datas) {
                     //start.max = datas; //结束日选好后，重置开始日的最大日期

                     $scope.infoList.endTime = datas;
                 }
             };
             laydate(start);
             laydate(end);

             //表单验证
             function validate() {
                 var validator = jQuery('form').validate({

                     rules: {
                         qtitle: {
                             required: true,
                             maxLengthB: [128]
                         },
                         remark: {
                             maxLengthB: [255]
                         },
                         startTime: {
                             required: true,
                             date: true
                         },
                         endTime: {
                             required: true,
                             date: true
                         }


                     },
                     messages: {
                         qtitle: {
                             required: '请输入标题',
                             maxLengthB: "标题不得超过{0}个字符"
                         },
                         remark: {
                             maxLengthB: "描述不得超过{0}个字符"
                         },
                         startTime: {
                             required: '开始时间为必填',
                             date: '日期格式不正确'
                         },
                         endTime: {
                             required: '结束时间为必填',
                             date: '日期格式不正确'
                         }
                     },
                     submitHandler: function () {
                         submit();
                     }
                 });

             }

             //提交表单
             var submit = function () {
                 ////标题
                 //if(!$scope.infoList.qtitle){
                 //	layer.msg('标题不能为空', { icon: 1 });
                 //	return;
                 //}
                 //投票时间
                 //$scope.infoList.startTime = $("#startTime").val();
                 //$scope.infoList.endTime = $("#endTime").val();
                 if (!$scope.infoList.startTime || !$scope.infoList.endTime) {
                     layer.msg("投票开始时间和结束时间不能为空");
                     return;
                 }
                 if ($scope.infoList.startTime >= $scope.infoList.endTime) {
                     layer.msg("投票结束时间不能小于等于投票开始时间");
                     return;
                 }
                 var isPass = true;
                 var arrList = [];
                 $("[name='voteName']").each(function () {
                     if (!$(this).val()) {
                         layer.msg("编辑题目内容不能为空");
                         isPass = false;
                         return;
                     }
                 });
                 if (isPass) {
                     $scope.infoList.isPublic = $scope.param.isPublic ? 1 : 2;
                     $scope.infoList.ispuslish = $scope.param.ispuslish ? 1 : 0;

                     saveData();
                 }


             }

             function saveData() {
                 //console.log($scope.infoList);
                 $scope.isSubDisabled = true;//提交disabled
                 $.ajax({
                     type: 'POST',
                     url: '/iBase4J-SYS-Web/question/updateQuestiont',
                     dataType: 'json',
                     contentType: 'application/json;charset=UTF-8',
                     data: angular.toJson($scope.infoList)
                 }).then(callback);

                 function callback(result) {

                     if (result.httpCode == 200) {//成功
                         tipDialog("保存成功", 1, 0.8 * 1000, function () {
                             $state.go('main.party.vote', { typeId: $scope.infoList.type });
                         });

                     } else {
                         alertDialog(result.msg, 2);
                         $scope.isSubDisabled = false;
                     }
                     $scope.loading = false;
                 }
             }


         }]);