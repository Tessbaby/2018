
var app = getApp()
var that
Page({
  /**
   * 页面的初始数据
   */
  data: {
    shopId: ""
  },
  bindViewTapRegist: function () {
    wx.navigateTo({
      url: '../admimanage/adminmanage'
    })
  },
  bindViewTapScanQRCode: function () {
    wx.scanCode({
      onlyFromCamera: true,
      success: (res) => {
        if (res.result.indexOf("manageuser:") >= 0) {
          wx.getStorage({
            key: 'user',
            success: function (res) {
              wx.request({
                url: app.http(8070) + '/shop/manage/add',
                data: {
                  "id": "",
                  "avatarUrl": res.data.avatarUrl,
                  "del": 0,
                  "nickName": res.data.nickName,
                  "openId": res.data.openId,
                  "shopId": that.data.shopId,
                  "timeStamp": ""
                },
                method: 'POST',
                header: {
                  'content-type': 'application/json' // 默认值
                },
                success: function (res) {
                  wx.setStorage({
                    key: "user",
                    data: {
                      avatarUrl: res.data.avatarUrl,
                      city: res.data.city,
                      country: res.data.country,
                      gender: res.data.gender,
                      id: "",
                      nickName: res.data.nickName,
                      openId: res.data.openId,
                      province: res.data.province,
                      shopId: that.shopId,
                      unionId: "",
                      isManage: true
                    }
                  })
                  that.setData({
                    isManage: true
                  })

                }
              })
            }
          })
        } else if (res.result.indexOf("coupon:") >= 0) {
          var id = res.result.substring(res.result.indexOf(":") + 1, res.result.length)
          wx.request({
            url: app.http(8093) + '/coupon/charge/chargeOff?id=' + id,
            data: {},
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {

            }
          })

        } else if (res.result.indexOf("order:") >= 0) {
          var id = res.result.substring(res.result.indexOf(":") + 1, res.result.length)
          wx.request({
            url: app.http(8096) + '/goods/activity/order/use?id=' + id,
            data: {},
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {

            }
          })
        }

      }
    })
  },
  bindViewTapQRCodeAuthor: function () {
    wx.getStorage({
      key: 'user',
      success: function (res) {
        wx.navigateTo({
          url: '../QRCode/QRCode?openid=' + res.data.openId
        })
      }
    })
  },
  bindViewTapshopset: function () {
    wx.navigateTo({
      url: '../shopset/shopset'
    })
  },
  bindViewTapcoupon: function () {
    wx.navigateTo({
      url: '../coupon/coupon'
    })
  },
  bindViewTapActove: function () {
    wx.navigateTo({
      url: '../active/active'
    })
  },
  bindViewTapAdmin: function () {
    wx.navigateTo({
      url: '../admin/admin'
    })
  },
  bindViewTapRedPackage: function () {
    wx.navigateTo({
      url: '../redpackage/redpackage'
    })
  },
  bindViewTapRedPackageList: function () {
    wx.navigateTo({
      url: '../redpackagelist/redpackagelist'
    })
  },
  bindViewTapActiveList: function () {
    wx.navigateTo({
      url: '../activelist/activelist'
    })
  },
  bindViewTapCouponList: function () {
    wx.navigateTo({
      url: '../couponlist/couponlist'
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        that.getOpenId(app.http(8066) + '/auth/sessionkey?appid=' + app.appid + '&secret=' + app.appSecret + '&js_code=' + res.code + '&grant_type=authorization_code')
      }
    })
    wx.setNavigationBarTitle({
      title: '工作台'
    })
    if (options.id == '00100') {
      wx.showToast({
        title: '发布卡券成功',
        icon: 'success',
        duration: 2000
      })
    } else if (options.id == '00200') {
      wx.showToast({
        title: '发布活动成功',
        icon: 'success',
        duration: 2000
      })
    } else if (options.id == '00300') {
      wx.showToast({
        title: '撤销员工成功',
        icon: 'success',
        duration: 2000
      })
    } else if (options.id == '00400') {
      wx.showToast({
        title: '红包充值成功',
        icon: 'success',
        duration: 2000
      })
    }
    else if (options.id == '00500') {
      that.setData({
        isManage: true,
        fristAdmin: 1
      })
      wx.showToast({
        title: '绑定成功',
        icon: 'success',
        duration: 2000
      })
    }
  },
  getOpenId: function (url) {
    wx.request({
      url: url,
      data: {},
      method: 'GET',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.sessionKey = res.data.session_key
        // 获取用户信息
        wx.getSetting({
          success: res => {
            // if (res.authSetting['scope.userInfo']) {
            // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
            wx.getUserInfo({
              success: res => {

                // 可以将 res 发送给后台解码出 unionId
                that.getUserInfo({
                  encryptedData: res.encryptedData,
                  iv: res.iv,
                  sessionKey: that.sessionKey
                })
                // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                // 所以此处加入 callback 以防止这种情况
                if (this.userInfoReadyCallback) {
                  this.userInfoReadyCallback(res)
                }
              }
            })
            //}
          }
        })
      }
    })
  },
  getUserInfo: function (info) {
    wx.request({
      url: app.http(8066) + '/auth/decode',
      data: info,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {

        var user = {
          avatarUrl: res.data.avatarUrl,
          city: res.data.city,
          country: res.data.country,
          gender: res.data.gender,
          id: "",
          nickName: res.data.nickName,
          openId: res.data.openId,
          province: res.data.province,
          shopId: that.shopId,
          unionId: ""
        }
        that.initUser(user)
      }
    })
  },
  initUser: function (data) {
    wx.setStorage({
      key: "user",
      data: data
    })
    //系统登录。每次获取数据，获取不到将自动注册，并返回user信息
    wx.request({
      url: app.http(8070) + '/shop/manage/enity?openid=' + data.openId,
      data: data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        if (res.data == "") {
          that.setData({
            isManage: false,
            fristAdmin: true
          })
        } else {
          that.setData({
            isManage: true,
            fristAdmin: false
          })
          wx.setStorage({
            key: "user",
            data: res.data
          })
          that.initShop(res.data.shopId)
        }
      }
    })
  },
  initShop: function (shopid) {
    wx.request({
      url: app.http(8070) + '/shop/query/enityShopid?shopid=' + shopid,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.setStorage({
          key: "shop",
          data: res.data
        })
        that.shopId = res.data.id
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }

})