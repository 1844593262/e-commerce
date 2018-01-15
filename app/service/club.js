const Service = require('egg').Service

class ClubService extends Service {
  async search(params) {
    let opts = {}

    params = Object.assign(opts, params)

    const result = await this.ctx.curl(`${this.config.apiClubBaseUrl}/goods/search`, {
      method: 'POST',
      contentType: 'json',
      data: params,
      dataType: 'json'
    })

    return result.data.items || []
  }

  async queryStoreList(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiClubBaseUrl}/store/list?partionId=${partionId}`)

    return list.data ? list.data : []
  }

  async queryCategory(parentId = 0, partionId = 0) {
    const list = await this.ctx.curlGet(`${this.config.apiClubBaseUrl}/category/findCategory?parentId=${parentId}&partionId=${partionId}`)

    return list.data ? list.data : []
  }

  async getCategory() {
    const list = await this.ctx.curlGet(`${this.config.apiClubBaseUrl}/category/query/twoLevelCategory`)

    return list.data ? list.data : []
  }

  async allCategories() {
    const list = await this.ctx.curlGet(`${this.config.apiClubBaseUrl}/homepage/treeCategory`)

    return list.data ? list.data.data : []
  }

  async getItemDetail(id) {
    const result = await this.ctx.curlGet(`${this.config.apiClubBaseUrl}/goods/${id}`)

    return result.data || {}
  }
}

module.exports = ClubService
