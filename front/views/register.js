import '../boot'
import { getCaptchaImage, getSmsCode, validateSmsCode } from '../api'

new Yox({
  el: '.js-reg-box',

  template: `
    <div>
      <div class="regbox">
        <ul class="reg-cont">
          <li class="regcont-item">
            <span class="reg-lispan">手机号</span>
            <div class="regroup">
              <input type="text" class="regli-text" maxlength="11" placeholder="输入手机号" model="cellphone">
            </div>
          </li>
          <li class="regcont-item clearfix">
            <span class="reg-lispan pull-left">验证码</span>
            <div class="reg-impor-con pull-left">
              <input type="text" class="reg-impor-item pull-left" model="verifycode">
              <span class="pull-left reg-impor-item-img" on-click="setCaptcha()">
                <img src="{{ captchaUrl }}">
              </span>
            </div>
          </li>
          <li class="regcont-item">
            <span class="reg-short-mes">短信验证码</span>
            <div class="regroup">
              <input type="text" maxlength="6" class="reg-iphoe-imp" placeholder="输入验证码" model="smsCode">
              <span class="reget-ver-code" on-click="sendSmsCode()">获取验证码</span>
              <span class="reget-ver-code" style="display:none;">重获验证码(<b>90</b>s)</span>
            </div>
          </li>
        </ul>

        <form class="hidden js-register-form" method="POST" action="/setpassword">
          <input type="hidden" name="cellphone" value="{{ cellphone }}">
          <input type="hidden" name="smscode" value="{{ smsCode }}">
        </form>
      </div>
      <div class="regbtn">
        <div class="reg-con-next" on-click="goNext()"><div class="reg-btn-next">下一步</div></div>
      </div>
    </div>
  `,

  data:{
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
        validateType: 1
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
          $('.js-register-form').submit()
        } else {
          this.$alert('验证码错误')
        }
      })
    }
  }
})


