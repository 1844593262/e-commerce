const Controller = require('egg').Controller

class GoodsController extends Controller {
  async detail () {
    const data = { page: 'goods-detail' }
    const id = this.ctx.params.id

    const partionId = this.ctx.service.misc.getPartionId()

    const [result, allCategories] = await Promise.all([
      this.ctx.service.goods.getDetail(id),
      this.ctx.service.misc.allCategories(partionId)
    ])

    data.result = result
    data.allCategories = allCategories

    await this.ctx.render('pages/goods-detail.art', data)
  }
}

module.exports = GoodsController
