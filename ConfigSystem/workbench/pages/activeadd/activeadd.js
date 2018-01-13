var that
var shop
var app = getApp()
var isEdit
var activiteEntity = { "createTime": "", "disable": 0, "goodsImgUrls": [{ "goodsActivity": null, "id": "", "url": "" }], "goodsPrice": null, "id": "", "isDelivery": 0, "isRedPackage": 1, "redPackage": { "createTime": 0, "disable": 0, "goodsActivityId": "", "id": "", "redPackageMoney": null, "redPackageNumber": null, "shopId": "", "timeStamp": 0 }, "shopId": "", "storeNumber": null, "timeStamp": 0, "title": "" }//isRedPackage 是否发放红包。默认为不发放
var urlFileName
Page({

  /**
   * 页面的初始数据
   */
  data: activiteEntity,
  updataImg: function () {
    that.upLoad()
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
                  that.data.goodsImgUrls[0].url = that.urlFileName
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
  switch1Change: function (e) {
    if (e.detail.value) {
      this.setData({
        isDelivery: 1,
        isCheckDelivery:true
      })
    } else {
      this.setData({
        isDelivery: 0,
        isCheckDelivery: false
      })
    }

  },
  switchRedPackageChange: function (e) {
    if (e.detail.value) {
      this.setData({
        isRedPackage: 1,
        isTrue: true
      })
    } else {
      that.data.redPackage.redPackageNumber = null
      that.data.redPackage.redPackageMoney = null
      this.setData({
        isRedPackage: 0,
        redPackage: that.data.redPackage,
        isTrue: false
      })
    }
  },
  bindNumber: function (e) {
    that.data.redPackage.redPackageNumber = e.detail.value
    this.setData({
      redPackage: that.data.redPackage
    })
  },
  bindMoney: function (e) {
    this.data.redPackage.redPackageMoney = e.detail.value
    this.setData({
      redPackage: that.data.redPackage
    })
  },
  bindPrice: function (e) {
    this.setData({
      goodsPrice: e.detail.value
    })
  },
  bindStore: function (e) {
    this.setData({
      storeNumber: e.detail.value
    })
  },
  bindTitile: function (e) {
    this.setData({
      title: e.detail.value
    })
  },
  activeRelease: function () {
    if (isEdit) {
      wx.request({
        url: app.http(8096) + '/goods/activity/edit',
        data: that.data,
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.reLaunch({
            url: '/pages/workbench/index?id=00200'
          })
        }
      })
    } else {
      wx.request({
        url: app.http(8096) + '/goods/activity/add',
        data: that.data,
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {
          wx.reLaunch({
            url: '/pages/workbench/index?id=00200'
          })
        }
      })
    }


  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.setNavigationBarTitle({
      title: '添加活动'
    })
    if (options.id != null) {
      isEdit = true
   
      wx.getStorage({
        key: 'ativityEntity',
        success: function (res) {
          if (res.data.redPackage == null) {
            that.setData({
              isTrue: false,
              isChecked: false
            })
          }
          if (res.data.isDelivery==1){
            that.setData({
              isCheckDelivery: true
            })
          }else{
            that.setData({
              isCheckDelivery: false
            })
          }
          delete res.data.goodsOrder
          if (res.data.goodsImgUrls.length>0){
            var goodsImgUrls = [{ "goodsActivity": { "id": res.data.id }, "id": res.data.goodsImgUrls[0].id, "url": res.data.goodsImgUrls[0].url }]
            res.data.goodsImgUrls = goodsImgUrls
          }
          that.setData(res.data)
        }
      })
    } else {
      isEdit = false
      that.data.redPackage.shopId = options.shopid
      this.setData({
        shopId: options.shopid,
        redPackage: that.data.redPackage,
        isChecked: true,
        isTrue: true
      })
    }

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