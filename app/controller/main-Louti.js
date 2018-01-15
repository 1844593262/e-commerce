
const Controller = require('egg').Controller

class mainLoutiController extends Controller {
  async mainLouti() {
    const data = { page: 'mainLouti' }
    await this.ctx.render('pages/mainLouti.art', data)
  }
}

module.exports = mainLoutiController
