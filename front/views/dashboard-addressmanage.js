import cookies from 'js-cookie'
import '../boot'
import {
  getreceiverAddress,
  putAddress,
  delAddress,
  getMemberProfile,
  getProvnceandCity,
  modifyAddress
} from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-dashboard-addressmange',

    template: `
      <div class="dashboard-main clearfix">
        <div class="dashboard-left pull-left">
          <DashboardSidebarUser
            name="{{ profileData.userName }}">
          </DashboardSidebarUser>

          <div class="dashboard-main-sidebar">
            <DashboardSidebarNav>
            </DashboardSidebarNav>
          </div>
        </div>
        <div class="dashboard-right pull-right">
          {{#if !loading}}
            {{#if recevieAddress.length}}
              <div class="dashboard-address-tab-wrapper">
                <Tabnav items="{{ tabItems }}">
                </Tabnav>
                <span class="action-link" on-click="openAddModal()">+ 新地址</span>
              </div>

              <TabContainer>
                <TabPane name="savedAddress" active="{{ true }}">
                  <div class="dashboard-addressmanage clearfix">
                    <table class="dashboard-addressmanage-table">
                      <tbody>
                        <tr class="dashboard-addressmanage-row">
                            <td class="dashboard-addressmanage-owner">收货人</td>
                            <td class="dashboard-addressmanage-address">地址</td>
                            <td class="dashboard-addressmanage-contact">联系方式</td>
                            <td class="dashboard-addressmanage-operate">操作</td>
                            <td></td>
                        </tr>
                      </tbody>
                      <tbody class="dashboard-addressmanage-con">
                        {{#each recevieAddress:$index}}
                          <tr class="dashboard-addressmanage-otherrow">
                            <td>{{this.receiverName ? this.receiverName : ''}}</td>
                            <td>{{this.receiverAddress ? this.receiverAddress : ''}}</td>
                            <td>{{this.receiverCellphone ? this.receiverCellphone : ''}}</td>
                            <td>
                              <a class="editor" on-click="handleEditAddress($event,this)">编辑</a>
                              <a class="del" on-click="handleDeleteAddress($event, this.id, $index)">删除</a>
                            </td>
                            {{#if this.isDefault ? this.isDefault : ''}}
                              {{#if this.isDefault === "YES"}}
                                <td class="defal-address">
                                  <span class="defal-border-address">默认地址</span>
                                </td>
                              {{else if this.isDefault === "NO"}}
                                <td class="defal-address">
                                  <div class="btn btn-red" on-click="setDefaultAddress(this)">设为默认地址</div>
                                </td>
                              {{/if}}
                            {{/if}}
                          </tr>
                        {{/each}}
                      </tbody>
                    </table>
                  </div>
                </TabPane>
              </TabContainer>
            {{else}}
              <div class="dashboard-addressmanage-clear">
                <div class="dashboard-addressmanage-clear-con">
                  <div class="no-address">
                    <img src="/static/image/address_img_noaddress.png" alt="">
                  </div>
                  <div class="dashboard-addressmanage-title">您当前还没有收货地址</div>
                  <div class="add-adress" on-click="openAddModal()">
                    <img src="/static/image/address_btn_addaddress.png" alt="">
                  </div>
                </div>
              </div>
            {{/if}}
          {{/if}}

          <ModifyAddressModal
            model="addressModalActive"
            geo-data="{{ geoData }}"
            action="{{ addressAction }}"
            mallType="{{ mallType }}"
            default-param="{{ currentEditAddress }}">
          </ModifyAddressModal>
        </div>
      </div>
    `,

    data: {
      loading: true,
      modalSize: ['840px', '610px'],

      tabItems: [
        { label: '已保存收货地址', name: 'savedAddress' },
      ],

      geoData: [],
      profileData: {},
      recevieAddress: [],
      addressModalActive: false,
      addressAction: 'add',
      mallType: 'general',
      currentEditAddress: {}
    },

    afterMount() {
      Promise.all([
        getMemberProfile(),
        getreceiverAddress(),
        getProvnceandCity()
      ]).then(res => {
        const [profileData, addressData, geoData] = res

        if (profileData) {
          this.set('profileData', profileData)
        }

        if (addressData && addressData.items) {
          this.set('recevieAddress', addressData.items)
        }

        if (geoData) {
          this.set('geoData', geoData)
        }

        this.set('loading', false)
      })
    },

    events: {
      addAddressSuccess(e, data) {
        this.$alert('地址添加成功')
        window.location.reload()
        // this.prepend('recevieAddress', data.data)
      },

      modifyAddressSuccess(e, data) {
        this.$alert('地址编辑成功')
        window.location.reload()
      }
    },

    methods: {
      openAddModal() {
        if (this.get('recevieAddress').length >= 10) {
          this.$alert('仅能创建10个有效的收货地址')
          return
        }

        this.set('addressAction', 'add')
        this.set('addressModalActive', true)
      },

      handleDeleteAddress(e, id, index) {
        e.stop()
        delAddress(id).then(res => {
          this.removeAt('recevieAddress', index)
          this.$alert('删除地址成功')
        })
      },

      handleEditAddress(event, params) {
        this.set('currentEditAddress', params)
        this.set('addressAction', 'edit')
        this.set('addressModalActive', true)
      },

      setDefaultAddress(data) {
        modifyAddress(data.id, {
          isDefault: 'YES'
        }).then(res => {
          if (res) {
            this.$alert('更新成功')
            setTimeout(() => {
              window.location.reload()
            }, 500)
          }
        })
      }
    }
  })
})
