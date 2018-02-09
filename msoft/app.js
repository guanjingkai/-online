//app.js
App({
  onLaunch: function () {
    //const backgroundAudioManager = wx.getBackgroundAudioManager();
    //backgroundAudioManager.src = 'http://p37vxs0ha.bkt.clouddn.com/bgm.wav';
    //backgroundAudioManager.play();
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    this.getMyLocation();
    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
        if (res.code) {
          //发起网络请求
          wx.request({
            url: 'http://api.game.chungold.com/user/login',
            data: {
              code: res.code,
              appid:1
            }
          })
        } else {
          console.log('获取用户登录态失败！' + res.errMsg)
        }
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  getMyLocation() {
    var _self = this;
    wx.getLocation({
      type: 'gcj02',
      success: function (res) {
        console.log(res);
        wx.setStorage({
          key: "latitude",
          data: res.latitude
        })
        wx.setStorage({
          key: "longitude",
          data: res.longitude
        })

      }
    })
    setTimeout(function () {
      this.getMyLocation()
    }.bind(this), 1000);
    
  },
  globalData: {
    userInfo: null
  }
})