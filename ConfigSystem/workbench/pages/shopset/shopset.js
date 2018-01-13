var app = getApp()
var shop = {}
var that
var latitude
var longitude
var urlFileName
var logoOrSlideshow
Page({
  data: {
    markers: []
  },
  updataLogo: function () {
    logoOrSlideshow = true
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
                  if (logoOrSlideshow) {
                    var obj = {
                      id: that.data.id,
                      url: that.urlFileName
                    }
                    wx.request({
                      url: app.http(8070) + '/shop/upload/logo',
                      data: obj,
                      method: 'POST',
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res) {
                        that.data.logo = that.urlFileName
                        that.setData(that.data)
                        wx.setStorage({
                          key: "shop",
                          data: that.data
                        })
                      }
                    })

                  } else {
                    var obj = {
                      id: that.data.id,
                      url: that.urlFileName
                    }
                    wx.request({
                      url: app.http(8070) + '/shop/upload/sliedshow',
                      data: obj,
                      method: 'POST',
                      header: {
                        'content-type': 'application/json' // 默认值
                      },
                      success: function (res) {
                        var img = {
                          id: null,
                          shopId: that.data.id,
                          uploadImgSrc: that.urlFileName
                        }
                        that.data.list.splice(that.data.list.length, 0, img)
                        that.setData(that.data)
                        wx.setStorage({
                          key: "shop",
                          data: that.data
                        })
                      }
                    })
                  }
                  // that.setData(that.data)
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
  getaddress: function () {
    wx.chooseAddress({
      success: function (res) {
        that.data.cityName = res.cityName
        that.data.provinceName = res.provinceName
        that.data.countyName = res.countyName
        that.data.shopAddress = res.detailInfo
        that.data.phone = res.telNumber
        that.setData(that.data)
        wx.request({
          url: app.http(8070) + '/shop/edit/address?id=' + that.data.id,
          data: that.data,
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {

          }
        })
      }
    })

  },
  updataSlideshow: function () {
    logoOrSlideshow = false
    that.upLoad()
  },
  delSlideshow: function () {
    length = this.data.list.length

    if (length >= 0) {
      var obj = this.data.list[length - 1]
      this.data.list.splice(length - 1, length)
      this.setData(this.data)
      wx.request({
        url: app.http(8070) + '/shop/upload/sliedshow/del?id=' + obj.id + "&shopid=" + obj.shopId,
        data: that.data,
        method: 'POST',
        header: {
          'content-type': 'application/json' // 默认值
        },
        success: function (res) {

        }
      })
    }
  },
  setMap: function () {
    wx.chooseLocation({
      success: function (res) {
        var latitude = res.latitude
        var longitude = res.longitude
        var temMap = {
          iconPath: "/pages/img/map.png",
          id: 0,
          latitude: latitude,
          longitude: longitude,
          width: 30,
          height: 30

        }
        var markers = []
        markers[0] = temMap
        that.data.latitude = latitude
        that.data.longitude = longitude
        that.setData({
          latitude: latitude,
          longitude: longitude,
          markers: markers
        })
        wx.setStorage({
          key: "shop",
          data: that.data
        })
        wx.request({
          url: app.http(8070) + '/shop/edit/loaction?latitude=' + latitude + '&longitude=' + longitude + "&shopid=" + that.data.id,
          data: {},
          method: 'POST',
          header: {
            'content-type': 'application/json' // 默认值
          },
          success: function (res) {
            console.log(res)
          }
        })
      }
    })
  },
  releaseShopName: function (e) {
    that.setData({
      shopName: e.detail.value
    })
    wx.setStorage({
      key: "shop",
      data: that.data
    })
    wx.request({
      url: app.http(8070) + '/shop/edit',
      data: that.data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      }
    })
  },
  releasePhone: function (e) {
    that.setData({
      phone: e.detail.value
    })
    wx.setStorage({
      key: "shop",
      data: that.data
    })
    wx.request({
      url: app.http(8070) + '/shop/edit',
      data: that.data,
      method: 'POST',
      header: {
        'content-type': 'application/json' // 默认值
      },
      success: function (res) {
      }
    })
  },
  /*
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    that = this
    wx.getStorage({
      key: 'shop',
      success: function (res) {
        that.setData(res.data)
        shop = res.data
      },
    })
    wx.setNavigationBarTitle({
      title: '店面设置'
    })

    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        var temMap = {
          iconPath: "/pages/img/map.png",
          id: 0,
          latitude: that.data.latitude,
          longitude: that.data.longitude,
          width: 30,
          height: 30

        }
        var markers = []
        markers[0] = temMap
        that.setData({
          markers: markers
        })
      }
     
    })
    console.log(that.data)
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