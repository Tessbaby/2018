// pages/redpackage/redpackage.js
var redPackage = { "id": null, "payMoney": null, "shopId": "", "timeStamp": null }
var that
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: redPackage,
  redPackagePay: function () {
    console.log(that.data)
    wx.request({
      url: app.http(8070) + '/shop/redpackage/recharge',
      data: that.data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.reLaunch({
          url: '/pages/workbench/index?id=00400'
        })
      }
    })

  },
  bindMoney: function (e) {
    this.setData({
      payMoney: e.detail.value
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.setNavigationBarTitle({
      title: '红包充值'
    })
    wx.getStorage({
      key: 'shop',
      success: function (res) {
        redPackage.shopId = res.data.id
        that.setData(redPackage)
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