import cookies from 'js-cookie'
import '../boot'
import {
  getMemberProfile,
  getOrderManagement,
  getOrderDetail,
  putCancelOrder
} from '../api'

$(document).ready(function () {
  new Yox({

    el: '.js-order-mange-main',
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
          <Tabnav items="{{ tabItems }}" model="activeTab">
          </Tabnav>

          <TabContainer>
            <TabPane name="all-order" active="{{ true }}">
              {{#if allOrder.items.length}}
                {{#each allOrder.items:index}}
                  <OrderItem
                    order-id="{{ this.saleOrderId }}"
                    status="{{ this.showStatus }}"
                    create-time="{{ this.createTime }}"
                    order-no="{{ this.saleOrderNo }}"
                    total-price="{{ this.finalTotalAmount }}"
                    base-freight="{{ this.baseFreight }}"
                    items="{{ this.orderItemList }}"
                    index="{{ index }}"
                    type="ALL">
                  </OrderItem>
                {{/each}}
                <Pagination total="{{allOrder.total ? allOrder.total : 0}}">
                </Pagination>
              {{else}}
                <EmptyPlaceholder text="暂无数据">
                </EmptyPlaceholder>
              {{/if}}
            </TabPane>

            <TabPane name="wait-pay">
              {{#if waitPay.items.length}}
                {{#each waitPay.items:index}}
                  <OrderItem
                    order-id="{{ this.saleOrderId }}"
                    status="{{ this.showStatus }}"
                    create-time="{{ this.createTime }}"
                    order-no="{{ this.saleOrderNo }}"
                    total-price="{{ this.finalTotalAmount }}"
                    base-freight="{{ this.baseFreight }}"
                    items="{{ this.orderItemList }}"
                    index="{{ index }}"
                    type="WAIT">
                  </OrderItem>
                {{/each}}
                <Pagination total="{{waitPay.total ? waitPay.total : 0}}">
                </Pagination>
              {{else}}
                <EmptyPlaceholder text="暂无数据">
                </EmptyPlaceholder>
              {{/if}}
            </TabPane>

            <TabPane name="wait-send">
              {{#if waitSend.items.length}}
                {{#each waitSend.items:index}}
                  <OrderItem
                    order-id="{{ this.saleOrderId }}"
                    status="{{ this.showStatus }}"
                    create-time="{{ this.createTime }}"
                    order-no="{{ this.saleOrderNo }}"
                    total-price="{{ this.finalTotalAmount }}"
                    base-freight="{{ this.baseFreight }}"
                    items="{{ this.orderItemList }}"
                    index="{{ index }}">
                  </OrderItem>
                {{/each}}
                <Pagination total="{{waitSend.total ? waitSend.total : 0}}">
                </Pagination>
              {{else}}
                <EmptyPlaceholder text="暂无数据">
                </EmptyPlaceholder>
              {{/if}}
            </TabPane>

            <TabPane name="wait-received">
              {{#if waitReceived.items.length}}
                {{#each waitReceived.items:index}}
                  <OrderItem
                    order-id="{{ this.saleOrderId }}"
                    status="{{ this.showStatus }}"
                    create-time="{{ this.createTime }}"
                    order-no="{{ this.saleOrderNo }}"
                    total-price="{{ this.finalTotalAmount }}"
                    base-freight="{{ this.baseFreight }}"
                    items="{{ this.orderItemList }}"
                    index="{{ index }}">
                  </OrderItem>
                {{/each}}
                <Pagination total="{{waitReceived.total ? waitReceived.total : 0}}">
                </Pagination>
              {{else}}
                <EmptyPlaceholder text="暂无数据">
                </EmptyPlaceholder>
              {{/if}}
            </TabPane>

            <TabPane name="wait-commentted">
              {{#if waitCommentted.items.length}}
                {{#each waitCommentted.items:index}}
                  <OrderItem
                    order-id="{{ this.saleOrderId }}"
                    status="{{ this.showStatus }}"
                    create-time="{{ this.createTime }}"
                    order-no="{{ this.saleOrderNo }}"
                    total-price="{{ this.finalTotalAmount }}"
                    base-freight="{{ this.baseFreight }}"
                    items="{{ this.orderItemList }}"
                    index="{{ index }}"
                    type="wait-comment">
                  </OrderItem>
                {{/each}}
                <Pagination total="{{waitCommentted.total ? waitCommentted.total : 0}}">
                </Pagination>
              {{else}}
                <EmptyPlaceholder text="暂无数据">
                </EmptyPlaceholder>
              {{/if}}
            </TabPane>
          </TabContainer>
        </div>
      </div>
    `,

    data: {
      activeTab: 'all-order',
      profileData: {},
      allOrder: [],
      waitPay: [],
      waitSend: [],
      waitReceived: [],
      waitCommentted: []
    },

    computed: {
      tabItems() {
        return [
          { label: '全部订单', name: 'all-order' },
          { label: '待付款', name: 'wait-pay' },
          { label: '待发货', name: 'wait-send' },
          { label: '待收货', name: 'wait-received' },
          { label: '待评价', name: 'wait-commentted' }
        ]
      }
    },

    afterMount() {
      Promise.all([
        getMemberProfile(),
        getOrderManagement(0, 10, 0)
      ]).then(res => {
        const [profileData, allOrder] = res

        this.set('profileData', profileData ? profileData : {})
        this.set('allOrder', allOrder ? allOrder : {})
      })

    },

    watchers: {
      activeTab(val) {
        if (val === 'all-order') {
          getOrderManagement(0, 10, 0).then(res => {
            this.set('allOrder', res ? res : {})
          })
        } else if (val === 'wait-pay') {
          getOrderManagement(0, 10, 2).then(res => {
            this.set('waitPay', res ? res : {})
          })
        } else if (val === 'wait-send') {
          getOrderManagement(0, 10, 3).then(res => {
            this.set('waitSend', res ? res : {})
          })
        } else if (val === 'wait-received') {
          getOrderManagement(0, 10, 4).then(res => {
            this.set('waitReceived', res ? res : {})
          })
        } else if (val === 'wait-commentted') {
          getOrderManagement(0, 10, 5).then(res => {
            this.set('waitCommentted', res ? res : {})
          })
        }
      }
    },

    events: {
      cancelOrder(e, data) {
        putCancelOrder(data.id).then(res => {
          this.$alert('订单已取消!')
          if (data.type === 'ALL') {
            this.set(`allOrder.items.${data.index}.showStatus`, 'CANCEL')
          } else if (data.type === 'waitPay') {
            this.set(`waitPay.items.${data.index}.showStatus`, 'CANCEL')
          }
        })
      }
    },

    methods: {
      actionLink(id) {
        window.location.href = `/member/order/${id}`
      },

      // cancelOrder(id,index,type) {
      //   putCancelOrder(id).then(res => {
      //     this.$alert('订单已取消!')
      //     if (type === 'ALL') {
      //       this.set(`allOrder.items.${index}.showStatus`,'CANCEL');
      //     } else if(type === 'waitPay') {
      //       this.set(`allOrder.items.${index}.showStatus`,'CANCEL');
      //     }
      //   })
      // },

      immediatepay(id) {
        window.location.href = `/order/${id}/pay`
      }
    }
  })
})
