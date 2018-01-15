import '../boot'
import {
    getreceiverAddress,
    postCartPreOrder,
    getSelfPickupSite,
    getMemberProfile,
    getMemberPointRule,
    postCartOrderAmount,
    postCartOrderConfirm,
    getProvnceandCity
} from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-shopping-cart-submit-wrapper',
    template: `
    <div class="cart-order-submit {{#if isLoading}}hidden{{/if}}">
        <div class="receive-address-item">
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

            <div class="pull-right">
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
                <div class="back-cart pull-right">
                    <a href="/member/cart">返回购物车修改 > </a>
                </div>
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
                                        <img src="{{ this.mediaUrl }}">
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
                                    ￥<span class="product-item-common">{{ currency(this.sellPrice, 2) }}</span>
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
                                    <span class="product-total-price">{{ currency(this.sellPrice, 2) * this.quantity }}</span>
                                </td>
                            </tr>
                        {{/each}}
                    </tbody>
                </table>
            </div>
        </div>

        <div class="order-submit-item clearfix">
            <div class="order-submit-item-l pull-left">

              {{#if isShowMemberPoint.pointInstead }}
                <div class="self-integral">
                    <div class="self-integral-t">
                        <span class="integral-title">我的可用积分</span>
                        <span class="integral-num">{{ pointAccountTotal }}</span>
                    </div>
                    <div class="self-integral-b">
                        <CartMemberPointItem
                            memberPoint="{{ memberPoint }}">
                            </CartMemberPointItem>
                        <span class="integral-discout">
                            抵扣<span class="discount-money">{{memberPoint/isShowMemberPoint.oneCashInsteadPoint }}</span>元
                        </span>
                        <span class="integral-tips">每{{ isShowMemberPoint.oneCashInsteadPoint }}积分可抵扣1元</span>
                    </div>
                </div>
              {{/if}}

              {{#if myCouponInfos.length }}
                <div class="self-coupon">
                    <div class="clearfix">
                        <div class="pull-left">
                            <span class="coupon-title">我的可用优惠券</span>
                            <span class="coupon-num">{{ myCouponInfos.length }}</span>
                            <span class="coupon-num-unit">张</span>
                            <span class="coupon-tips">一个订单只能使用一个优惠券</span>
                        </div>
                        <div class="pull-right" style="display: none;">分页</div>
                    </div>

                    <ul class="self-coupon-list clearfix">
                        {{#each myCouponInfos:index }}
                            <CartCouponItem
                                couponList="{{ this }}"
                                currentIndex="{{ index }}"
                                activeIndex="{{ activeIndex }}"
                                on-selectCoupon="cartSelectCoupon">
                                </CartCouponItem>
                        {{/each}}
                    </ul>
                </div>
              {{/if}}

                <div class="separated-line"></div>

                <div class="self-ticket-leavemsg">
                    <div class="self-ticket">
                        <span class="ticket-title">发票信息</span>
                        <span class="ticket-btn cart-btn {{#if noTicketShow}}select{{/if}}" on-click="noHasTicket()">不开发票</span>
                        <span class="ticket-btn cart-btn {{#if ticketShow}}select{{/if}}" on-click="hasTicket()">我要开发票</span>
                    </div>
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
                            ￥<span>{{ currency(conputedMount.originTotalAmount, 2) }}</span>
                        </div>
                    </li>
                    <li>
                        <div class="discout-title pull-left">快递费用：</div>
                        <div class="pull-right discout-money">
                            ￥<span>{{ currency(conputedMount.baseFreight, 2) }}</span>
                        </div>
                    </li>
                    <li>
                        <div class="discout-title pull-left">积分抵扣：</div>
                        <div class="pull-right discout-money">
                            ￥{{#if !!(conputedMount.integralRemissionAmount) }}-{{/if}}
                            <span>{{ currency(conputedMount.integralRemissionAmount, 2) }}</span>
                        </div>
                    </li>
                    <li>
                        <div class="discout-title pull-left">优惠券减免：</div>
                        <div class="pull-right discout-money">
                            ￥{{#if !!(conputedMount.couponDiscountAmount) }}-{{/if}}
                            <span>{{ currency(conputedMount.couponDiscountAmount, 2) }}</span>
                        </div>
                    </li>
                    <li>
                        <div class="discout-title pull-left">自提优惠：</div>
                        <div class="pull-right discout-money">
                            ￥{{#if !!conputedMount.selfDiscountAmount }}-{{/if}}
                            <span>{{ currency(conputedMount.selfDiscountAmount, 2) }}</span>
                        </div>
                    </li>
                    <li>
                        <div class="discout-title pull-left">活动减免：</div>
                        <div class="pull-right discout-money">
                            ￥{{#if !!conputedMount.activityDiscountAmount }}-{{/if}}
                            <span>{{ currency(conputedMount.activityDiscountAmount, 2) }}</span>
                        </div>
                    </li>
                </ul>

                <div class="order-submit-bottom clearfix">
                    <div class="item-pay-submit">
                        <div class="item-pay">
                            <div class="item-pay-title pull-left">应付金额：</div>
                            <div class="item-pay-num pull-right">
                                ￥<span>{{ currency(conputedMount.finalTotalAmount, 2) }}</span>
                            </div>
                        </div>
                        <div class="order-submit-btn" on-click="sbmitOrder()">提交订单</div>
                    </div>

                    <div class="order-buyer-info-detail">
                    {{#each addressList }}
                        {{#if this.isDefault === "YES"}}
                            <div class="buyer-info-info">
                                <span class="buyer-name">{{ this.receiverName }}</span>
                                <span class="buyer-phone">{{ this.receiverCellphone }}</span>
                            </div>

                            <div class="buyer-address">
                                <span>{{ this.provinceName }}</span>
                                <span>{{ this.cityName }}</span>
                                <span>{{ this.countyName }}</span>
                                <span>{{ this.receiverAddress }}</span>
                            </div>
                        {{/if}}
                    {{/each}}
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
      isComputedMount: true,
      preOrderData: JSON.parse(window.__pageInitData__.preOrderList), // 订单详情参数
      isShowMoreAddress: false,
      addressList: [], // 所有地址
      defaultAddress: null, // 默认地址
      addressIndex: null,
      addressModalActive: false,
      geoData: [],
      addressAction: 'add',
      mallType: 'general',
      currentEditAddress: {},
      memberPoint: '', // 输入的会员积分
      activePickIndex: null, // 默认自提点下标
      selfPickUp: 0, // 自提点id
      selfPickupSiteList: [],  // 自提点列表
      myCouponInfos: [], // 优惠券列表
      partionId: null, // 是否有自提点
      orderGoodsSkuResps: [], // 订单详情列表
      pointAccountTotal: '', // 我的可用积分总额
      isShowMemberPoint: { // 是否显示我的积分栏目
          oneCashInsteadPoint: 0 // 1元等价积分
      },
      conputedMount: {
          originTotalAmount: 0,
          activityDiscountAmount: 0,
          baseFreight: 0,
          selfDiscountAmount: 0,
          integralRemissionAmount: 0,
          couponDiscountAmount: 0,
          finalTotalAmount: 0
      }, // 计算后的金额
      activeIndex: null, // 默认优惠券li的选中下标
      receiverAddressId: 0, // 收货地址id
      couponId: 0, // 优惠券id
      buyerRemark: '', // 留言
      allTimeShow: true,
      workDayShow: false,
      weekDdayShow: false,
      ticketShow: false,
      noTicketShow: true,
      paymentMethod: 'ONLINE_PAYMENT', // 支付方式
      distributionde: 'UNLIMITED', // 配送时间
      invoiceInformation: 'WITHOUT_DRAW_BILL' // 发票信息
    },

    afterMount() {
        let preOrderData = this.get("preOrderData")
        Promise.all([
            getreceiverAddress(), // 获取地址详情
            getProvnceandCity(), // 省市区
            postCartPreOrder(preOrderData), // 获取商品详情列表
            getMemberPointRule(), // 是否显示我的积分模块
            getMemberProfile() // 获取我的积分总额

        ]).then(res => {
            let [address, geoData, preorder, pointRule, profile] = res

            // 获取地址详情
            let tempAddressList = this.get("addressList")
            // 将默认地址放在addressList第一个
            $.each(address.items, (index, item) => {
                if (item.isDefault === "YES") {
                    this.set("receiverAddressId", item.id)
                    this.set("defaultAddress", item)
                }else {
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
                this.set('orderGoodsSkuResps', preorder.data.orderGoodsSkuResps)
                this.set('conputedMount.activityDiscountAmount', preorder.data.activityDiscountAmount)

                if (preorder.data.myCouponInfos.length) {
                    this.set('myCouponInfos', preorder.data.myCouponInfos)
                }

                if (!!preorder.data.takeTheirInfo) {
                    this.set("partionId", preorder.data.takeTheirInfo.partionId )
                }

                let totalPrice = 0
                $.each(preorder.data.orderGoodsSkuResps, (index, item) => {
                    totalPrice += item.quantity * item.sellPrice
                })
                this.set("conputedMount.originTotalAmount", totalPrice)
                this.set("conputedMount.finalTotalAmount", totalPrice)
            }

            // 是否显示我的积分模块
            this.set("isShowMemberPoint", pointRule)

            // 获取我的积分总额
            this.set("pointAccountTotal", profile.pointAccount)

            this.set("isLoading", false)
        })
        // 获取自提点
        this.getSelfPickupSiteList()
    },

    //   watchers: {
    //       'addressList.*.isDefault': function (newValue, oldValue, keypath, index) {
    //           console.log(newValue, oldValue, keypath, index)
    //           $.each(this.get("addressList"), (i, e) => {
    //               this.set(`addressList.${i}.isDefault`, "NO")
    //           })
    //           this.set(`addressList.${index}.isDefault`, "YES")
    //       }


    //   },

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

        // 编辑修改
        cartHandleEditAddress(e, data) {
            this.set('currentEditAddress', data.currentEditAddress)
            this.set('addressAction', data.addressAction)
            this.set("addressIndex", data.currentIndex)
            this.set('addressModalActive', data.addressModalActive)

        },

        modifyAddressSuccess(e, data) {
            if (data.data.isDefault === "YES") {
                $.each(this.get("addressList"), (index, item) => {
                    this.set(`addressList.${index}.isDefault`, "NO")
                })
                console.log(data.data)
                this.removeAt('addressList', data.addressIndex)
                this.prepend('addressList', data.data)
            }else {
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
        },

        // checkMemberPoint(event, data) {
        //     let memberPoint = data.value
        //     let oneCashInsteadPoint = this.get("isShowMemberPoint.oneCashInsteadPoint")
        //     let pointAccountTotal = this.get("pointAccountTotal")

        //     if (memberPoint % oneCashInsteadPoint != 0) {
        //         this.$alert("请输入" + oneCashInsteadPoint + "的整数倍")
        //         this.set("memberPoint", '')
        //         this.set("isComputedMount", false)
        //         return
        //     }

        //     if (memberPoint > pointAccountTotal) {
        //         this.$alert("输入积分不可大于我的可用积分")
        //         this.set("memberPoint", '')
        //         this.set("isComputedMount", false)
        //         return
        //     }

        // },

        cartMemberPointChange(event, data) {
            console.log(data.value, "积分")
            let memberPoint = data.value
            let oneCashInsteadPoint = this.get("isShowMemberPoint.oneCashInsteadPoint")
            let pointAccountTotal = this.get("pointAccountTotal")

            if (memberPoint % oneCashInsteadPoint != 0) {
                this.$alert("请输入" + oneCashInsteadPoint + "的整数倍")
                this.set("memberPoint", '')
                this.set("isComputedMount", false)
                return
            }

            if (memberPoint > pointAccountTotal) {
                this.$alert("输入积分不可大于我的可用积分")
                this.set("memberPoint", '')
                this.set("isComputedMount", false)
                return
            }

            this.set("isComputedMount", true)
            this.set("memberPoint", memberPoint)
        },

        cartSelectCoupon(event, data) {
            this.set("activeIndex", data.activeIndex)
            this.set("couponId", data.myCouponId)
        },

        updateFinalAmount(e) {
            e.stop()
            let isComputedMount = this.get("isComputedMount")
            if (isComputedMount) {
                let data = {
                    "baseInfo": {
                        "memberPoint": Number(this.get("memberPoint")),
                        "selfPickUp": this.get("selfPickUp"),
                        "couponId": this.get("couponId")
                    },
                    "orderGoodsSkuResps": this.get("preOrderData").items
                }

                postCartOrderAmount(data).then(res => {
                    if (res.code === "200") {
                        this.set("conputedMount", res.data)
                    }else {
                        this.$alert(res.message)
                    }
                })
            }
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
            if(partionId != null) {
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
            let receiverAddressId = this.get("receiverAddressId") // 收货地址id
            let selfPickUp = this.get("selfPickUp")
            let couponId = this.get("couponId") // 优惠券id
            let buyerRemark = this.get("buyerRemark") // 留言
            let paymentMethod = this.get("paymentMethod") // 支付方式
            let distributionde = this.get("distributionde") // 配送方式
            let invoiceInformation = this.get("invoiceInformation") // 是否开发票


            if(!receiverAddressId) {
                this.$alert('请选择收货地址')
                return
            }

            let data = {
                "baseInfo": {
                    "memberPoint": Number(this.get("memberPoint")),
                    "receiverAddressId": receiverAddressId,
                    "selfPickUp": selfPickUp,
                    "couponId": couponId,
                    "buyerRemark": buyerRemark,
                    "paymentMethod": paymentMethod,
                    "distributionde": distributionde,
                    "invoiceInformation": invoiceInformation
                },
                "orderGoodsSkuResps": this.get("preOrderData").items
            }

            postCartOrderConfirm(data).then(res => {
            console.log(res)
            if (res.code === "200") {
                let id = res.data.orderId
                window.location.href = `/order/${id}/pay`
            } else {
                this.$alert(res.message)
            }
            })
        }

    },

    filters: {
      checkRuleTypeFilter(data) {
        switch (data) {
          case 'FULL_AMOUNT_SUB':
            return '金额满减'
            break;
          case 'FULL_NUM_SUB':
            return '数量满减'
            break;
          case 'FULL_AMOUNT_DISCOUNT':
            return '金额折扣'
            break;
          case 'DIRECT_REDUCTION':
            return '直减'
            break;
          case 'FULL_AMOUNT_FREE_SHIPPING':
            return '金额免邮'
            break;
        }
      }

    }

  })
})

