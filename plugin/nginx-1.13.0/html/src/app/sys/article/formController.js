'use strict';

angular.module('app')
    .controller('formController', ['$rootScope', '$scope', '$http', '$state', '$location',
        function ($rootScope, $scope, $http, $state, $location) {

            /*初始化页面*/
            //console.log($state.params.typeCode);return;
            $scope.param = {};

            // 判断是list 还是 list2，包含form2 为list2
            $scope.isForm2 = ($location.absUrl().indexOf('form2') != -1) ? true : false;

            validate();
            $scope.imgSrc = 'res/img/np.png';
            $scope.loading = true;
            $scope.record = {};
            $scope.record.id = $state.params.id;
            $scope.record.typeCode = $state.params.typeCode;
            $scope.param.mId = $state.params.mId;
            $scope.param.filePath = [];


            /* 判断上传图片尺寸 */
            $scope.xcImg = {};
            $scope.xcImg.showXCT = true; // 是否显示宣传图
            $scope.xcImg.xctHeight = 0;
            $scope.xcImg.xctChildWidth = 0;
            $scope.menuName = "栏目管理";
            switch ($scope.record.typeCode) {

                case '19':

                    $scope.menuName = "党员身边事";
                    break;
                case '20':

                    $scope.menuName = "党员发展";
                    break;
                default:
                    $scope.menuName = "栏目管理";
                    break;

            }

            //判断哪种展现形式
            $.ajax({
                type: 'PUT',
                dataType: 'json',
                async: false,
                contentType: 'application/json;charset=UTF-8',
                url: $rootScope.baseUrl + '/articleType/query',
                data: angular.toJson({ "code": $scope.record.typeCode })
            }).then(function (result) {
                if (result.httpCode == 200) {
                    $scope.style = result.data.frontStyle;
                    if ($scope.style == 1 || $scope.style == 4) { // 小图
                        $scope.xcImg.xctWidth = 124;
                        $scope.xcImg.xctHeight = 124;
                    } else if ($scope.style == 2) { // 大图
                        $scope.xcImg.showXCT = false;
                    } else if ($scope.style == 3) { //中图
                        $scope.xcImg.xctWidth = 314;
                        $scope.xcImg.xctHeight = 314;

                    } else if ($scope.style == 5) {
                        $scope.xcImg.xctWidth = 720;
                        $scope.xcImg.xctHeight = 480;

                    }
                    // console.log(result.data.frontStyle);
                    // $scope.cateAndImg = result.data;
                } else {
                    alertDialog(result.msg, 2);
                }
                // $scope.$apply();
            });

            //分类列表
            if ($scope.param.mId != '') {
                $.ajax({
                    type: 'PUT',
                    dataType: 'json',
                    async: false,
                    contentType: 'application/json;charset=UTF-8',
                    url: $rootScope.baseUrl + '/articleCategory/list',
                    data: angular.toJson({ "typeId": $scope.param.mId })
                }).then(function (result) {
                    if (result.httpCode == 200) {
                        $scope.typeList = result.data;
                        if (!$scope.record.categoryId) {
                            $scope.record.categoryId = result.data[0].id;
                        }

                    } else {
                        $scope.msg = result.msg;
                    }
                });
            }





            if ($scope.record.id) {
                $scope.title = "文章编辑";
                getInitData();
            } else {
                $scope.title = "文章发布";
                $scope.param.isTop = false;
                $scope.param.linksType = '1';
                $scope.record.links = '';
            }

            //初始化编辑数据
            function getInitData() {
                $.ajax({
                    type: 'put',
                    url: $rootScope.baseUrl + '/article/queryDetail',
                    dataType: 'json',
                    contentType: 'application/json;charset=UTF-8',
                    data: angular.toJson({ 'id': $scope.record.id })
                }).then(function (result) {
                    //console.log(result);
                    $scope.loading = false;
                    if (result.httpCode == 200) {
                        $scope.record = result.data;
                        $scope.record.typeCode = $state.params.typeCode;
                        //置顶
                        $scope.param.isTop = $scope.record.isTop == 1 ? true : false;
                        //内容形式
                        if ($scope.record.links == '') {
                            $scope.param.linksType = '1';
                        } else {
                            $scope.param.linksType = '2';
                        }
                        //宣传图
                        if ($scope.record.img != '') {
                            $scope.myCroppedImage = $scope.record.img;
                            //$scope.imgData = [];
                        }
                        //编辑器内容
                        myEditor.ready(function () {//编辑器初始化完成再赋值  
                            myEditor.setContent($scope.record.remark);  //赋值给UEditor  
                        });
                        //附件

                        if ($scope.record.filePath != '') {
                            $scope.param.filePath = $.parseJSON($scope.record.filePath);
                            //console.log(typeof $scope.param.filePath);
                            //$scope.imgSrc = $scope.record.img;
                            //	$scope.imgData = [];
                        }
                        $scope.$apply();

                    } else {
                        alertDialog(result.msg, 2);
                    }


                });
            }


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
            $("#selectImages").click(function () {
                console.info("选择图片");
                $('#uploadImg').click();

            });
            $scope.img_del = function (key) {
                $scope.myImage = '';
                $scope.myCroppedImage = '';
                $scope.record.img = "";
                imgInfo = [];
            };

            ////自定义上传标题图
            //$scope.reader = new FileReader();  //创建一个FileReader接口

            //$scope.img_upload = function (evt) {    //单次提交图片的函数
            //    var fileInfo = evt.currentTarget.files[0];
            //    $scope.guid = (new Date()).valueOf();
            //    $scope.reader.readAsDataURL(fileInfo); //FileReader的方法，把图片转成base64
            //    $scope.reader.onload = function (ev) {
            //        $scope.$apply(function () {
            //            // $scope.imgData.push({
            //            // file:ev.target.result,
            //            // filename:fileInfo.name
            //            // });
            //            $.ajax({
            //                type: 'POST',
            //                url: $rootScope.upFileUrl,
            //                async: false,
            //                contentType: 'application/json;charset=UTF-8',
            //                data: angular.toJson([{ file: ev.target.result, filename: fileInfo.name }])
            //            }).then(function (result) {
            //                console.log(result);
            //                //var resultNew = $.parseJSON(result);
            //                var resultNew = result;
            //                if (resultNew && resultNew.httpCode == 200) {//成功
            //                    $scope.imgSrc = resultNew.data[0].fileUrlPath;
            //                    $scope.record.img = resultNew.data[0].fileUrlPath;


            //                } else if (resultNew && resultNew.httpCode == 400) {
            //                    //saveData();
            //                }
            //            });
            //            /*$scope.imgData.push({
            //                file:ev.target.result,
            //                filename:fileInfo.name
            //            });*/
            //        });
            //    };
            //};
            //angular.element(document.querySelector('#uploadImg')).on('change', $scope.img_upload);


            //自定义上传附件

            $scope.file_upload = function (evt) {    //单次提交图片的函数
                $scope.reader2 = new FileReader();  //创建一个FileReader接口 
                var fileInfo2 = evt.currentTarget.files[0];
                $scope.guid = (new Date()).valueOf();
                $scope.reader2.readAsDataURL(fileInfo2); //FileReader的方法，把图片转成base64

                $scope.reader2.onload = function (ev) {
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

                                $scope.param.filePath.push(resultNew.data[0]);
                                console.log($scope.param.filePath);
                            } else if (resultNew && resultNew.httpCode == 400) {
                                //saveData();
                            }
                        });
                    });
                };
            };
            angular.element(document.querySelector('#uploadFiles')).on('change', $scope.file_upload);
            $('.upload-file-box a').click(function () {
                $('#uploadFiles').click();
            });

            $scope.file_del = function (key) {  //删除，删除的时候thumb和form里面的图片数据都要删除，避免提交不必要的
                $scope.param.filePath.splice(key, 1);
            };

            //提交表单
            $scope.submit = function () {
                $scope.loading = true;

                //文章内容
                if ($scope.param.linksType == 1) {
                    $scope.record.remark = myEditor.getContent();
                    if ($scope.record.remark == '') {
                        alert("文章内容不能为空");
                        return;
                    }
                    $scope.record.links = '';
                } else {
                    if (!$scope.record.links) {
                        alert("文章链接地址不能为空");
                        return;
                    }
                    if ($scope.record.links.length > 256) {
                        alert("文章链接地址不能大于256个字符");
                        return;
                    }
                    $scope.record.remark = '';
                }
                $scope.record.isTop = $scope.param.isTop ? 1 : 2;
                $scope.record.filePath = $scope.param.filePath;
                if (imgInfo.length > 0) {
                    $scope.imgUpFlag = false;
                    $.ajax({
                        type: 'POST',
                        url: $rootScope.upFileUrl,
                        async: false,
                        contentType: 'application/json;charset=UTF-8',
                        data: angular.toJson([{ file: $scope.myCroppedImage, filename: imgInfo[0].filename }])
                    }).then(function (result) {

                        var resultNew = result;
                        if (resultNew && resultNew.httpCode == 200) {//成功
                            $scope.record.img = resultNew.data[0].fileUrlPath;

                            $scope.imgUpFlag = true;

                        } else {
                            tipDialog("上传图片失败！", 2, 0.8 * 1000);
                        }
                    });
                }

                if ($scope.imgUpFlag) {
                    saveData();
                }


            };

            function saveData() {
                var m = $scope.record;

                if (m) {
                    $scope.isDisabled = true;//提交disabled
                    $.ajax({
                        type: 'POST',
                        url: $rootScope.baseUrl + '/article/update',
                        dataType: 'json',
                        contentType: 'application/json;charset=UTF-8',
                        data: angular.toJson(m)
                    }).then(callback);
                }
                function callback(result) {
                    if (result.httpCode == 200) {//成功
                        tipDialog("保存成功", 1, 0.8 * 1000, function () {
                            window.location.href = history.go(-1);
                            //if ($scope.isForm2) {
                            //    $state.go('main.article.list2', { typeCode: $state.params.typeCode });
                            //} else {
                            //    $state.go('main.article.list', { typeCode: $state.params.typeCode });
                            //}
                        });
                    } else {

                        $scope.isDisabled = false;
                        $scope.$apply();
                        alertDialog(result.msg, 2);
                    }
                    $scope.loading = false;
                }
            }



            //百度编辑器
            if ($("#myEditor").length > 0) {
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
                            'source', //源代码
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
            }

            //表单验证
            function validate(userId) {
                var validator = jQuery('form').validate({
                    ignore: "",
                    rules: {
                        articleTitle: {
                            required: true,
                            maxLengthB: [128]
                        },
                        articleKey: {
                            required: true,
                            maxLengthB: [128]
                        }
                    },
                    messages: {
                        articleTitle: {
                            required: '请输入标题',
                            maxLengthB: "标题不得超过{0}个字符"
                        },
                        articleKey: {
                            required: '请输入关键字',
                            maxLengthB: "关键字不得超过{0}个字符"
                        }
                    },
                    submitHandler: function () {
                        $scope.submit();
                    }
                });
            }
        }]);