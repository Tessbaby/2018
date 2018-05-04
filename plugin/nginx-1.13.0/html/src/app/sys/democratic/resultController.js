'use strict';

angular.module('app')
	.controller('demoResultController', ['$rootScope', '$scope', '$http', '$state', '$timeout',
    function ($rootScope, $scope, $http, $state, $timeout) {
        $scope.id = $state.params.id;

        $.ajax({
            url: '/iBase4J-SYS-Web/sysDeptComment/read/detail',
            type: 'put',
            data: angular.toJson({ id: $scope.id })
        }).then(function (result) {
            if (result.httpCode == 200) {
                $scope.resultList = setData(result.data);
                console.log($scope.resultList)
                // console.log($scope.resultList)
            } else {
                alertDialog(result.msg, 2);
            }
            $scope.$apply();
        })

        function setData(data) {
            if (data.titles.length > 0) {
                $scope.colspan = data.titles[0].levels.length;
            }
            // $scope.colspan = 0;
            var _data = {};
            _data.contents = data.contents;
            _data.titles = [];
            _data.levels = [];
            angular.forEach(data.titles, function (item, i) {
                _data.titles.push(item.title);
                angular.forEach(item.levels, function (value, a) {
                    _data.levels.push(value);
                })
            })
            return _data;
        }
    }])