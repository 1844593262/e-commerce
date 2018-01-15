export default {
  template: `
    <li
      class="{{#if currentIndex === activeIndex }}active{{/if}} coupon clearfix"
      on-click="selectCoupon()">
      <div class="coupon-img-l pull-left">
        <div class="coupon-amount">
          ￥<span class="coupon-amount-num">{{ currency(couponList.couponDiscountAmount) }}</span>
        </div>
        <div class="coupon-name">{{ checkRuleTypeFilter(couponList.ruleType) }}</div>
      </div>
      <div class="coupon-img-r pull-right">
        <div class="coupon-quota">{{ couponList.couponName }}</div>
        <div class="coupon-validity">有效期：</div>
        <div class="coupon-date">{{ moment(couponList.useStartTime, 'YYYY-MM-DD') }}/{{ moment(couponList.useEndTime, 'YYYY-MM-DD') }}</div>
      </div>
    </li>
  `,

  propTypes: {
    couponList: {
      type: 'object'
    },

    currentIndex: {
      type: 'numeric'
    },

    activeIndex: {
      type: 'numeric'
    }
  },

  methods: {
    // 选择优惠券
    selectCoupon() {

      let data

      // 再次点击取消选中
      if (this.get("currentIndex") === this.get("activeIndex")) {
        data = {
          activeIndex: null,
          myCouponId: 0
        }
      }else {  // 点击选中
        data = {
          activeIndex: this.get("currentIndex"),
          myCouponId: this.get("couponList.myCouponId")
        }
      }

      this.fire('selectCoupon', data)
      this.fire('updateFinalAmount')
    }
  }
}
