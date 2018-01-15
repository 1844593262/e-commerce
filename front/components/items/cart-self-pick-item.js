export default {
  template: `
    <li>
        <span
            class="shop-name cart-btn {{#if currentIndex === activeIndex }}select{{/if}}"
            on-click="selfPickSelect($event)">
            {{ list.address }}</span>
        <span class="shop-address">{{ list.selfPickupSiteName }}</span>
        （电话：<span class="shop-phone">{{ list.telephone }}</span>）
    </li>
  `,

  propTypes: {

    list: {
      type: 'object'
    },

    currentIndex: {
      type: 'numeric'
    },

    activeIndex: {
      type: 'numeric'
    }

  },

  methods: {
    selfPickSelect(event) {
      $(event.originalEvent.target).addClass("select").siblings(".shop-name").removeClass("select")

      // 点击选中
      let data = {
        activeIndex: this.get("currentIndex"),
        value: 1
      }

      this.fire('cartSelfPickSelect', data)
      this.fire('updateFinalAmount')
    }

  }
}
