import cookies from 'js-cookie'
import '../boot'
import { login } from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-login-box',

    template: `
      <div>
        <h6 class="login-word">账号登录</h6>
        <ul class="login-cont">
          <li class="login-cont-iph">
            <span class="item-span span-alone">
                <img src="/static/image/user_icon.png"  alt="" class="login-item-img">
            </span>
            <input maxlength="11" type="text" placeholder="输入手机号码" class="logi-iphone" model="loginPhone">
          </li>
          <li class="login-cont-pas">
            <span class="item-span span-alone">
              <img src="/static/image/lock_icon.png"  alt="" class="login-item-img">
            </span>
            <input type="password" placeholder="输入密码" class="logi-password" model="password">
          </li>
        </ul>
        <div class="login-rember">
          <label class="logrem-user-name">
            <input class="logcheck" checked type="checkbox">记住我的用户名
          </label>
          <a href="/forgotpassword" class="login-forget logfr">忘记密码</a>
        </div>
        <div class="loginbtn" on-click="login()">登录</div>
        <div class="login-free-reg">
          <a href="register" class='login-free-item'>免费注册</a>
          还没有钜MAX线上商城账号?
        </div>
      </div>
  `,
    data: {
      loginPhone: process.env.NODE_ENV === 'development' ? '13129988471' : '',
      password: process.env.NODE_ENV === 'development' ? '123456' : ''
    },

    methods: {
      login() {
        let loginPhone = this.get('loginPhone')
        let password = this.get('password')

        if (!(/^1(3|4|5|7|8)\d{9}$/.test(loginPhone))) {
          this.$alert('请输入正确的手机号码')
          return false
        }

        if (!password) {
          this.$alert('请输入密码')
          return false
        }

        login({
          userName: loginPhone,
          password: password
        }).then(res => {
          if (res.code === 200 || !res.code) {
            if (process.env.NODE_ENV === 'development') {
              cookies.set('_MCH_AT', res.token)
            }

            window.location.href = '/'
          } else {
            this.$alert(res.message)
          }
        })
      }
    }

  })
})

