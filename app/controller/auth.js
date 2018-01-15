const Controller = require('egg').Controller

class AuthController extends Controller {
  async login () {
    const data = { page: 'login' }
    await this.ctx.render('pages/login.art', data)
  }

  async register() {
    const data = { page: 'register' }
    await this.ctx.render('pages/register.art', data)
  }

  async setpassword() {
    const data = { page: 'register-set-password' }

    data.formData = this.ctx.request.body
    await this.ctx.render('pages/register-set-password.art', data)
  }

  async regsuccess() {
    await this.ctx.render('pages/reg-success.art')
  }

  async findpassword() {
    const data = { page: 'find-password' }

    await this.ctx.render('pages/find-password.art', data)
  }

  async findsetpassword() {
    const data = { page: 'find-set-password' }

    data.formData = this.ctx.request.body
    await this.ctx.render('pages/find-set-password.art', data)
  }

  async findpasswordsuccess() {
    await this.ctx.render('pages/find-password-sucess.art')
  }
}

module.exports = AuthController

