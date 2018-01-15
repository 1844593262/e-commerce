import '../boot'
import { getCaptchaImage, getSmsCode, validateSmsCode } from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-find-password',

    template: `
      <div>
        <div class="reg-setpassword-regbox">
          <ul class="reg-setpassword-cont">
            <li class="regcont-setpassword-item clearfix">
              <span class="reg-setpassword-item pull-left">手机号</span>
              <div class="regroup-setpassword pull-left">
                <input type="text" class="regli-setpassword-text" placeholder="输入手机号" model="cellphone">
              </div>
            </li>
            <li class="regcont-setpassword-item clearfix">
              <span class="reg-setpassword-item pull-left">验证码</span>
              <div class="regroup-setpassword pull-left">
                <input type="text" class="find-password-item pull-left" placeholder="输入验证码" model="verifycode">
                <div class="reg-setpassword-img pull-left" on-click="setCaptcha()">
                  <img src="{{ captchaUrl }}">
                </div>
              </div>
            </li>
              <li class="regcont-setpassword-item clearfix">
                <span class="reg-setpassword-item pull-left">短信验证码</span>
                <div class="regroup-setpassword pull-left">
                  <input type="text" class="find-password-item pull-left" placeholder="输入短信验证码" model="smsCode">
                  <div class="pull-left find-password-get" on-click="sendSmsCode()">获取验证码</div>
                </div>
              </li>
          </ul>
        </div>
        <div class="regbtn-sure clearfix">
          <div class="regbtn-sure-item pull-right" on-click="goNext()">下一步</div>
        </div>

        <form class="hidden js-find-password-form" method="POST" action="/forgotsetpassword">
          <input type="hidden" name="cellphone" value="{{ cellphone }}">
          <input type="hidden" name="smscode" value="{{ smsCode }}">
        </form>
      </div>
    `,

    data: {
      time: '',
      verifycode: '',
      smsCode: '',
      cellphone: '',
      captchaUrl: ''
    },

    afterMount() {
      this.setCaptcha()
    },

    methods: {
      sendSmsCode() {
        getSmsCode({
          cellphone: this.get('cellphone'),
          captcha: this.get('verifycode'),
          rand: this.get('time'),
          validateType: 2
        }).then(res => {
          if (res.result) {
            this.$alert('发送成功')
          } else if (res.status > 300) {
            this.$alert(res.data.message)
          }
        })
      },

      setCaptcha() {
        let time = new Date().getTime()

        this.set('time', time)
        this.set('captchaUrl', getCaptchaImage(time))
      },

      goNext() {
        validateSmsCode({
          cellphone: this.get('cellphone'),
          smscode: this.get('smsCode')
        }).then(res => {
          if (res.result) {
            $('.js-find-password-form').submit()
          } else {
            this.$alert('验证码错误')
          }
        })
      }
    }
  })
})
