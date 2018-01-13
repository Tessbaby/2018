// pages/active/active.js
var that
var shop
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },
  addActive: function () {
    wx.navigateTo({
      url: '../activeadd/activeadd?shopid=' + that.shop.id
    })
  },
  editActive: function (e) {
    var index = e.currentTarget.dataset.index;
    var c = this.data.content[index]
    wx.setStorage({
      key: "ativityEntity",
      data: c
    })
    wx.navigateTo({
      url: '../activeadd/activeadd?id=' + "true"
    })
  },
  delActive: function (e) {
    var index = e.currentTarget.dataset.index
    var c = this.data.content[index]
    this.data.content.splice(index, 1)
    wx.request({
      url: app.http(8096) + '/goods/activity/disable?id=' + c.id + '&shopid=' + c.shopId,
      data: '',
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData(that.data)
      }
    })
  },
  greateActive: function (e) {
    wx.showLoading({
      title: '生成红包图片',
      mask:true
    })
    var index = e.currentTarget.dataset.index
    var c = this.data.content[index]
    var data = {
      "urlImage": c.goodsImgUrls[0].url,
      "url": "https://open.weixin.qq.com/connect/oauth2/authorize?appid=" + that.shop.wxappId + "&redirect_uri=http%3A%2F%2Fapi.haochepaidui.com%2Fredpackage%2Fread&response_type=code&scope=snsapi_base&state=" +c.id+":"+c.shopId+"#wechat_redirect"
    }
    console.log(data.url)
    wx.request({
      url: app.http(9070) + '/merge/image',
      data:data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        console.log(res)
        wx.hideToast()
        var img=[res.data]
        wx.previewImage({
          urls: img 
        })
      }
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.setNavigationBarTitle({
      title: '活动管理'
    })
    wx.getStorage({
      key: 'shop',
      success: function (res) {
        that.shop = res.data
        wx.request({
          url: app.http(8096) + '/goods/activity/query?shopid=' + that.shop.id + '&page=0',
          data: '',
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            that.setData(res.data)
            console.log(res)
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
    var mynumber = this.data.number
    if (mynumber < this.data.totalPages - 1) {

      wx.request({
        url: app.http(8096) + '/goods/activity/query?shopid=' + that.shop.id + '&page=' + (mynumber + 1),
        data: '',
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          for (var f = 0; f < res.data.content.length; ++f) {
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