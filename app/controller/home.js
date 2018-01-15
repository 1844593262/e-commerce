const chunk = require('lodash.chunk')
const Controller = require('egg').Controller;

class HomeController extends Controller {
  async index() {
    const data = { page: 'index' }

    const partionId = this.ctx.service.misc.getPartionId()

    const [
      recommend,
      brandList,
      reduction,
      bannercarousel,
      allCategories,
      jumaxNewgoods,
      brandWall,
      getThirdEnter,
      goodsFloor,
      goodsSuggestion
    ] = await Promise.all([
        this.ctx.service.misc.getHomeRecommend(partionId),
        this.ctx.service.brand.getHomeBrand(partionId),
        this.ctx.service.misc.getReduction(partionId),
        this.ctx.service.misc.getBannercarousel(partionId),
        this.ctx.service.misc.allCategories(partionId),
        this.ctx.service.misc.jumaxNewgoods(partionId),
        this.ctx.service.brand.getBrandWall(partionId),
        this.ctx.service.misc.getThirdEnter(partionId),
        this.ctx.service.misc.goodsFloor(partionId),
        this.ctx.service.misc.getGoodsSuggestion(partionId)
    ])

    data.recomLeft = recommend[0] ? recommend[0] : {}
    data.recombigtopimg = recommend.slice(1,3)
    data.recomsmallimg = recommend.slice(3,7)
    data.brandList = brandList
    data.brandListBanner = brandList[0] ? brandList[0] : {}
    data.brandListRemain = brandList ? brandList.slice(1, 5) : []
    data.bannercarousel = bannercarousel
    data.allCategories = allCategories
    data.thirdenter = getThirdEnter
    data.brandwall = chunk(brandWall, 15)

    // 钜惠购买
    data.reduction = reduction

    // 钜新品
    data.jumaxNewgoods = jumaxNewgoods

    // 商品
    data.goodsFloor = goodsFloor

    // 底部推荐
    data.goodsSuggestion = chunk(goodsSuggestion, 5)

    await this.ctx.render('pages/index.art', data)
  }
}

module.exports = HomeController
