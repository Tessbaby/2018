'use strict';

angular.module('app')
    .controller('careDetailController', ['$rootScope', '$scope', '$http', '$state',
        function ($rootScope, $scope, $http, $state) {

            var id = $state.params.id;
			$scope.title = '详情';
			console.log("id:" + id);
			getModel(id);
			function getModel(id) {
			    // 文件流转详情
			    $.ajax({
			        type: 'PUT',
			        url: '/iBase4J-SYS-Web/sysUserHeart/read/detail',
			        data: angular.toJson({ id: id })
			    }).then(function (result) {
			        $scope.loading = false;
			        if (result.httpCode == 200) {
			            $scope.record = result.data;
			           
			        } else {
			            // $scope.msg = result.msg;
			            alertDialog(result.msg, 2);
			        }
			        $scope.$apply();
			    });
			}

        }]);