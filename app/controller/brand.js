const chunk = require('lodash.chunk')
const Controller = require('egg').Controller

class BrandController extends Controller {
  async index () {
    const brandService = this.ctx.service.brand

    const partionId = this.ctx.service.misc.getPartionId()
    const [newList, shopList, brandWall, allCategories] = await Promise.all([
      brandService.getNewList(partionId),
      brandService.getBrandShopList(partionId),
      brandService.getBrandWall(partionId),
      this.ctx.service.misc.allCategories(partionId)
    ])

    await this.ctx.render('pages/brand-index.art', {
      page: 'brand-index',
      newList,
      shopList,
      brandWall: chunk(brandWall, 12),
      allCategories
    })
  }

  async detail() {
    const id = this.ctx.params.id

    const [detail, newGoods] = await Promise.all([
      this.ctx.service.store.getDetail(id),
      this.ctx.service.store.getNewGoods(id)
    ])

    await this.ctx.render('pages/brand-list.art', {
      page: 'brand-list',
      brandId: id,
      detail,
      newGoods: chunk(newGoods, 6)
    })
  }
}

module.exports = BrandController
