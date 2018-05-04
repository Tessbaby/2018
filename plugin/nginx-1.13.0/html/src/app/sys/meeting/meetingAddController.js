'use strict';

angular.module('app')
	.controller('meetingAddController', ['$rootScope', '$scope', '$http', '$state',
    function ($rootScope, $scope, $http, $state) {

        var id = $state.params.id;
        var dateState = true;
        $scope.btnInfo = '提交';
        $scope.btnState = false;

        $scope.record = {};
        $scope.item = [];

        $scope.isSelected = false;
        $scope.approverSelected = false;
        $scope.infoLength = 0;//数据加载后需初始化为0

        //参会人员对象
        $scope.person = {};
        $scope.person.setList = [];//已选择列表
        $scope.checkdIds = [];    //已选人员ID列表
        $scope.person.sourceList = [];//已选择列表

        //请假审批人人员对象
        $scope.approverInfoLength = 0;//数据加载后需初始化为0
        $scope.approver = {};
        $scope.approver.setList = [];//已选择列表
        $scope.appids = [];    //已选人员ID列表
        $scope.approver.sourceList = [];//已选择列表


        $scope.deptId = '';
        $scope.appidsDeptid = '';
        $scope.groupid = '';
        $scope.appidsGroupid = '';
        $scope.keyword = '';
        //与会人员
        $scope.withDept = true; // 显示按部门选择
        $scope.withGroup = false; // 显示按组选择
        //请假审批人
        $scope.withAppidsDept = true; // 显示按部门选择
        $scope.withAppidsGroup = false; // 显示按组选择

        if (id) {
            $scope.title = '编辑';
            getDetail(id);
        } else {
            $scope.title = '添加';
        }
        validate();
        getMeetingType();

        function getMeetingType() { // 会议类型暂无接口
            var infoRecord = {
                enable: 1,
                type: 'METTINGTYPE'
            };
            $.ajax({
                type: 'PUT',
                url: '/iBase4J-SYS-Web/dic/read/list',
                async: true,
                data: angular.toJson(infoRecord)
            }).then(function (result) {
                $scope.mtypeList = result.data;

                if ($scope.mtypeList.length > 0) {
                    $scope.record.mtype = $scope.mtypeList[0].code;
                }
                $scope.$apply();
            });
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
        // 获取详情(编辑时)
        function getDetail(id) {
            $.ajax({
                type: 'PUT',
                url: '/iBase4J-SYS-Web/sysMeeting/read/preUpdateDetail',
                data: angular.toJson({ id: id })
            }).then(function (result) {
                $scope.record = result.data;
                // console.log($scope.record);
                if ($scope.record.mcontent != "") {
                    myEditor.ready(function () {//编辑器初始化完成再赋值  
                        myEditor.setContent($scope.record.mcontent);  //赋值给UEditor  
                    });
                }

                //var checkds = [];
                //var list;

                $.each(result.data.userList, function (index, item) {
                    var person = {};
                    person.userName = item.username;
                    person.dnzwText = item.duty;
                    $scope.person.setList.push(person);
                    $scope.checkdIds.push(item.userid);
                })
                $.each(result.data.applyerList, function (index, item) {
                    var applyer = {};
                    applyer.userName = item.username;
                    applyer.dnzwText = item.duty;
                    $scope.approver.setList.push(applyer);
                    $scope.appids.push(item.userid);
                })
                //初始化可参会人员
                //$scope.person.setList = result.data.userList;
                $scope.$apply();
            });
        }

        var start = {
            elem: '#startdate',
            format: 'YYYY-MM-DD hh:mm',
            //min: laydate.now(0, "YYYY/MM/DD hh:mm:00"), //设定最小日期为当前日期
            max: '2099-06-16 23:59:', //最大日期
            istime: true,
            istoday: false,
            isclear: false,
            issure: true, //是否显示确认
            festival: true, //是否显示节日
            choose: function (datas) {
                //var time = new Date(datas);
                //time.setMinutes(time.getMinutes() + 5, time.getSeconds(), 0);
                //timeStamp2String(time);
                // console.log(timeStamp2String(time));
                //end.min = datas; //开始日选好后，重置结束日的最小日期
                end.start = datas;//将结束日的初始值设定为开始日
                $scope.record.startdate = datas;

                // console.log(new Date(datas));
            }
        };
        var end = {
            elem: '#enddate',
            format: 'YYYY-MM-DD hh:mm',
            //min: laydate.now(0, "YYYY/MM/DD hh:mm:00"),
            max: '2099-06-16 23:59:59',
            istime: true,
            istoday: false,
            isclear: false,
            choose: function (datas) {
                //start.max = datas; //结束日选好后，重置开始日的最大日期

                $scope.record.enddate = datas;
            }
        };
        laydate(start);
        laydate(end);


        //党组织结构设置
        var setting = {
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
        //党组织结构设置
        var appidsSetting = {
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
                onClick: onAppidsClick
            }
        };
        
        //获取选中子级
        function onClick(e, treeId, treeNode) {
            $scope.deptid = treeNode.id;
            $scope.searchPerson();
        }
        //获取选中子级
        function onAppidsClick(e, treeId, treeNode) {
            $scope.appidsDeptid = treeNode.id;
            $scope.approverSearchPerson();
        }

        var groupSetting = {
            data: {
                key: {
                    name: "name"
                },
                simpleData: {
                    enable: true,
                    idKey: "id",
                }
            },
            callback: {
                onClick: onClickGroup
            }
        };
        var groupAppidsSetting = {
            data: {
                key: {
                    name: "name"
                },
                simpleData: {
                    enable: true,
                    idKey: "id",
                }
            },
            callback: {
                onClick: onClickGroupAppids
            }
        };
        
        //获取选中子级
        function onClickGroup(e, treeId, treeNode) {
            $scope.groupid = treeNode.id;
            $scope.searchPerson();
        }   //获取选中子级
        function onClickGroupAppids(e, treeId, treeNode) {
            $scope.appidsGroupid = treeNode.id;
            $scope.approverSearchPerson();
        }

        //党组织结构树
        $.ajax({
            type: 'PUT',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            url: '/iBase4J-SYS-Web/dept/read/treelist2',
            data: ''
        }).then(function (result) {
            $scope.loading = false;
            if (result.httpCode == 200) {
                //console.log(result);
                var zNodes = result.data;
                var treeObj = $.fn.zTree.init($("#treeDemo"), setting, zNodes);
                treeObj.expandAll(true);
                var treeAppids = $.fn.zTree.init($("#treeAppids"), appidsSetting, zNodes);
                treeAppids.expandAll(true);
            } else {
                alertDialog(result.msg, 2);
            }
            $scope.$apply();
        });

        //分组结构树
        $.ajax({
            type: 'get',
            dataType: 'json',
            contentType: 'application/json;charset=UTF-8',
            url: '/iBase4J-SYS-Web/group/list',
            data: ''
        }).then(function (result) {
            $scope.loading = false;
            if (result.httpCode == 200) {
                //console.log(result);
                var zNodes = result.data;
                var treeObj = $.fn.zTree.init($("#groupDemo"), groupSetting, zNodes);
                var treeAppids = $.fn.zTree.init($("#groupAppids"), groupAppidsSetting, zNodes);
                treeObj.expandAll(true);
                treeAppids.expandAll(true);
                
            } else {
                alertDialog(result.msg, 2);
            }
            $scope.$apply();
        });

        //初始化人员池
        $scope.searchPerson = function () {
            var type, url;
            var param = {};
            param.keyword = $scope.keyword;
            if ($scope.withDept == true) { //按组织
                param.deptId = $scope.deptid;
                url = '/iBase4J-SYS-Web/user/read/list';
                type = 'PUT';
                param = angular.toJson(param);
            } else if ($scope.withGroup == true) {
                param.id = $scope.groupid;
                type = 'GET';
                url = '/iBase4J-SYS-Web/groupUser/list';

            }
            // console.log($scope.keyword);
            $.ajax({
                type: type,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: url,
                data: param
            }).then(function (result) {
                $scope.loading = false;
                // console.log(result);
                if (result.httpCode == 200) {
                    // console.log(result);
                    $scope.isSelected = false;
                    if ($scope.withDept == true) {
                        //排除已选人员
                        if ($scope.checkdIds.length > 0) {
                            var sourceList = [];
                            for (var i in result.data) {
                                var num = $.inArray(result.data[i].id, $scope.checkdIds);
                                if (num == -1) {
                                    sourceList.push(result.data[i]);
                                }
                            }
                            $scope.person.sourceList = sourceList;
                        } else {
                            $scope.person.sourceList = result.data;
                        }

                    } else if ($scope.withGroup == true) {
                        var userList = result.data.userList;
                        //排除已选人员
                        if ($scope.checkdIds.length > 0) {
                            var sourceList = [];
                            for (var i in userList) {
                                var num = $.inArray(userList[i].id, $scope.checkdIds);
                                if (num == -1) {
                                    sourceList.push(userList[i]);
                                }
                                userList[i].dnzwText = userList[i].dutyName;
                            }
                            $scope.person.sourceList = sourceList;
                        } else {
                            for (var i in userList) {
                                userList[i].dnzwText = userList[i].dutyName;
                                userList[i].id = userList[i].userId;
                            }
                            $scope.person.sourceList = userList;
                        }
                    }

                } else {
                    alertDialog(result.msg, 2);
                }
                // console.log($scope.person.sourceList);
                $scope.$apply();
            });
        }

        //点击待选人员->已选中列表
        $scope.checkInfo = function (key) {
            var moveInfo = $scope.person.sourceList.slice(key, key + 1);
            $scope.person.sourceList.splice(key, 1);
            $scope.person.setList.unshift(moveInfo[0]);
            $scope.checkdIds.unshift(moveInfo[0].id);

        }
        //点击删除已选中->待选列表
        $scope.delChecked = function (key) {
            $scope.isSelected = false;
            var moveInfo = $scope.person.setList.slice(key, key + 1);
            $scope.person.setList.splice(key, 1);
            $scope.person.sourceList.unshift(moveInfo[0]);
            $scope.checkdIds.splice(key, 1);
        }

        //全选/取消全选
        $scope.checkAll = function () {
            if ($scope.isSelected) {
                $scope.isSelected = false;
                var moveInfo = $scope.person.setList.slice(0, $scope.infoLength);
                $scope.person.setList.splice(0, $scope.infoLength);
                $scope.checkdIds.splice(0, $scope.infoLength);
                $scope.person.sourceList = moveInfo;

            } else {
                $scope.infoLength = $scope.person.sourceList.length;
                var arrTmp = angular.copy($scope.person.sourceList);
                $.merge(arrTmp, $scope.person.setList);
                $scope.person.setList = arrTmp;
                var ids = [];
                for (var i in $scope.person.sourceList) {
                    ids.push($scope.person.sourceList[i].id);
                }
                var strIds = angular.copy($scope.checkdIds);
                $.merge(ids, strIds);
                $scope.checkdIds = ids;
                $scope.person.sourceList = [];
                $scope.isSelected = true;
            }
        }
        //审批人员

        //初始化审批人员池
        $scope.approverSearchPerson = function () {
            var type, url;
            var param = {};
            param.keyword = $scope.keyword;
            if ($scope.withDept == true) { //按组织
                param.deptId = $scope.appidsDeptid;
                url = '/iBase4J-SYS-Web/user/read/list';
                type = 'PUT';
                param = angular.toJson(param);
            } else if ($scope.withGroup == true) {
                param.id = $scope.appidsGroupid;
                type = 'GET';
                url = '/iBase4J-SYS-Web/groupUser/list';

            }
            // console.log($scope.keyword);
            $.ajax({
                type: type,
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: url,
                data: param
            }).then(function (result) {
                $scope.loading = false;
                // console.log(result);
                if (result.httpCode == 200) {
                    // console.log(result);
                    $scope.approverSelected = false;
                    if ($scope.withAppidsDept == true) {
                        //排除已选人员
                        if ($scope.appids.length > 0) {
                            var sourceList = [];
                            for (var i in result.data) {
                                var num = $.inArray(result.data[i].id, $scope.appids);
                                if (num == -1) {
                                    sourceList.push(result.data[i]);
                                }
                            }
                            $scope.approver.sourceList = sourceList;
                        } else {
                            $scope.approver.sourceList = result.data;
                        }

                    } else if ($scope.withAppidsGroup == true) {
                        var userList = result.data.userList;
                        //排除已选人员
                        if ($scope.appids.length > 0) {
                            var sourceList = [];
                            for (var i in userList) {
                                var num = $.inArray(userList[i].id, $scope.appids);
                                if (num == -1) {
                                    sourceList.push(userList[i]);
                                }
                                userList[i].dnzwText = userList[i].dutyName;
                            }
                            $scope.approver.sourceList = sourceList;
                        } else {
                            for (var i in userList) {
                                userList[i].dnzwText = userList[i].dutyName;
                                userList[i].id = userList[i].userId;
                            }
                            $scope.approver.sourceList = userList;
                        }
                    }

                } else {
                    alertDialog(result.msg, 2);
                }
                
                $scope.$apply();
            });
        }
        //点击待选人员->已选中列表
        $scope.approverCheckInfo = function (key) {
            var moveInfo = $scope.approver.sourceList.slice(key, key + 1);
            $scope.approver.sourceList.splice(key, 1);
            $scope.approver.setList.unshift(moveInfo[0]);
            $scope.appids.unshift(moveInfo[0].id);

        }
        //点击删除已选中->待选列表
        $scope.approverDelChecked = function (key) {
            $scope.approverSelected = false;
            var moveInfo = $scope.approver.setList.slice(key, key + 1);
            $scope.approver.setList.splice(key, 1);
            $scope.approver.sourceList.unshift(moveInfo[0]);
            $scope.appids.splice(key, 1);
        }
        //全选/取消全选
        $scope.approverCheckAll = function () {
            if ($scope.approverSelected) {
                $scope.approverSelected = false;
                var moveInfo = $scope.approver.setList.slice(0, $scope.approverInfoLength);
                $scope.approver.setList.splice(0, $scope.approverInfoLength);
                $scope.appids.splice(0, $scope.approverInfoLength);
                $scope.approver.sourceList = moveInfo;

            } else {
                $scope.approverInfoLength = $scope.approver.sourceList.length;
                var arrTmp = angular.copy($scope.approver.sourceList);
                $.merge(arrTmp, $scope.approver.setList);
                $scope.approver.setList = arrTmp;
                var ids = [];
                for (var i in $scope.approver.sourceList) {
                    ids.push($scope.approver.sourceList[i].id);
                }
                var strIds = angular.copy($scope.appids);
                $.merge(ids, strIds);
                $scope.appids = ids;
                $scope.approver.sourceList = [];
                $scope.approverSelected = true;
            }
        }
        // 表单验证
        function validate(userId) {
            var validator = jQuery('form').validate({
                ignore: "",
                rules: {

                    mname: { required: true, maxlength: 500 },
                    startdate: { required: true, date: true },
                    enddate: { required: true, date: true },
                    mplace: { required: true, maxlength: 200 },
                    // mcontent: { maxlength: 1000 },
                    myEditor: {
                        required: true,
                        // maxlength: 1000
                    },
                    listPersons: { maxlength: 2000 },
                    masterPerson: { maxlength: 100 },
                    recordPerson: { maxlength: 100 }
                },
                messages: {
                    mname: { required: '请填写会议主题', maxlength: '长度不能超过500个字符' },
                    startdate: { required: '开始时间为必填', date: '日期格式不正确' },
                    enddate: { required: '结束时间为必填', date: '日期格式不正确' },
                    mplace: { required: '请填写会议地点', maxlength: '会议地点不能超过200字' },
                    // mcontent: { maxlength: '不能超过1000字' },
                    myEditor: {
                        required: '请输入会议内容',
                        // maxlength: '不能超过1000字'
                    },
                    listPersons: { maxlength: '不能超过2000字' },
                    masterPerson: { maxlength: '不能超过100字' },
                    recordPerson: { maxlength: '不能超过100字' }
                },
                submitHandler: function () {

                    var current = new Date();
                    var startdate = $scope.record.startdate;
                    var d1 = new Date(startdate.replace(/\-/g, "\/"));
                    if (startdate != "" && current != "" && d1 < current) {
                        if (confirm('会议开始时间小于当前时间，添加后会议会自动进入【进行中】状态，是否确认发布？')) {
                            submit();
                        }
                    } else {
                        submit();
                    }

                }
            })
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

        var submit = function () {
            // console.log($scope.record);
            // return;
            if (!$scope.record.startdate) {
                alertDialog("会议开始时间不能为空！", 2);
                return;
            }
            if (!$scope.record.enddate) {
                alertDialog("会议结束时间不能为空！", 2);
                return;
            }
            if ($scope.record.enddate <= $scope.record.startdate) {
                alertDialog("会议结束时间不能小于等于开始时间！", 2);
                return;
            }
            // var m = angular.copy($scope.record);
            var m = {
                enddate: $scope.record.enddate,
                id: id,
                mcontent: myEditor.getContent(),
                mname: $scope.record.mname,
                mplace: $scope.record.mplace,
                mtype: $scope.record.mtype,
                position: $scope.record.position ? $scope.record.position : '',
                startdate: $scope.record.startdate,
                userids: $scope.checkdIds,
                appids: $scope.appids,
                outerNames: $scope.record.outerNames,
                masterPerson: $scope.record.masterPerson,
                recordPerson: $scope.record.recordPerson,
                listPersons: $scope.record.listPersons
            };
            // console.log(m);
            // return;
            $scope.btnInfo = '提交中...';
            $scope.btnState = true;
            $.ajax({
                type: 'post',
                dataType: 'json',
                contentType: 'application/json;charset=UTF-8',
                url: '/iBase4J-SYS-Web/sysMeeting',
                data: angular.toJson(m)
            }).then(function (result) {
                // console.log(result);
                if (result.httpCode == 200) {
                    tipDialog("保存成功", 1, 0.8 * 1000, function () {
                        $state.go('main.life.meeting');
                    });
                } else {
                    $scope.btnInfo = '提交';
                    $scope.btnState = false;
                    alertDialog(result.msg, 2);
                }
            })
        }

        $scope.changeUsers = function (arg) {
            $scope.person.sourceList = [];
            $scope.person.setList = [];
            $scope.isSelected = false;
            $scope.keyword = '';
            if (arg == 1) {
                $scope.withDept = true;
                $scope.withGroup = false;

            } else {
                $scope.withGroup = true;
                $scope.withDept = false;
            }
        }

        $scope.changeAppids = function (arg) {
            $scope.approver.sourceList = [];
            $scope.approver.setList = [];
            $scope.approverSelected = false;
            $scope.keyword = '';
            if (arg == 1) {
                $scope.withAppidsDept = true;
                $scope.withAppidsGroup = false;

            } else {
                $scope.withAppidsGroup = true;
                $scope.withAppidsDept = false;
            }
        }

        $scope.cancel = function () {
            layer.confirm('您确认放弃本次编辑吗？', function (index) {
                layer.close(index);
                history.go(-1);
            })
        }

       
    }])