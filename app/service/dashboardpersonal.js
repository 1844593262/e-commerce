const Service = require('egg').Service

class PersonalCenterService extends Service {
  //个人中心所有的数据
  async  personalCenter() {
    const list = await this.ctx.curl(`${this.config.apiBaseUrl}/member/profile`, {
      dataType: 'json'
    })
    return list.data || {}
  }

  //个人中心用户余额和积分余额详细
  async  personalCenterDetail() {
    const list = await this.ctx.curl(`${this.config.apiBaseUrl}/member/accountLog?adjustType=ADD&accountType=CASH}`, {
      dataType: 'json'
    })
    return list.data || {}
  }


  //个人中心的我的浏览历史
  async personalCenterLook() {
    const list = await this.ctx.curl(`${this.config.apiBaseUrl}/member/viewHistory?viewType=GOODS}`, {
      dataType: 'json'
    })
    return list.data || {}
  }

  //订单详情
  async getOrderDetail(id) {
    const token = this.ctx.cookies.get('_MCH_AT', { signed: false });
    const data = await this.ctx.curl(`${this.config.apiBaseUrl}/order/${id}`, {
      headers: { 'token': token }
    });

    return data.data || {};
  }


}

module.exports = PersonalCenterService
