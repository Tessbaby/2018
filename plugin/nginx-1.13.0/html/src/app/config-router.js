'use strict';

var app = angular.module('app')
	.config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
	    // 默认地址
	    $urlRouterProvider.otherwise('/access/login/');
	    // 状态配置
	    $stateProvider
          .state('main', {
              abstract: true,
              url: '',
              templateUrl: 'src/tpl/app.html'
          })
		  .state('main2', {
		      abstract: true,
		      url: '',
		      templateUrl: 'src/tpl/app2.html'
		  })
          .state('access', {
              url: '/access',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('access.login', {
              url: '/login/{returnUrl}?params',
              templateUrl: 'src/app/sys/login/login.html',
              controller: 'loginController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/login/loginController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('access.change', {
              url: '/change',
              templateUrl: 'src/app/sys/login/change.html',
              controller: 'changeController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/login/changeController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })

               // 发展党员
          .state('main.develop', {
              url: '/develop',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
            //入党申请列表
               .state('main.develop.apply', {
                   url: '/apply',
                   templateUrl: 'src/app/sys/partyApply/partyApplyList.html',
                   controller: 'partyApplyListController',
                   resolve: {
                       deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                           return uiLoad.load('src/app/sys/partyApply/partyApplyListController.js').then(function () {
                               return $ocLazyLoad.load('toaster');
                           })
                       }]
                   }
               })
              //入党申请 添加
               .state('main.develop.applyForm', {
                   url: '/applyForm/:userId',
                   templateUrl: 'src/app/sys/partyApply/partyApplyOperateList.html',
                   controller: 'partyApplyOperateListController',
                   resolve: {
                       deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                           return uiLoad.load('src/app/sys/partyApply/partyApplyOperateListController.js').then(function () {
                               return $ocLazyLoad.load('toaster');
                           })
                       }]
                   }
               })
          // 党组织管理
          .state('main.commynity', {
              url: '/commynity',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('main.commynity.info', {
              url: '/info',
              templateUrl: 'src/app/sys/organization/organize.html',
              controller: 'organizeController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/organization/organizeController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
            .state('main.commynity.import', {
                url: '/orgImport',
                templateUrl: 'src/app/sys/organization/orgImport.html',
                controller: 'orgImportController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/organization/orgImportController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })// 党组织管理详情&编辑
          .state('main.commynity.update', {
              url: '/update/{id}?params',
              templateUrl: 'src/app/sys/organization/orgAdd.html',
              controller: 'orgAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/organization/orgAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          })
          .state('main.commynity.create', {
              url: '/create',
              templateUrl: 'src/app/sys/organization/orgAdd.html',
              controller: 'orgAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/organization/orgAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          }) // 职务管理
          .state('main.commynity.duty', {
              url: '/duty',
              templateUrl: 'src/app/sys/organization/orgPosition.html',
              controller: 'orgPositionController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/organization/orgPositionController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          })

               .state('main.partyapply.form', {
                   url: '/form',
                   templateUrl: 'src/app/sys/partyApply/partyApplyOperateList.html',
                   controller: 'partyApplyOperateListController',
                   resolve: {
                       deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                           return uiLoad.load('src/app/sys/partyApply/partyApplyOperateListController.js').then(function () {
                               return $ocLazyLoad.load('toaster');
                           })
                       }]
                   }
               })
              .state('main.partyner', {
                  url: '/partyner',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })

            // 党员管理
          .state('main.partyner.list', {
              url: '/list/:type',
              templateUrl: 'src/app/sys/partyners/member.html',
              controller: 'memberController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/partyners/memberController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          })
             //党员文章模块不带树的
             .state('main.partyner.article', { //                 
                 url: '/article/:typeCode',
                 templateUrl: 'src/app/sys/article/articleList.html',
                 controller: 'articleListController',
                 resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                         return uiLoad.load('src/app/sys/article/articleListController.js').then(function () {
                             return $ocLazyLoad.load('toaster');
                         });
                     }]
                 }
                 //无违章无事故--统计结果
             })
            //党员文章模块带树
             .state('main.partyner.article2', { //                 
                 url: '/article2/:typeCode',
                 templateUrl: 'src/app/sys/article/articleList2.html',
                 controller: 'articleList2Controller',
                 resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                         return uiLoad.load('src/app/sys/article/articleList2Controller.js').then(function () {
                             return $ocLazyLoad.load('toaster');
                         });
                     }]
                 }
                 //无违章无事故--统计结果
             })
            .state('main.partyner.category', { // -分类管理
                url: '/category/:typeCode/:mId',
                templateUrl: 'src/app/sys/article/category.html',
                controller: 'categoryController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/article/categoryController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
             .state('main.partyner.category2', { // 分类管理
                 url: '/category2/:typeCode/:mId',
                 templateUrl: 'src/app/sys/article/category.html',
                 controller: 'categoryController',
                 resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                         return uiLoad.load('src/app/sys/article/categoryController.js').then(function () {
                             return $ocLazyLoad.load('toaster');
                         });
                     }]
                 }
             })
          .state('main.partyners', {
              url: '/partyners',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
              //.state('access', {
              //    url: '/access',
              //    template: '<div ui-view class="fade-in-right-big smooth"></div>'
              //})

                .state('access.orgRelationForm', {
                    url: '/orgForm/:userId/:id',
                    templateUrl: 'src/app/sys/partyners/orgRelationForm.html',
                    controller: 'orgRelationFormController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/partyners/orgRelationFormController.js').then(function () {
                                return $ocLazyLoad.load('toaster');
                            })
                        }]
                    }
                })
              .state('access.democraticForm', {
                  url: '/democraticForm/:userId/:id',
                  templateUrl: 'src/app/sys/partyners/democraticForm.html',
                  controller: 'democraticFormController',
                  resolve: {
                      deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                          return uiLoad.load('src/app/sys/partyners/democraticFormController.js').then(function () {
                              return $ocLazyLoad.load('toaster');
                          })
                      }]
                  }
              })
                 .state('access.rapInfoForm', {
                     url: '/rapInfoForm/:userId/:id',
                     templateUrl: 'src/app/sys/partyners/RAPInfoForm.html',
                     controller: 'RAPInfoFormController',
                     resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                             return uiLoad.load('src/app/sys/partyners/RAPInfoFormController.js').then(function () {
                                 return $ocLazyLoad.load('toaster');
                             })
                         }]
                     }
                 })
                 .state('access.ApplygoUp', {
                     url: '/ApplygoUp/:userId',
                     templateUrl: 'src/app/sys/partyners/ApplygoUp.html',
                     controller: 'ApplygoUpController',
                     resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                             return uiLoad.load('src/app/sys/partyners/ApplygoUpController.js').then(function () {
                                 return $ocLazyLoad.load('toaster');
                             })
                         }]
                     }
                 })
            // 党员管理添加
           //.state('main.partyners.add', {
           //    url: '/add',
           //    templateUrl: 'src/app/sys/organization/memAdd.html',
           //    controller: 'memAddController',
           //    resolve: {
           //        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
           //            return uiLoad.load('src/app/sys/organization/memAddController.js').then(function () {
           //                return $ocLazyLoad.load('toaster');
           //            })
           //        }]
           //    }
           //})
                // 党员管理修改后
          .state('main.partyners.add', {
              url: '/add/:type',
              templateUrl: 'src/app/sys/partyners/operateList.html',
              controller: 'operateListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/partyners/operateListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          })
              .state('main.partyners.test', {
                  url: '/test/:id',
                  templateUrl: 'src/app/sys/partyners/partyInfoAdd.html',
                  controller: 'partyInfoAddController',
                  resolve: {
                      deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                          return uiLoad.load('src/app/sys/partyners/partyInfoAddController.js').then(function () {
                              return $ocLazyLoad.load('toaster');
                          })
                      }]
                  }
              })
                 .state('main.partyners.import', {
                     url: '/import/:type',
                     templateUrl: 'src/app/sys/partyners/memImport.html',
                     controller: 'memImportController',
                     resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                             return uiLoad.load('src/app/sys/partyners/memImportController.js').then(function () {
                                 return $ocLazyLoad.load('toaster');
                             })
                         }]
                     }
                 })
          .state('main.partyners.update', {
              url: '/update/:type/:userId',
              templateUrl: 'src/app/sys/partyners/operateList.html',
              controller: 'operateListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/partyners/operateListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          })
                //.state('main.partyners.update', {
                //    url: '/update/{id}?param',
                //    templateUrl: 'src/app/sys/organization/memAdd.html',
                //    controller: 'memAddController',
                //    resolve: {
                //        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                //            return uiLoad.load('src/app/sys/organization/memAddController.js').then(function () {
                //                return $ocLazyLoad.load('toaster');
                //            })
                //        }]
                //    }
                //})

            // 党员管理详情
          .state('main.partyners.detail', {
              url: '/detail/{id}?param',
              templateUrl: 'src/app/sys/partyners/memDetail.html',
              controller: 'memDetailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/partyners/memDetailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          }) // 党员管理角色
          .state('main.partyners.part', {
              url: '/part/{id}?param',
              templateUrl: 'src/app/sys/partyners/memPart.html',
              controller: 'memPartController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/partyners/memPartController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          })


              .state('main.partyApply', {
                  url: '/partyApply',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              }) // 入党申请
          .state('main.partyApply.add', {
              url: '/add',
              templateUrl: 'src/app/sys/partyApply/operateList.html',
              controller: 'operateListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/partyApply/operateListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      })
                  }]
              }
          })

          .state('main.setting', { // 系统设置
              url: '/setting',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('main.setting.baseinfo', { // 系统设置 - 党委信息
              url: '/baseinfo',
              templateUrl: 'src/app/sys/setting/settingInfo.html',
              controller: 'setInfoController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/setting/settingInfoController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.setting.setInfoAdd', { // 系统设置 - 党委信息编辑
              url: '/setInfoAdd',
              templateUrl: 'src/app/sys/setting/settingInfoAdd.html',
              controller: 'setInfoAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/setting/settingInfoAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.setting.banner', { // 系统设置 - 宣传图管理
              url: '/banner',
              templateUrl: 'src/app/sys/setting/settingImage.html',
              controller: 'setImageController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/setting/settingImageController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.setting.setImageAdd', { // 系统设置 - 宣传图管理添加
              url: '/setImageAdd/{id}?param',
              templateUrl: 'src/app/sys/setting/settingImageAdd.html',
              controller: 'setImageAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/setting/settingImageAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })

          .state('main.life', { // 组织生活
              url: '/life',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('main.life.meeting', { // 组织生活 - 会议管理
              url: '/meeting',
              templateUrl: 'src/app/sys/meeting/meetingList.html',
              controller: 'meetingListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/meeting/meetingListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.life.activity', { // 组织生活 - 群团活动
              url: '/activity/{typeId}?params',
              templateUrl: 'src/app/sys/life/activity.html',
              controller: 'activityController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/life/activityController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.lifes', { // 组织生活
              url: '/lifes',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('main.lifes.meetingAdd', { // 组织生活 - 会议管理编辑
              url: '/meetingAdd/{id}?param',
              templateUrl: 'src/app/sys/meeting/meetingAdd.html',
              controller: 'meetingAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/meeting/meetingAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.lifes.meetingRecord', { // 组织生活 - 会议管理详情
              url: '/meetingRecord/{id}?param',
              templateUrl: 'src/app/sys/meeting/meetingRecord.html',
              controller: 'meetingRecordController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/meeting/meetingRecordController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.lifes.meetingDetail', { // 组织生活 - 会议管理详情
              url: '/meetingDetail/{id}?param',
              templateUrl: 'src/app/sys/meeting/meetingDetail.html',
              controller: 'meetingDetailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/meeting/meetingDetailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.lifes.activityDetail', { // 组织生活 - 群团活动详情
              url: '/activityDetail/:id/:typeId',
              templateUrl: 'src/app/sys/life/activityDetail.html',
              controller: 'activityDetailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/life/activityDetailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.lifes.activityAdd', { // 组织生活 - 群团活动添加
              url: '/activityAdd/{typeId}?params',
              templateUrl: 'src/app/sys/life/activityAdd.html',
              controller: 'activityAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/life/activityAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.lifes.activityUpdate', { // 组织生活 - 群团活动编辑
              url: '/activityUpdate/:id/:typeId',
              templateUrl: 'src/app/sys/life/activityAdd.html',
              controller: 'activityAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/life/activityAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.lifes.signList', { // 组织生活 - 群团活动 - 报名列表
              url: '/signList/:id/:typeId',
              templateUrl: 'src/app/sys/life/signList.html',
              controller: 'signListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/life/signListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.lifes.fcAdd', { // 组织生活 - 群团活动 - 活动风采
              url: '/fcAdd/:id/:typeId',
              templateUrl: 'src/app/sys/life/activityDetail.html',
              controller: 'activityDetailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/life/activityDetailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party', { // 党务办公
              url: '/party',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('main.party.notice', { // 通知公告列表
              url: '/notice',
              templateUrl: 'src/app/sys/notice/noticeList.html',
              controller: 'noticeListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/noticeListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })

          .state('main.party.noticeAdd', { // 通知公告-发布
              url: '/noticeAdd',
              templateUrl: 'src/app/sys/notice/update.html',
              controller: 'updateController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/updateController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.noticeUpdate', { // 通知公告-编辑
              url: '/noticeUpdate/{id}?params',
              templateUrl: 'src/app/sys/notice/update.html',
              controller: 'updateController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/updateController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.noticeDetail', { // 通知公告-详情
              url: '/noticeDetail/{id}?params',
              templateUrl: 'src/app/sys/notice/detail.html',
              controller: 'detailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/detailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.noticeListHead', { // 通知公告-文件头列表
              url: '/noticeListHead',
              templateUrl: 'src/app/sys/notice/listHead.html',
              controller: 'listHeadController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/listHeadController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.noticeAddHead', { // 通知公告-文件头添加
              url: '/noticeAddHead',
              templateUrl: 'src/app/sys/notice/updateHead.html',
              controller: 'updateHeadController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/updateHeadController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.noticeUpdateHead', { // 通知公告-文件头编辑
              url: '/noticeUpdateHead/{id}?params',
              templateUrl: 'src/app/sys/notice/updateHead.html',
              controller: 'updateHeadController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/updateHeadController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.noticeDetailHeda', { // 通知公告-文件头详情
              url: '/noticeDetailHeda/{id}?params',
              templateUrl: 'src/app/sys/notice/detailHead.html',
              controller: 'detailHeadController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/detailHeadController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.noticeReadList', { // 通知公告-阅读列表
              url: '/noticeReadList/:id/:title',
              templateUrl: 'src/app/sys/notice/readList.html',
              controller: 'readListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/notice/readListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
              .state('main.party.task', { // 通知公告列表
                  url: '/task',
                  templateUrl: 'src/app/sys/task/taskList.html',
                  controller: 'taskListController',
                  resolve: {
                      deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                          return uiLoad.load('src/app/sys/task/taskListController.js').then(function () {
                              return $ocLazyLoad.load('toaster');
                          });
                      }]
                  }
              })
              .state('main.party.taskForm', { // 通知公告列表
                  url: '/task/form',
                  templateUrl: 'src/app/sys/task/taskForm.html',
                  controller: 'taskFormController',
                  resolve: {
                      deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                          return uiLoad.load('src/app/sys/task/taskFormController.js').then(function () {
                              return $ocLazyLoad.load('toaster');
                          });
                      }]
                  }
              })
               .state('main.party.taskReadList', { // 通知公告-阅读列表
                   url: '/taskReadList/:id/:title',
                   templateUrl: 'src/app/sys/task/taskReadList.html',
                   controller: 'taskReadListController',
                   resolve: {
                       deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                           return uiLoad.load('src/app/sys/task/taskReadListController.js').then(function () {
                               return $ocLazyLoad.load('toaster');
                           });
                       }]
                   }
               })
                .state('main.party.taskDetail', { // 通知公告列表
                    url: '/task/detail/:id',
                    templateUrl: 'src/app/sys/task/taskDetail.html',
                    controller: 'taskDetailController',
                    resolve: {
                        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                            return uiLoad.load('src/app/sys/task/taskDetailController.js').then(function () {
                                return $ocLazyLoad.load('toaster');
                            });
                        }]
                    }
                })
          .state('main.party.files', { // 文件流转-列表
              url: '/files',
              templateUrl: 'src/app/sys/files/filesList.html',
              controller: 'filesListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/files/filesListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.filesAdd', { // 文件流转-上传文件
              url: '/filesAdd',
              templateUrl: 'src/app/sys/files/update.html',
              controller: 'updateController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/files/updateController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.filesForward', { // 文件流转-转发
              url: '/filesForward/{id}?params',
              templateUrl: 'src/app/sys/files/forward.html',
              controller: 'forwardController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/files/forwardController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.filesDetail', { // 文件流转-文件详情
              url: '/filesDetail/{id}?params',
              templateUrl: 'src/app/sys/files/detail.html',
              controller: 'detailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/files/detailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.hb', { // 计划总结-列表
              url: '/hb',
              templateUrl: 'src/app/sys/hb/hbList.html',
              controller: 'hbListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/hb/hbListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
            .state('main.party.report', { // 计划总结-列表
                url: '/report',
                templateUrl: 'src/app/sys/hb/listReport.html',
                controller: 'listReportController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/hb/listReportController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
           .state('main.party.hbAdd', { // 计划总结-上传文件
               url: '/hbAdd',
               templateUrl: 'src/app/sys/hb/update.html',
               controller: 'updateController',
               resolve: {
                   deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                       return uiLoad.load('src/app/sys/hb/updateController.js').then(function () {
                           return $ocLazyLoad.load('toaster');
                       });
                   }]
               }
           })
          .state('main.party.hbDetail', { // 计划总结-文件详情
              url: '/hbDetail/{id}?params',
              templateUrl: 'src/app/sys/hb/detail.html',
              controller: 'detailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/hb/detailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.vote', { // 选举投票-列表
              url: '/vote/{typeId}?params',
              templateUrl: 'src/app/sys/vote/voteList.html',
              controller: 'voteListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/vote/voteListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.voteAdd', { // 选举投票-添加
              url: '/voteAdd/:id/:type',
              //params:{"id":null,"type":null},
              templateUrl: 'src/app/sys/vote/update.html',
              controller: 'updateController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/vote/updateController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.party.voteDetail', { // 选举投票-详情
              url: '/voteDetail/:typeId/:id',
              templateUrl: 'src/app/sys/vote/detail.html',
              controller: 'detailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/vote/detailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
		  .state('main.article', { // 党的建设
		      url: '/article',
		      template: '<div ui-view class="fade-in-right-big smooth"></div>'
		  })
		   .state('main.article.list', { // 党的建设-列表
		       url: '/list/:typeCode',
		       templateUrl: 'src/app/sys/article/articleList.html',
		       controller: 'articleListController',
		       resolve: {
		           deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
		               return uiLoad.load('src/app/sys/article/articleListController.js').then(function () {
		                   return $ocLazyLoad.load('toaster');
		               });
		           }]
		       }
		   })
          .state('main.article.form', { // 党的建设-添加
              url: '/form/:typeCode/:id/:mId',
              templateUrl: 'src/app/sys/article/form.html',
              controller: 'formController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/article/formController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.article.detail', { // 党的建设-详情
              url: '/detail/:typeCode/:id',
              templateUrl: 'src/app/sys/article/detail.html',
              controller: 'detailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/article/detailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
		  .state('main.article.topic', { // 党的建设-专题图片
		      url: '/topic/:typeCode/:mId',
		      templateUrl: 'src/app/sys/article/topic.html',
		      controller: 'topicController',
		      resolve: {
		          deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
		              return uiLoad.load('src/app/sys/article/topicController.js').then(function () {
		                  return $ocLazyLoad.load('toaster');
		              });
		          }]
		      }
		  })
		  .state('main.article.category', { // 党的建设-分类管理
		      url: '/category/:typeCode/:mId',
		      templateUrl: 'src/app/sys/article/category.html',
		      controller: 'categoryController',
		      resolve: {
		          deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
		              return uiLoad.load('src/app/sys/article/categoryController.js').then(function () {
		                  return $ocLazyLoad.load('toaster');
		              });
		          }]
		      }
		  })
             .state('main.article.category2', { // 党的建设-分类管理
                 url: '/category2/:typeCode/:mId',
                 templateUrl: 'src/app/sys/article/category.html',
                 controller: 'categoryController',
                 resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                         return uiLoad.load('src/app/sys/article/categoryController.js').then(function () {
                             return $ocLazyLoad.load('toaster');
                         });
                     }]
                 }
             })

      .state('main.article.list2', { // 党的建设-分类管理
          url: '/list2/:typeCode',
          templateUrl: 'src/app/sys/article/articleList2.html',
          controller: 'articleList2Controller',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/article/articleList2Controller.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
      .state('main.article.form2', { // 党的建设-添加
          url: '/form2/:typeCode/:id/:mId',
          templateUrl: 'src/app/sys/article/form.html',
          controller: 'formController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/article/formController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
          .state('main.article.detail2', { // 党的建设-详情
              url: '/detail2/:typeCode/:id',
              templateUrl: 'src/app/sys/article/detail.html',
              controller: 'detailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/article/detailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
      .state('main.article.topic2', { // 党的建设-专题图片
          url: '/topic2/:typeCode/:mId',
          templateUrl: 'src/app/sys/article/topic.html',
          controller: 'topicController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/article/topicController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })

      /* 新增文章 

      .state('main.article2', { // 党的建设
          url: '/article2',
          template: '<div ui-view class="fade-in-right-big smooth"></div>'
      })
       .state('main.article2.list', { // 党的建设-列表
           url: '/list/:typeCode',
           templateUrl: 'src/app/sys/article2/articleList.html',
           controller: 'articleListController2',
           resolve: {
               deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                   return uiLoad.load('src/app/sys/article2/articleListController.js').then(function () {
                       return $ocLazyLoad.load('toaster');
                   });
               }]
           }
       })
          .state('main.article2.form', { // 党的建设-添加
              url: '/form/:typeCode/:id/:mId',
              templateUrl: 'src/app/sys/article2/form.html',
              controller: 'formController2',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/article2/formController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.article2.detail', { // 党的建设-详情
              url: '/detail/:typeCode/:id',
              templateUrl: 'src/app/sys/article2/detail.html',
              controller: 'detailController2',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/article2/detailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
      .state('main.article2.topic', { // 党的建设-专题图片
          url: '/topic/:typeCode/:mId',
          templateUrl: 'src/app/sys/article2/topic.html',
          controller: 'topicController2',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/article2/topicController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
      .state('main.article2.category', { // 党的建设-分类管理
          url: '/category/:typeCode/:mId',
          templateUrl: 'src/app/sys/article2/category.html',
          controller: 'categoryController2',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/article2/categoryController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })*/

          .state('main.roles', { // 角色管理 - 列表
              url: '/roles',
              templateUrl: 'src/app/sys/role/roleList.html',
              controller: 'roleListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/role/roleListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.role', { // 角色管理 (命名方式参考登陆后获取到的人员权限)
              url: '/role',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
          .state('main.role.detail', { // 角色管理-角色详情
              url: '/detail/{id}?params',
              templateUrl: 'src/app/sys/role/roleDetail.html',
              controller: 'roleDetailController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/role/roleDetailController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.role.query', { // 权限管理-增加角色
              url: '/query',
              templateUrl: 'src/app/sys/role/roleAdd.html',
              controller: 'roleAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/role/roleAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.role.update', { // 权限管理-编辑角色
              url: '/update/{id}?params',
              templateUrl: 'src/app/sys/role/roleAdd.html',
              controller: 'roleAddController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/role/roleAddController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }
          })
          .state('main.role.memberList', { // 权限管理-人员列表
              url: '/memberList/{id}?param',
              templateUrl: '/src/tpl/building.html'
              /*templateUrl: 'src/app/sys/role/memberList.html',
              controller: 'memberListController',
              resolve: {
                  deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                      return uiLoad.load('src/app/sys/role/memberListController.js').then(function () {
                          return $ocLazyLoad.load('toaster');
                      });
                  }]
              }*/
          })

		  // .state('main.party.comment', { // 民主评议-列表
		  //     url: '/comment',
		  //     templateUrl: '/src/tpl/building.html',
		  //     controller: 'discussListController',
    //           resolve: {
    //             deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
    //               return uiLoad.load('src/app/sys/role/memberListController.js').then(function () {
    //                 return $ocLazyLoad.load('toaster');
    //               });
    //             }]
    //           }
		  // })
		  .state('main.party.fee', { // 党费收缴-列表
		      url: '/fee',
		      templateUrl: '/src/tpl/building.html',
		      /*controller: 'memberListController',
              resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/role/memberListController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                  });
                }]
              }*/
		  })
              .state('main.bbs', { // 党员互动
                  url: '/bbs',
                  template: '<div ui-view class="fade-in-right-big smooth"></div>'
              })
              .state('main.bbs.topics', { // 数据一览-列表
                  url: '/post',
                  templateUrl: '/src/app/bbs/post/postList.html',
                  controller: 'postListController',
                  resolve: {
                      deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                          return uiLoad.load('src/app/bbs/post/postListController.js').then(function () {
                              return $ocLazyLoad.load('toaster');
                          });
                      }]
                  }
              })
                 .state('main.bbs.nids', { // 数据一览-列表
                     url: '/plate',
                     templateUrl: '/src/app/bbs/plate/plateList.html',
                     controller: 'plateListController',
                     resolve: {
                         deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                             return uiLoad.load('src/app/bbs/plate/plateListController.js').then(function () {
                                 return $ocLazyLoad.load('toaster');
                             });
                         }]
                     }
                 })
		  .state('main.system', { // 数据一览
		      url: '/system',
		      template: '<div ui-view class="fade-in-right-big smooth"></div>'
		  })
      .state('main.system.look', { // 数据一览
          url: '/system',
          template: '<div ui-view class="fade-in-right-big smooth"></div>'
      })
      .state('main.system.look.own', { // 数据一览-列表
          url: '/own',
          templateUrl: '/src/app/sys/system/look.html',
          controller: 'lookController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/system/lookController.js');
              }]
          }
      })
      .state('main.system.look.lower', { // 数据一览-列表
          url: '/lower',
          templateUrl: '/src/app/sys/system/lookLower.html',
          controller: 'lookLowerController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/system/lookLowerController.js');
              }]
          }
      })
		  .state('main.system.partyMember', { // 数据一览-列表
		      url: '/partyMember',
		      templateUrl: '/src/app/sys/system/partyMember.html',
		      controller: 'partyMemberController',
		      resolve: {
		          deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
		              return uiLoad.load('src/app/sys/system/partyMemberController.js');
		          }]
		      }
		  })
      .state('main.system.usage', { // 数据一览-列表
          url: '/usage',
          templateUrl: '/src/app/sys/system/usage.html',
          controller: 'usageController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/system/usageController.js');
              }]
          }
      })

		  .state('main.system.map', { // 党建地图-列表
		      url: '/map',
		      templateUrl: '/src/tpl/building.html',
		      /*controller: 'memberListController',
              resolve: {
                deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/role/memberListController.js').then(function () {
                    return $ocLazyLoad.load('toaster');
                  });
                }]
              }*/
		  })
      .state('main.system.partyhome', { // 数据一览-党委工作台
          url: '/partyhome',
          templateUrl: '/src/app/sys/system/partyhome.html',
          controller: 'partyhController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/system/partyhController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
      .state('main.system.branchhome', { // 数据一览-党支部工作台
          url: '/branchhome',
          templateUrl: '/src/app/sys/system/branchhome.html',
          controller: 'branchhController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/system/branchhController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
            //无违章无事故
          .state('main.faults', { //
              url: '/faults',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
              //无违章无事故--绑定管理员
            .state('main.faults.bind', { // 
                url: '/bind',
                templateUrl: '/src/app/sys/department/bindList.html',
                controller: 'bindListController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/department/bindListController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
                //无违章无事故--统计结果
            })
            //事件文章模块不带树的
             .state('main.faults.article', { //                 
                 url: '/article/:typeCode',
                 templateUrl: 'src/app/sys/article/articleList.html',
                 controller: 'articleListController',
                 resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                         return uiLoad.load('src/app/sys/article/articleListController.js').then(function () {
                             return $ocLazyLoad.load('toaster');
                         });
                     }]
                 }
                 //无违章无事故--统计结果
             })
            	  .state('main.faults.category', { // 党的建设-分类管理
            	      url: '/category/:typeCode/:mId',
            	      templateUrl: 'src/app/sys/article/category.html',
            	      controller: 'categoryController',
            	      resolve: {
            	          deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
            	              return uiLoad.load('src/app/sys/article/categoryController.js').then(function () {
            	                  return $ocLazyLoad.load('toaster');
            	              });
            	          }]
            	      }
            	  })
             .state('main.faults.category2', { // 党的建设-分类管理
                 url: '/category/:typeCode/:mId',
                 templateUrl: 'src/app/sys/article/category.html',
                 controller: 'categoryController',
                 resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                         return uiLoad.load('src/app/sys/article/categoryController.js').then(function () {
                             return $ocLazyLoad.load('toaster');
                         });
                     }]
                 }
             })
            //事件文章模块带树
             .state('main.faults.article2', { //                 
                 url: '/article2/:typeCode',
                 templateUrl: 'src/app/sys/article/articleList2.html',
                 controller: 'articleList2Controller',
                 resolve: {
                     deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                         return uiLoad.load('src/app/sys/article/articleList2Controller.js').then(function () {
                             return $ocLazyLoad.load('toaster');
                         });
                     }]
                 }
                 //无违章无事故--统计结果
             })
             //无违章无事故--列表
            .state('main.faults.list', { // 
                url: '/list',
                templateUrl: '/src/app/sys/faults/faultsList.html',
                controller: 'faultsListController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/faults/faultsListController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
                //无违章无事故--统计结果
            }).state('main.faults.report', { // 
                url: '/report',
                templateUrl: '/src/app/sys/faultsReport/faultsReport.html',
                controller: 'faultsReportController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/faultsReport/faultsReportController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
            .state('main.faults.detail', { // 
                url: '/detail/:id',
                templateUrl: '/src/app/sys/faults/faultsDetail.html',
                controller: 'faultsDetailController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/faults/faultsDetailController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
             //无违章无事故--配置
            .state('main.faults.config', { // 
                url: '/config',
                templateUrl: '/src/app/sys/faultsConfig/faultsConfig.html',
                controller: 'faultsConfigController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/faultsConfig/faultsConfigController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
          //党员关爱
          .state('main.care', { //
              url: '/care',
              template: '<div ui-view class="fade-in-right-big smooth"></div>'
          })
           //党员关爱--列表
            .state('main.care.list', { // 
                url: '/list',
                templateUrl: '/src/app/sys/care/careList.html',
                controller: 'careListController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/care/careListController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
           //党员关爱--表单
            .state('main.care.form', { // 
                url: '/form/:id',
                templateUrl: '/src/app/sys/care/careForm.html',
                controller: 'careFormController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/care/careFormController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
         //党员关爱--表单
            .state('main.care.report', { // 
                url: '/report',
                templateUrl: '/src/app/sys/care/careReport.html',
                controller: 'careReportController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/care/careReportController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
			//党员关爱--详情
            .state('main.care.detail', { // 
                url: '/detail/:id',
                templateUrl: '/src/app/sys/care/careDetail.html',
                controller: 'careDetailController',
                resolve: {
                    deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                        return uiLoad.load('src/app/sys/care/careDetailController.js').then(function () {
                            return $ocLazyLoad.load('toaster');
                        });
                    }]
                }
            })
			.state('main2.editArticle', { // 编辑器-栏目按钮
			    url: '/editArticle',
			    templateUrl: 'src/app/sys/editBtn/editArticle.html',
			    controller: 'editArticleController',
			    resolve: {
			        deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
			            return uiLoad.load('src/app/sys/editBtn/editArticleController.js').then(function () {
			                return $ocLazyLoad.load('toaster');
			            });
			        }]
			    }
			})

      // 民主评议
      // .state('main.party', { //
      //     url: '/party',
      //     template: '<div ui-view class="fade-in-right-big smooth"></div>'
      // })
      .state('main.party.comment', { // 
          url: '/comment',
          templateUrl: '/src/app/sys/democratic/list.html',
          controller: 'demoListController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/democratic/listController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
      .state('main.party.content', { // 
          url: '/content',
          templateUrl: '/src/app/sys/democratic/content.html',
          controller: 'demoContentController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/democratic/contentController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
      // .state('main.democratic.notice', { // 
      //     url: '/notice',
      //     templateUrl: '/src/app/sys/democratic/notice.html',
      //     controller: 'demoNoticeController',
      //     resolve: {
      //         deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
      //             return uiLoad.load('src/app/sys/democratic/noticeController.js').then(function () {
      //                 return $ocLazyLoad.load('toaster');
      //             });
      //         }]
      //     }
      // })
      .state('main.party.module', { // 
          url: '/module',
          templateUrl: '/src/app/sys/democratic/module.html',
          controller: 'demoModuleController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/democratic/moduleController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
      .state('main.party.result', { // 
          url: '/result/:id',
          templateUrl: '/src/app/sys/democratic/result.html',
          controller: 'demoResultController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/democratic/resultController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
      .state('main.party.memberList', { // 
          url: '/memberList',
          templateUrl: '/src/app/sys/democratic/memberList.html',
          controller: 'demoMemberListController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/democratic/memberListController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })

      .state('main.group', { // 
          url: '/group',
          templateUrl: '/src/app/sys/grouping/list.html',
          controller: 'groupListController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/grouping/listController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })
      .state('main.grouping', { //
          url: '/grouping',
          template: '<div ui-view class="fade-in-right-big smooth"></div>'
      })
      .state('main.grouping.memberList', { // 
          url: '/memberList/:id',
          templateUrl: '/src/app/sys/grouping/groupMemList.html',
          controller: 'groupMemListController',
          resolve: {
              deps: ['uiLoad', '$ocLazyLoad', function (uiLoad, $ocLazyLoad) {
                  return uiLoad.load('src/app/sys/grouping/groupMemListController.js').then(function () {
                      return $ocLazyLoad.load('toaster');
                  });
              }]
          }
      })

	}])
    .controller("navCtrl", function ($rootScope, $state) {
        $.ajax({
            type: 'GET',
            contentType: 'application/json;charset=UTF-8',
            //url : '/user/read/promission',
            url: '/iBase4J-SYS-Web/menu/read/listtree',
            success: function (result) {
                if (result.httpCode == 200) {
                    $rootScope.menuList = angular.copy(result.data);

                    // 处理菜单链接有参数时，菜单无选中样式的问题
                    angular.forEach($rootScope.menuList, function (item, index) {

                        if (item.children.length > 0) {  // 如果有子集

                            angular.forEach(item.children, function (x, i) { // 循环子集
                                if (x.permission.indexOf('(') != -1) { // 如果路径内有参数(main.life.activity({typeId: id}))
                                    x.param = {};  // 增加"参数" 字段
                                    var PI = x.permission.indexOf('(') + 1;
                                    var LI = x.permission.indexOf(')');
                                    var aParam = x.permission.substring(PI, LI);

                                    //console.log(x);
                                    var pJson = eval('(' + aParam + ')');
                                    x.param = angular.copy(pJson);
                                    //var typeId = eval('(' + aParam + ')').typeId; // 取出参数值
                                    //x.param.typeId = typeId;
                                    x.permissions = x.permission.substr(0, PI - 1);
                                }
                                item.children[i] = x;
                            })
                            $rootScope.menuList[index] = item;
                        }
                        // console.log($rootScope.menuList);

                    })
                    /* $rootScope.userInfo = {
                        userName: '谭梦稳',
                        avatar: '/res/img/avatar.png',
                    }*/
                    $rootScope.$apply();
                }
            }
        });
        $.ajax({
            type: 'GET',
            contentType: 'application/json;charset=UTF-8',
            //url : '/user/read/promission',
            url: '/iBase4J-SYS-Web/user',
            success: function (result) {
                if (result.httpCode == 200) {
                    $rootScope.userInfo = result.data;
                    $rootScope.$apply();
                }
            }
        });
    })
    .run(['$rootScope', '$state', '$stateParams', '$timeout', '$templateCache',
          function ($rootScope, $state, $stateParams, $timeout, $templateCache) {
              $rootScope.$state = $state;
              $rootScope.$stateParams = $stateParams;
              $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
                  var from = fromState.name, to = toState.name;
                  if (from && to) { // 解决 相应模块从列表进入编辑后 状态丢失问题
                      var s1 = from.substring(0, from.lastIndexOf(".")),
                          g1 = from.substring(from.lastIndexOf(".") + 1),
                          s2 = to.substring(0, to.lastIndexOf(".")),
                          g2 = to.substring(to.lastIndexOf(".") + 1);
                      if (s1 == s2) {
                          if (g1 == 'list' && (g2 == 'update' || g2 == 'view')) { //进行编辑
                              toParams['params'] = window.location.hash;
                          }
                          //返回列表
                          if ((g1 == "update" || g1 == 'view') && g2 == 'list') {
                              var h = fromParams['params'];
                              if (h) {
                                  $timeout(function () {
                                      window.location.hash = h;
                                  });
                              }
                          }
                      }
                  }
              });
          }
    ]);