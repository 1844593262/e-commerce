const Controller = require('egg').Controller

class MainsiderController extends Controller {
  async index() {
    const data = { page: 'main-siderbar' }

    await this.ctx.render('dashboard/main-siderbar.art',data)
  }
}

module.exports = MainsiderController
