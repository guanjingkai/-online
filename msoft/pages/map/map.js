var common = require('../../utils/common.js');
Page({
  data: {
    isLoad: 0,
    latitude: 23.099994,
    longitude: 113.324520,
    images: {
      btnYard: common.getImg('icon_out_84_88'),
      btnShop: common.getImg('icon_shop_84_88'),
      btnHouse: common.getImg('icon_house_84_88')
    },
    scale: 18,
    markers: [{
      iconPath: "../../assets/img/pet/wa/wa_keshui_0.png",
      id: 0,
      latitude: 23.099994,
      longitude: 113.324520,
      width: 65,
      height: 75
    }, {
      iconPath: "../../assets/img/pet/wa/wa_keshui_0.png",
      id: 1,
      latitude: 39.923,
      longitude: 116.452,
      width: 65,
      height: 75
    }, {
      iconPath: "../../assets/img/pet/wa/wa_keshui_0.png",
      id: 2,
      latitude: 39.912,
      longitude: 116.461,
      width: 65,
      height: 75
    }, {
      iconPath: "../../assets/img/pet/wa/wa_keshui_0.png",
      id: 3,
      latitude: 39.949,
      longitude: 116.447,
      width: 65,
      height: 75
    }],
    polyline: [{
      points: [{
        longitude: 113.3245211,
        latitude: 23.10229
      }, {
        longitude: 113.324520,
        latitude: 23.21229
      }],
      color: "#FF0000DD",
      width: 2,
      dottedLine: true
    }],
  },
  onLoad: function () {
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
    setTimeout(function () {
      this.getMyLocation()
    }.bind(this), 1000)
  },
  regionchange(e) {
    console.log(e.type)
  },
  markertap(e) {
    console.log(e.markerId)
  },
  controltap(e) {
    console.log(e.controlId)
  },
  getMyLocation() {
    var _self = this;
    _self.setData({
      "markers[0].latitude": wx.getStorageSync('latitude'),
      "markers[0].longitude": wx.getStorageSync('longitude')
    });
    if (_self.data.isLoad == 0) {
      _self.setData({
        isLoad: 1,
        latitude: wx.getStorageSync('latitude'),
        longitude: wx.getStorageSync('longitude')
      });
    } else if (_self.data.isLoad == 2) {
      _self.setData({
        latitude: wx.getStorageSync('latitude'),
        longitude: wx.getStorageSync('longitude')
      });
    }
    setTimeout(function () {
      this.getMyLocation()
    }.bind(this), 1000)
  }
})