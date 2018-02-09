const imgUrl = "http://p37vxs0ha.bkt.clouddn.com/image/";
const getImg = function(imgName){
  return imgUrl+imgName+'.png';
}
const getJsonLength = function (jsonData) {
  var jsonLength = 0;
  for (var item in jsonData) {
    jsonLength++;
  }
  return jsonLength;
}
const loading = function () {
  wx.showLoading({
    title: '加载中',
  })
}
const loadend = function () {
  setTimeout(function () {
    wx.hideLoading()
  }, 2000)
}
module.exports.getImg = getImg;
module.exports.loading = loading;
module.exports.loadend = loadend;
module.exports.getJsonLength = getJsonLength;