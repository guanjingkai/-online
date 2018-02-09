'use strict';

const Controller = require('./controller');

class UserController extends Controller {
  async login() {
    const query = this.ctx.query;
    const data = await this.ctx.service.user.wechatLogin(query.code,query.appid);
    this.ctx.body = this.json(200,data);
  }
}

module.exports = UserController;
