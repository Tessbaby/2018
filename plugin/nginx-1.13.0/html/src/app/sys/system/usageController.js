'use strict';

angular.module('app')
	.controller('usageController', ['$rootScope', '$scope', '$http', '$state',
	 function ($rootScope, $scope, $http, $state) {
	 	$scope.title = '功能使用统计';

	 	/* 权限验证 */
	 	var permissionCode = 'main.system.look.lower';
	 	$scope.hasArticle = $.inArray(permissionCode + '.article', $rootScope.permissionList) != -1;
    $scope.hasQuestion = $.inArray(permissionCode + '.question', $rootScope.permissionList) != -1;
    $scope.hasActivity = $.inArray(permissionCode + '.activity', $rootScope.permissionList) != -1;
    $scope.hasReport = $.inArray(permissionCode + '.report', $rootScope.permissionList) != -1;
    $scope.hasStudy = $.inArray(permissionCode + '.study', $rootScope.permissionList) != -1;
    $scope.hasMeeting = $.inArray(permissionCode + '.meeting', $rootScope.permissionList) != -1;
    $scope.hasNotice = $.inArray(permissionCode + '.notice', $rootScope.permissionList) != -1;


	 	$scope.showDay = true;
	 	$scope.near1 = true;
	 	$scope.near2 = false;
	 	$scope.near3 = false;
	 	/* 没有数据的提示 */
	 	$scope.noticeNone = false;
	 	$scope.meetingNone = false;
	 	$scope.activityNone = false;
	 	$scope.studyNone = false;
	 	$scope.reportNone = false;
	 	$scope.articleNone = false;
	 	$scope.voteNone = false;

	 	$scope.param = {};

	 	var date = {}; //存储全部tab日期
		date.todayBefore = $rootScope.baseFun.calcDate(-1); // 到昨天
		date.sevenDayBefore = $rootScope.baseFun.calcDate(-8); // 最近七天
		date.fifteenDayBefore = $rootScope.baseFun.calcDate(-16); // 最近15天
		date.thirtyDayBefore = $rootScope.baseFun.calcDate(-31); // 最近30天
		date.thisMonthBefore = $rootScope.baseFun.calcMonth(-1); // 到上个月
		date.threeMonthBefore = $rootScope.baseFun.calcMonth(-3);// 最近三个月
		date.sixMonthBefore = $rootScope.baseFun.calcMonth(-6);	 // 最近六个月
		date.twelveMonthBefore = $rootScope.baseFun.calcMonth(-12);// 最近12个月

		$scope.param.startTime = date.sevenDayBefore;
		$scope.param.endTime = date.todayBefore;
		console.log(date);

		// 设置时间插件
		laydate({ // 按日查询开始时间
        elem: '#startTime',
        format: 'YYYY-MM-DD',
        max: date.todayBefore,
        choose: function (dates) {
            var bigger, thBefore;
						$scope.near1 = false;
						$scope.near2 = false;
						$scope.near3 = false;
						$scope.param.startTime = dates;
						bigger = $rootScope.baseFun.compareDate($scope.param.startTime, $scope.param.endTime); // 如果第一个大
						thBefore = $rootScope.baseFun.calcDate(90, $scope.param.startTime); // 3个月后的日期
						if (bigger) {
							layer.msg('开始时间不能大于结束时间', { icon: 2 });
							$scope.param.startTime = '';
							$('#startTime').val('');
						} else {
							bigger = $rootScope.baseFun.compareDate($scope.param.endTime, thBefore); // 如果第一个大(3个月后的日期小，则超出范围)
							if (bigger) {
								layer.msg('最多不能超过三个月', { icon: 2 });
								$scope.param.startTime = '';
								$('#startTime').val('');
							}
						}
        }
    });
    laydate({ // 按月查询开始时间
        elem: '#startTime1',
        format: 'YYYY-MM',
        type: 'month',
        max: date.thisMonthBefore,
        choose: function (dates) {
            var bigger, thBefore;
						$scope.near1 = false;
						$scope.near2 = false;
						$scope.near3 = false;
						$scope.param.startTime = dates;
						bigger = $rootScope.baseFun.compareDate($scope.param.startTime, $scope.param.endTime); // 如果第一个大
						if ($scope.param.endTime) {
							if (bigger) {
								layer.msg('开始时间不能大于结束时间', { icon: 2 });
								$scope.param.startTime = '';
								$('#startTime').val('');
							} else {
								var eYear = new Date($scope.param.endTime).getFullYear();
								var sYear = new Date($scope.param.startTime).getFullYear();
								if (eYear - sYear > 3) {
									layer.msg('最多不能超过三年', { icon: 2 });
									$scope.param.startTime = '';
									$('#startTime').val('');
							  }
							}
						}
        }
    });
    laydate({ // 按日查询结束时间
        elem: '#endTime',
        format: 'YYYY-MM-DD',
        max: date.todayBefore,
        choose: function (dates) {
            var bigger, thBefore;
						$scope.near1 = false;
						$scope.near2 = false;
						$scope.near3 = false;
						$scope.param.endTime = dates;
						bigger = $rootScope.baseFun.compareDate($scope.param.startTime, $scope.param.endTime); // 如果第一个大
						thBefore = $rootScope.baseFun.calcDate(-90, $scope.param.endTime); // 3个月前的日期
						if (bigger) {
							layer.msg('开始时间不能大于结束时间', { icon: 2 });
							$scope.param.endTime = '';
							$('#endTime').val('');
						} else {
							bigger = $rootScope.baseFun.compareDate(thBefore, $scope.param.startTime); // 如果第一个大(3个月后的日期小，则超出范围)
							if (bigger) {
								layer.msg('最多不能超过三个月', { icon: 2 });
								$scope.param.endTime = '';
								$('#endTime').val('');
							}
						}
        }
    });
    laydate({ // 按月查询结束时间
        elem: '#endTime1',
        format: 'YYYY-MM',
        type: 'month',
        max: date.thisMonthBefore,
        choose: function (dates) {
        		var bigger, thBefore;
						$scope.near1 = false;
						$scope.near2 = false;
						$scope.near3 = false;
						$scope.param.endTime = dates;
            bigger = $rootScope.baseFun.compareDate($scope.param.startTime, $scope.param.endTime); // 如果第一个大
						if ($scope.param.endTime) {
							if (bigger) {
								layer.msg('开始时间不能大于结束时间', { icon: 2 });
								$scope.param.endTime = '';
								$('#endTime1').val('');
							} else {
								var eYear = new Date($scope.param.endTime).getFullYear();
								var sYear = new Date($scope.param.startTime).getFullYear();
								if (eYear - sYear > 3) {
									layer.msg('最多不能超过三年', { icon: 2 });
									$scope.param.endTime = '';
									$('#endTime1').val('');
								}
							}
						}
        }
    });

    var notice = echarts.init(document.getElementById('noticeCount'));
    var meeting = echarts.init(document.getElementById('meetingCount'));
    var vote = echarts.init(document.getElementById('vote'));
    var study = echarts.init(document.getElementById('study'));
    var report = echarts.init(document.getElementById('report'));
    var article = echarts.init(document.getElementById('article'));
    var activity = echarts.init(document.getElementById('activity'));
    var noticeOption, meetingOption, studyOption, reportOption, articleOption, voteOption, activityOption;
	 	var base = {};
	 	base.pieOption = {
	 		title: {
        text: '',
        left: '30',
        top: '10'
      },
			tooltip: {
				show: true,
				formatter: "{b} : {c} ({d}%)"
			},
			legend: {
				top: '20%',
				right: '10',
				orient: 'vertical',
				formatter: '{name}',
				data: []
			},
			series: [{
				type: 'pie',
				radius: '55%',
				center: ['30%', '50%'],
				legendHoverLink: false,
				hoverAnimation: false,
				selectedMode: 'single',
				label: {
					normal: {
						show: false,
					}
				},
				data: []
			}]
	 	};
	 	base.barOption = {
			title: {
				text: '',
				left: '30',
				top: '10'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: { // 坐标轴指示器，坐标轴触发有效
					type: 'shadow' // 默认为直线，可选为：'line' | 'shadow'
				},
				formatter: '{a}<br> {b}: {c} 人'
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: [{
				type: 'category',
				data: [/*'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'*/],
				axisTick: {
					alignWithLabel: true
				}
			}],
			yAxis: [{
				type: 'value'
			}],
			series: [{
				name: '党员新增',
				type: 'bar',
				barWidth: '60%',
				data: [/*10, 52, 200, 334, 390, 330, 220*/]
			}]
	 	};
	 	base.rowBarOption = {
			title: {
				text: '',
				left: '30',
				top: '10'
			},
			tooltip: {
				trigger: 'axis',
				axisPointer: {
					type: 'shadow'
				}
			},
			legend: {
				show: false
			},
			grid: {
				left: '3%',
				right: '4%',
				bottom: '3%',
				containLabel: true
			},
			xAxis: {
				type: 'value',
				boundaryGap: [0, 0.01]
			},
			yAxis: {
				type: 'category',
				data: [/* "第三党支部", "第四党支部", "第一党小组", "妇联党支部"*/]
			},
			series: [{
				name: '活动统计',
				type: 'bar',
				data: [/*18203, 23489, 29034, 104970, 131744, 630230, 131744, 630230*/]
			}]
	 	};

	 	base.getData = function () {
	 		$.ajax({ // 党员情况统计
	      url: '/iBase4J-SYS-Web/count/getModelLower',
	      type: 'get',
	      contentType: 'application/json;charset=UTF-8',
	      data: $scope.param
	    }).then(function (result) {
	      if (result.httpCode == 200) {
	      	var _data = result.data;
	      	if (_data.notice) { // 通知公告
	      		noticeOption = angular.copy(base.pieOption);
	      		noticeOption.title.text = '通知公告统计';
            noticeOption.legend.data = _data.notice.legend;
            noticeOption.series[0].data = _data.notice.series;
            notice.setOption(noticeOption);
	      	} else {
	      		$scope.noticeNone = true;
	      	}
	      	if (_data.meeting) { // 会议统计
	      		meetingOption = angular.copy(base.pieOption);
	      		meetingOption.title.text = '通知公告统计';
            meetingOption.legend.data = _data.meeting.legend;
            meetingOption.series[0].data = _data.meeting.series;
            meeting.setOption(meetingOption);
	      	} else {
	      		$scope.meetingNone = true;
	      	}

	      	/* 柱状图 */
	      	if (_data.study) { // 学分统计
	      		studyOption = angular.copy(base.barOption);
	      		studyOption.title.text = '学分统计';
	      		studyOption.xAxis[0].data = _data.study.xAxis;
	      		studyOption.series[0].data = _data.study.series;
            study.setOption(studyOption);
	      	} else {
	      		$scope.studyNone = true;
	      	}
	      	if (_data.report) { // 计划总结
	      		reportOption = angular.copy(base.barOption);
	      		reportOption.title.text = '计划总结';
	      		reportOption.xAxis[0].data = _data.report.xAxis;
            reportOption.series[0].data = _data.report.series;
            report.setOption(reportOption);
	      	} else {
	      		$scope.reportNone = true;
	      	}
	      	if (_data.article) { // 文章数量统计
	      		articleOption = angular.copy(base.barOption);
	      		articleOption.title.text = '文章数量统计';
            articleOption.xAxis[0].data = _data.article.xAxis;
            articleOption.series[0].data = _data.article.series;
            article.setOption(articleOption);
	      	} else {
	      		$scope.articleNone = true;
	      	}
	      	if (_data.question) { // 投票统计
	      		voteOption = angular.copy(base.barOption);
	      		voteOption.title.text = '投票统计';
            voteOption.xAxis[0].data = _data.question.xAxis;
            voteOption.series[0].data = _data.question.series;
            vote.setOption(voteOption);
	      	} else {
	      		$scope.voteNone = true;
	      	}

	      	/* rowBar */
	      	if (_data.activity) { // 活动统计
	      		activityOption = angular.copy(base.rowBarOption);
	      		activityOption.title.text = '活动统计';
            activityOption.yAxis.data = _data.activity.xAxis;
            activityOption.series[0].data = _data.activity.series;
            activity.setOption(activityOption);
	      	} else {
	      		$scope.activityNone = true;
	      	}
	      } else {
	      	layer.alert(result.msg, { icon: 2 });
	      }
	      $scope.$apply();
      })
    };

    base.getData();

	 	/* 日期选择 */
	 	// tab切换
	 	$scope.changeTab = function (val) {
 			$scope.near1 = true; //切换时默认为第一个
			$scope.near2 = false;
			$scope.near3 = false;

			if (val == 1) { // 按日查询
				$scope.showDay = true;
				$scope.param.startTime = date.sevenDayBefore;
				$scope.param.endTime = date.todayBefore;
			} else { // 按月查询
				$scope.showDay = false;
				$scope.param.startTime = date.threeMonthBefore;
				$scope.param.endTime = date.thisMonthBefore;
			}
		 	base.getData();
	 	}
	 	/* 切换按条件选择 */
		$scope.changeNear = function (val) {
			if (val == 1) { //按七天、三个月
				$scope.near1 = true;
				$scope.near2 = false;
				$scope.near3 = false;
				$scope.param.startTime = $scope.showDay ? date.sevenDayBefore : date.threeMonthBefore;
			} else if (val == 2) { // 按15天、6个月
				$scope.near1 = false;
				$scope.near2 = true;
				$scope.near3 = false;
				$scope.param.startTime = $scope.showDay ? date.fifteenDayBefore : date.sixMonthBefore;
			} else { // 按30天、12个月
				$scope.near1 = false;
				$scope.near2 = false;
				$scope.near3 = true;
				$scope.param.startTime = $scope.showDay ? date.thirtyDayBefore : date.twelveMonthBefore;
			}
			base.getData();
		}

		/* 查询 */
		$scope.search = function () {
			base.getData();
		}
	 }])