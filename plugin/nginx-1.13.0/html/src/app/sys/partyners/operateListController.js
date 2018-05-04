'use strict';

angular.module('app')
	.controller('operateListController', ['$rootScope', '$scope', '$http', '$state',
    function ($rootScope, $scope, $http, $state) {

        var userId = $state.params.userId;

        $scope.type = Number($state.params.type);

        console.log("userId=" + userId);
        if (userId) {
            $scope.showName = true;
            getModel(userId);
        } else {
            $scope.showName = false;
        }

        $scope.baseInfoTab = 'src/app/sys/partyners/baseInfoAdd.html'; // 基本信息添加
        $scope.partyInfoTab = 'src/app/sys/partyners/partyInfoAdd.html'; // 党籍信息添加
        $scope.orgRelationShipTab = 'src/app/sys/partyners/orgRelationShip.html'; // 组织关系列表
        $scope.democraticTab = 'src/app/sys/partyners/democratic.html'; // 民主评议列表
        $scope.RAPInfoTab = 'src/app/sys/partyners/RAPInfo.html'; // 奖惩信息
        $scope.trainingTab = 'src/app/sys/partyners/training.html'; // 培养发展
        $scope.activeTab = 1;
        $scope.currentTab = $scope.baseInfoTab;

        $scope.onClickTab = function (tab) {
            switch (tab) {
                case 1:

                    $scope.activeTab = 1;
                    $scope.currentTab = $scope.baseInfoTab;
                    break;
                case 2:
                    $scope.activeTab = 2;
                    $scope.currentTab = $scope.partyInfoTab;
                    break;
                case 3:
                    $scope.activeTab = 3;
                    $scope.currentTab = $scope.orgRelationShipTab;
                    break;
                case 4:
                    $scope.activeTab = 4;
                    $scope.currentTab = $scope.democraticTab;
                    break;
                case 5:
                    $scope.activeTab = 5;
                    $scope.currentTab = $scope.RAPInfoTab;
                    break;
                case 6:
                    $scope.activeTab = 6;
                    $scope.currentTab = $scope.trainingTab;
                    break;
                default:

            }
            // console.log(tab);

        };

        //获取党员详情
        function getModel(id) {
            $.ajax({
                type: 'PUT',
                url: '/iBase4J-SYS-Web/user/read/detail',
                data: angular.toJson({ id: id })
            }).then(function (result) {
                if (result.httpCode == 200) {
                    $scope.infoList = {
                        userName: result.data.userName,
                        deptName: result.data.deptName
                    }
                } else {
                    alertDialog(result.msg, 2);
                }
                $scope.$apply();
            });
        }
    }])