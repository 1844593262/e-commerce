const Controller = require('egg').Controller

class TermsController extends Controller {
  async index() {
    await this.ctx.render('pages/term-aboutJumax.art')
  }

  async aboutJumax() {
    await this.ctx.render('pages/term-aboutJumax.art')
  }

  async UserCommentRules() {
    await this.ctx.render('pages/term-userCommentRules.art')
  }

  async Useragreement() {
    await this.ctx.render('pages/term-Useragreement.art')
  }

  async UserPoint() {
    await this.ctx.render('pages/term-UserPoint.art')
  }

  async UserLevel() {
    await this.ctx.render('pages/term-UserLevel.art')
  }

  async afterSale() {
    await this.ctx.render('pages/term-aftersale.art')
  }

  async delivAccept() {
    await this.ctx.render('pages/term-delivAccept.art')
  }

  async paymentrefund() {
    await this.ctx.render('pages/term-paymentrefund.art')
  }

  async newvaluablebook() {
    await this.ctx.render('pages/term-newvaluablebook.art')
  }

  async CouponRule() {
    await this.ctx.render('pages/term-CouponRule.art')
  }

  async UserPrivate() {
    await this.ctx.render('pages/term-UserPrivate.art')
  }
}

module.exports = TermsController
