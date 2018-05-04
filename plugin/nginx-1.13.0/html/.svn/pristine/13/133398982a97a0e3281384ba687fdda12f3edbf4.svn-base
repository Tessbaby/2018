'use strict';

angular.module('app')
	.controller('updateHeadController', ['$scope', '$rootScope', '$state',
	              function ($scope, $rootScope, $state) {
	                  var title = "";
	                  //alert("updateHead");

	                  if ($state.includes('**.party.noticeUpdateHead')) {
	                      title = "编辑";
	                      var id = $state.params.id;
	                      activate(id);
	                      validate(id);
	                  } else if ($state.includes('**.party.noticeAddHead')) {
	                      title = "添加";
	                      validate(null);
	                  }
	                  $scope.title = $rootScope.title = title;
	                  $scope.loading = true;
	                  //初始化验证
	                  //validate($scope);
	                  $scope.submit = function () {
	                      $scope.loading = true;
	                      saveData();
	                  };

	                  function saveData() {
	                      var m = $scope.record;
	                      if (m) {
	                          $scope.isDisabled = true;//提交disabled
	                          $.ajax({
	                              type: 'POST',
	                              url: '/iBase4J-SYS-Web/noticeHeader/header/update',
	                              dataType: 'json',
	                              contentType: 'application/json;charset=UTF-8',
	                              data: angular.toJson(m)
	                          }).then(callback);
	                      }
	                      function callback(result) {
	                          $scope.loading = false;
	                          if (result.httpCode == 200) {//成功
	                              tipDialog("保存成功", 1, 0.8 * 1000, function () {
	                                  $state.go('main.party.noticeListHead');
	                              });
	                          } else {

	                              $scope.isDisabled = false;
	                              alertDialog(result.msg, 2);
	                          }

	                      }
	                  }


	                  // 初始化页面
	                  function activate(id) {
	                      $scope.loading = true;
	                      $.ajax({
	                          type: 'put',
	                          url: '/iBase4J-SYS-Web/noticeHeader/header/detail',
	                          dataType: 'json',
	                          contentType: 'application/json;charset=UTF-8',
	                          data: angular.toJson({ 'id': id })
	                      }).then(function (result) {
	                          console.log(result);
	                          $scope.loading = false;
	                          if (result.httpCode == 200) {
	                              $scope.record = result.data;

	                          } else {
	                              alertDialog(result.msg, 2);
	                          }
	                          $scope.$apply();

	                      });
	                  }

	                  //表单验证
	                  function validate(userId) {
	                      //notEqual 规则
	                      $.validator.addMethod('notEqual', function (value, ele) {
	                          return value != this.settings.rules[ele.name].notEqual;
	                      });
	                      jQuery('form').validate({
	                          rules: {
	                              headNum: {
	                                  required: true,
	                                  stringCheck: [],
	                                  maxLengthB: [128]
	                              },
	                              headTitle: {
	                                  required: true,
	                                  maxLengthB: [128]
	                              },
	                              headSubTitle: {
	                                  required: true,
	                                  maxLengthB: [128]
	                              },
	                              headBottom: {
	                                  maxLengthB: [128]
	                              }
	                          },
	                          messages: {
	                              headNum: {
	                                  required: '编号不能为空',
	                                  maxLengthB: "编号不得超过{0}个字符"

	                              },
	                              headTitle: {
	                                  required: '文件头不能为空',
	                                  maxLengthB: "文件头不得超过{0}个字符"
	                              },
	                              headSubTitle: {
	                                  required: '简称不能为空',
	                                  maxLengthB: "简称不得超过{0}个字符"
	                              },
	                              headBottom: {
	                                  maxLengthB: "落款不得超过{0}个字符"
	                              }
	                          },
	                          submitHandler: function () {
	                              $scope.submit();
	                          }
	                      });
	                  }

	              }]);