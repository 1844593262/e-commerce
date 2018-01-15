export default {
  template: `
    <div class="tab-content">
      {{$children}}
    </div>
  `,

  propTypes: {
    value: {
      type: 'string'
    }
  },

  // watchers: {
  //   value(val) {
  //     if (this.$node.children.length) {
  //       this.$node.children.forEach(item => {
  //         if (item.tag === 'TabPane' && item.attrs.name === val) {
  //           item.attrs.active = true
  //         }
  //       })
  //     }
  //   }
  // }
}
