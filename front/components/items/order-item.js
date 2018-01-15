export default {
  template: `
    <div class="recent-order-item">
      <table>
        <colgroup>
          <col style="width: 200px"></col>
          <col></col>
          <col style="width: 270px"></col>
          <col style="width: 170px"></col>
        </colgroup>
        <tbody class="item-header">
          <tr>
            <td colspan="3" class="item-header-left">
              <div class="order-status">{{orderStatusFilter(status)}}</div>
              <div class="order-meta">
                <span class="item">
                {{ moment(createTime, 'YYYY-MM-DD HH:mm:ss' )}}
                </span>
                <span class="item">订单号: {{orderNo ? orderNo : ''}}</span>
              </div>
            </td>
            <td class="item-header-right">
              <div class="order-price-info">
                <div class="price">￥{{currency(totalPrice)}}</div>
                <div class="price-meta">(含运费: ￥{{currency(baseFreight)}})</div>
              </div>
            </td>
          </tr>
        </tbody>
        <tbody class="item-body">
          {{#each items:index}}
            <tr class="order-sub-item">
              <td>
                <img class="order-sub-item-img" src="{{this.mediaUrl ? this.mediaUrl : ''}}">
              </td>
              <td class="order-sub-item-nopadding">
                <div class="order-sub-item-name">{{this.goodsName ? this.goodsName : ''}}</div>
                <div class="order-sub-item-attr">{{this.title ? this.title : ''}}</div>
                <div class="order-sub-item-price">
                  <span class="price">￥{{currency(this.goodsPrice)}}</span>
                  <span class="original-price">{{currency(this.originGoodsPrice)}}</span>
                </div>
              </td>
              <td class="order-sub-item-center">
                <div class="order-sub-item-count-f">
                    <div class="order-sub-item-count">X {{this.goodsCount ? this.goodsCount : ''}}</div>
                    <div class="action-link">申请售后</div>
                </div>
              </td>
              <td>
                {{#if index === 0}}
                  <div class="order-sub-item-action">
                  {{#if status === 'PRE_PAY'}}
                    <div
                      class="action btn btn-red btn-sm btn-block"
                      on-click="immediatepay(orderId)">立即付款</div>
                  {{/if}}
                    <div
                      class="action-link action-link-detail"
                      data-id="{{orderId}}"
                      on-click="actionLink(orderId)">查看详情</div>
                  {{#if status === 'PRE_PAY'}}
                    <div
                      class="action-link"
                      on-click="cancelOrder(orderId, index, 'ALL')">取消订单</div>
                  {{/if}}
                  </div>
                {{/if}}
              </td>
            </tr>
          {{/each}}

          {{#if type==='wait-comment'}}
            <tr class="order-sub-item order-manage-comment">
              <td colspan="3">
                <div class="comment-info">
                  <div class="user-comment-content">我的评价: 这真是个好东西</div>
                  <div class="reply-comment-content">商家回复: 这个哈哈哈这个哈哈哈这个哈哈哈这个哈哈哈这个哈哈哈这个哈哈哈这个哈哈哈这个哈哈哈</div>
                </div>
              </td>
              <td>
              </td>
            </tr>
          {{/if}}
        </tbody>
      </table>
    </div>
  `,

  propTypes: {
    orderId: {
      type: 'numeric'
    },

    status: {
      type: 'string'
    },

    createTime: {
      type: 'numeric'
    },

    orderNo: {
      type: 'string'
    },

    totalPrice: {
      type: 'numeric'
    },

    baseFreight: {
      type: 'numeric',
      value: 0
    },

    items: {
      type: 'array'
    },

    index: {
      type: 'numeric'
    },

    type: {
      type: 'string'
    }
  },

  methods: {
    actionLink(id) {
      window.location.href = `/member/order/${id}`
    },

    cancelOrder(id, index, type) {
      this.fire('cancelOrder', {
        id,
        index,
        type
      })
    },

    immediatepay(id) {
      window.location.href = `/order/${id}/pay`
    }
  }
}
