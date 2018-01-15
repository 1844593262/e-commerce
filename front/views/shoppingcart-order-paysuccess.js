import '../boot'

new Yox({
  el: '.js-shopping-cart-paysuccess-wrapper',
  template: `
    <div class="reg-sucess-wrapper">
      <div class="pay-off-money">订单金额：￥<span>{{ currency(totalMount, 2) }}</span>元</div>
      <div class="reg-sucess-welc pay-off-money-con"><div class="reg-sucess-welc-con">订单支付成功</div></div>
      <div class="reg-sucess-scure">您的包裹即将出发</div>
      <div class="reg-sucess-imme">进入钜MAX商城</div>
      <div class="reg-sucess-go"><b>(3s)</b>后自动跳转到</div>
    </div>
  `,
  data: {
    totalMount: window.__pageInitData__, // 付款总金额
  },

  afterMount() {
    console.log(totalMount)
  },

  events: {

  },

  methods: {

  }

})
