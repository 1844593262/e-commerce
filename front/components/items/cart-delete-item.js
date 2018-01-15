import { delCartSingle } from '../../api'
export default {
  template: `
    <div class="cart-share-cancle-con">
        <div
          class="cart-cancle"
          on-click="deleteSingle($event)">
          </div>
    </div>
  `,

  propTypes: {
    list: {
      type: 'object'
    },

    types: {
      type: 'string'
    },

    cartId: {
      type: 'numeric'
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

  methods: {
    deleteSingle(event) {
      let list = this.get("list")
      let types = this.get("types")
      let cartId = this.get("cartId")
      let fIndex = this.get("fIndex")
      let mIndex = this.get("mIndex")
      let sIndex = this.get("sIndex")

      let deleteGood = $(event.originalEvent.target).parents('.js-delete-good')

      list.types = types
      list.fIndex = fIndex
      list.mIndex = mIndex
      list.sIndex = sIndex
      list.deleted = true

      $(deleteGood).remove();

      // let laveSingleGood = $(event.originalEvent.target).parents('.js-shop').find(".js-delete-good")

      // if (laveSingleGood.length === 0) {
      //   $(event.originalEvent.target).parents('.js-shop').remove()
      // }

      this.fire('cartDeleteSingle', list)
      this.fire('updateFinalAmount')

      delCartSingle(cartId).then(res => {
       console.log("删除成功")
      })
    }

  }
}
