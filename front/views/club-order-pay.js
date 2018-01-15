import '../boot'
import md5 from 'blueimp-md5'
import {
  getClubMemberProfile,
  getClubGoToPay,
  postClubOrderPayment
} from '../api'

new Yox({
  el: '.js-club-order-pay',
  template: `
    <div class="cart-order-pay {{#if isLoading}}hidden{{/if}}">
        <div class="apply-detail-item">
            <div class="detail-item-l pull-left">
                <div class="order-amount">
                    <span class="order-amount-title">订单积分：</span>
                    <span>￥{{ currency(mountList.finalTotalAmount, 2) }}</span>
                </div>
                <div class="already-amount">
                    <span class="already-amount-title">已付积分：</span>
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
                    <span>代付积分：</span>
                    <span class="replace-pay-num">￥{{ currency(mountList.finalTotalAmount-mountList.paidAmount, 2) }}</span>
                </div>
                <div class="look-order-detail" on-click="lookOrderDetail()">查看订单详情> </div>
            </div>
        </div>

        <div class="apply-usually-item">
            <div class="usually-item-title">常用支付</div>
            <div class="usually-item-content">
                <div class="lave-wallet clearfix">
                    <div class="lave-wallet-l pull-left">
                    <label class="mount-check">
                        <input type="checkbox" on-click="selectLaveWallet()">剩余积分
                    </label>
                    </div>
                    <div class="lave-wallet-r pull-left">
                        <span class="available-mount-l">可用积分</span>
                        <span class="available-mount">￥{{ currency(availableMount, 2) }}</span>
                        {{#if availableMount < (mountList.finalTotalAmount-mountList.paidAmount)}}
                        <span class="available-mount-r">（积分不足）</span>
                        {{/if}}
                    </div>
                    <div class="pull-right" style="display: none;">
                        <span>充值</span>
                    </div>
                </div>
            </div>
        </div>

        <div class="apply-other-item">
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
    </div>
  `,
  data: {
    isLoading: true, // 加载标识
    isShowLavePay: false, // 余额支付密码框
    mountList: {}, // 订单金额，已付金额
    availableMount: 0, // 可用余额
    orderId: window.__pageInitData__, // 订单id
    password: '', // 支付密码
  },

  afterMount() {
    let orderId = this.get("orderId")

    Promise.all([
      getClubMemberProfile(), // 获取可用余额
      getClubGoToPay(orderId) // 获取订单金额，已付金额
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
    // 查看订单详情
    lookOrderDetail() {
      let orderId = this.get("orderId")
      window.location.href = '/member/order/' + orderId
    },

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
        "platformType": "INTEGRAL", // 积分支付
        "passwordPay": password
      }
      console.log(orderId, data)
      postClubOrderPayment(orderId, data).then(res => {
        console.log(res, res.message)
        if (res.code === "200") {
          // TODO change totalMount to orderId
          window.location.href = `/order/${totalMount}/result`
        } else {
          this.$alert(res.message)
        }
      })
    },
  }

})
