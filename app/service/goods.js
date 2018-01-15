const Service = require('egg').Service

class GoodsService extends Service {
  async getDetail(id) {
    const result = await this.ctx.curlGet(`${this.config.apiBaseUrl}/goods/${id}`)

    return result.data || {}
  }
}

module.exports = GoodsService
