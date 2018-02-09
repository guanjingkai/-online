var Service = require('egg').Service;
class UserService extends Service {
  // 默认不需要提供构造函数。
  // varructor(ctx) {
  //   super(ctx); 如果需要在构造函数做一些处理，一定要有这句话，才能保证后面 `this.ctx`的使用。
  //   // 就可以直接通过 this.ctx 获取 ctx 了
  //   // 还可以直接通过 this.app 获取 app 了
  // }
//   async find(uid) {
//     // 假如 我们拿到用户 id 从数据库获取用户详细信息
//     var user = await this.ctx.db.query('select * from user where uid = ?', uid);

//     // 假定这里还有一些复杂的计算，然后返回需要的信息。
//     var picture = await this.getPicture(uid);

//     return {
//       name: user.user_name,
//       age: user.age,
//       picture,
//     };
//   }

//   async getPicture(uid) {
//     var result = await this.ctx.curl(`http://photoserver/uid=${uid}`, { dataType: 'json' });
//     return result.data;
//   }
  async wechatLogin(code,appid){
    var ctx = this.ctx;
    var user_id;
    var userInfo;
    var appId = 'wx1418d3414f04f5b5';
    var secret = '1c1e5617b17b5022aecb572f2139002b';
    var result = await ctx.curl('https://api.weixin.qq.com/sns/jscode2session?APPID='+appId+'&secret='+secret+'&js_code='+code+'&grant_type=authorization_code', {
      method: 'POST',
      contentType: 'json',
      dataType: 'json',
    });
    //判断是否登录过平台
    userInfo = await this.app.mysql.get('user', { unionid: result.data.unionid });
    if(userInfo == null){
        var createUser = await this.app.mysql.insert('user', { unionid: result.data.unionid,register_time:new Date().getTime() });
        userInfo = await this.app.mysql.get('user', { unionid: result.data.unionid });
    }
    var userApp =await this.appInit(userInfo.id,appid,result.data.openid);
    var token =await this.setToken( userInfo.id);
    return {token:token,userInfo:userApp};
  }
  async appInit(user_id,appid,openid){
      //判断是登录过本app
      var userInfo;
      var userApp = await this.app.mysql.get('user_app', { openid: openid,appid: appid });
      if(userApp == null){
          var userToken = await this.app.mysql.insert('user_token', { user_id: user_id });
          var userApp = await this.app.mysql.insert('user_app', { user_id: user_id,openid: openid,appid: appid,register_time:new Date().getTime() });
      }
      if(appid == 1){
        userInfo = this.waInit(user_id);
      }
      return userInfo;
  }
  async waInit(user_id){
    var userApp = await this.app.mysql.get('wa_user', { user_id: user_id });
    if(userApp == null){
        await this.app.mysql.insert('wa_user', { user_id:user_id });
        userApp = await this.app.mysql.get('wa_user', { user_id: user_id });
    }
    return userApp;
  }
  async setToken(user_id){
    var tokenOk = 0;
    var token = this.getNum(); 
    var tokenInfo = await this.app.mysql.get('user_token', { token:token });
    if(tokenInfo == null){
        tokenOk = 1;
    }else{
        this.setToken(user_id);
    }
    var result = await this.app.mysql.query("update user_token set token = '"+token+"' , time = "+new Date().getTime()+" where user_id = "+ user_id);
    return token;
  }
  getNum(){  
    var chars = ['0','1','2','3','4','5','6','7','8','9','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z'];  
    var nums="";  
    for(var i=0;i<32;i++){  
        var id = parseInt(Math.random()*61);  
        nums+=chars[id];  
    }  
    return nums;  
  } 
}
module.exports = UserService;