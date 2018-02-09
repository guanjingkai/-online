// pages/shop/shop.js

var common = require('../../utils/common.js'); 
Page({

  /**
   * 页面的初始数据
   */
  data: {
    images: {
      headerBg: common.getImg('bg_header'),
      tableBg: common.getImg('shop_tana'),
      zhuangBg: common.getImg('shop_tenpo_sita')
    },
    loading:1,
    loadImage:0,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#73B7C4',
    })
    wx.setNavigationBarTitle({
      title: '我们的蛙 | 商店'
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