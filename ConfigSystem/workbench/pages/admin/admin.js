// pages/admin/admin.js
var that
var app = getApp()
var user
var index
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  delAdmin: function (e) {
    that.index = e.currentTarget.dataset.index;
    that.user = this.data.arrayData[that.index]
   
    wx.showModal({
      title: '操作提示',
      content: '确定取消该用户权限吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.http(8070) + '/shop/manage/del?id=' + that.user.id,
            data: {},
            method: 'POST',
            header: {
              'content-type': 'application/json' // 默认值
            },
            success: function (res) {
              that.data.arrayData.splice(that.index, 1)
              that.setData({
                arrayData: that.data.arrayData
              })

            }
          })
         
        }
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.setNavigationBarTitle({
      title: '员工撤销'
    })
    wx.getStorage({
      key: 'shop',
      success: function (res) {
        wx.request({
          url: app.http(8070) + '/shop/manage/query?shopid='+res.data.id,
          data:{},
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData({
              arrayData: res.data
            })
          }
        })
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