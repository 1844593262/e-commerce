const Controller = require('egg').Controller;

class SearchController extends Controller {
  async index() {
    const data = { page: 'search' }
    const query = this.ctx.query
    const params = {}
    const partionId = this.ctx.service.misc.getPartionId()
    const cateParentId = query.cate
      ? query.cate
      : 0

    const storeIds = this.ctx.queries.storeIds

    if (query.cate !== undefined) {
      params.categorySearchId = query.cate
    } else if (storeIds) {
      params.storeIds = storeIds
    } else {
      params.keywords = query.keywords || ''
    }

    params.partionId = partionId
    params.sortOrder = query.sortOrder || 'DESC'
    params.sortBy = query.sortBy || 'updateTime'
    params.minPrice = query.minPrice
    params.maxPrice = query.maxPrice

    let transmitter = [
      this.ctx.service.search.search(params),
      this.ctx.service.search.queryStoreList(partionId),
      this.ctx.service.search.queryCategory(cateParentId, partionId)
    ]

    if (params.categorySearchId) {
      transmitter.push(this.ctx.service.search.queryCategoryParentsList(params.categorySearchId))
    }

    const [result, stores, categories, categoryParentsList] = await Promise.all(transmitter)

    data.pageInitData = {
      result,
      stores,
      categories,
      storeIds: storeIds ? storeIds : [],
      categoryParentsList
    }

    await this.ctx.render('pages/search.art', data)
  }
}

module.exports = SearchController;
