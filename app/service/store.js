const Service = require('egg').Service

class StoreService extends Service {
  async getDetail(id) {
    const result = await this.ctx.curlGet(`${this.config.apiBaseUrl}/store/${id}`)

    return result.data || {}
  }

  async getNewGoods(id) {
    const result = await this.ctx.curlGet(`${this.config.apiBaseUrl}/store/newGoods/${id}`)

    return result.data || {}
  }
}

module.exports = StoreService
