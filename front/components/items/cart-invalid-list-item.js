import { cartSingleDelect } from '../../api'
export default {
  template: `
    <tr class="cart-con-row">
        <td class="cart-check">
            <input type="checkbox" checked>
        </td>
        <td class="shopping-show-con">
            <a href="#" class="goods-show pull-left shopping-jumax-show-con">
                <img src="{{ invalidList.mediaUrl }}" alt="">
                <div class="shopping-cart-integral">
                    <img src="../../static/image/tips_shixiao_dis.png" alt="">
                </div>
            </a>
        </td>
        <td>
            <div class="cart-con-descr pull-left">
                <span class="cart-shops-name">{{ invalidList.goodsName }}</span>
            </div>
        </td>
        <td class="cart-new-old-price cart-new-old-price-con">
            <div class="newprice">￥{{ currency(invalidList.sellPrice, 2) }}</div>
        </td>
        <td class="cart-number-account">
            <div class="cart-number-center clearfix">
                <span class="cart-minus pull-left"></span>
                <span class="cart-input pull-left">{{ invalidList.quantity }}</span>
                <span class="cart-plus pull-left"></span>
            </div>
        </td>
        <td class="cart-total-price-new-old-con cart-total-price-new-old">
            <div class="cart-total-price">￥{{ currency(invalidList.tagPrice, 2) }}</div>
        </td>
        <td class="cart-share-cancle">
            <div class="cart-share-cancle-con">
                <div class="cart-cancle"></div>
            </div>
        </td>
    </tr>
  `,

  propTypes: {
    invalidList: {
      type: 'object'
    },

    findex: {
      type: 'numeric'
    },

    sindex: {
      type: 'numeric'
    }
  },

  methods: {

  }
}
