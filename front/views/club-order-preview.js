import '../boot'
import {
    getClubReceiverAddress,
    postClubAddress,
    putClubAddress,
    delClubAddress,
    postClubPreOrder,
    postClubOrderConfirm,
    getProvnceandCity
} from '../api'


$(document).ready(function () {
  new Yox({
    el: '.js-club-order-preview',
    template: `
    <div class="cart-order-submit {{#if isLoading}}hidden{{/if}}">

        <div class="receive-address-item {{#if isHideAddress}}hidden{{/if}}">
            <div class="address-head">
                <div class="address-head-left pull-left">收货信息</div>
                <div class="address-head-right pull-right" on-click="openAddModal()">+ 新增收货地址</div>
            </div>

            <div class="{{#if !addressList.length}}hidden{{/if}}">
                <ul class="address-list">
                    {{#if !isShowMoreAddress}}
                        <CartReceiveAddressItem
                            list="{{ addressList[0] }}"
                            currentIndex="0"
                            setDefaultAddress="cartSetDefaultAddress"
                            currentEditAddress="{{ currentEditAddress }}"
                            addressAction="{{ addressAction }}"
                            mallType="{{ mallType }}"
                            addressModalActive="{{ addressModalActive }}">
                            </CartReceiveAddressItem>
                    {{else}}
                    {{#each addressList:index }}
                        <CartReceiveAddressItem
                            list="{{ this }}"
                            setDefaultAddress="cartSetDefaultAddress"
                            currentIndex="{{ index }}"
                            currentEditAddress="{{ currentEditAddress }}"
                            addressAction="{{ addressAction }}"
                            mallType="{{ mallType }}"
                            addressModalActive="{{ addressModalActive }}">
                            </CartReceiveAddressItem>
                    {{/each}}
                    {{/if}}

                </ul>
                {{#if addressList.length > 1}}
                <div
                    class="show-all-address"
                    on-click="showAllAddress()">
                    {{ isShowMoreAddress ? '收起收货地址' : '显示全部收货地址' }}</div>
                {{/if}}
            </div>

            <div class="offline-self {{#if !selfPickupSiteList.length}}hidden{{/if}}">
                <div class="offline-self-head">
                    <span class="text">线下自提</span>
                    <span class="tips">免费</span>
                </div>

                <ul class="offline-self-shop">
                    {{#each selfPickupSiteList:index}}
                        <CartSelfPickItem
                            list="{{ this }}"
                            currentIndex="{{ index }}"
                            activeIndex="{{ activeIndex }}"
                            on-selfPickSelect="cartSelfPickSelect">
                            </CartSelfPickItem>
                    {{/each}}
                </ul>
            </div>

        </div>

        <div class="apply-style-item clearfix">
            <div class="pull-left">
                <div class="head-tips">支付方式</div>
                <ul class="kinds-style">
                    <li class="cart-btn select">线上支付</li>
                </ul>
            </div>

            <div class="pull-right {{#if isHideAddress}}hidden{{/if}}">
                <div class="head-tips">配送时间</div>
                <ul class="kinds-style">
                    <li class="cart-btn {{#if allTimeShow}}select{{/if}}" on-click="allTimeSelect()">不限</li>
                    <li class="cart-btn {{#if workDayShow}}select{{/if}}" on-click="workDaySelect()">工作日</li>
                    <li class="cart-btn {{#if weekDayShow}}select{{/if}}" on-click="weekDaySelect()">节假日/双休日</li>
                </ul>
            </div>
        </div>

        <div class="order-info-item">
            <div class="info-item-title clearfix">
                <div class="title-des pull-left">订单商品信息</div>
            </div>

            <div class="info-item-list">
                <table>
                    <thead class="item-head">
                        <tr>
                            <th style="height: 50px;color:#333;">商品信息</th>
                            <th style="width: 380px;color:#333;">商品单价</th>
                            <th style="width: 220px;color:#333;">数量</th>
                            <th style="width: 360px;color:#333;display:none;">优惠活动</th>
                            <th style="width: 230px;color:#333;">小计</th>
                        </tr>
                    </thead>
                    <tbody class="item-body">
                        {{#each orderGoodsSkuResps }}
                            <tr class="cart-sub-item">
                                <td>
                                    <div class="sub-item-img pull-left">
                                        <a href="club/item/{{ this.goodsId }}" class="goods-show pull-left">
                                            <img src="{{ this.mediaUrl }}">
                                        </a>
                                    </div>
                                    <div class="sub-item-info">
                                        <div class="info-name">
                                           {{ this.goodsName }}
                                        </div>
                                         <div class="info-attr">
                                            {{#each this.goodsSkuAttrList }}
                                                <span>{{ this.attrValue }}</span>
                                            {{/each}}
                                         </div>
                                    </div>
                                </td>
                                <td>
                                    ￥<span class="product-item-common">{{ this.sellPrice }}</span>
                                </td>
                                <td>
                                    <span class="product-item-common">{{ this.quantity }}</span>
                                </td>
                                <td class="sub-item-promotions-f" style="display:none">
                                    <div class="sub-item-promotions">
                                        <div class="promotions-title">
                                            已参与促销活动
                                            <i class="promotions-title-arrow"></i>
                                        </div>
                                        <div class="promotions-content">
                                            <div>卖家促销：
                                                满<span>300</span>减<span>100</span>
                                            </div>
                                            <div>优惠：
                                                <span class="discount-money">￥</span><span class="discount-money">100.00</span>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                                <td>
                                    <span class="product-total-price">￥</span>
                                    <span class="product-total-price">{{ this.sellPrice * this.quantity }}</span>
                                </td>
                            </tr>
                        {{/each}}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="order-submit-item clearfix">
            <div class="order-submit-item-l pull-left">
                    <div class="self-ticket-leavemsg">
                        <div class="self-leavemsg clearfix">
                            <span class="leavemsg-title pull-left">给卖家留言</span>
                            <input
                                class="leavemsg-input pull-left"
                                type="text"
                                placeholder="选填：对本次的交易的说明，可建议合理的要求"
                                model="buyerRemark">
                        </div>
                    </div>
            </div>

            <div class="order-submit-item-r pull-right">
                <ul class="discout-top">
                    <li>
                        <div class="discout-title pull-left">商品合计：</div>
                        <div class="pull-right discout-money">
                            ￥<span>{{ originTotalAmount }}</span>
                        </div>
                    </li>
                    <li class="hidden">
                        <div class="discout-title pull-left">快递费用：</div>
                        <div class="pull-right discout-money">
                            ￥<span>{{ currency(baseFreight, 2) }}</span>
                        </div>
                    </li>


                </ul>

                <div class="order-submit-bottom clearfix">
                    <div class="item-pay-submit">
                        <div class="item-pay">
                            <div class="item-pay-title pull-left">应付积分：</div>
                            <div class="item-pay-num pull-right">
                                ￥<span>{{ finalTotalAmount }}</span>
                            </div>
                        </div>
                        <div class="order-submit-btn" on-click="sbmitOrder()">提交订单</div>
                    </div>

                    <div class="order-buyer-info-detail">
                        <div class="buyer-info-info">
                            <span class="buyer-name">{{ defaultAddress.receiverName }}</span>
                            <span class="buyer-phone">{{ defaultAddress.receiverCellphone }}</span>
                        </div>

                        <div class="buyer-address">
                            <span>{{ defaultAddress.provinceName }}</span>
                            <span>{{ defaultAddress.cityName }}</span>
                            <span>{{ defaultAddress.countyName }}</span>
                            <span>{{ defaultAddress.receiverAddress }}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ModifyAddressModal
            model="addressModalActive"
            geo-data="{{ geoData }}"
            action="{{ addressAction }}"
            mallType="{{ mallType }}"
            addressIndex="{{ addressIndex }}"
            default-param="{{ currentEditAddress }}">
            </ModifyAddressModal>
    </div>
    `,

    data: {
        isLoading: true,
        preOrderData: JSON.parse(window.__pageInitData__.preOrderList), // 订单详情参数
        isShowMoreAddress: false,
        isHideAddress: false,
        addressList: [], // 所有地址
        defaultAddress: null, // 默认地址
        addressIndex: null,
        addressModalActive: false,
        geoData: [],
        addressAction: 'add',
        mallType: 'club',
        currentEditAddress: {},
        activePickIndex: null, // 默认自提点下标
        selfPickUp: 0, // 自提点id
        selfPickupSiteList: [],  // 自提点列表
        partionId: null, // 是否有自提点
        orderGoodsSkuResps: [], // 订单详情列表
        receiverAddressId: 0, // 收货地址id
        buyerRemark: '', // 留言
        baseFreight: 0, // 快递费
        allTimeShow: true,
        workDayShow: false,
        weekDdayShow: false,
        ticketShow: false,
        noTicketShow: true,
        paymentMethod: 'ONLINE_PAYMENT', // 支付方式
        distributionde: 'UNLIMITED', // 配送时间
        invoiceInformation: 'WITHOUT_DRAW_BILL' // 发票信息
    },

    computed: {
      // 商品总价
      originTotalAmount: {
        deps: ['orderGoodsSkuResps', 'orderGoodsSkuResps.*.quantity', 'orderGoodsSkuResps.*.sellPrice'],
        get() {
          let orderGoodsSkuResps = this.get('orderGoodsSkuResps')
          let totalPrice = 0
          $.each(orderGoodsSkuResps, (index, item) => {
            totalPrice += item.quantity * item.sellPrice
          })
          return totalPrice
        }
      },

      finalTotalAmount: {
        deps: ['originTotalAmount', 'baseFreight'],
        get() {
            let originTotalAmount = this.get("originTotalAmount")
            // let baseFreight = this.get("baseFreight")
            // let finalTotalAmount = originTotalAmount + baseFreight
            let finalTotalAmount = originTotalAmount
            return finalTotalAmount
        }
    }
    },


    afterMount() {
      let preOrderData = this.get("preOrderData")
      Promise.all([
        getClubReceiverAddress(), // 获取地址详情
        getProvnceandCity(), // 省市区
        postClubPreOrder(preOrderData), // 获取商品详情列表
      ]).then(res => {
        let [address, geoData, preorder] = res
        // 获取地址详情
        let tempAddressList = this.get("addressList")
        // 将默认地址放在addressList第一个
        $.each(address.items, (index, item) => {
            if (item.isDefault === "YES") {
                this.set("receiverAddressId", item.id)
                this.set("defaultAddress", item)
            } else {
                tempAddressList.push(item)
                this.set("addressList", tempAddressList)
            }
        })
        if (!!this.get("defaultAddress")) {
            this.prepend("addressList", this.get("defaultAddress"))
        }

        if (geoData) {
            this.set('geoData', geoData)
        }

        // 获取商品详情列表
        if (preorder.code === "200") {
          this.set('orderGoodsSkuResps', preorder.data.orderGoodsSkuResps);
            if (!!preorder.data.orderGoodsSkuResps.takeTheirInfo) {
                this.set("partionId", preorder.data.orderGoodsSkuResps.takeTheirInfo.partionId)
                this.set("isHideAddress", true)
            } else {
                this.set("isHideAddress", false)
            }

        }
        this.set("isLoading", false)
      })
    },

    events: {
        // 设置默认收货地址
        cartSetDefaultAddress(event, data) {
            let currentIndex = data.currentIndex
            $.each(this.get("addressList"), (index, item) => {
                this.set(`addressList.${index}.isDefault`, "NO")
            })
            this.removeAt('addressList', currentIndex)
            this.prepend('addressList', data.data)
            this.set("addressList.0.isDefault", "YES")
            console.log(this.get("addressList"))
        },

        // 选择收获地址
        cartSelectAddress(event, data) {
            this.set("receiverAddressId", data.id)
        },

        // 编辑修改地址
        cartHandleEditAddress(e, data) {
            this.set('currentEditAddress', data.currentEditAddress)
            this.set('addressAction', data.addressAction)
            this.set("addressIndex", data.currentIndex)
            this.set('addressModalActive', data.addressModalActive)

        },

        // 修改地址
        modifyAddressSuccess(e, data) {
            if (data.data.isDefault === "YES") {
                $.each(this.get("addressList"), (index, item) => {
                    this.set(`addressList.${index}.isDefault`, "NO")
                })
                console.log(data.data)
                this.removeAt('addressList', data.addressIndex)
                this.prepend('addressList', data.data)
            } else {
                this.removeAt('addressList', data.addressIndex)
                this.insert('addressList', data.data, data.addressIndex)
            }

            console.log(this.get("addressList"))
            this.$alert('地址修改成功')
            // window.location.reload()
        },

        // 删除
        cartHandleDeleteAddress(e, data) {
            e.stop()
            this.removeAt('addressList', data.index)
        },

        // 添加
        addAddressSuccess(e, data) {
            this.$alert('地址添加成功')
            $.each(this.get("addressList"), (index, item) => {
                item.isDefault = "NO"
            })
            this.prepend('addressList', data.data)
            console.log(this.get("addressList"))
        },


        cartSelfPickSelect(event, data) {
            this.set("activePickIndex", data.activePickIndex)
            this.set("selfPickUp", data.value)
        }

    },

    methods: {
        // 新增收货地址
        openAddModal() {
            if (this.get('addressList').length >= 10) {
                this.$alert('仅能创建10个有效的收货地址')
                return
            }
            this.set('addressAction', 'add')
            this.set('addressModalActive', true)
        },
        // 获取自提点
        getSelfPickupSiteList() {
            let partionId = this.get("partionId")
            if (partionId != null) {
                getSelfPickupSite(partionId).then(res => {
                    this.set('selfPickupSiteList', res.items);
                })
            }
        },

        // 是否显示全部地址
        showAllAddress() {
            let isShowMoreAddress = this.get("isShowMoreAddress")
            this.set("isShowMoreAddress", !isShowMoreAddress)
        },

        allTimeSelect() {
            this.set("allTimeShow", true)
            this.set("workDayShow", false)
            this.set("weekDayShow", false)
            this.set("distributionde", "UNLIMITED")
        },

        workDaySelect() {
            this.set("allTimeShow", false)
            this.set("workDayShow", true)
            this.set("weekDayShow", false)
            this.set("distributionde", "WORKING_DAY")
        },

        weekDaySelect() {
            this.set("allTimeShow", false)
            this.set("workDayShow", false)
            this.set("weekDayShow", true)
            this.set("distributionde", "HOLIDAY")
        },

        hasTicket() {
            this.set("ticketShow", true)
            this.set("noTicketShow", false)
            this.set("invoiceInformation", "DRAW_BILL")

        },

        noHasTicket() {
            this.set("ticketShow", false)
            this.set("noTicketShow", true)
            this.set("invoiceInformation", "WITHOUT_DRAW_BILL")
        },

        // 提交订单
        sbmitOrder() {
            let isHideAddress = this.get("isHideAddress")
            let receiverAddressId = this.get("receiverAddressId")
            let buyerRemark = this.get("buyerRemark")
            let baseFreight = this.get("baseFreight")
            let originTotalAmount = this.get("originTotalAmount")
            let integralRemissionAmount = this.get("integralRemissionAmount")
            let preOrderData = this.get("preOrderData")

            if (!receiverAddressId) {
                this.$alert('请选择收货地址')
                return
            }

            let data
            if(isHideAddress) {
                data = {
                    "baseInfo": {
                        "buyerRemark": buyerRemark // 留言
                    },
                    "originTotalAmount": originTotalAmount, // 合计
                    "integralRemissionAmount": integralRemissionAmount, // 积分减免金额
                    "orderGoodsSkuResps": preOrderData.items
                }
            }else {
                data = {
                    "baseInfo": {
                        "receiverAddressId": receiverAddressId,  // 自提不传
                        "buyerRemark": buyerRemark // 留言
                    },
                    "baseFreight": baseFreight, // 快递 自提不传
                    "originTotalAmount": originTotalAmount, // 合计
                    "integralRemissionAmount": integralRemissionAmount, // 积分减免金额
                    "orderGoodsSkuResps": preOrderData.items
                }
            }

            console.log(data)
            postClubOrderConfirm(data).then(res => {
                console.log(res)
            if (res.code === "200") {
                let id = res.data.orderId
                window.location.href = `/club/order/${id}/pay`
            } else {
                this.$alert(res.message)
            }
            })
        }

    }

  })
})

