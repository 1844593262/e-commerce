export default {
  template: `
    <div class="discount-item
      {{#if this.ruleType === 'DIRECT_REDUCTION' || this.ruleType === 'FULL_AMOUNT_DISCOUNT' || this.ruleType === 'FULL_NUM_DISCOUNT' }} zhijian{{/if}}
      {{#if this.ruleType === 'FULL_AMOUNT_SUB' || this.ruleType === 'FULL_NUM_SUB' || this.ruleType === 'FULL_AMOUNT_FREE_SHIPPING' }} manjian{{/if}}">

      {{#if this.ruleType === 'DIRECT_REDUCTION' }}
        <span class="discount-zhijian">直减券</span>
      {{/if}}
      {{#if this.ruleType === 'FULL_AMOUNT_DISCOUNT' || this.ruleType === 'FULL_NUM_DISCOUNT' }}
        <span class="discount-zhijian">满折券</span>
      {{/if}}
      {{#if this.ruleType === 'FULL_AMOUNT_SUB' || this.ruleType === 'FULL_NUM_SUB' }}
        <span class="discount-manjian">满减券</span>
      {{/if}}
      {{#if this.ruleType === 'FULL_AMOUNT_FREE_SHIPPING' }}
        <span class="discount-manjian">包邮券</span>
      {{/if}}

      {{#if status === 'used'}}
        <span class="discount-alreadused">已使用</span>
      {{/if}}

      {{#if status === 'expired'}}
        <span class="discount-alreadold-time">已过期</span>
      {{/if}}

      <div class="discount-descripe">
        <div class="common-use">{{ this.couponName }}</div>
        <div class="valid">有效期 : </div>
          <div class="time">{{moment(this.startTime, 'YYYY-MM-DD')}}-{{moment(this.endTime, 'YYYY-MM-DD')}}</div>
      </div>
      <div class="dashboard-wallet-discount-right-price">
        {{#if this.ruleType == 'FULL_AMOUNT_SUB' ||  this.ruleType == 'FULL_NUM_SUB' || this.ruleType === 'DIRECT_REDUCTION' }}
          <div class="dashboard-wallet-discount-right-price-content">
            {{ currency(this.couponResp.ruleScope.subAmount) }}
          </div>
          <div class="dashboard-wallet-discount-right-price-rmb">RMB</div>
        {{/if}}

        {{#if this.ruleType == 'FULL_AMOUNT_DISCOUNT' ||  this.ruleType == 'FULL_NUM_DISCOUNT' }}
          <div class="dashboard-wallet-discount-right-price-content">
            {{ this.couponResp.ruleScope.discount * 10 }}
          </div>
          <div class="dashboard-wallet-discount-right-price-rmb">折</div>
        {{/if}}

        {{#if this.ruleType == 'FULL_AMOUNT_FREE_SHIPPING' }}
          <div class="dashboard-wallet-discount-right-price-content">
            包邮
          </div>
        {{/if}}
      </div>
    </div>
  `,

  propTypes: {
    ruleType: {
      type: 'string'
    },

    couponName: {
      type: 'string'
    },

    startTime: {
      type: 'numeric'
    },

    endTime: {
      type: 'numeric'
    },

    couponResp: {
      type: 'object'
    },

    status: {
      type: 'string'
    }
  }

}
