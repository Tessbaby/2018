'use strict';

angular.module('app')
	.controller('roleDetailController', ['$rootScope', '$scope', '$http', '$state', 
	  function ($rootScope, $scope, $http, $state) {
	      $scope.title = '详情';
	      $scope.id = Number($state.params.id);
	      getDetail();

	      function getDetail() {
	          $.ajax({
	              type: 'put',
	              dataType: 'json',
	              contentType: 'application/json;charset=UTF-8',
	              url: '/iBase4J-SYS-Web/role/read/detail',
	              data: angular.toJson({ roleid: $scope.id })
	          }).then(function (result) {
	              if (result.httpCode == 200) {
	                  $scope.roleInfo = result.data;
	                  setTrees.menuRole(result.data.menulist);
	                  setTrees.deptRole(result.data.deptlist);
	              } else {
	                  alertDialog(result.msg, 2);
	              }
	              $scope.$apply();
	          })
	      }

	      /******************************************* 菜单权限 *************************************************/
	      var setTrees = {};
	      setTrees.roleSetting = {
	          check: {
	              enable: true,
	              chkDisabledInherit: true
	          },
	          data: {
	              simpleData: {
	                  enable: true,
	                  pIdKey: 'parentId'
	              },
	              key: {
	                  name: 'menuname'
	              }
	          }
	      };
	      setTrees.menuRole = function (zNodes) {
	          var _zNodes = angular.copy(zNodes);
	          angular.forEach(_zNodes, function (item) {
	              item.checked = item.isSelected == 1 ? true : false;
	              item.chkDisabled = true;
	          })
	          //console.log(_zNodes);
	          var setting = setTrees.roleSetting;
	          setting.data.key.name = 'menuname';
	          var treeObj = $.fn.zTree.init($("#menuRole"), setting, _zNodes);
	          treeObj.expandAll(true);
	      }

	      setTrees.deptRole = function (zNodes) {
	          var _zNodes = angular.copy(zNodes);
	          angular.forEach(_zNodes, function (item) {
	              item.checked = item.isSelected == 1 ? true : false;
	              item.chkDisabled = true;

	              if (item.checked) {
	                  var id = item.id;
	                  var pId = item.parentId;
	                  angular.forEach(_zNodes, function (cItem, index) {
	                      if (cItem.parentId == id) {
	                          cItem.isSelected = 1;
	                          _zNodes[index] = cItem;
	                      }
	                  })
	              }

	          });
	          var setting = setTrees.roleSetting;
	          setting.data.key.name = 'deptName';

	          var treeObj = $.fn.zTree.init($("#deptRole"), setting, _zNodes);
	          treeObj.expandAll(true);
	      }
	      /******************************************* 菜单权限END *************************************************/

	  }])