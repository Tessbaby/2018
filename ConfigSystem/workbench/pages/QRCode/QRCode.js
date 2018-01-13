// pages/QRCode/QRCode.js
var that
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.connectSocket({
      url: app.wss(8443) + '/websockets'
    })
    wx.onSocketOpen(function (res) {
      wx.sendSocketMessage({
        data: 'manageuser:' + options.openid
      })
    })
    wx.onSocketMessage(function (res) {
      wx.navigateBack({
        delta: 1
      })
    })
    wx.request({
      url: app.http(9070) + '/qrcode?content=manageuser:' + options.openid,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          imgUrl: res.data
        })
      }
    })

    wx.setNavigationBarTitle({
      title: '二维码授权'
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