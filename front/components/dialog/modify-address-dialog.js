import {
  addAddress,
  modifyAddress,
  postClubAddress,
  putClubAddress
} from '../../api'

export default {
  template: `
    <Dialog model="value" title="{{ title }}" area="{{ size }}">
      <div class="add-address-form-section">
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">收货人</div>
            </div>
            <div class="form-control-wrapper">
              <input
                type="text"
                class="form-control fix-width"
                placeholder="输入中文名"
                model="model.receiverName">
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">电话号码</div>
            </div>
            <div class="form-control-wrapper">
              <input
                type="text"
                class="form-control fix-width"
                placeholder="手机或固定电话"
                model="model.receiverCellphone">
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">所在地区</div>
            </div>
            <div class="form-control-wrapper">
              <CityCascade items="{{ geoData }}" type="only-select"></CityCascade>
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">详细地址</div>
            </div>
            <div class="form-control-wrapper">
              <textarea type="text" class="form-control" model="model.receiverAddress"></textarea>
              <div class="checkbox">
                <label>
                  <input type="checkbox" model="isDefault"> 设为默认地址
                </label>
              </div>
            </div>
          </div>
        </div>
        <div class="form-horizontal">
          <div class="sd-control-label">
            <div class="content"></div>
          </div>
          <div class="form-control-wrapper">
            <div class="btn btn-primary btn-large action" on-click="handleAction()">确认</div>
            <div class="btn btn-gray btn-large action" on-click="closeModal()">取消</div>
          </div>
        </div>
      </div>
    </Dialog>
  `,

  data() {
    return {
      size: ['840px', '610px'],
      isDefault: true,
      model: {
        receiverName: '',
        receiverCellphone: '',
        receiverAddress: '',
        isDefault: 'YES'
      },
      addressId: ''
    }
  },

  propTypes: {
    value: {
      type: 'boolean',
      default: false
    },

    geoData: {
      type: 'array'
    },

    action: {
      type: 'string',
      default: 'add' // edit
    },

    defaultParam: {
      type: 'object'
    },

    addressIndex: {
      type: 'numeric'
    },

    mallType: {
      type: 'string',
      default: 'general' // club
    }
  },

  watchers: {
    value(val) {
      if (!val) {
        this.set('isDefault', true)
        this.set('model', {
          receiverName: '',
          receiverCellphone: '',
          receiverAddress: '',
          isDefault: 'YES',
          cityCode: '',
          provinceCode: ''
        })
      }else {
        this.defaultSet(this.get("defaultParam"))
      }
    },

    isDefault(val) {
      let value = val ? 'YES' : 'NO'
      this.set('model.isDefault', value)
    },

    defaultParam(val) {
      if (val && this.get('action') === 'edit') {
        this.defaultSet(val)
      }
    }
  },

  computed: {
    title() {
      return this.get('action') === 'add'
        ? '新建地址'
        : '编辑地址'
    }
  },

  events: {
    geoUpdated(e, data) {
      this.set('model.provinceCode', data.value[0])
      this.set('model.cityCode', data.value[1])
    }
  },

  methods: {
    handleAction() {
      if (!this.get('model.receiverName') && !this.get('model.receiverCellphone') && !this.get('model.receiverAddress')) {
        this.$alert('请填写完整信息')
        return
      }

      if (this.get('action') === 'add') {
        if (this.get('mallType') === 'general') {
          addAddress(this.get('model')).then(res => {
            if (res) {
              this.set('value', false)
              this.fire('addAddressSuccess', { data: res })
            } else {
              this.$alert('增加地址失败')
            }
          })
        } else {
          postClubAddress(this.get('model')).then(res => {
            if (res) {
              this.set('value', false)
              this.fire('addAddressSuccess', { data: res })
            } else {
              this.$alert('增加地址失败')
            }
          })
        }
      } else {
        if (this.get('mallType') === 'general') {
          modifyAddress(this.get('addressId'), this.get('model')).then(res => {
            if (res) {
              this.set('value', false)
              this.fire('modifyAddressSuccess', {
                data: res,
                addressIndex: this.get("addressIndex")
              })
            }
          })
        } else {
          putClubAddress(this.get('addressId'), this.get('model')).then(res => {
            if (res) {
              this.set('value', false)
              this.fire('modifyAddressSuccess', {
                data: res,
                addressIndex: this.get("addressIndex")
              })
            }
          })
        }

      }
    },

    closeModal() {
      this.set('value', false)
    },

    defaultSet(val) {
      let {
          id,
        receiverName,
        receiverCellphone,
        receiverAddress,
        isDefault,
        cityCode,
        provinceCode
        } = val

      this.set('model', {
        receiverName,
        receiverCellphone,
        receiverAddress,
        isDefault,
        cityCode,
        provinceCode
      })

      this.set('addressId', id)
      this.set('isDefault', val.isDefault === 'YES')
    }
  }
}
