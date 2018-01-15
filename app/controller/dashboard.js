const Controller = require('egg').Controller

class DashboardController extends Controller {
  async index() {
    const data = { page: 'dashboard' }
    await this.ctx.render('pages/dashboard.art', data)
  }

  async orderManage() {
    const data = { page: 'dashboard-ordermanage' }

    await this.ctx.render('pages/dashboard-ordermanage.art', data)
  }

  async orderManageDetail() {
    let data = { page: 'dashboard-ordermanage-detail' };
    const id = this.ctx.params.id;

    data.orderId = id;
    await this.ctx.render('pages/dashboard-ordermanage-detail.art', data)
  }

  async vipclub() {
    const data = { page: 'dashboard-vipclub' }

    await this.ctx.render('pages/dashboard-vipclub.art', data)
  }

  async collection() {
    const data = { page: 'dashboard-collection' }
    await this.ctx.render('pages/dashboard-collection.art', data)
  }

  async collectionClear() {
    await this.ctx.render('pages/dashboard-collection-clear.art')
  }

  async profile() {
    const data = { page: 'dashboard-profile' }

    await this.ctx.render('pages/dashboard-profile.art', data)
  }

  async addressManage() {
    const data = { page: 'dashboard-addressmanage' }

    await this.ctx.render('pages/dashboard-addressmanage.art', data)
  }

  async addressmanageClear() {
    await this.ctx.render('pages/dashboard-addressmanage-clear.art')
  }

  async security() {
    const data = { page: 'dashboard-security' }

    await this.ctx.render('pages/dashboard-security.art', data)
  }

  async wallet() {
    const data = { page: 'dashboard-wallet' }

    await this.ctx.render('pages/dashboard-wallet.art', data)
  }

  async coupon() {
    await this.ctx.render('pages/dashboard-coupon-center.art')
  }

  async exchange() {
    const data = { page: 'point-exchange' }

    await this.ctx.render('pages/point-exchange.art', data)
  }
}

module.exports = DashboardController
