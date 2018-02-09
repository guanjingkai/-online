//index.js
//获取应用实例
const app = getApp()
var common = require('../../utils/common.js'); 
Page({
  data: {
    motto: 'Hello World',
    images: {
      mainBg: common.getImg('haikei_niwa_akari'),
      btnHelp: common.getImg('icon_help_84_88'),
      btnCollect: common.getImg('icon_urabeya_84_88'),
      btnBag: common.getImg('icon_item_84_88'),
      btnShop: common.getImg('icon_shop_84_88'),
      btnHouse: common.getImg('icon_house_84_88')
    },
    loading:1,
    loadImage:0,
    userInfo: {},
    hasUserInfo:'',
    sWidth:'',
    sHeight:''
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    common.loading();
    const _self = this;
    wx.getSystemInfo({
      success: function (res) {
        console.log(res.model)
        console.log(res.pixelRatio)
        console.log(res.windowWidth)
        console.log(res.windowHeight)
        console.log(res.language)
        console.log(res.version)
        console.log(res.platform)
        _self.setData({
          sWidth: res.windowWidth,
          sHeight: res.windowHeight
        })
      }
    })

    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#7FC258',
      animation: {
        duration: 400,
        timingFunc: 'easeIn'
      }
    })
    wx.setNavigationBarTitle({
      title: '旅行青蛙online'
    })
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  onReady: function () {
    console.log('首页加载完毕');
  },
  imageLoad: function (e) {
    this.setData({
      loadImage: this.data.loadImage + 1
    })
    if (this.data.loadImage < common.getJsonLength(this.data.images)){
      console.log('加载中');
    }else{
      console.log('加载完成');
      common.loadend();
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  },
  goHome: function (e) {
    wx.navigateTo({
      url: '../home/home'
    })
  },
  goShop: function (e) {
    wx.navigateTo({
      url: '../shop/shop'
    })
  },
  goMap: function (e) {
    wx.navigateTo({
      url: '../map/map'
    })
  }
})
