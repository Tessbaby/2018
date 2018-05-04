﻿/// <reference path="orgRelationForm.html" />
/// <reference path="orgRelationForm.html" />
'use strict';

angular.module('app')
	.controller('orgRelationShipController', ['$rootScope', '$scope', '$http', '$state',
	  function ($rootScope, $scope, $http, $state) {

	      //==================================执行查询 start==================================
	      $scope.param = {};
	      $scope.url = '/iBase4J-SYS-Web/userOrg/list';
	      $rootScope.pageInfo = []; // 请求数据前清空

	      var userId = $state.params.userId;
	      console.log("组织关系 userId=" + userId);
	      $scope.param.userId = userId;
	      $scope.getList = function () {
	          $scope.loading = true;
	          // 请求表格数据
	          $.ajax({
	              url: $scope.url,
	              type: 'get',
	              contentType: 'application/json;charset=UTF-8',
	              data: $scope.param
	          }).then(function (result) {
	              console.log(result);
	              $scope.loading = false;
	              if (result.httpCode == 200) {
	                  $rootScope.pageInfo = new Object(result);
	                  console.log($rootScope.pageInfo);
	              } else {
	                  $scope.msg = result.msg;
	                  //toaster.clear('*');
	                  //toaster.pop('error', '', "查询失败");
	              }
	              $rootScope.$apply();
	          })
	      }
	      $scope.showSubmit = true;
	      if (userId) {
	          $scope.getList();
	      } else {
	          alertDialog("请先添加基本信息", 2);
	          $scope.showSubmit = false;
	      }
	    


	      $scope.clearSearch = function () {
	          $scope.param.keyword = null;
	          $scope.getList();
	      }

	      // 翻页 - 排序翻页数据与此一致
	      $scope.pagination = function (page) {
	          $scope.param.pageNum = page;
	          $scope.param.asc = $rootScope.changeAsc();
	          $scope.getList();
	      };
	      //==================================执行查询 end==================================

	      $scope.ShowForm = function (id) {

	          //页面层
	          layer.open({
	              type: 2,
	              skin: 'layui-layer-rim', //加上边框
	              area: ['60%', '80%'], //宽高

	              content: ['/index.html#/access/orgForm/' + userId + '/' + id],
	              end: function () {
	                  $scope.getList();
	              }
	          });
	      }

	      $scope.del = function (id) {

	          var postData = { id: id };
	          layer.confirm('确认要删除？', function () {
	              $.ajax({
	                  url: '/iBase4J-SYS-Web/userOrg',
	                  type: 'delete',
	                  data: angular.toJson(postData)
	              }).then(function (result) {
	                  $scope.loading = false;
	                  if (result.httpCode == 200) {
	                      tipDialog("删除成功", 1, 0.8 * 1000, function () {

	                          $scope.getList();
	                      });
	                  } else {
	                      alertDialog(result.msg, 2);
	                  }
	                  $scope.$apply();
	              })
	          })
	      }
	  }])