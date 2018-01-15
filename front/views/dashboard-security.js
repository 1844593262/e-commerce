import '../boot'
import {
  getMemberProfile,
  updatePassword
} from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-dashboard-security',

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
        <Tabnav items="{{ tabItems }}">
        </Tabnav>

        <TabContainer>
          <TabPane name="security" active="{{ true }}">
            <table class="dashboard-security-table">
              <colgroup>
                <col style="width: 120px"></col>
                <col style="width: 208px"></col>
                <col></col>
                <col style="width: 176px"></col>
              </colgroup>
              <tbody class="item-header">
              {{#if  profileData.securityLevel ? profileData.securityLevel : ''}}
                {{#if profileData.securityLevel == 'HIGH'}}
                  <tr>
                    <td colspan="4">
                      <div class="security-table-level pull-left">
                        <span class="term">安全等级</span>
                        <div class="security-table-level-bar">
                          <div class="current-bar safe" style="width: 100%;"></div>
                        </div>
                        <span class="content safe">安全</span>
                      </div>
                      <div class="pull-right tip">当前账号安全等级高，请放心购物</div>
                    </td>
                  </tr>
                {{/if}}
              {{/if}}

              {{#if profileData.securityLevel ? profileData.securityLevel : ''}}
                {{#if profileData.securityLevel === 'LOW'}}
                  <tr>
                    <td colspan="4">
                      <div class="security-table-level pull-left">
                        <span class="term">安全等级</span>
                        <div class="security-table-level-bar">
                          <div class="current-bar danger" style="width: 30%;"></div>
                        </div>
                        <span class="content danger">危险</span>
                      </div>
                      <div class="pull-right tip">当前账号安全等级危险，建议<a href="#">设置</a>更多安全保护</div>
                    </td>
                  </tr>
                {{/if}}
              {{/if}}
              </tbody>
              <tbody class="item-body">
                <tr>
                  <td class="sign-section">
                    <img class="security-sign-img" src="/static/image/safe_icon_greengouxuan.png">
                  </td>
                  <td class="term-section">登录密码</td>
                  <td class="tip-section">
                    <span class="alread-desc">已设置登录密码，网络有风险，请定期修改密码</span>
                  </td>
                  <td class="action-section">
                    <a class="action" on-click="openSetPasswordModal()" href="javascript:;">更改密码</a>
                  </td>
                </tr>
                {{#if  profileData.securityLevel ? profileData.securityLevel : ''}}
                  {{#if profileData.securityLevel === "LOW"}}
                    <tr>
                      <td class="sign-section">
                        <img class="security-sign-img" src="/static/image/safe_icon_jingao.png">
                      </td>
                      <td class="term-section">支付密码</td>
                      <td class="tip-section">
                        <span class="main-desc">您还没设置支付密码</span>
                        <span class="sub-desc">支付密码可以保障用户财产安全</span>
                      </td>
                      <td class="action-section">
                        <div class="action btn btn-red btn-sm btn-block">立即绑定</div>
                      </td>
                    </tr>
                    {{else if profileData.securityLevel === "HIGH"}}
                      <tr>
                        <td class="sign-section">
                          <img class="security-sign-img" src="/static/image/safe_icon_greengouxuan.png">
                        </td>
                        <td class="term-section">支付密码</td>
                        <td class="tip-section">
                        <span class="alread-desc">已设置支付密码，网络有风险，请定期修改密码</span>
                        </td>
                        <td class="action-section">
                          <a class="action" on-click="openPayPasswordModal()" href="javascript:;">更改密码</a>
                          <a class="action" on-click="openPayPasswordModifyModal()" href="javascript:;">忘记密码</a>
                        </td>
                      </tr>
                  {{/if}}
                {{/if}}
              </tbody>
            </table>
          </TabPane>
        </TabContainer>

        <Dialog model="passwordModalActive" title="更改登录密码" size="large">
          <div class="update-password-form-section">
            <div class="form-horizontal">
              <div class="form-group">
                <div class="sd-control-label">
                  <div class="content">原密码</div>
                </div>
                <div class="form-control-wrapper">
                  <input type="password" class="form-control" model="resetPasswordData.password">
                </div>
              </div>
            </div>
            <div class="form-horizontal">
              <div class="form-group">
                <div class="sd-control-label">
                  <div class="content">设置新密码</div>
                </div>
                <div class="form-control-wrapper">
                  <input type="password" class="form-control" model="resetPasswordData.newPassword">
                </div>
              </div>
            </div>
            <div class="form-horizontal" style="margin-bottom: 30px;">
              <div class="form-group">
                <div class="sd-control-label">
                  <div class="content">重复新密码</div>
                </div>
                <div class="form-control-wrapper">
                  <input type="password" class="form-control" model="resetPasswordData.rePassword">
                </div>
              </div>
            </div>
            <div class="form-horizontal">
              <div class="sd-control-label">
                <div class="content"></div>
              </div>
              <div class="form-control-wrapper">
                <div class="btn btn-primary btn-large action" on-click="resetPassword()">确认</div>
                <div class="btn btn-gray btn-large action" on-click="closePasswordModal()">取消并返回</div>
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog model="passwordResultModalActive" title="更改登录密码" size="large">
          <div class="auth-modal-response-section">
            <div class="content">
              <img src="/static/image/modal-success.png">
              登录密码修改成功

              <div class="return-tip">3s后自动返回</div>
            </div>
            <div class="action text-center">
              <div class="btn btn-primary" on-click="closePasswordResultModal()">立即返回</div>
            </div>
          </div>
        </Dialog>

        <Dialog model="payPasswordModalActive" title="更改支付密码" size="large">
          <div class="update-password-form-section paypw">
            <div class="form-horizontal">
              <div class="form-group">
                <div class="sd-control-label">
                  <div class="content">原支付密码</div>
                </div>
                <div class="form-control-wrapper">
                  <input type="password" class="form-control" model="resetPayPasswordData.password">
                </div>
              </div>
            </div>
            <div class="form-horizontal">
              <div class="form-group">
                <div class="sd-control-label">
                  <div class="content">新支付密码</div>
                </div>
                <div class="form-control-wrapper">
                  <input type="password" class="form-control" model="resetPayPasswordData.newPassword">
                </div>
              </div>
            </div>
            <div class="form-horizontal" style="margin-bottom: 30px;">
              <div class="form-group">
                <div class="sd-control-label">
                  <div class="content">重复新支付密码</div>
                </div>
                <div class="form-control-wrapper">
                  <input type="password" class="form-control" model="resetPayPasswordData.rePassword">
                </div>
              </div>
            </div>
            <div class="form-horizontal">
              <div class="sd-control-label">
                <div class="content"></div>
              </div>
              <div class="form-control-wrapper">
                <div class="btn btn-primary btn-large action" on-click="resetPayPassword()">确认</div>
                <div class="btn btn-gray btn-large action" on-click="closePayPasswordModal()">取消并返回</div>
              </div>
            </div>
          </div>
        </Dialog>

        <Dialog model="payPasswordResultModalActive" title="更改支付密码" size="large">
          <div class="auth-modal-response-section">
            <div class="content">
              <img src="/static/image/modal-success.png">
              支付密码修改成功

              <div class="return-tip">3s后自动返回</div>
            </div>
            <div class="action text-center">
              <div class="btn btn-primary" on-click="closePayPasswordResultModal()">立即返回</div>
            </div>
          </div>
        </Dialog>

        <ModifyPaypwModal model="payPasswordModifyModalActive" cellphone="{{ profileData.cellphone }}">
        </ModifyPaypwModal>
      </div>
    </div>
    `,

    data: {
      tabItems: [
        { label: '安全中心', name: 'security' },
      ],

      profileData: {},

      resetPasswordData: {
        password: '',
        newPassword: '',
        rePassword: ''
      },

      resetPayPasswordData: {
        password: '',
        newPassword: '',
        rePassword: ''
      },

      passwordModalActive: false,
      payPasswordModalActive: false,
      passwordResultModalActive: false,
      payPasswordResultModalActive: false,
      payPasswordModifyModalActive: false
    },

    afterMount() {
      getMemberProfile().then(res => {
        this.set('profileData', res ? res : {})
      })
    },

    watchers: {
      passwordModalActive(val) {
        if (!val) {
          this.set('resetPasswordData.password', '')
          this.set('resetPasswordData.newPassword', '')
          this.set('resetPasswordData.rePassword', '')
        }
      },

      payPasswordModalActive(val) {
        if (!val) {
          this.set('resetPayPasswordData.password', '')
          this.set('resetPayPasswordData.newPassword', '')
          this.set('resetPayPasswordData.rePassword', '')
        }
      }
    },

    methods: {
      openSetPasswordModal() {
        this.set('passwordModalActive', true)
      },

      openPayPasswordModal() {
        this.set('payPasswordModalActive', true)
      },

      openPayPasswordModifyModal() {
        this.set('payPasswordModifyModalActive', true)
      },

      closePayPasswordModal() {
        this.set('payPasswordModalActive', false)
      },

      closePasswordModal() {
        this.set('passwordModalActive', false)
      },

      closePasswordResultModal() {
        this.set('passwordResultModalActive', false)
      },

      closePayPasswordResultModal() {
        this.set('payPasswordResultModalActive', false)
      },

      resetPassword() {
        let pw = this.get('resetPasswordData.password')
        let rpw = this.get('resetPasswordData.newPassword')

        if (pw && rpw) {
          updatePassword({
            password: pw,
            newPassword: rpw,
            passwordType: 'LOGIN'
          }).then(res => {
            if (res.result) {
              this.set('passwordModalActive', false)
              this.set('passwordResultModalActive', true)
            } else {
              this.$alert(res.message)
            }
          })
        }
      },

      resetPayPassword() {
        let pw = this.get('resetPayPasswordData.password')
        let rpw = this.get('resetPayPasswordData.newPassword')

        if (pw && rpw) {
          updatePassword({
            password: pw,
            newPassword: rpw,
            passwordType: 'PAY'
          }).then(res => {
            if (res.result) {
              this.set('payPasswordModalActive', false)
              this.set('payPasswordResultModalActive', true)
            } else {
              this.$alert(res.message)
            }
          })
        }
      }
    }
  })
})
