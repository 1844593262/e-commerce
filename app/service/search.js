const Service = require('egg').Service

class SearchService extends Service {
  async search(params) {
    let opts = {}

    params = Object.assign(opts, params)

    const result = await this.ctx.curl(`${this.config.apiBaseUrl}/goods/search`, {
      method: 'POST',
      contentType: 'json',
      data: params,
      dataType: 'json'
    })

    return result.data.items || []
  }

  async queryStoreList(partionId = 1) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/store/list?partionId=${partionId}`)

    return list.data ? list.data : []
  }

  async queryCategory(parentId = 0, partionId = 0) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/category/findCategory?parentId=${parentId}&partionId=${partionId}`)

    return list.data ? list.data : []
  }

  async queryCategoryParentsList(id) {
    const list = await this.ctx.curlGet(`${this.config.apiBaseUrl}/category/parentsList/${id}`)

    return list.data ? list.data : []
  }
}

module.exports = SearchService
