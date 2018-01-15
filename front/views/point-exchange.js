import { getMemberProfile, getEPint, chargePoint } from '../api'
import '../boot'

$(document).ready(function () {
  new Yox({
    el: '.js-point-exchange-wrapper',

    template: `
      <div class="wrapper">
        {{#if !loading}}
          <div class="point-exchange-main">
            <div class="point-exchange-top clearfix">
              <div class="point-exchange-desc-item type-shop {{#if isChargeJumax}}pull-left{{else}}pull-right{{/if}}">
                <div class="title">
                  <img src="/static/image/integral_img_shoppingintegral.png">
                  钜MAX线上商城积分
                </div>
                <div class="content">
                  <p><span class="font-em">嗨, {{ profileData.cellphone }}</span></p>
                  <p>当前积分 <span class="color-red point-content">{{ profileData.pointAccount }}</span></p>
                </div>
              </div>
              <img class="center-img" src="/static/image/integral_icon_exchange.png" on-click="changeCharge()">
              <div class="point-exchange-desc-item type-ehome {{#if isChargeJumax}}pull-right{{else}}pull-left{{/if}}">
                <div class="title">
                  <img src="/static/image/integral_img_ehomeintegral.png">
                  首E家金融积分
                </div>
                <div class="content">
                  <p>首E家金融账号
                    <a class="pull-right ehome-link color-primary" href="https://www.shoujins.com/">进入首E金融</a>
                  </p>
                  <p>当前积分 <span class="color-primary point-content">{{ epointData.data.scoreInfo.availableScore }}</span></p>
                </div>
              </div>
            </div>

            <div class="point-exchange-action">
              <div class="point-exchange-action-operation">
                <div class="top-section">
                  消耗

                  <div class="group-input">
                    <input class="form-control pull-left" type="text" placeholder="可用积分{{ currentPoint }}" model="chargePoint">
                    <span class="group-tip">{{#if isChargeJumax}}X0.5{{else}}X2{{/if}}</span>
                  </div>

                  可获得 <span class="color-primary point-content">{{ displayPointCharge }}</span>
                </div>
                <div class="tip">
                  兑换比例说明[钜MAX线上商城积分2:1首E家金融积分]
                </div>
              </div>

              <button class="btn btn-primary point-exchange-trigger" on-click="handleCharge()">确认兑换</button>
            </div>
          </div>
        {{/if}}
      </div>
    `,

    data: {
      loading: true,
      profileData: {},
      epointData: {},
      isChargeJumax: true,
      currentPoint: 0,
      chargePoint: ''
    },

    afterMount() {
      Promise.all([
        getMemberProfile(),
        getEPint()
      ]).then(res => {
        const [profileData, epointData] = res

        if (profileData) {
          this.set('profileData', profileData)
          this.set('currentPoint', profileData.pointAccount)
        }

        if (epointData) {
          this.set('epointData', epointData)
        }

        this.set('loading', false)
      })
    },

    watchers: {
      isChargeJumax(val) {
        if (val) {
          this.set('currentPoint', this.get('profileData.pointAccount'))
        } else {
          this.set('currentPoint', this.get('epointData.data.scoreInfo.availableScore'))
        }
      }
    },

    computed: {
      displayPointCharge() {
        if (this.get('isChargeJumax')) {
          return Number(this.get('chargePoint')) / 2
        } else {
          return Number(this.get('chargePoint')) * 2
        }
      }
    },

    methods: {
      changeCharge() {
        this.set('isChargeJumax', !this.get('isChargeJumax'))
      },

      handleCharge() {
        let point = Number(this.get('chargePoint'))
        let isChargeJumax = this.get('isChargeJumax')

        if (point <= 0 || Number.isNaN(point)) {
          this.$alert('无效的积分数字')
          return
        }

        if (point % 100 !== 0) {
          this.$alert('兑换积分必须为100的整数倍')
          return
        }

        if (isChargeJumax) {
          if (point > this.get('profileData.pointAccount')) {
            this.$alert('兑换积分不足')
            return
          }
          chargePoint({
            direction: 'ADD',
            score: point
          }).then(res => {
            if (res) {
              this.$alert('积分兑换成功')
              window.location.reload()
            }
          })
        } else {
          if (point > this.get('epointData.data.scoreInfo.availableScore')) {
            this.$alert('兑换积分不足')
            return
          }
          chargePoint({
            direction: 'REDUCE',
            score: point
          }).then(res => {
            if (res) {
              this.$alert('积分兑换成功')
              window.location.reload()
            }
          })
        }
      }
    }
  })
})
