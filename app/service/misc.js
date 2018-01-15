const Service = require('egg').Service

class MiscService extends Service {
  getPartionId() {
    // 原取得partionId逻辑，现在写死
    // let partionId = this.ctx.cookies.get('partionId', { signed: false })
    //   ? this.ctx.cookies.get('partionId', { signed: false })
    //   : ((this.app.locals.partion && this.app.locals.partion[0])
    //     ? this.app.locals.partion[0].partionId
    //     : 134)

    this.ctx.cookies.set('partionId', 134, { signed: false, httpOnly: false })

    return 314
  }

  async getHomeRecommend(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/recommend/${partionId}`)

    return list.data ? (list.data.data ? list.data.data : []) : []
  }

  async getThirdEnter(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/enter/${partionId}`)
    return list.data ? list.data.data : []
  }

  async getReduction(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/reduction/${partionId}`)

    return list.data || []
  }

  async getBannercarousel(partionId = 1, limit = 20, offset = 0) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/slideshow?partionId=${partionId}&limit=${limit}&offset=${offset}`)

    return list.data ? list.data.items : []
  }

  async allCategories(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/treeCategory/${partionId}`)

    return list.data ? list.data.data : []
  }

  async jumaxNewgoods(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/juNew/${partionId}`)

    return list.data || []
  }

  async goodsFloor(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/goodsFloor/${partionId}`)

    return list.data ? list.data.data : []
  }

  async getGoodsSuggestion(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/homepage/suggest?partionId=${partionId}`)

    return list.data ? list.data : []
  }

  async getPartionList() {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/partion`)

    return list.data ? list.data.data : []
  }
}

module.exports = MiscService
