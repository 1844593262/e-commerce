const Controller = require('egg').Controller

class ClubController extends Controller {
  async shop() {
    const data = { page: 'point-shop' }
    const query = this.ctx.query
    const params = {}
    const partionId = this.ctx.service.misc.getPartionId()
    const cateParentId = query.cate
      ? query.cate
      : 0

    if (query.cate !== undefined) {
      params.categorySearchId = query.cate
    } else {
      params.keywords = query.keywords || ''
    }

    params.partionId = partionId
    params.sortOrder = query.sortOrder || 'DESC'
    params.sortBy = query.sortBy || 'updateTime'
    params.minPrice = query.minPrice
    params.maxPrice = query.maxPrice

    const [result, categories] = await Promise.all([
      this.ctx.service.club.search(params),
      this.ctx.service.club.allCategories()
    ])

    data.pageInitData = {
      result,
      categories
    }

    await this.ctx.render('pages/point-shop.art', data)
  }

  async item() {
    const data = { page: 'club-item' }
    const id = this.ctx.params.id
    const result = await this.ctx.service.club.getItemDetail(id)

    data.result = result

    await this.ctx.render('pages/club-item.art', data)
  }

  async clubpreview() {
    const data = {
      page: 'club-order-preview',
      preOrderDetail: this.ctx.request.body
    }

    await this.ctx.render('pages/club-order-preview.art', data)
  }

  async clubpay() {
    const data = {
      page: 'club-order-pay',
      id: this.ctx.params.id
    }
    await this.ctx.render('pages/club-order-pay.art', data)
  }
}

module.exports = ClubController
