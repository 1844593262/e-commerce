import '../boot'
import md5 from 'blueimp-md5'
import {
  getMemberProfile,
  getGoToPay,
  postCartOrderPayment
} from '../api'

new Yox({
  el: '.js-shopping-cart-pay-wrapper',
  template: `
    <div class="cart-order-pay {{#if isLoading}}hidden{{/if}}">
        <div class="apply-detail-item">
            <div class="detail-item-l pull-left">
                <div class="order-amount">
                    <span class="order-amount-title">订单金额：</span>
                    <span>￥{{ currency(mountList.finalTotalAmount, 2) }}</span>
                </div>
                <div class="already-amount">
                    <span class="already-amount-title">已付金额：</span>
                    <span>￥{{ currency(mountList.paidAmount, 2) }}</span>
                </div>
                <div class="lave-apply-time">
                    <span>订单剩余支付时间</span>
                    <span class="minute-second">14</span>
                    <span>分</span>
                    <span class="minute-second">59</span>
                    <span>秒</span>
                </div>
            </div>
            <div class="detail-item-r pull-right">
                <div class="replace-pay">
                    <span>代付金额：</span>
                    <span class="replace-pay-num">￥{{ currency(mountList.finalTotalAmount-mountList.paidAmount, 2) }}</span>
                </div>
                <div class="look-order-detail">
                    <a href="/member/order/{{ orderId }}">查看订单详情> </a>
                </div>
            </div>
        </div>

        <div class="apply-usually-item">
            <div class="usually-item-title">常用支付</div>
            <div class="usually-item-content">
                <div class="lave-wallet clearfix">
                    <div class="lave-wallet-l pull-left">
                    <label class="mount-check">
                        <input type="checkbox" on-click="selectLaveWallet()">余额钱包
                    </label>
                    </div>
                    <div class="lave-wallet-r pull-left">
                        <span class="available-mount-l">可用余额</span>
                        <span class="available-mount">￥{{ currency(availableMount, 2) }}</span>
                        {{#if availableMount < (mountList.finalTotalAmount-mountList.paidAmount)}}
                        <span class="available-mount-r">（余额不足，剩下的待付款请用其他支付方式继续支付）</span>
                        {{/if}}
                    </div>

                    <div class="pull-right" style="display: none;">
                        <span>充值</span>
                    </div>
                </div>

                <ul class="bank-list" style="display: none">
                    <li class="clearfix">
                        <div class="pull-left">
                            <span>交通银行</span>
                        </div>
                        <div class="pull-left">
                            <span>信用卡</span>
                            <span>|</span>
                            <span>尾号</span>
                            （<span>0211</span>）
                            <span>|</span>
                            <span>单笔限额</span>
                            <span>4</span>
                            <span>万</span>
                        </div>
                    </li>
                </ul>

            </div>
        </div>

        <div class="apply-other-item">
            <div class="other-item-title">其他支付</div>
            <ul class="other-item-list clearfix">
                <li on-click="wechatPay()">微信支付</li>
            </ul>
            {{#if isShowLavePay}}
              <div>
                <div class="print-input-f">
                    <input
                    class="print-input"
                    type="password"
                    placeholder="输入支付密码"
                    model="password">
                    <span class="forget-pwd">
                        <a href="#">忘记支付密码？</a>
                    </span>
                </div>
                <div class="now-apply-btn" on-click="nowPay()">立即支付</div>
              </div>
            {{/if}}
        </div>

        <WchatPayModal
            model="wechatModalActive"
            title="{{ title }}"
            titleType="{{ titleType }}"
            subTitle="{{ subTitle }}">
        </WchatPayModal>
    </div>
  `,
  data: {
    isLoading: true, // 加载标识
    isShowLavePay: false, // 余额支付密码框
    mountList: {}, // 订单金额，已付金额
    availableMount: 0, // 可用余额
    orderId: window.__pageInitData__, // 订单id
    password: '', // 支付密码
    wxCodeUrl: '', // 微信付款二维码地址
    wechatModalActive: false,
    title: '微信支付',
    titleType: 'both-side',
    subTitle: {
        textLeft: '待付金额：￥',
        textRight: '1200.00'
    }
  },

  afterMount() {
    let orderId = this.get("orderId")

    Promise.all([
      getMemberProfile(), // 获取可用余额
      getGoToPay(orderId) // 获取订单金额，已付金额
    ]).then(res => {
      let [leaveMount, orderMount] = res

      let availableMount = leaveMount.cashAccount + leaveMount.presentAccount
      this.set("availableMount", availableMount)
      this.set("mountList", orderMount)
      this.set("isLoading", false)
    })
  },

  events: {

  },

  methods: {
    // 选择余额支付
    selectLaveWallet() {
      let isShowLavePay = this.get("isShowLavePay")

      this.set("isShowLavePay", !isShowLavePay)
    },

    // 余额立即支付
    nowPay() {
      let password = md5(this.get("password"))
      let orderId = this.get("orderId")

      let totalMount = this.get("mountList.finalTotalAmount") - this.get("mountList.paidAmount")

      let data = {
        "platformType": "BALANCE",
        "passwordPay": password
      }

      postCartOrderPayment(orderId, data).then(res => {
          console.log(res, res.message)
          if(res.code === "200") {
              if(res.data.flag) {
                // TODO change totalMount to orderId
                window.location.href = `/order/${totalMount}/result`
              }else {
                  this.$alert("尚有金额待支付，请选择其它支付方式")
              }
          }else {
              this.$alert(res.message)
          }
      })
    },

    // 微信支付
    wechatPay() {
      let orderId = this.get("orderId")

    //   alertMsg({
    //     content: '<div id="wxQrCodeId" style="width:200px; height:200px; margin: 100px auto 0;"></div>',
    //   })

      let data = {
         "platformType": "WECHAT"
      }
      this.set('wechatModalActive', true)

      postCartOrderPayment(orderId, data).then(res => {
        console.log(res)
        if (res.code === "200") {
          this.set("wxCodeUrl", res.data.credential.wx.code_url)
          new QRCode(document.getElementById('wxQrCodeId'), {
            text: this.get('wxCodeUrl'),
            width: 200,
            height: 200,
          })
        }
      })



    }
  }

})
