import cookies from 'js-cookie'
import '../boot'

import {
  getMemberProfile,
  confirmReceipt,
  getOrderDetail
} from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-order-detail',
    template: `
      <div class="dashboard-main clearfix">
        <div class="dashboard-left pull-left">
          <DashboardSidebarUser
            name="{{ profileData.userName }}">
          </DashboardSidebarUser>

          <div class="dashboard-main-sidebar">
            <DashboardSidebarNav>
            </DashboardSidebarNav>
          </div>
        </div>
        <div class="dashboard-right pull-right">
            <div class="order-status-detail">
                <table>
                    <colgroup>
                        <col style="width: 150px">
                        <col>
                        <col style="width: 100px">
                        <col style="width: 190px">
                        <col style="width: 142px">
                    </colgroup>
                    <tbody class="item-header">
                        <tr>
                            <td colspan="5">
                                <div class="item-header-title">
                                <div>
                                    <div class="pay-status">
                                    {{orderStatusFilter(orderDetailData.showStatus)}}
                                    </div>
                                    <div class="confirm-order-time">
                                    <span class="item">
                                        下单时间：<span>{{ moment(orderDetailData.createTime, 'YYYY-MM-DD HH:mm:ss' )}} </span>
                                    </span>
                                    <span class="item">
                                        订单号:<span>{{orderDetailData.saleOrderNo}}</span>
                                    </span>
                                    </div>
                                </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="order-sub-item">
                            <td colspan="5">
                                <div class="item-header-info">
                                    <div class="item-info-status-line">
                                        <div class="item-info-status-title">订单信息</div>
                                        <div class="item-info-status-content">
                                            <div class="receiver-info">
                                                <span class="receiver-name">
                                                    <span class="info-h">收货人：</span>
                                                    <span>{{orderDetailData.receiver}}</span>
                                                </span>
                                                <span>
                                                    <span class="info-h">手机号：</span>
                                                    <span>{{orderDetailData.cellphone}}</span>
                                                </span>
                                            </div>
                                            <div class="receiver-address">
                                                <span class="info-h">收货地址：</span>
                                                <span>{{orderDetailData.address}}</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </td>
                        </tr>
                        <tr class="order-sub-item">
                            <td colspan="5">
                                <div class="item-header-status">
                                    <div class="item-info-status-title">订单状态</div>
                                    <div class="item-info-status-content" style="border-bottom: 1px solid #e7e7e7;">
                                        <ul style="padding: 20px 0;">
                                            <li style="margin-bottom: 10px;">2017-6-19 周五 6月19 {{orderStatusFilter(orderDetailData.showStatus)}}</li>
                                        </ul>
                                    </div>
                                </div>
                            </td>
                        </tr>
                    </tbody>

                    <tbody class="item-body">
                    {{#each orderDetailData.orderItemList:index}}
                    <tr class="order-sub-item">
                        <td class="order-item-img">
                            <a href="javascript:;">
                                <img src="{{this.mediaUrl}}" alt="">
                            </a>
                        </td>
                        <td>
                            <div class="order-item-name">{{this.goodsName}}</div>
                            <div class="order-item-size">{{this.title}}</div>
                            <div class="order-item-price">
                                <span class="current-price">￥{{currency(this.goodsPrice)}}</span>
                                <span class="original-price">￥{{currency(this.originGoodsPrice)}}</span>
                                <!--   <span class="refund-price">
                                //           已退货已退款（退款￥
                                //           <span>{{}}</span>
                                //           ）
                                //   </span> -->
                            </div>
                        </td>
                        <td class="order-item-count-detail order-item-center">
                            <div class="order-item-count">
                                X {{this.goodsCount}}
                            </div>
                            <!--
                            <div class="order-item-sell-detail">
                                <a href="#">售后详情</a>
                            </div>
                            -->
                        </td>
                        {{#if index === 0}}
                        <td class="order-item-pay-money" rowspan="{{orderDetailData.orderItemList.length}}">
                            <div class="order-item-money-content">
                                <div class="order-item-real-pay">
                                    <span class="price-real-pay-des">实付金额：</span>
                                    <span class="real-pay-price">￥{{currency(orderDetailData.finalTotalAmount)}}</span>
                                </div>
                                <div class="order-item-discount">
                                    <span class="price-des">商品合计：￥{{currency(orderDetailData.originTotalAmount)}}</span>
                                </div>
                                <div class="order-item-discount">
                                    <span class="price-des">运费：</span>
                                    ￥<span>{{currency(orderDetailData.baseFreight)}}</span>
                                </div>
                                <div class="order-item-discount">
                                    <span class="price-des">积分折扣：</span>
                                    -￥<span>{{currency(orderDetailData.integralRemissionAmount)}}</span>
                                </div>
                                <div class="order-item-discount">
                                    <span class="price-des">优惠券优惠：</span>
                                    -￥<span>{{currency(orderDetailData.couponDiscountAmount)}}</span>
                                </div>
                                <div class="order-item-discount">
                                    <span class="price-des">自提优惠：</span>
                                    -￥<span>{{currency(orderDetailData.selfDiscountAmount)}}</span>
                                </div>
                                <div class="order-item-discount">
                                    <span class="price-des">促销优惠：</span>
                                    -￥<span>{{currency(orderDetailData.activityDiscountAmount)}}</span>
                                </div>
                            </div>
                        </td>
                        {{/if}}
                        {{#if index === 0}}
                        <td class="order-item-receive" rowspan="{{orderDetailData.orderItemList.length}}">
                            <div class="order-item-center order-item-receive-content">
                                <div>您还有</div>
                                <div class="remain-time">7天23小时27分15秒</div>
                                <div>订单将自动确认收货</div>
                                {{#if orderDetailData.showStatus === 'PRE_ACCEPT'}}
                                    <div class="confirm-receive btn btn-red btn-sm btn-block" on-click="confirm()">确认收货</div>
                                {{/if}}
                                {{#if orderDetailData.showStatus === 'PRE_PAY'}}
                                    <div class="confirm-receive btn btn-red btn-sm btn-block" on-click="goPay()">去支付</div>
                                {{/if}}
                                <div>延长收货时间</div>
                            </div>
                        </td>
                        {{/if}}
                    </tr>
                    {{/each}}
                    </tbody>
                </table>
            </div>
        </div>
      </div>
    `,

    data: {
      orderId: window.__orderId__,
      orderDetailData: {},
      profileData: {}
    },

    afterMount() {
      Promise.all([
        getMemberProfile(),
        getOrderDetail(this.get('orderId'))
      ]).then(res => {
          const [profileData, orderDetailData] = res

          if (profileData) {
              this.set('profileData', profileData)
          }

          if (orderDetailData) {
              this.set('orderDetailData', orderDetailData)
          }
      })
    },

    methods: {
      confirm() {
        confirmReceipt(this.orderDetailData.saleOrderId).then(res => {
          this.$alert('成功')
        }).catch(err => {
          this.$alert(err.message)
        })
      },

      goPay() {
        window.location.href = `/order/${this.get('orderDetailData.saleOrderId')}/pay`
      }
    }
  })
})
