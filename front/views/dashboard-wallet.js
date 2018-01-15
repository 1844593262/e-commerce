import cookies from 'js-cookie'
import '../boot'
import {
  getMemberProfile,
  getCoupon,
  getUsedCoupon,
  getOldTimeCoupon,
  getCouponTypeNum,
  getBalancerecharge,
  getBalanceconsum
} from '../api'

function formatRuleScope(items) {
  items.forEach(item => {
    if (item.couponResp) {
      item.couponResp.ruleScope = JSON.parse(item.couponResp.ruleScope)
    }
  })
}

$(document).ready(function () {
  new Yox({
    el: '.js-dashboard-wallet',
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
          <div class="dashboard-wallet-con">
            <Tabnav items="{{ tabItems }}">
            </Tabnav>

            <TabContainer>
              <TabPane name="point" active="{{ true }}">
                <div class="dashboard-wallet-section-top">
                  <div class="dashboard-wallet-section clearfix">
                    <div class="dashboard-wallet-left-section clearfix">
                      <div class="dashboard-wallet-img pull-left">
                        <img src="/static/image/wallet_icon_balance.png" alt="">
                      </div>
                      <div class="dashboard-wallet-descr pull-left">
                        <span class="money-surplus">平台余额钱包</span>
                          <span class="money-surplus-con">￥{{currency(profileData.cashAccount + profileData.presentAccount, 2)}}</span>
                      </div>
                    </div>
                    <div class="dashboard-wallet-middle-section">
                      <ul>
                        <li class="clearfix dashboard-wallet-item">
                          <div class="dashboard-wallet-money-img pull-left">
                            <img src="/static/image/wallet_icon_recharge.png" alt="">
                          </div>
                          <span class="pull-left echarge-mon">充值余额 : </span>
                          <span class="pull-left echarge-mon-price">{{ currency(profileData.cashAccount)}}</span>
                        </li>
                        <li class="clearfix dashboard-wallet-item">
                          <div class="dashboard-wallet-money-img pull-left">
                            <img src="/static/image/wallet_icon_give.png" alt="">
                          </div>
                          <span class="pull-left echarge-mon">赠送余额 : </span>
                          <span class="pull-left echarge-mon-price">{{ currency(profileData.presentAccount)}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <Tabnav items="{{ recordItems }}" no-top-border="{{ true }}" model="balanceActiveTab">
                </Tabnav>

                <TabContainer>
                  <TabPane name="fullactivity" active="{{ true }}">
                    {{#if false}}
                      <div class="dashboard-wallet-section-bottom">
                        <div class="dashboard-wallet-section-bottom-con">
                          <div class="dashboard-wallet-ticket">
                            <div class="dashboard-wallet-ticket-con">
                              <div class="dashboard-wallet-ticket-tilte">
                                  <a href="" class="dashboard-wallet-ticket-rule">活动细则</a>
                                  <div class="dashboard-wallet-ticket-tilte-con">新用户充值特惠</div>
                              </div>
                              <div class="dashboard-wallet-discount">
                                  <ul class="clearfix dashboard-wallet-discount-all-item">
                                    <li class="pull-left dashboard-item left ">
                                      <span class="dashboard-wallet-discount-activity">优惠活动一</span>
                                      <div class="dashboard-wallet-discount-echarge">充值<span class="red">200</span>元</div>
                                      <span class="dashboard-wallet-discount-account">余额到账</span>
                                      <div class="dashboard-wallet-discount-price">300</div>
                                      <div class="dashboard-wallet-discount-price-rmb">RMB</div>
                                    </li>
                                    <li class="pull-left dashboard-item middle">
                                      <span class="dashboard-wallet-discount-activity">优惠活动二</span>
                                      <div class="dashboard-wallet-discount-echarge">充值<span class="green">500</span>元</div>
                                      <span class="dashboard-wallet-discount-account">余额到账</span>
                                      <div class="dashboard-wallet-discount-price">800</div>
                                      <div class="dashboard-wallet-discount-price-rmb">RMB</div>
                                    </li>
                                    <li class="pull-left dashboard-item right">
                                      <span class="dashboard-wallet-discount-activity">优惠活动三</span>
                                      <div class="dashboard-wallet-discount-echarge">充值<span class="blue">1000</span>元</div>
                                      <span class="dashboard-wallet-discount-account">余额到账</span>
                                      <div class="dashboard-wallet-discount-price">2000</div>
                                      <div class="dashboard-wallet-discount-price-rmb">RMB</div>
                                    </li>
                                  </ul>
                              </div>
                              <div class="dashboard-wallet-pending">
                                  <img  src="/static/image/wallet_btn_haveinhand.png" alt="">
                              </div>
                            </div>
                            <div class="dashboard-wallet-ticket-con  dashboard-wallet-ticket-con2">
                              <div class="dashboard-wallet-ticket-tilte">
                                  <a href="" class="dashboard-wallet-ticket-rule">活动细则</a>
                                  <div class="dashboard-wallet-ticket-tilte-con">十一国庆活动优惠充值</div>
                              </div>
                              <div class="dashboard-wallet-discount">
                                  <ul class="clearfix dashboard-wallet-discount-all-item">
                                    <li class="pull-left dashboard-item  left dashboard-item-grey">
                                      <span class="dashboard-wallet-discount-activity">优惠活动一</span>
                                      <div class="dashboard-wallet-discount-echarge grey">充值200元</div>
                                      <span class="dashboard-wallet-discount-account grey">余额到账</span>
                                      <div class="dashboard-wallet-discount-price grey">300</div>
                                      <div class="dashboard-wallet-discount-price-rmb grey">RMB</div>
                                    </li>
                                    <li class="pull-left dashboard-item middle dashboard-item-grey">
                                      <span class="dashboard-wallet-discount-activity">优惠活动二</span>
                                      <div class="dashboard-wallet-discount-echarge grey">充值500元</div>
                                      <span class="dashboard-wallet-discount-account grey">余额到账</span>
                                      <div class="dashboard-wallet-discount-price grey">800</div>
                                      <div class="dashboard-wallet-discount-price-rmb grey">RMB</div>
                                    </li>
                                    <li class="pull-left dashboard-item right dashboard-item-grey">
                                      <span class="dashboard-wallet-discount-activity">优惠活动三</span>
                                      <div class="dashboard-wallet-discount-echarge grey">充值1000元</div>
                                      <span class="dashboard-wallet-discount-account grey">余额到账</span>
                                      <div class="dashboard-wallet-discount-price grey">2000</div>
                                      <div class="dashboard-wallet-discount-price-rmb grey">RMB</div>
                                    </li>
                                  </ul>
                              </div>
                              <div class="dashboard-wallet-pending">
                                <img  src="/static/image/wallet_img_activityforecast.png" alt="">
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    {{else}}
                      <EmptyPlaceholder text="暂无数据">
                      </EmptyPlaceholder>
                    {{/if}}
                  </TabPane>

                  <TabPane name="fullrecord">
                    {{#if BalancerechargeData.items.length}}
                      <table class="vipclub-point-table">
                        <colgroup>
                          <col style="width: 200px">
                          <col style="width: 165px">
                          <col style="width: 165px">
                          <col style="width: 245px">
                          <col>
                        </colgroup>
                        <tbody class="item-header">
                          <tr>
                            <td>时间</td>
                            <td>充值活动</td>
                            <td>充值金额</td>
                            <td>赠送金额</td>
                            <td>余额变动</td>
                          </tr>
                        </tbody>
                        <tbody class="item-body">
                          {{#each BalancerechargeData.items}}
                            <tr>
                              <td>
                                {{this.createTime ? this.createTime : ''}}
                              </td>
                              <td>
                                {{this.remark ? this.remark : '-'}}
                              </td>
                              <td>
                                {{this.amount ? '+' + this.amount : '-'}}
                              </td>
                              <td>
                                {{this.presentAccount ? '+' + this.presentAccount : '-'}}
                              </td>
                              <td>
                                +{{this.amount + this.presentAccount}}
                              </td>
                            </tr>
                          {{/each}}
                        </tbody>
                      </table>
                    {{else}}
                      <EmptyPlaceholder text="暂无数据">
                      </EmptyPlaceholder>
                    {{/if}}
                  </TabPane>

                  <TabPane name="consumerecord">
                    {{#if BalanceconsumData.items.length}}
                      <table class="vipclub-point-table">
                        <colgroup>
                          <col style="width: 200px">
                          <col style="width: 165px">
                          <col style="width: 165px">
                          <col style="width: 245px">
                          <col>
                        </colgroup>
                        <tbody class="item-header">
                          <tr>
                            <td>时间</td>
                            <td>消费原因</td>
                            <td>充值余额</td>
                            <td>赠送余额</td>
                            <td>余额变动</td>
                          </tr>
                        </tbody>
                        <tbody class="item-body">
                          {{#each BalanceconsumData.items}}
                            <tr>
                              <td>
                                {{this.createTime ? this.createTime : ''}}
                              </td>
                              <td>
                                {{this.remark ? this.remark : '-'}}
                              </td>
                              <td>
                                {{this.amount ? '-' + this.amount : '-'}}
                              </td>
                              <td>
                                {{this.presentAccount ? '-' + this.presentAccount : '-'}}
                              </td>
                              <td>
                                {{#if this.amount + this.presentAccount > 0}}
                                -{{ this.amount + this.presentAccount }}
                                {{else}}
                                -
                                {{/if}}
                              </td>
                            </tr>
                          {{/each}}
                        </tbody>
                      </table>
                    {{else}}
                      <EmptyPlaceholder text="暂无数据">
                      </EmptyPlaceholder>
                    {{/if}}
                  </TabPane>
                </TabContainer>

                {{#if BalanceconsumData.total}}
                  <Pagination total="{{BalanceconsumData.total ? BalanceconsumData.total : ''}}">
                  </Pagination>
                {{/if}}
              </TabPane>

              <TabPane name="discount">
                <div class="dashboard-wallet-section-top dashboard-wallet-section-top2">
                  <div class="dashboard-wallet-section clearfix">
                    <div class="dashboard-wallet-left-section clearfix pull-left">
                      <div class="dashboard-wallet-img pull-left">
                        <img src="/static/image/wallet_icon_balance.png" alt="">
                      </div>
                      <div class="dashboard-wallet-descr pull-left">
                        <span class="money-surplus">优惠劵数量</span>
                        <span class="money-surplus-con">{{CouponTypeNumData.totalQuantity}}<span></span></span>
                      </div>
                    </div>
                    <div class="dashboard-wallet-middle-section pull-left dashboard-wallet-middle-section2">
                      <ul>
                        <li class="clearfix dashboard-wallet-item">
                          <div class="dashboard-wallet-money-img pull-left dashboard-wallet-money-img2">
                            <img src="/static/image/wallet_icon_zhi.png" alt="">
                            <span class="directly">直</span>
                          </div>
                            <span class="pull-left echarge-mon echarge-mon2">直减券 : </span>
                            <span class="pull-left echarge-mon-price">{{CouponTypeNumData.typeQuantity.FULL_AMOUNT_SUB}}</span>
                        </li>
                        <li class="clearfix dashboard-wallet-item">
                          <div class="dashboard-wallet-money-img pull-left dashboard-wallet-money-img2">
                            <img src="/static/image/wallet_icon_mian.png" alt="">
                            <span class="pull">满</span>
                          </div>
                          <span class="pull-left echarge-mon echarge-mon2">满减劵 : </span>
                          <span class="pull-left echarge-mon-price">{{CouponTypeNumData.typeQuantity.DIRECT_REDUCTION}}</span>
                        </li>
                        <li class="clearfix dashboard-wallet-item">
                          <div class="dashboard-wallet-money-img pull-left dashboard-wallet-money-img2">
                            <img src="/static/image/zhe_icon.png" alt="">
                            <span class="pull"></span>
                          </div>
                          <span class="pull-left echarge-mon echarge-mon2">折扣劵 : </span>
                          <span class="pull-left echarge-mon-price">{{CouponTypeNumData.typeQuantity.FULL_AMOUNT_DISCOUNT}}</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div class="dashboard-wallet">
                  <div class="dashboard-wallet-con">
                    <Tabnav items="{{useItems}}" no-top-border="{{ true }}" model="couponActiveTab">
                    </Tabnav>

                    <div class="dashboard-wallet-ticket-tilte">
                      <div class="dashboard-wallet-ticket-tilte-con">我的优惠券</div>
                    </div>

                    <TabContainer>
                      <TabPane name="usable" active="{{ true }}">
                        {{#if unuseCouponData.items.length}}
                          <div class="dashboard-wallet-section-bottom">
                            <div class="dashboard-wallet-section-bottom-con">
                              <div class="dashboard-wallet-ticket clearfix">
                                <div class="dashboard-wallet-ticket-con clearfix ticket-old-time ticket-used">
                                  <div class="clearfix discount-whole">
                                    <ul class="clearfix discount-all-item ">
                                      {{#each unuseCouponData.items}}
                                        <li class="pull-left">
                                          <CouponItem
                                            rule-type="{{ this.ruleType }}"
                                            coupon-name="{{ this.couponName }}"
                                            start-time="{{ this.useStartTime }}"
                                            end-time="{{ this.useEndTime }}"
                                            coupon-resp="{{ this.couponResp }}">
                                          </CouponItem>
                                        </li>
                                      {{/each}}
                                    </ul>
                                  </div>
                                </div>

                                <Pagination total="{{unuseCouponData.total ? unuseCouponData.total : 0}}">
                                </Pagination>
                              </div>
                            </div>
                          </div>
                        {{else}}
                          <EmptyPlaceholder text="暂无数据">
                          </EmptyPlaceholder>
                        {{/if}}
                      </TabPane>

                      <TabPane name="alreaduse">
                        {{#if UsedCouponData.items.length}}
                          <div class="dashboard-wallet-section-bottom">
                            <div class="dashboard-wallet-section-bottom-con">
                                <div class="dashboard-wallet-ticket clearfix">
                                  <div class="dashboard-wallet-ticket-con clearfix ticket-old-time ticket-used">
                                    <div class="clearfix discount-whole">
                                      <ul class="clearfix  discount-all-item">
                                        {{#each UsedCouponData.items}}
                                          <li class="pull-left">
                                            <CouponItem
                                              rule-type="{{ this.ruleType }}"
                                              coupon-name="{{ this.couponName }}"
                                              start-time="{{ this.useStartTime }}"
                                              end-time="{{ this.useEndTime }}"
                                              coupon-resp="{{ this.couponResp }}"
                                              status="used">
                                            </CouponItem>
                                          </li>
                                        {{/each}}
                                      </ul>
                                    </div>
                                  </div>

                                  <Pagination total="{{UsedCouponData.total ? UsedCouponData.total : 0}}">
                                  </Pagination>
                                </div>
                            </div>
                          </div>
                        {{else}}
                          <EmptyPlaceholder text="暂无数据">
                          </EmptyPlaceholder>
                        {{/if}}
                      </TabPane>

                      <TabPane name="oldtimeuse">
                        {{#if OldTimeCouponData.items.length}}
                          <div class="dashboard-wallet-section-bottom">
                            <div class="dashboard-wallet-section-bottom-con">
                              <div class="dashboard-wallet-ticket clearfix">
                                <div class="dashboard-wallet-ticket-con clearfix ticket-old-time ticket-used">
                                  <div class="clearfix discount-whole">
                                    <ul class="clearfix  discount-all-item ">
                                      {{#each OldTimeCouponData.items}}
                                        <li class="pull-left">
                                          <CouponItem
                                            rule-type="{{ this.ruleType }}"
                                            coupon-name="{{ this.couponName }}"
                                            start-time="{{ this.useStartTime }}"
                                            end-time="{{ this.useEndTime }}"
                                            coupon-resp="{{ this.couponResp }}"
                                            status="expired">
                                          </CouponItem>
                                        </li>
                                      {{/each}}
                                    </ul>
                                  </div>
                                </div>

                                <Pagination total="{{OldTimeCouponData.total ? OldTimeCouponData.total : 0}}">
                                </Pagination>
                              </div>
                            </div>
                          </div>
                        {{else}}
                          <EmptyPlaceholder text="暂无数据">
                          </EmptyPlaceholder>
                        {{/if}}
                      </TabPane>
                    </TabContainer>
                  </div>
                </div>
              </TabPane>
            </TabContainer>
          </div>
        </div>
      </div>
  `,

    data: {
      tabItems: [
        { label: '余额钱包', name: 'point' },
        { label: '优惠券', name: 'discount' },
      ],

      recordItems: [
        { label: '充值活动', name: 'fullactivity' },
        { label: '充值记录', name: 'fullrecord' },
        { label: '消费记录', name: 'consumerecord' },
      ],

      useItems: [
        { label: '可使用', name: 'usable' },
        { label: '已使用', name: 'alreaduse' },
        { label: '已过期', name: 'oldtimeuse' },
      ],

      balanceActiveTab: 'fullactivity',
      couponActiveTab: 'usable',

      profileData: {},
      unuseCouponData: {},
      UsedCouponData: [],
      OldTimeCouponData: [],
      CouponTotalNum: '',
      CouponTypeNumData: {},
      BalancerechargeData: [],
      BalanceconsumData: {}
    },

    afterMount() {
      Promise.all([
        getMemberProfile(),
        getCouponTypeNum(),
        getCoupon({
          couponDistStatus: 'UNUSED',
          offset: 0,
          limit: 16
        })
      ]).then(res => {
        const [
          profileData,
          CouponTypeNumData,
          unuseCouponData
        ] = res

        this.set('profileData', profileData ? profileData : {})
        this.set('CouponTypeNumData', CouponTypeNumData ? CouponTypeNumData : {})

        if (unuseCouponData && unuseCouponData.items) {
          formatRuleScope(unuseCouponData.items)
        }

        this.set('unuseCouponData', unuseCouponData ? unuseCouponData : {})
      })
    },

    watchers: {
      balanceActiveTab(val) {
        if (val === 'fullrecord') {
          getBalancerecharge({
            accountType: 'CASH',
            adjustType: 'ADD'
          }).then(res => {
            if (res) {
              this.set('BalancerechargeData', res ? res : {})
            }
          })
        } else if (val === 'consumerecord') {
          getBalanceconsum({
            accountType: 'CASH',
            adjustType: 'REDUCE'
          }).then(res => {
            if (res) {
              this.set('BalanceconsumData', res ? res : {})
            }
          })
        }
      },

      couponActiveTab(val) {
        if (val === 'usable') {
          getCoupon({
            couponDistStatus: 'UNUSED',
            offset: 0,
            limit: 16
          }).then(res => {
            if (res && res.items) {
              formatRuleScope(res.items)
              this.set('unuseCouponData', res)
            }
          })
        } else if (val === 'alreaduse') {
          getCoupon({
            couponDistStatus: 'USED',
            offset: 0,
            limit: 16
          }).then(res => {
            if (res && res.items) {
              formatRuleScope(res.items)
              this.set('UsedCouponData', res)
            }
          })
        } else if (val === 'oldtimeuse') {
          getCoupon({
            couponDistStatus: 'EXPIRED',
            offset: 0,
            limit: 16
          }).then(res => {
            if (res && res.items) {
              formatRuleScope(res.items)
              this.set('OldTimeCouponData', res)
            }
          })
        }
      }
    }
  })
})
