
import {
  delAddress,
  modifyAddress,
  putClubAddress,
  delClubAddress
 } from '../../api'
export default {
  template: `
    <li on-click="selectAddress(list)">
        <div class="address-left-info pull-left">
            <span>寄送至</span>
            <span>{{ list.provinceName }}</span>
            <span>{{ list.cityName }}</span>
            <span>{{ list.countyName }}</span>
            <span>{{ list.receiverAddress }}</span>
            （<span>{{ list.receiverName }} 收</span>）
            <span>{{ list.receiverCellphone }}</span>
            {{#if list.isDefault === "YES"}}
            <span class="address-default">默认地址</span>
            {{/if}}
        </div>
        <div class="address-right-btn pull-right">
            {{#if list.isDefault === "NO"}}
            <a class="address-default-set common-btn" on-click="setDefaultAddress(list, currentIndex)">设为默认</a>
            {{/if}}
            <a class="address-change common-btn" on-click="handleEditAddress($event, list)">修改</a>
            <a class="address-delete common-btn" on-click="handleDeleteAddress(list.id, currentIndex)">删除</a>
        </div>
    </li>
  `,

  propTypes: {

    list: {
      type: 'object'
    },

    currentIndex: {
      type: 'numeric'
    },

    currentEditAddress: {
      type: 'object'
    },

    addressAction: {
      type: 'string'
    },

    addressModalActive: {
      type: 'boolean'
    },

    mallType: {
      type: 'string',
      default: 'general' // club
    }

  },

  methods: {
    // 设置默认收货地址
    setDefaultAddress(data, currentIndex) {
      this.set("list.isDefault", "YES")
      this.fire('cartSetDefaultAddress', {
        data: this.get("list"),
        currentIndex: currentIndex
      })

      if (this.get("mallType") === "general") {
        modifyAddress(data.id, {
          isDefault: 'YES'
        }).then(res => {
          if (res) {
            // this.$alert('更新成功')
            // setTimeout(() => {
            //   window.location.reload()
            // }, 500)
          }
        })
      } else {
        putClubAddress(data.id, {
          isDefault: 'YES'
        }).then(res => {
          if (res) {
            // this.$alert('更新成功')
          }
        })
      }

    },

    // 修改地址
    handleEditAddress(event, params) {
      console.log(params)
      let data = {
        currentEditAddress: params,
        addressAction: 'edit',
        addressModalActive: true,
        currentIndex: this.get("currentIndex")
      }

      this.fire("cartHandleEditAddress", data)
    },

    // 删除地址
    handleDeleteAddress(id, index) {
      if (this.get("mallType") === "general") {
        delAddress(id).then(res => {
          this.$alert('删除地址成功')
          this.fire("cartHandleDeleteAddress", { index })
        })
      }else {
        delClubAddress(id).then(res => {
          this.$alert('删除地址成功')
          this.fire("cartHandleDeleteAddress", { index })
        })
      }
    },

    // 选择地址
    selectAddress(data) {
      this.fire("cartSelectAddress", data)
    }
  }
}
