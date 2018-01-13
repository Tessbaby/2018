// pages/commodity/commodity.js

var that
Page({

  /**
   * 页面的初始数据
   */
  data: {
    navbar: ['正常', '下架', '查询'],
    currentTab: 0,
    date: '2016-09-01',

    commodity: [
      {
        commodityPic:"../img/lsImg/s1.jpg",
        commodityName:"别丽美特双人立式大衣柜1",
        commodityPrice:1289
      },
      {
        commodityPic: "../img/lsImg/s1.jpg",
        commodityName: "别丽美特双人立式大衣柜2",
        commodityPrice: 1289
      },
      {
        commodityPic: "../img/lsImg/s1.jpg",
        commodityName: "别丽美特双人立式大衣柜3",
        commodityPrice: 1289
      }
    ],

    commodityDowm:[
      {
        commodityPic: "../img/lsImg/s1.jpg",
        commodityName: "别丽美特双人立式大衣柜4",
        commodityPrice: 1289
      },
      {
        commodityPic: "../img/lsImg/s1.jpg",
        commodityName: "别丽美特双人立式大衣柜5",
        commodityPrice: 1289
      }
    ]
  },
  // 下架商品
  bindCoupon:function(e){
    console.log("下架");
    console.log(e);
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarTitle({
      title: '商品管理'
    })
  },

 
  //点击切换
  navbarTap: function (e) {
    // console.log(e)
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 新增跳转页面
  toUploading:function(e){
    wx.navigateTo({
      url: '../uploading/uploading',
    })
  },
  // 日期搜索
  bindDateChange: function (e) {
    console.log(e)
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      date: e.detail.value
    })
  }, 


  
})