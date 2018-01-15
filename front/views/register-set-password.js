import { register } from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-register-setpassword',
    template: `
      <div>
        <div class="reg-setpassword-regbox">
          <ul class="reg-setpassword-cont">
            <li class="regcont-setpassword-item clearfix">
              <span class="reg-setpassword-item pull-left">设置新密码</span>
              <div class="regroup-setpassword pull-left">
                <input type="password" class="regli-setpassword-text" placeholder="输入密码" model="password">
              </div>
            </li>
            <li class="regcont-setpassword-item clearfix">
              <span class="reg-setpassword-item pull-left">再输入密码</span>
              <div class="regroup-setpassword pull-left">
                <input type="password" class="regli-setpassword-text" placeholder="输入密码" model="rePassword">
              </div>
            </li>
          </ul>
        </div>
        <div class="regbtn-sure clearfix">
          <div class="regbtn-sure-item pull-right" on-click="setPassword()">确定</div>
        </div>

        <form class="hidden js-register-password-form" method="POST" action="/regsuccess">
          <input type="hidden" name="password" value="{{ password }}">
          <input type="hidden" name="smscode" value="{{ smscode }}">
          <input type="hidden" name="cellphone" value="{{ cellphone }}">
        </form>
      </div>
    `,

    data: {
      password: '',
      rePassword: '',
      cellphone: window.__formData__.cellphone,
      smscode: window.__formData__.smscode
    },

    methods: {
      setPassword() {
        register({
          password: this.get('password'),
          cellphone: this.get('cellphone'),
          smscode: this.get('smscode')
        }).then(res => {
          $('.js-register-password-form').submit()
        })
      }
    }
  })
})
