const Service = require('egg').Service

class CartListService extends Service {
  async getList(id) {
    const result = await this.ctx.curl(`${this.config.apiBaseUrl}/shoppingCart`, {
      dataType: 'json'
    })

    return result.data || {}
  }
}

module.exports = CartListService
