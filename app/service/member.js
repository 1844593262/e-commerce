const Service = require('egg').Service

class MemeberService extends Service {
  async getProfile() {
    const list = await this.ctx.curl(`${this.config.apiBaseUrl}/member/profile`, {
      dataType: 'json'
    })
    return list.data || {}
  }

  //查询用户余额积分明细
  async getBalanInter(accountType = 'POINT') {
    const list = await this.ctx.curl(`${this.config.apiBaseUrl}/member/accountLog?accountType=${accountType}`, {
      dataType: 'json'
    })
    return list.data || {}
  }

  // //用户余额积分的增加
  // async getBalanInterAdd(adjustType = 'ADD', accountType = 'POINT')  {
  //   const list = await this.ctx.curl(`${this.config.apiBaseUrl}/member/accountLog?adjustType=${adjustType}&accountType=${accountType}`, {
  //     dataType: 'json'
  //   })
  //   return list.data || {}
  // }

  //  //用户余额积分的减少
  //  async getBalanInterReduce(adjustType = 'REDUCE', accountType = 'POINT')  {
  //   const list = await this.ctx.curl(`${this.config.apiBaseUrl}/member/accountLog?adjustType=${adjustType}&accountType=${accountType}`, {
  //     dataType: 'json'
  //   })
  //   return list.data || {}
  // }

  async getViewHistory(viewType = 'GOODS') {
    const list = await this.ctx.curl(`${this.config.apiBaseUrl}/member/viewHistory?viewType=${viewType}`, {
      dataType: 'json'
    })
    return list.data || {}
  }
}

module.exports = MemeberService
