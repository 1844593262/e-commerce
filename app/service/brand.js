const Service = require('egg').Service

class BrandService extends Service {
  async getNewList(partionId = 1, limit = 3, offset = 0) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/store?partionId=${partionId}&limit=${limit}&offset=${offset}`)

    return list.data ? list.data.items : []

  }

  async getBrandShopList(partionId = 1, offset = 0) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/store?partionId=${partionId}&offset=${offset}`)

    return list.data ? list.data.items : []
  }

  async getBrandWall(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/brandWall/${partionId}`)

    return list.data ? list.data.data : []
  }

  async getHomeBrand(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/brand/${partionId}`)

    return list.data ? list.data.data : []
  }
}

module.exports = BrandService
