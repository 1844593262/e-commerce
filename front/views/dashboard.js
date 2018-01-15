import '../boot'
import {
  getMemberProfile,
  getrecordHistory,
  getcommentted,
  getRecentorder,
  putCancelOrder,
  delrecordHistory
} from '../api'

$(document).ready(function () {

  new Yox({
    el: '.js-dashboard-main',

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
          <div class="dashboard-base-profile">
            <div class="item">
              <div class="base-profile-info clearfix">
                <div class="item">
                  你好，{{profileData.userName ? profileData.userName : ''}}
                </div>
                <div class="item">
                  账户安全: {{showstatusFilter(profileData.securityLevel) ? showstatusFilter(profileData.securityLevel) : ''}}
                  <a href="/member/security" class="color-yellow add-mar">查看详情</a>
                </div>
                <div class="item">
                  账号等级: <span class="color-yellow">{{profileData.leverName ? profileData.leverName : ''}}</span>
                </div>
              </div>
            </div>

            <div class="item base-profile-status-wrapper">
              <div class="base-profile-status clearfix">
                <div class="item">
                  <div class="term-image">
                    <img src="/static/image/account01.png">
                  </div>
                  <div class="content">
                    <div class="title">
                      余额钱包
                    </div>
                    <div class="detail">
                      <span class="detail-main">{{currency(profileData.cashAccount + profileData.presentAccount)}}</span>
                      <span class="detail-term"></span>
                    </div>
                  </div>
                </div>
                <div class="item clearfix">
                  <div class="term-image pull-left">
                    <img src="/static/image/account02.png">
                  </div>
                  <div class="content pull-left">
                    <div class="title">
                      消费积分
                    </div>
                    <div class="detail pull-left">
                      <span class="detail-main">{{profileData.pointAccount ? profileData.pointAccount : 0}}</span>
                    </div>
                  </div>
                  <div class="base-profile-point-case pull-left" on-click="fullpoint()">积分充值</div>
                </div>
                <div class="item">
                  <div class="term-image">
                    <img src="/static/image/account03.png">
                  </div>
                  <div class="content">
                    <div class="title">
                      优惠券
                    </div>
                    <div class="detail">
                      <span class="detail-main">{{profileData.couponNum ? profileData.couponNum : 0}}</span>
                      <span class="detail-term">张</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div class="dashboard-main">
            <Tabnav items="{{ tabItems }}" divider="{{ true }}" model="activeTab">
            </Tabnav>

            <TabContainer model="activeTab">
              <TabPane name="recent-order" active="{{ true }}">

                {{#if orderData.total}}
                  <div class="recent-order-list">
                    <div class="recent-order-item">
                      <table>
                        <colgroup>
                          <col style="width: 200px">
                          <col>
                          <col style="width: 270px">
                          <col style="width: 170px">
                        </colgroup>
                        {{#each orderData.items:$index}}
                          <tbody class="item-header">
                            <tr>
                              <td colspan="3" class="item-header-left">
                                <div class="order-status">
                                  {{ showstatusFilter(this.showStatus) }}
                                </div>
                                <div class="order-meta">
                                  <span class="item">
                                    {{moment(this.createTime, 'YYYY-MM-DD HH:mm:ss') }}
                                  </span>
                                  <span class="item">
                                  订单号: {{this.saleOrderNo ? this.saleOrderNo : ''}}
                                  </span>
                                </div>
                              </td>
                              <td class="item-header-right">
                                <div class="order-price-info">
                                  <div class="price">
                                    ￥{{ currency(this.finalTotalAmount) }}
                                  </div>
                                  <div class="price-meta">
                                    (含运费: ￥{{ currency(this.baseFreight)}})
                                  </div>
                                </div>
                              </td>
                            </tr>
                          </tbody>
                          <tbody class="item-body">
                            {{#each  this.orderItemList}}
                              <tr class="order-sub-item">
                                <td>
                                  <img class="order-sub-item-img" src="{{this.mediaUrl}}">
                                </td>
                                <td class="order-sub-item-nopadding">
                                  <div class="order-sub-item-name">
                                    {{this.goodsName ? this.goodsName : ''}}
                                  </div>
                                  <div class="order-sub-item-attr">
                                    {{this.title ? this.title : ''}}
                                  </div>
                                  <div class="order-sub-item-price">
                                    <span class="price">￥{{ currency(this.goodsPrice)}}</span>
                                    <span class="original-price">￥{{ currency(this.originGoodsPrice)}}</span>
                                  </div>
                                </td>
                                <td class="order-sub-item-center">
                                  <div class="order-sub-item-count-f">
                                    <div class="order-sub-item-count">
                                    X  {{this.goodsCount ? this.goodsCount : 0}}
                                    </div>
                                  </div>
                                </td>
                                  <td>
                                    <div class="order-sub-item-action">
                                      {{#if showStatus === 'PRE_PAY'}}
                                        <div class="action btn btn-red btn-sm btn-block" on-click="cartpay(saleOrderId)">立即付款</div>
                                      {{/if}}
                                        <div class="action-link" on-click="lookdetail(saleOrderId)">查看详情</div>
                                      {{#if showStatus === 'PRE_PAY'}}
                                        <div class="action-link" on-click="cancelOrder(saleOrderId,$index)">取消订单</div>
                                      {{/if}}
                                    </div>
                                  </td>
                              </tr>
                            {{/each}}
                          </tbody>
                        {{/each}}
                      </table>
                    </div>
                  </div>
                  <Pagination total="{{orderData.total ? orderData.total : 0}}">
                  </Pagination>
                {{else}}
                  <EmptyPlaceholder text="暂无数据">
                  </EmptyPlaceholder>
                {{/if}}
              </TabPane>

              <TabPane name="record">
                {{#if recordData.length}}
                  <div class="browsed-record-list">
                    <div class="browsed-record-item">
                      <table>
                        <colgroup>
                          <col style="width: 160px">
                          <col>
                          <col style="width: 135px">
                        </colgroup>
                        {{#each recordData:$parentIndex}}
                          {{#if this.list.length > 0}}
                          <tbody class="item-header">
                            <tr>
                              <td colspan="3">
                                <div class="browsed-record-time">
                                  {{this.time ? this.time : ''}}
                                </div>
                              </td>
                            </tr>
                          </tbody>
                          {{/if}}
                          {{#each this.list:$index}}
                            <tbody class="item-body">
                              <tr>
                                <td>
                                  <div class="browsed-record-item-img">
                                    <img class="order-item-image" src="{{this.goodsImage}}">
                                  </div>
                                </td>
                                <td>
                                  <div class="browsed-record-item-name">
                                    {{this.goodsName ? this.goodsName : ''}}
                                  </div>

                                  <div class="browsed-record-item-price">
                                    <span class="price">￥{{currency(this.sellPrice) }}</span>
                                    <span class="original-price">￥{{currency(this.tagPrice)}}</span>
                                  </div>
                                </td>
                                <td>
                                  <div class="browsed-record-action">
                                    <a class="action-link"  on-click="delhistory($event, this.userViewHistoryId, $parentIndex, $index)">删除记录</a>
                                  </div>
                                </td>
                              </tr>
                            </tbody>
                          {{/each}}
                        {{/each}}
                      </table>
                    </div>
                  </div>
                  <Pagination total="{{orderData.total ? orderData.total : ''}}">
                  </Pagination>
                {{else}}
                  <EmptyPlaceholder text="暂无数据">
                  </EmptyPlaceholder>
                {{/if}}
              </TabPane>

              <TabPane name="commentted">
                {{#if commenttedData.total}}
                  <div class="order-commentted-list-wrapper">
                    <div class="order-commentted-list">
                      {{#each commenttedData.items}}
                        <div class="order-comment-item">
                          <div class="media">
                            <div class="media-left">
                              <img class="order-item-image" src="{{this.mediaUrl}}">
                            </div>
                            <div class="media-body">
                              <div class="order-meta">
                                <div class="order-item-name">
                                  {{this.goodsName ? this.goodsName : ''}}
                                </div>
                                <div class="order-item-attr">
                                  {{this.skuTitle ? this.skuTitle : ''}}
                                </div>
                                <div class="order-item-price">
                                  <span class="price">{{currency(this.goodsPrice)}}</span>
                                  <span class="original-price">{{currency(this.originGoodsPrice)}}</span>
                                </div>
                              </div>
                            </div>
                          </div>

                          <div class="comment-info">
                            <div class="user-comment-content">我的评价: {{this.description ? this.description : ''}}</div>
                            <div class="reply-comment-content">商家回复: 亲的支持是我们的动力</div>
                          </div>
                        </div>
                      {{/each}}
                    </div>
                  </div>

                  <Pagination total="{{commenttedData.total ? commenttedData.total : 0}}">
                  </Pagination>
                {{else}}
                  <EmptyPlaceholder text="暂无数据">
                  </EmptyPlaceholder>
                {{/if}}
              </TabPane>
            </TabContainer>
          </div>
        </div>
      </div>
    `,

    data: {
      orderData: {},
      recordData: [],
      commenttedData: {},
      profileData: {},
      tabItems: [
        { label: '最近订单', name: 'recent-order' },
        { label: '浏览记录', name: 'record' },
        { label: '我评论过的', name: 'commentted' }
      ],
      activeTab: 'recent-order'
    },

    afterMount() {
      Promise.all([
        getMemberProfile(),
        getRecentorder()
      ]).then(res => {
        const [profile, orders] = res

        this.set('profileData', profile ? profile : {})
        this.set('orderData', orders ? orders : {})
      })
    },

    watchers: {
      activeTab(val) {
        if (val === 'recent-order') {
          getRecentorder().then(res => {
            if (res) {
              this.set('orderData', res)
            }
          })
        } else if (val === 'record') {
          getrecordHistory('GOODS').then(res => {
            if (res) {
              this.set('recordData', res)
            }
          })
        } else {
          getcommentted(0, 10).then(res => {
            if (res) {
              this.set('commenttedData', res)
            }
          })
        }
      }
    },

    methods: {
      cancelOrder(id,index) {
        putCancelOrder(id).then(res => {
          this.$alert('订单已取消!')
          this.set(`orderData.items.${index}.showStatus`,'CANCEL');
        }).catch(err =>{
          this.$alert(err.message)
        })
      },

      delhistory(event, id, parentindex, index) {
        event.stop()
        delrecordHistory(id).then(res => {
          this.$alert('删除成功')
          this.removeAt(`recordData.${parentindex}.list`, index)

          if (!this.get(`recordData.${parentindex}.list`).length) {
            this.removeAt('recordData', parentindex)
          }
        }).catch(err =>{
          this.$alert(err.message)
        })
      },

      fullpoint() {
        window.location.href = '/member/vipclub'
      },

      cartpay(id) {
        window.location.href = `/order/${id}/pay`
      },

      lookdetail(id) {
        window.location.href = `/member/order/${id}`
      }
    },

    filters: {
      showstatusFilter: function (data) {
        switch (data) {
          case 'PRE_EVALUATE':
            return '待评价'
            break;
          case 'PRE_ACCEPT':
            return '待收货'
            break;
          case 'PRE_PAY':
            return '待支付 '
            break;
          case 'CANCEL':
            return '已取消'
            break;
          case "PRE_DELIVER":
            return '待发货'
            break;
          case 'REFUNDING':
            return '退款中'
            break;
          case 'REFUNDED ':
            return '已退款'
            break;
          case "CLOSE":
            return '已关闭'
            break;
          case 'COMPLETE':
            return '已完成'
            break;
          case 'LOW':
            return '低'
            break;
          case 'HIGH':
            return '高'
            break;
        }
      }
    }
  })

})
