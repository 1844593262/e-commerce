import { delCartSingle, putCartQuantity } from '../../api'
export default {
  template: `
    <tbody class="cart-item js-delete-good js-good-checksingle">
        <tr class="cart-con-row">
            <td class="cart-check">
                <input
                    type="checkbox"
                    checked="{{ list.checked }}"
                    class="js-single-btn default-single-btn"
                    on-click="checkSingle($event)">
            </td>
            <td class="shopping-show-con">
                <a href="/goods/{{list.goodsId}}" class="goods-show pull-left">
                <img src="{{ list.mediaUrl }}">
                </a>
            </td>
            <td>
                <div class="cart-con-descr">
                    <span class="cart-shops-name">{{ list.goodsName }}</span>
                    <div class="cart-standard">
                        {{#each list.goodsSkuAttrList }}
                            <span class="cart-standard-attr">{{ this.attrValue }}</span>
                        {{/each}}
                    </div>
                </div>
            </td>
            <td class="cart-new-old-price">
                <div class="newprice">
                    ￥{{ currency(list.sellPrice, 2) }}
                </div>
                <div class="oldprice">
                    ￥{{ currency(list.tagPrice, 2) }}
                </div>
            </td>
            <td class="cart-number-account">
                <CartNumItem
                    cartId="{{list.shoppingCartId}}"
                    quantity="{{ list.quantity }}">
                    </CartNumItem>
            </td>
            <td class="cart-total-price-new-old">
                <div class="cart-total-price">
                    ￥{{ currency(list.sellPrice * list.quantity, 2) }}
                </div>
                <div class="cart-total-old-price">
                    ￥{{ currency(list.tagPrice * list.quantity, 2) }}
                </div>
                <div class="cart-alread-join-con" style="display: none">
                    <div class="cart-alread-join">
                        促销活动
                        <span class="cart-arrow"></span>
                    </div>
                    <div class="cart-all-item">
                        <ul>
                            <li class="clearfix item">
                                <div class="sale-product">卖家促销:
                                    <span>满300减100</span>
                                </div>
                                <div class="cart-coupon pull-left">
                                    优惠:
                                    <span class="cart-orange">￥100.00</span>
                                </div>
                            </li>
                        </ul>
                    </div>
                </div>
            </td>
            <td class="cart-share-cancle">
               <CartDeleteItem
                    cartId="{{ list.shoppingCartId }}"
                    types="{{ types }}"
                    fIndex="{{ fIndex }}"
                    sIndex="{{ sIndex }}"
                    list="{{ list }}">
                    </CartDeleteItem>
            </td>
        </tr>
    </tbody>
  `,

  propTypes: {
    list: {
      type: 'object'
    },

    types: {
      type: 'string'
    },

    fIndex: {
      type: 'numeric'
    },

    mIndex: {
      type: 'numeric'
    },

    sIndex: {
      type: 'numeric'
    }
  },

  events: {
    quantityChange(e, data) {
        this.set('list.quantity', data.value)
    },
  },

  methods: {
    checkSingle(event) {
        let list = this.get("list")
        let fIndex = this.get("fIndex")
        // let isCheckedSingle = list.checked

        let singleBtn = $(event.originalEvent.target) // 单选按钮
        let isCheckedSingle = singleBtn.prop("checked") // 单选按钮点击后状态

        let singleGoods = singleBtn.parents(".js-delete-good") // 单选商品
        let checkShop = singleBtn.parents(".js-shop") // 单选商店
        let allBtn = singleBtn.parents(".js-shop").find(".js-all-btn") // 商店全选按钮

        if (isCheckedSingle) { // 选中
            $(singleBtn).addClass("js-single-btn")
            $(singleGoods).addClass("js-good-checksingle")
        }else { // 未选中
            $(singleBtn).removeClass("js-single-btn")
            $(singleGoods).removeClass("js-good-checksingle")
        }

        let defaultSingleBtns = checkShop.find(".default-single-btn") // 默认的单选按钮伪数组
        let selectSingleBtns = checkShop.find(".js-single-btn") // 选择的按钮伪数组

        console.log(selectSingleBtns.length, defaultSingleBtns.length)
        // 单选长度=店铺下商品数量， 全选按钮选中
        if (selectSingleBtns.length === defaultSingleBtns.length) {
            $(allBtn).prop("checked", true)
            $(checkShop).addClass("js-shop-check")
        } else { // 不等，全选按钮取消选中
            $(allBtn).prop("checked", false)
            $(checkShop).removeClass("js-shop-check")
        }

        list.fIndex = fIndex;
        list.checked = isCheckedSingle;

        this.fire('cartCheckSingle', list)
        this.fire('updateFinalAmount')
    }
  }
}
