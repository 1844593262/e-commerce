const Controller = require('egg').Controller

class CartController extends Controller {

  async cartconfirm() {
    const data = { page: 'shoppingcart-order-confirm' }
    await this.ctx.render('pages/shoppingcart-order-confirm.art', data)
  }

  async cartsubmit() {
    const data = {
      page: 'shoppingcart-order-submit',
      preOrderDetail: this.ctx.request.body
    }

    await this.ctx.render('pages/shoppingcart-order-submit.art', data)
  }

  async cartpay() {
    const data = {
      page: 'shoppingcart-order-pay',
      id: this.ctx.params.id
    }
    await this.ctx.render('pages/shoppingcart-order-pay.art', data)
  }

  async cartpaysuccess() {
    const data = {
      page: 'shoppingcart-order-paysuccess',
      mount: this.ctx.params.mount
    }
    await this.ctx.render('pages/shoppingcart-order-paysucess.art', data)
  }

}

module.exports = CartController
