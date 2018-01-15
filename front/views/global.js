import cookies from 'js-cookie'
import { getMemberProfile, logout, getTopCartList, delCartSingle } from '../api'
import '../boot'

$(document).ready(function () {
  new Yox({
    el: '.js-topbar-menu',

    template: `
      <div class="top-bar-main-menu js-topbar-menu">
        <div class="menu-item dashboard {{#if isLogin}}logged{{/if}}">
          {{#if isLogin}}
            <div class="dropdown service-toggle-section">
              <div class="title">Hi, {{ profile.cellphone }} <img src="/static/image/arrow-down.png"></div>
              <ul class="dashboard-dropdown">
                <li>
                  <a href="/member"><img src="/static/image/wdmax_icon.png">我的钜MAX</a>
                </li>
                <li>
                  <a href="/member/order"><img src="/static/image/ddgl_icon.png">订单管理</a>
                </li>
                <li>
                  <a href="/member/wallet"><img src="/static/image/qb_icon.png">钱包</a>
                </li>
                <li>
                  <a href="/member/profile"><img src="/static/image/zhsz_icon.png">账号设置</a>
                </li>
                <li>
                  <a href="javascript:;" on-click="logout()"><img src="/static/image/tcdl_icon.png">退出登录</a>
                </li>
              </ul>
            </div>
          {{else}}
            <a class="active" href="/login">登录</a>
            <span class="vertical-divider"></span>
            <a href="/register">注册</a>
          {{/if}}
        </div>
        <div class="menu-item shopchart">
          <div class="title">购物车({{cartNum}})</div>
          <div class="shopchart-wrapper clearfix">
            {{#if cartData.shoppingCartInfos }}
            <div class="shopcart-list">
              {{#each cartData.shoppingCartInfos:index}}
                <div class="shopcart-list-item">
                  <a class="pic">
                    <img src="{{ this.mediaUrl }}">
                  </a>
                  <div class="content">
                    <div class="name">{{ this.goodsName }}</div>
                    <div class="price">￥{{ currency(this.sellPrice, 2) }}</div>
                    <div class="skus">
                      {{#each goodsSkuAttrList}}
                      <span class="attr-item">{{ this.attrValue }}</span>
                      {{/each}}
                    </div>
                    <div class="meta">
                      <span class="num">X{{ this.quantity }}</span>
                      <span class="action" on-click="handleDeleteCart(this.shoppingCartId, index)">删除</span>
                    </div>
                  </div>
                </div>
              {{/each}}
            </div>
            {{/if}}
            <div class="total">
            合计:
              <span class="red">￥{{ currency(cartData.totalAmount, 2) }}</span>
              <span class="btn enter-chart pull-right" href="#" on-click="enterCart()">进入购物车</span>
            </div>
          </div>
        </div>
        <div class="menu-item service">
          <div class="dropdown service-toggle-section">
            <div class="dropdown-toggle-trigger">
              客户服务
            </div>
            <ul class="dropdown-menu top-bar-dropdown">
              <li>
                <a href="/help">帮助中心</a>
              </li>
              <li>
                <a href="javascript:;" on-click="handleServer()">在线客服</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="menu-item weixin">
          <div class="title">关注钜MAX</div>
          <div class="popup">
            <img src="/static/image/wechat-qrcode.png">
          </div>
        </div>
      </div>
    `,

    data: {
      isLogin: false,
      profile: {},
      cartData: {
        shoppingCartInfos: [],
        totalQuantity: 0,
        totalAmount: 0
      }
    },

    computed: {
      cartNum() {
        return this.get('isLogin')
          ? this.get('cartData.totalQuantity')
          : 0
      }
    },

    afterMount() {
      let userToken = cookies.get('_MCH_AT')

      if (userToken) {
        getMemberProfile().then(res => {
          if (res.cellphone) {
            this.set('isLogin', true)
            this.set('profile', res)
            getTopCartList().then(res => {
              this.set('cartData', res)
            })
          }
        })
      }
    },

    methods: {
      logout() {
        logout().then(res => {
          if (res.result) {
            cookies.remove('_MCH_AT')
            window.location.href = '/'
          }
        })
      },

      handleDeleteCart(id, index) {
        delCartSingle(id).then(res => {
          if (res) {
            this.removeAt('cartData.shoppingCartInfos', index)

            if (this.get('cartData.shoppingCartInfos').length) {
              let total = this.get('cartData.shoppingCartInfos').reduce((prev, next) => {
                return prev + next.sellPrice * next.quantity
              }, 0)

              this.set('cartData.totalAmount', total)
              this.set('cartData.totalQuantity', this.get('cartData.totalQuantity') - 1)
            } else {
              this.set('cartData.totalAmount', 0)
              this.set('cartData.totalQuantity', 0)
            }
          } else {
            this.$alert('删除失败')
          }
        })
      },

      enterCart(e) {
        if (this.get('isLogin')) {
          window.location.href = '/member/cart'
        } else {
          this.$alert('请登录后再操作')
        }
      },

      handleServer() {
        ysf.open()
      }
    }
  })
})
