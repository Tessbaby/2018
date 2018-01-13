// pages/coupon/coupon.js
var that
var shop
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {},
  addCoupon: function () {
    wx.navigateTo({
      url: '../couponadd/couponadd?shopid=' + that.shop.id
    })
  },
  delCoupon: function (e) {
    var index = e.currentTarget.dataset.index;
    var c = this.data.content[index]
    this.data.content.splice(index, 1)
    wx.request({
      url: app.http(8093) + '/coupon/disable?id=' + c.id,
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData(that.data)
      }
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.setNavigationBarTitle({
      title: '卡券管理'
    })
    wx.getStorage({
      key: 'shop',
      success: function (res) {
        that.shop = res.data
        wx.request({
          url: app.http(8093) + '/coupon/list?shopid=' + that.shop.id + '&page=0',
          data: '',
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            for (var i = 0; i < res.data.content.length; ++i) {
              var date = new Date(res.data.content[i].startDate)
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
              res.data.content[i].startDate = (Y + M + D)
              //---------------------------------------------------
              var date = new Date(res.data.content[i].endDate)
              var Y = date.getFullYear() + '-';
              var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
              var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
              res.data.content[i].endDate = (Y + M + D)
            }
            that.setData(res.data)
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

    var mynumber = that.data.number
    if (mynumber < that.data.totalPages - 1) {

      wx.request({
        url: app.http(8093) + '/coupon/list?shopid=' + that.shop.id + '&page=' + (mynumber + 1),
        data: '',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          for (var i = 0; i < res.data.content.length; ++i) {
            var date = new Date(res.data.content[i].startDate)
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            res.data.content[i].startDate = (Y + M + D)
            //---------------------------------------------------
            var date = new Date(res.data.content[i].endDate)
            var Y = date.getFullYear() + '-';
            var M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
            var D = date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
            res.data.content[i].endDate = (Y + M + D)
          }
           for (var f = 0; f < res.data.content.length; ++f){
            that.data.content.splice(that.data.content.length + f, 0, res.data.content[f])
           }
            
           that.data.number = res.data.number
           that.setData(that.data)
        }
      })
    }

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})