'use strict';

const Controller = require('egg').Controller;

class ControllerController extends Controller {
  json(code,data){
    return {
        code : code,
        data : data
    }
  }
}

module.exports = ControllerController;
