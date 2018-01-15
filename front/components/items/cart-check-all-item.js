export default {
  template: `
    <div class="all-choice-inp">
        <input
          type="checkbox"
          checked="{{ currentGoodsList.checked }}"
          class="js-all-btn"
          on-click="checkAll($event)">
    </div>
  `,

  propTypes: {
    currentGoodsList: {
      type: 'object'
    },
    fIndex: {
      type: 'numeric'
    }
  },

  methods: {
    checkAll(event) {
      let data = this.get("currentGoodsList")
      let fIndex = this.get("fIndex")
      let checkAllBtn = $(event.originalEvent.target)
      let checkShop = checkAllBtn.parents('.js-shop') // 商店
      let isCheckedAll = checkAllBtn.prop("checked") // 全选按钮点击后的选中状态
      // let isCheckedAll = data.checked
      // let checkAllGood = checkAllBtn.parents(".js-check-good") // 商品
      data.fIndex = fIndex
      data.checked = isCheckedAll

      // let checkGoods = $(".js-check-good")[fIndex]
      // $(checkAllGood).find('.default-single-btn').prop("checked", !isCheckedAll)

      // 商店下 全选和单选按钮改变状态
      $(checkShop).find('.default-single-btn').each(function () {
        $(this).prop("checked", isCheckedAll)
        if (isCheckedAll) {
          $(this).addClass("js-single-btn")

        }else {
          $(this).removeClass("js-single-btn")
        }
      })

      if (isCheckedAll) {
        $(checkShop).addClass("js-shop-check")
        $(checkShop).find('.js-delete-good').addClass("js-good-checksingle")

      } else {
        $(checkShop).removeClass("js-shop-check")
        $(checkShop).find('.js-delete-good').removeClass("js-good-checksingle")
      }
      // if ($(checkAllBtn).prop("checked")) {
      //   $(checkShop).removeClass("js-shop-check").find('.check-common-btn').prop("checked", false)
      //   $(checkAllGood).find('.js-delete-good').removeClass("js-good-checksingle")
      // } else {
      //   $(checkShop).addClass("js-shop-check").find('.check-common-btn').prop("checked", true)
      //   $(checkAllGood).find('.js-delete-good').addClass("js-good-checksingle")
      // }

      if (!!data.items && data.items.length > 0) {
        $.each(data.items, (index, item) => {
          item.checked = isCheckedAll
        })
      }

      if (!!data.activityItems && data.activityItems.length > 0) {
        $.each(data.activityItems, (fIndex, fItem) => {
          $.each(fItem.items, (sIndex, item) => {
            item.checked = isCheckedAll
          })
        })
      }

      if (!!data.generalItems && data.generalItems.length > 0) {
        $.each(data.generalItems, (index, item) => {
          item.checked = isCheckedAll
        })
      }

      this.fire('cartCheckAll', data)
      this.fire('updateFinalAmount')
    },

  }
}
