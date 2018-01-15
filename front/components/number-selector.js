export default {
  template: `
    <div class="mod-number-selector">
      <div class="item minus" on-click="countMinus()">-</div>
      <span class="item input">{{ count }}</span>
      <div class="item plus" on-click="countPlus()">+</div>
    </div>
  `,

  propTypes: {
    count: {
      type: 'numeric',
      value: 1
    }
  },

  methods: {
    countMinus() {
      let count = this.get('count')
      if (count > 1) {
        this.set('count', --count)
        this.fire('numberSelectorChange', { value: this.get('count') })
      }
    },

    countPlus() {
      let count = this.get('count')
      this.set('count', ++count)
      this.fire('numberSelectorChange', { value: this.get('count') })
    }
  }
}
