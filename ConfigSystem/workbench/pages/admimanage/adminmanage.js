var app = getApp()
var that
var shopId
Page({

  /**
   * 页面的初始数据
   */
  data: {
    inputValue: '',
    error: ''
  },
  bindinput: function (e) {
    that = this
    this.setData({
      inputValue: e.detail.value
    })
  },
  bindButton: function () {
    if (this.data.inputValue == '') {
      this.setData({
        error: '提示：必须填写appid'
      })
    } else {
      wx.request({
        url: app.http(8070) + '/shop/query/enity?appid=' + this.data.inputValue,
        data: {},
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          if (res.data == '') {
            that.setData({
              error: '提示：没有开通商户工作台，请联系客服人员先开通'
            })
          } else {
            wx.setStorage({
              key: "shop",
              data: res.data
            })
            that.shopId = res.data.id
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
                    "shopId": that.shopId,
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
                    wx.navigateTo({
                      url: '../workbench/index?id=500'
                    })

                  }
                })
              }
            })
          }
        }
      })
    }
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '工作台'
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