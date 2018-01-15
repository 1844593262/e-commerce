import {
  addAddress,
  modifyAddress,
  postClubAddress,
  putClubAddress
} from '../../api'

export default {
  template: `
    <Dialog
      model="value"
      title="{{ title }}"
      subTitle="{{ subTitle }}"
      titleType="{{ titleType }}"
      area="{{ size }}">
      <div class="wechat-pay-section">
        <div>
          <div class="wechat-text">
            <img src="/app/public/image/wechat.png">微信支付
          </div>
          <div id="wxQrCodeId" class="wechat-qrcode"></div>
        </div>

        <div class="btn btn-gray btn-large action" on-click="closeModal()">取消并返回</div>
      </div>
    </Dialog>
  `,

  data() {
    return {
      size: ['840px', '610px'],
    }
  },

  propTypes: {
    value: {
      type: 'boolean',
      default: false
    },

    title: {
      type: 'string',
    },

    defaultParam: {
      type: 'object'
    },

    titleType: {
      type: 'string',
    },

    subTitle: {
      type: 'object',
    }
  },

  watchers: {
  //   value(val) {
  //     if (!val) {
  //       this.set('isDefault', true)
  //       this.set('model', {
  //         receiverName: '',
  //         receiverCellphone: '',
  //         receiverAddress: '',
  //         isDefault: 'YES',
  //         cityCode: '',
  //         provinceCode: ''
  //       })
  //     } else {
  //       this.defaultSet(this.get("defaultParam"))
  //     }
  //   },

  //   isDefault(val) {
  //     let value = val ? 'YES' : 'NO'
  //     this.set('model.isDefault', value)
  //   },

  //   defaultParam(val) {
  //     if (val && this.get('action') === 'edit') {
  //       this.defaultSet(val)
  //     }
  //   }
  // },

  // computed: {
  //   title() {
  //     return this.get('action') === 'add'
  //       ? '新建地址'
  //       : '编辑地址'
  //   }
  },

  events: {
    // geoUpdated(e, data) {
    //   this.set('model.provinceCode', data.value[0])
    //   this.set('model.cityCode', data.value[1])
    // }
  },

  methods: {
    // handleAction() {
    //   if (!this.get('model.receiverName') && !this.get('model.receiverCellphone') && !this.get('model.receiverAddress')) {
    //     this.$alert('请填写完整信息')
    //     return
    //   }

    //   if (this.get('action') === 'add') {
    //     if (this.get('mallType') === 'general') {
    //       addAddress(this.get('model')).then(res => {
    //         if (res) {
    //           this.set('value', false)
    //           this.fire('addAddressSuccess', { data: res })
    //         } else {
    //           this.$alert('增加地址失败')
    //         }
    //       })
    //     } else {
    //       postClubAddress(this.get('model')).then(res => {
    //         if (res) {
    //           this.set('value', false)
    //           this.fire('addAddressSuccess', { data: res })
    //         } else {
    //           this.$alert('增加地址失败')
    //         }
    //       })
    //     }
    //   } else {
    //     if (this.get('mallType') === 'general') {
    //       modifyAddress(this.get('addressId'), this.get('model')).then(res => {
    //         if (res) {
    //           this.set('value', false)
    //           this.fire('modifyAddressSuccess', {
    //             data: res,
    //             addressIndex: this.get("addressIndex")
    //           })
    //         }
    //       })
    //     } else {
    //       putClubAddress(this.get('addressId'), this.get('model')).then(res => {
    //         if (res) {
    //           this.set('value', false)
    //           this.fire('modifyAddressSuccess', {
    //             data: res,
    //             addressIndex: this.get("addressIndex")
    //           })
    //         }
    //       })
    //     }

    //   }
    // },

    closeModal() {
      this.set('value', false)
    },

    // defaultSet(val) {
    //   let {
    //       id,
    //     receiverName,
    //     receiverCellphone,
    //     receiverAddress,
    //     isDefault,
    //     cityCode,
    //     provinceCode
    //     } = val

    //   this.set('model', {
    //     receiverName,
    //     receiverCellphone,
    //     receiverAddress,
    //     isDefault,
    //     cityCode,
    //     provinceCode
    //   })

    //   this.set('addressId', id)
    //   this.set('isDefault', val.isDefault === 'YES')
    // }
  }
}
