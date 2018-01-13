var that
var couponEntity = { "conponImgSrc": "", "couponRegulation": "", "createTime": 0, "endDate": '', "id": "", "isCoupon": 0, "shopId": "", "startDate": '', "timeStamp": 0 }
var urlFileName
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: couponEntity,
  updataImg: function () {
    that.upLoad()
  },
  checkImgExtName: function (fileName) {
    var extName
    if (fileName.indexOf(".png") > 0) {
      extName = fileName.slice(fileName.indexOf(".png"), fileName.length)
    } else if (fileName.indexOf(".jpg") > 0) {
      extName = fileName.slice(fileName.indexOf(".jpg"), fileName.length)
    } else if (fileName.indexOf(".jpeg") > 0) {
      extName = fileName.slice(fileName.indexOf(".jpeg"), fileName.length)
    } else {
      wx.showToast({
        title: '图片格式错误',
        icon: 'success',
        duration: 2000
      })
    }
    return extName
  },
  upLoad: function () {
    wx.request({
      url: app.http(9070) + '/img',
      data: {},
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        that.setData({
          signature: res.data
        })
        wx.chooseImage({
          success: function (res) {
            var fileName = that.data.signature.key + that.checkImgExtName(res.tempFilePaths[0])
            that.urlFileName = that.data.signature.url + '/' + that.data.signature.key + that.checkImgExtName(res.tempFilePaths[0])
            wx.uploadFile({
              url: that.data.signature.url,
              filePath: res.tempFilePaths[0],
              name: 'file',
              header: {
                'User-Agent': that.data.signature.UserAgent,
                'Content-Type': that.data.signature.ContentType
              },
              formData: {
                'key': fileName,
                'Content-Disposition': 'attachment;filename=' + fileName,
                'OSSAccessKeyId': that.data.signature.OSSAccessKeyId,
                'policy': that.data.signature.policy,
                'Signature': that.data.signature.Signature,
                'Content-Disposition: form-data; name="file"; filename="': fileName,
                'Content-Type: application/octet-stream': ''
              },
              success: function (res) {
                if (res.statusCode == 204) {
                  that.data.conponImgSrc = that.urlFileName
                  that.setData(that.data)
                } else {
                  wx.showToast({
                    title: '图片上传失败',
                    icon: 'success',
                    duration: 2000
                  })
                }

              }
            })
          }
        })

      }
    })
  },
  switch1Change: function (e) {
    if (e.detail.value) {
      this.setData({
        isCoupon: 0
      })
    } else {
      this.setData({
        isCoupon: 1
      })
    }
  },
  bindInput: function (e) {
    this.setData({
      couponRegulation: e.detail.value
    })
  },
  bindStartDateChange: function (e) {
    that.setData({
      startDate: e.detail.value
    })
  },
  bindEndDateChange: function (e) {
    that.setData({
      endDate: e.detail.value
    })
  },
  bindCouponRelease: function () {
    wx.request({
      url: app.http(8093) + '/coupon/add',
      data: that.data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
        wx.reLaunch({
          url: '/pages/workbench/index?id=00100'
        })
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '添加卡券'
    })
    that = this
    this.setData({
      shopId: options.shopid
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