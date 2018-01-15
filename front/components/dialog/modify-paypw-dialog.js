import {
  getCaptchaImage,
  getSmsCode,
  validateSmsCode,
  modifyPayPassword
} from '../../api'

export default {
  template: `
    <Dialog model="value" title="忘记支付密码" size="large">
      <div class="update-paypassword-form-section">
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">手机号</div>
            </div>
            <div class="form-control-wrapper">
              <div class="form-control-static">{{ cellphone }}</div>
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">验证码</div>
            </div>
            <div class="form-control-wrapper">
              <div class="form-control-sm">
                <input type="text" class="form-control" model="verifycode">
              </div>
              <div class="form-control-sm">
                {{#if captchaUrl}}
                  <img src="{{ captchaUrl }}" on-click="setCaptcha()">
                {{/if}}
              </div>
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">短信验证码</div>
            </div>
            <div class="form-control-wrapper">
              <div class="form-control-sm">
                <input type="text" class="form-control" model="smsCode">
              </div>
              <div class="form-control-sm">
                <div class="btn btn-gray" on-click="sendSmsCode()">获取短信验证码</div>
              </div>
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">设置支付密码</div>
            </div>
            <div class="form-control-wrapper">
              <input type="password" class="form-control fix-width" model="password">
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">重复支付密码</div>
            </div>
            <div class="form-control-wrapper">
              <input type="password" class="form-control fix-width" model="rePassword">
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="sd-control-label">
            <div class="content"></div>
          </div>
          <div class="form-control-wrapper">
            <div class="btn btn-primary btn-large action" on-click="handleComfirm()">确认</div>
            <div class="btn btn-gray btn-large action" on-click="closeModal()">取消并返回</div>
          </div>
        </div>
      </div>
    </Dialog>
  `,

  data() {
    return {
      verifycode: '',
      time: '',
      captchaUrl: '',
      smsCode: '',
      password: '',
      rePassword: ''
    }
  },

  propTypes: {
    value: {
      type: 'boolean',
      default: false
    },

    cellphone: {
      type: 'string'
    }
  },

  watchers: {
    value(val) {
      if (val) {
        this.setCaptcha()
      }
    }
  },

  methods: {
    setCaptcha() {
      let time = new Date().getTime()

      this.set('time', time)
      this.set('captchaUrl', getCaptchaImage(time))
    },

    sendSmsCode() {
      getSmsCode({
        cellphone: this.get('cellphone'),
        captcha: this.get('verifycode'),
        rand: this.get('time'),
        validateType: 3
      }).then(res => {
        if (res.result) {
          this.$alert('发送成功')
        } else if (res.status > 300) {
          this.$alert(res.data.message)
        }
      })
    },

    handleComfirm() {
      if (!this.get('cellphone') || !this.get('verifycode') || !this.get('smsCode') || !this.get('password')) {
        this.$alert('请填写完整信息')
        return
      }

      validateSmsCode({
        cellphone: this.get('cellphone'),
        smscode: this.get('smsCode')
      }).then(res => {
        if (res.result) {
          modifyPayPassword({
            password: this.get('password'),
            smscode: this.get('smsCode')
          }).then(res => {
            console.log(res)
          }).catch(e => {
            console.log(e)
          })
        } else {
          this.$alert('验证码错误')
        }
      })
    },

    closeModal() {
      this.set('value', false)
    }
  }
}
