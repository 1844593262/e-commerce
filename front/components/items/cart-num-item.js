import { putCartQuantity } from '../../api'
export default {
  template: `
    <div class="cart-number-center clearfix">
      <span
          class="cart-minus pull-left"
          on-click="countMinus()"></span>
      <input class="cart-input pull-left"
          type="text"
          model="quantity">
      <span
          class="cart-plus pull-left"
          on-click="countPlus()"></span>
    </div>
  `,

  propTypes: {

    cartId: {
      type: 'numeric'
    },

    quantity: {
      type: 'numeric'
    }

  },

  methods: {
    countMinus() {
      let quantity = this.get('quantity')
      let cartId = this.get('cartId')
      if (quantity > 1) {
        this.set('quantity', --quantity)
        this.fire('quantityChange', { value: this.get('quantity') })
        this.fire('updateFinalAmount')
      } else {
        this.$alert("数量最小为1")
      }
      putCartQuantity({ "quantity": quantity }, cartId).then(res => {
        //
      })
    },

    countPlus() {
      let quantity = this.get('quantity')
      let cartId = this.get('cartId')
      // TODO 不能超过最大库存
      this.set('quantity', ++quantity)

      this.fire('quantityChange', { value: this.get('quantity') })
      this.fire('updateFinalAmount')
      putCartQuantity({ "quantity": quantity}, cartId).then(res => {
        //
      })
    }

  }
}
