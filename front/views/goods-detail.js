import cookies from 'js-cookie'
import chunk from 'lodash.chunk'
import '../boot'
import { extendMoment } from 'moment-range'
import { combineAttr } from '../utils/sku-calc'
import {
  postCartPreOrder,
  addToCart,
  addrecordHistory,
  favorGoods,
  cancelFavorGoods,
  addFitting
} from '../api'

const range = extendMoment(moment)

function formatTime(timeNumber) {
  return timeNumber < 10
    ? `0${timeNumber}:00`
    : `${timeNumber}:00`
}

let initData = window.__pageInitData__

$(document).ready(function () {
  new Yox({
    el: '.js-goods-detail-wrapper',
    template: `
    <div>
      <div class="goods-detail-header">
        <div class="wrapper">
          <Breadcrumb items="{{detail.categoryList}}"></Breadcrumb>
        </div>
      </div>

      <div class="wrapper">
        <div class="goods-detail-main">
          <div class="goods-detail-top clearfix">
            <div class="pull-left goods-preview clearfix">
              <div class="preview-bar pull-left">
                <div class="slider-container vertical">
                  <ul class="carousel-main-list js-goods-detail-slider">
                    {{#each mediaList:index}}
                    <li class="clearfix">
                      {{#each this:index2}}
                      <div
                        class="goods-detail-preview-item js-goods-detail-preview-item {{#if index === 0 && index2 === 0}}active{{/if}}"
                        data-index="{{ index * 5 + index2}}">
                        <img src="{{ this.mediaUrl }}">
                      </div>
                      {{/each}}
                    </li>
                    {{/each}}
                  </ul>

                  <div class="aleft left slide-control js-slide-control-prev">
                    <img src="/static/image/prev_view.png">
                  </div>
                  <div class="aright right slide-control js-slide-control-next">
                    <img src="/static/image/next_view.png">
                  </div>
                </div>
              </div>
              <div class="preview-main pull-right">
                <ul class="js-goods-detail-large-slider goods-detail-large-slider">
                  {{#each detail.goodsMediaList}}
                  <li class="clearfix">
                    <img src="{{ this.mediaUrl }}">
                  </li>
                  {{/each}}
                </ul>
              </div>
            </div>
            <div class="pull-right goods-operation">
              <div class="title">
                {{ detail.goodsName }}
              </div>
              <div class="sub-title">
                {{ detail.description }} <a class="enter-shop-link" href="/brand/{{detail.storeId}}">点击进入店铺</a>
              </div>
              <div class="price-info">
                <div class="item price-item">
                  <span class="prefix">
                    ￥
                  </span>
                  <span class="content">
                    <span class="discount-price">
                      {{ currency(currentItem.sellPrice, 2) }}
                    </span>
                    <span class="price-extra-info">
                      <span class="discount-rate">
                        {{ discount }}折
                      </span>
                      <span class="origin-price">￥{{ currency(currentItem.tagPrice ,2) }}</span>
                    </span>
                  </span>
                </div>
              </div>

              {{#each detail.activityList}}
              <div class="extra-info">
                <span class="content">
                  {{ activityName }}
                </span>
              </div>
              {{/each}}

              <div class="item-total-info clearfix">
                <div class="item">
                  销量 <span class="color-red">{{ detail.sellGoodsCount }}</span>
                </div>
                <div class="item">
                  累计评价 <span class="color-red">{{ detail.commentCount }}</span>
                </div>
                <div class="item">
                  送积分 <span class="color-yellow">{{ point }}</span>
                </div>
              </div>

              <GoodsAttrSelection
                sku-list="{{ detail.skuList }}"
                sku-keys="{{ skuKeys }}"
                combined-attr="{{ combinedAttr }}"
                stock="{{ currentItem.stock }}">
              </GoodsAttrSelection>

              <div class="button-section">
                <div class="button buy" on-click="buyNow()">立即购买</div>
                <div class="button chart-button" on-click="addToCart()">加入购物车</div>
                {{#if detail.experience === 'PROJECT'}}
                  <div class="button fitting-button" on-click="openFittingModal()">预约试衣</div>
                {{/if}}

                {{#if detail.isCollection}}
                  <div class="button favor-button" on-click="handleCancelFavor(detail.goodsId)">取消收藏</div>
                {{else}}
                  <div class="button favor-button" on-click="handleFavor(detail.goodsId)">收藏</div>
                {{/if}}
              </div>

              <form method="POST" action="/order/preview" class="hidden js-buynow-form">
                <input name="preOrderList" type="hidden" value="" class="js-buynow-input">
              </form>
            </div>
          </div>

          <div class="goods-detail-bottom clearfix">
            <div class="pull-left goods-detail-extra">
              <Tabnav items="{{ tabItems }}">
              </Tabnav>

              <TabContainer>
                <TabPane name="detail-tab" active="{{true}}">
                  <div>
                  {{{ detail.goodsDescResp.goodsWebDetail }}}
                  </div>
                </TabPane>

                <TabPane name="param-tab">
                  <ul class="attributes-list">
                    {{#each detail.goodsSkuAttrList }}
                      <li class="item">
                        {{attrLabel}}: {{attrValue}}
                      </li>
                    {{/each}}
                  </ul>
                </TabPane>

                <TabPane name="comment-tab">
                  <div class="detail-comment-section">
                    {{#if detail.reviewList.items && detail.reviewList.items.length > 0 }}
                    <div class="comments-list">
                      {{#each detail.reviewList.items }}
                        <div class="comment-item item">
                          <div class="media">
                            <div class="media-left">
                              <a href="#">
                                <img class="media-object" src="/static/image/qrcode.png">
                              </a>
                            </div>
                            <div class="media-body">
                              <div class="media-heading">
                                <span class="comment-name">
                                  dsdsad
                                </span>
                                <span class="comment-rate">
                                </span>
                                <span class="comment-meta pull-right">
                                  <span>2017-10-28 00:31:29</span>
                                  <span>颜色：无颜色None</span>
                                  <span>尺寸：U</span>
                                </span>
                              </div>
                              <div class="comment-content">
                                东西不错是正品
                              </div>
                              <div class="comment-showcase">
                                <img class="item" src="/static/image/qrcode.png">
                                <img class="item" src="/static/image/qrcode.png">
                              </div>
                            </div>
                          </div>

                          <div class="comment-reply">
                            <div class="media">
                              <div class="media-left">
                                <span class="comment-reply-term">
                                商家回复:
                                </span>
                              </div>
                              <div class="media-body">
                                <div class="comment-reply-content">
                                感谢您对钜max的支持与厚爱，期待您的再次光临！
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      {{/each}}
                    </div>

                    <Pagination total="{{ detail.reviewList.total }}">
                    </Pagination>
                    {{/if}}
                  </div>
                </TabPane>
              </TabContainer>
            </div>
            <div class="pull-left goods-detail-qrcode">
              <div class="title">
                手机扫码下单
              </div>
              <div id="qrcode-wrapper" class="qrcode js-qrcode-wrapper">
              </div>
            </div>
          </div>
        </div>
      </div>

      <Dialog model="isFittingModalActive" title="体验店预约" size="large">
        <div class="fitting-form-section">
          <div class="form-horizontal">
          <div class="form-group">
            <div class="sd-control-label">
              <div class="content">姓名:</div>
            </div>
            <div class="form-control-wrapper">
              <input
                type="text"
                class="form-control fix-width"
                model="fittingData.userName">
            </div>
          </div>
          </div>
          <div class="form-horizontal">
            <div class="form-group">
              <div class="sd-control-label">
                <div class="content">预约电话:</div>
              </div>
              <div class="form-control-wrapper">
                <input
                  type="text"
                  class="form-control fix-width"
                  model="fittingData.cellphone">
              </div>
            </div>
          </div>
          <div class="form-horizontal">
            <div class="form-group">
              <div class="sd-control-label">
                <div class="content">时间:</div>
              </div>
              <div class="form-control-wrapper">
                <div class="inline-form-control">
                  <select model="fittingDate" class="form-control">
                    {{#each fittingDateData}}
                      <option value="{{ this }}">{{ this }}</option>
                    {{/each}}
                  </select>
                </div>

                <div class="inline-form-control">
                  <select model="fittingTime" class="form-control">
                    {{#each fittingTimeData}}
                      <option value="{{ this }}">{{ this }}</option>
                    {{/each}}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div class="form-horizontal">
            <div class="form-group">
              <div class="sd-control-label">
                <div class="content">备注:</div>
              </div>
              <div class="form-control-wrapper">
                <input
                  type="text"
                  class="form-control fix-width"
                  model="fittingData.remark">
              </div>
            </div>
          </div>
          <div class="form-horizontal">
            <div class="sd-control-label">
              <div class="content"></div>
            </div>
            <div class="form-control-wrapper">
              <div class="btn btn-primary btn-large action" on-click="handleFitting()">确认</div>
              <div class="btn btn-gray btn-large action" on-click="closeModal()">取消</div>
            </div>
          </div>
        </div>
      </Dialog>
    </div>
  `,
    data: {
      detail: initData,
      tabItems: [
        { label: '商品详情', name: 'detail-tab' },
        { label: '规格与参数', name: 'param-tab' },
        { label: '商品评价', name: 'comment-tab' }
      ],
      mediaList: initData
        ? chunk(initData.goodsMediaList, 5)
        : [],
      count: 1,
      currentItem: initData.goodsSkuList ? initData.goodsSkuList[0] : {},
      isAllAttrSelected: false,
      isFittingModalActive: false,
      fittingDateData: [],
      fittingTimeData: [],
      fittingDate: '',
      fittingTime: '',
      fittingData: {
        partionId: initData.partionId,
        partionName: initData.partionName,
        storeId: initData.storeId,
        storeName: initData.storeName,
        fittingAddress: initData.fittingAddress,
        userName: '',
        cellphone: '',
        fittingTimeStr: '',
        goodsSkuId: '',
        goodsName: initData.goodsName,
        remark: ''
      }
    },

    computed: {
      skuKeys() {
        let skus = this.get('detail.skuList')
        let r = []

        if (skus && skus.length) {
          r = skus.map(item => {
            return item.attrLabel
          })
        }

        return r
      },

      skuListData() {
        let origin = this.get('detail.goodsSkuList')
        let r = []

        if (origin && origin.length) {
          r = origin.map(item => {
            let o = {}
            o.skuId = item.goodsSkuId
            item.goodsSkuAttrList.forEach(sku => {
              o[sku.attrLabel] = sku.attrValue
            })

            return o
          })
        }

        return r
      },

      combinedAttr: {
        get() {
          return combineAttr(this.get('skuListData'), this.get('skuKeys'))
        }
      },

      point() {
        return Math.floor(this.get('currentItem.sellPrice') / 100)
      },

      discount() {
        return (this.get('currentItem.sellPrice') * 10 / this.get('currentItem.tagPrice')).toFixed(1)
      }
    },

    events: {
      goodsSkuSelected(e, item) {
        this.set('isAllAttrSelected', true)
        this.get('detail.goodsSkuList').forEach(v => {
          if (v.goodsSkuId === item.id.skus[0]) {
            this.set('currentItem', v)
          }
        })
      },

      goodsSkuUnselected() {
        this.set('isAllAttrSelected', false)
      },

      goodsNumberChange(e, data) {
        this.set('count', data.val)
      }
    },

    afterMount() {
      const slider = $('.js-goods-detail-slider').bxSlider({
        mode: 'vertical',
        auto: false,
        pager: false,
        infiniteLoop: false
      })

      const largeSlider = $('.js-goods-detail-large-slider').bxSlider({
        mode: 'horizontal',
        auto: false,
        pager: false,
        infiniteLoop: false
      })

      $('.js-slide-control-prev').on('click', function () {
        slider.goToPrevSlide()
      })

      $('.js-slide-control-next').on('click', function () {
        slider.goToNextSlide()
      })

      $('.js-goods-detail-preview-item').on('click', function () {
        const index = $(this).data('index')

        $('.js-goods-detail-preview-item').removeClass('active')
        $(this).addClass('active')
        largeSlider.goToSlide(index)
      })

      new QRCode(document.getElementById('qrcode-wrapper'), {
        text: this.get('detail.scanCodeUrl'),
        width: 330,
        height: 330,
      })

      if (cookies.get('_MCH_AT')) {
        addrecordHistory({ itemId: this.get('detail.goodsId') })
      }

      if (this.get('detail.experience') === 'PROJECT') {
        let start = this.get('detail.experienceStartDays')
        let end = this.get('detail.experienceEndDays')
        let startTime = formatTime(this.get('detail.experienceStartTime'))
        let endTime = formatTime(this.get('detail.experienceEndTime'))
        let currentTime = this.get('detail.currentTime')

        let rangeDay = moment.range(moment(currentTime).add(start, 'days').format('YYYY-MM-DD'), moment(currentTime).add(end, 'days').format('YYYY-MM-DD')).by('days')
        let rangeTime = moment.range(moment(currentTime).format('YYYY-MM-DD') + ' ' + startTime, moment(currentTime).format('YYYY-MM-DD') + ' ' + endTime).by('hours')

        for (let date of rangeDay) {
          this.append('fittingDateData', date.format('YYYY-MM-DD'))
        }

        for (let time of rangeTime) {
          this.append('fittingTimeData', time.format('HH:mm'))
        }

        this.set('fittingDate', this.get('fittingDateData')[0])
        this.set('fittingTime', this.get('fittingTimeData')[0])
      }

    },

    methods: {
      openFittingModal() {
        if (!cookies.get('_MCH_AT')) {
          this.$alert('请登录后再操作')
          return
        }

        if (!this.get('isAllAttrSelected')) {
          this.$alert('请选择一个商品规格')
          return
        }

        this.set('isFittingModalActive', true)
      },

      closeModal() {
        this.set('isFittingModalActive', false)
      },

      handleFitting() {
        this.set('fittingData.fittingTimeStr', `${this.get('fittingDate')} ${this.get('fittingTime')}`)
        this.set('fittingData.goodsSkuId', this.get('currentItem.goodsSkuId'))

        addFitting(this.get('fittingData')).then(res => {
          if (res) {
            this.$alert('预约成功')
            this.set('isFittingModalActive', false)
          }
        })
      },

      handleFavor(id) {
        if (!cookies.get('_MCH_AT')) {
          this.$alert('请登录后再操作')
        } else {
          favorGoods({
            itemId: id
          }).then(res => {
            if (res) {
              this.$alert('收藏成功')
              this.set('detail.isCollection', true)
            }
          })
        }
      },

      handleCancelFavor(id) {
        cancelFavorGoods(id).then(res => {
          if (res) {
            this.$alert('取消收藏成功')
            this.set('detail.isCollection', false)
          }
        })
      },

      addToCart() {
        if (!cookies.get('_MCH_AT')) {
          this.$alert('请登录后再操作')
          return
        }

        if (!this.get('isAllAttrSelected')) {
          this.$alert('请选择完商品规格')
          return
        }

        let activityId = this.get('detail.activityList').length
          ? this.get('detail.activityList')[0].activityId
          : ''

        addToCart({
          goodsId: this.get('detail.goodsId'),
          skuId: this.get('currentItem').goodsSkuId,
          quantity: this.get('count'),
          activityId
        }).then(res => {
          this.$alert('添加成功')
        }).catch(e => {
          this.$alert('添加失败')
        })
      },

      buyNow() {
        if (!cookies.get('_MCH_AT')) {
          this.$alert('请登录后再操作')
          return
        }

        if (!this.get('isAllAttrSelected')) {
          this.$alert('请选择完商品规格')
          return
        }

        let activityId = this.get('detail.activityList').length
          ? this.get('detail.activityList')[0].activityId
          : ''

        let data = {
          source: 'DETAIL',
          items: [{
            goodsSkuId: this.get('currentItem').goodsSkuId,
            quantity: this.get('count'),
            activityId
          }]
        }

        postCartPreOrder(data).then(res => {
          if (res.code === '200') {
            $('.js-buynow-input').val(JSON.stringify(data))
            $('.js-buynow-form').submit()
          }
        })
      }
    }
  })
})

