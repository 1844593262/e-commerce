export default {
  template: `
    <span class="integral-input-f">
        <input
          class="integral-input"
          type="text"
          on-change="memberPointChange()"
          model="memberPoint">
        <span class="integral-input-r">积分</span>
    </span>
  `,

  propTypes: {

    memberPoint: {
      type: 'numeric'
    }

  },

  watchers: {
    // memberPoint(val) {
    //   if (!/^[0-9]*$/.test(val)) {
    //     this.$alert("请输入数字")
    //     return
    //   }
    //   // this.fire('cartMemberPointChange', { value: Number(this.get("memberPoint")) })
    //   // this.fire('updateFinalAmount')
    // }
  },

  methods: {
    memberPointChange() {
      // this.fire('cartMemberPoint', { value: Number(this.get("memberPoint"))})
      if (!/^[0-9]*$/.test(this.get("memberPoint"))) {
        this.$alert("请输入数字")
        return
      }
      this.fire('cartMemberPointChange', { value: this.get("memberPoint") })
      this.fire('updateFinalAmount')
    }
  }
}
