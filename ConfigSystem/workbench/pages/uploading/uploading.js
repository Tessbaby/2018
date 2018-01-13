Page({
  /**
   * 页面的初始数据
   */
  data: {
    navbar1: ['基本信息', '参数设置', '商品详情'],
    currentTab1: 0,
    navbar: ['图文详情', '规格参数', '包装售后'],
    currentTab: 0,
    logo: null,
    logos:null,
    toUpImg:[
      // "../img/add.png", "../img/reduce.png"
      // { id: 0, url:"../img/add.png"},
      // { id: 1, url: "../img/reduce.png" }
    ],
    array: ['美国', '中国', '巴西', '日本'],
    index: 0,
    serviceInput: '',
    clauseInput: '',
    CommodityName: '',
    num: 1,
    PriceInput: '',
    createInput: '',
    sizeInput: "",
    num2: 0,
    numCon: 0,
    specList: [],
    subArr: []
  },
  // 跳转到参数设置
  toSetting: function () {
    this.setData({
      currentTab1: 1
    })
  },
  // 退出到administration
  toAdministration:function(){
    wx.navigateBack({
      delta:1
    })
  },
  // 跳转到基本信息
  toXin: function () {
    this.setData({
      currentTab1: 0
    })
  },
  // 跳转到商品详情
  toXiang: function () {
    this.setData({
      currentTab1: 2
    })
  },
  //点击切换商品详情
  navbarTap: function (e) {
    this.setData({
      currentTab: e.currentTarget.dataset.idx
    })
  },
  // 商品名称传输
  CommodityNameInput: function (e) {
    this.setData({
      CommodityName: e.detail.value
    })
  },
  // 调取相机或者相册
  chooseImageTap: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImage('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImage('camera')
          }
        }
      }
    })
  },
  chooseWxImage: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        console.log(res);
        _this.setData({
          logo: res.tempFilePaths[0],
        })
      }
    })
  },
  // 上传商品图片
  // 调取相机或者相册
  uploadImgs: function () {
    let _this = this;
    wx.showActionSheet({
      itemList: ['从相册中选择', '拍照'],
      itemColor: "#f7982a",
      success: function (res) {
        if (!res.cancel) {
          if (res.tapIndex == 0) {
            _this.chooseWxImages('album')
          } else if (res.tapIndex == 1) {
            _this.chooseWxImages('camera')
          }
        }
      }
    })
  },
  chooseWxImages: function (type) {
    let _this = this;
    wx.chooseImage({
      sizeType: ['original', 'compressed'],
      sourceType: [type],
      success: function (res) {
        // console.log(res);
        // console.log(res.tempFilePaths[0]);
        // console.log(_this.data.toUpImg);
        function objImgsArr(id,url) {
          this.id = id;
          this.url = url;
        };

        _this.data.toUpImg.push(new objImgsArr(0,res.tempFilePaths[0]));
        // console.log(_this.data.toUpImg);
      
        _this.setData({
          logos: res.tempFilePaths[0],
          toUpImg: _this.data.toUpImg
        })
      }
    })
  },
  bindPickerChange: function (e) {
    this.setData({
      index: e.detail.value
    })
  },
  // 删除上传图片
  delImg:function(e){
    // console.log(e);
    var toUpImg = this.data.toUpImg;
    var imgIndex = e.target.dataset.index;
    toUpImg.splice(imgIndex,1);
    this.setData({
      toUpImg: toUpImg
    })
  },
  /* 价格 */
  PriceInputBind: function (e) {
    this.setData({
      PriceInput: e.detail.value
    })
  },
  /* 创建规格(失去焦点) */
  createInputBind: function (e) {
    this.setData({
      createInput: e.detail.value
    })
  },
  /* 添加规格（按钮创建规格） */
  addSpaceList: function (e) {
    var numA = this.data.num2;
    function objSpecList(id, value, sizeList) {
      this.id = id;
      this.value = value;
      this.sizeList = sizeList;
    }
    var cb = this.data.specList;
    cb.push(new objSpecList(this.data.specList.length, "", []));
    this.data.specList[numA].value = this.data.createInput;  
    numA = numA + 1;
    this.setData({
      specList: this.data.specList,
      num2: numA
    })
  },
  /* 创建内容(失去焦点) */
  createConBind: function (e) {
    this.setData({
      sizeInput: e.detail.value
    })
  },
  /* 添加属性（按钮添加内容） */
  addSize: function (e) {
    var index = e.target.dataset.index;
    var cb2 = this.data.specList[index].sizeList;
    function objSizeList(sizeId, sizeValue) {
      this.sizeId = sizeId;
      this.sizeValue = sizeValue;
    }
    var indexSize = this.data.specList[index].sizeList.length;
    cb2.push(new objSizeList(this.data.specList[index].sizeList.length, ""));
    this.data.specList[index].sizeList[indexSize].sizeValue = this.data.sizeInput;
    this.setData({
      specList: this.data.specList
    })
  },
  // 删除规格
  delSpeBind: function (e) {
    var cb = this.data.specList;
    var ListId = e.target.dataset.index;
    var numA = this.data.num2;
    cb.splice(ListId, 1);
    numA = numA - 1;
    this.setData({
      specList: cb,
      num2: numA
    })
  },
  // 删除属性内容
  delConBind: function (e) {
    var ListId2 = e.target.dataset.index;
    var selfId = e.target.dataset.id;
    var cb2 = this.data.specList[ListId2].sizeList;
    cb2.splice(selfId, 1);
    var cb = this.data.specList;
    this.setData({
      specList: cb,
    })
  },
  /* 点击减号 */
  bindMinus: function () {
    var num = this.data.num;
    // 如果大于1时，才可以减  
    if (num > 1) {
      num--;
    }
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num <= 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 点击加号 */
  bindPlus: function () {
    var num = this.data.num;
    // 不作过多考虑自增1  
    num++;
    // 只有大于一件的时候，才能normal状态，否则disable状态  
    var minusStatus = num < 1 ? 'disabled' : 'normal';
    // 将数值与状态写回  
    this.setData({
      num: num,
      minusStatus: minusStatus
    });
  },
  /* 输入框事件 +- */
  bindManual: function (e) {
    var num = e.detail.value;
    // 将数值与状态写回  
    this.setData({
      num: num
    });
  },
  // 添加主体参数（商品详情下的规格参数）
  addSubArr:function(e){
    var cbsub = this.data.subArr;
    function objSpecList(id, value, valueParameter) {
      this.id = id;
      this.value = value;
      this.valueParameter = valueParameter;
    }
    cbsub.push(new objSpecList(this.data.subArr.length, "", ""));
    this.setData({
      subArr: cbsub
    })
  },
  // 失去焦点后
  parmBlurBind: function (e) {
    this.data.subArr[e.target.dataset.index].value = e.detail.value;
    this.setData({
      subArr: this.data.subArr
    });
  },
  // 失去焦点后右侧
  parmBlurBind2: function (e) {
    console.log(e.detail.value);
    this.data.subArr[e.target.dataset.index].valueParameter = e.detail.value;
    this.setData({
      subArr: this.data.subArr
    });
  },
  // 删除主体参数
  delBind: function (e) {
    var cb = this.data.subArr;
    var ListId = e.target.dataset.index;
    cb.splice(ListId, 1);
    this.setData({
      subArr: cb
    })
  },
  // 包装清单文本框
  listInputBind: function (e) {
    this.setData({
      listInput: e.detail.value
    })
    console.log(this.data.listInput)
  },
  // 售后服务文本框
  serviceInputBind: function (e) {
    this.setData({
      serviceInput: e.detail.value
    })
    console.log(this.data.serviceInput)
  },
  // 特别声明文本框
  clauseInputBind: function (e) {
    this.setData({
      clauseInput: e.detail.value
    })
    console.log(this.data.clauseInput)
  },
  //  最后一步（发布）
  release:function(e){
      
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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