import '../boot'
import { getStoreList } from '../api'

new Yox({
  el: '.js-shopping-brand-section',
  template: `
    <div>
      {{#each list}}
        <div class="web-section-brand clearfix">
          <div class="web-section-brand-title-con">
            <div class="web-section-brand-title">
              <span class="item-span">
                <img src="{{ this.storeLogo }}" alt="">
              </span>
            </div>
          </div>

          <div class="web-section-brand-bottom clearfix">
              <div class="web-section-brand-bottom-con clearfix">
              <div class="pull-left section-brand-bottom-con clearfix">
                  <div class="web-section-brand-item1">
                      <div class="web-section-brand-name">
                          <p class="itemp">{{ this.storeName }}</p>
                      </div>
                      <div class="web-section-brand-number">
                          <strong  class="web-section-brand-price">{{ this.goodsTotal }}</strong>
                          <p>款轻奢潮品</p>
                      </div>
                      <div class="web-section-brand-link">
                          <a href="/brand/{{this.storeId}}">进入店铺</a>
                      </div>
                  </div>
              </div>
              <div class="pull-left section-brand-bottom-con2">
                  <div class="web-section-brand-item2">
                      <div class="web-section-img">
                          <a href="/brand/{{this.storeId}}">
                              <img src="{{ this.brandDisplayImage }}" alt="">
                              <div class="web-section-etro">
                                  <p class="itemp">{{ this.storeName }}</p>
                              </div>
                          </a>
                      </div>
                  </div>
              </div>

              <div class="pull-left section-brand-bottom-con3">
                  <div class="web-section-brand-item3">
                      {{#each this.goodsList good }}
                      <div class="web-section-brand-item-con pull-left">
                          <a class="brand-list-item" href="/goods/{{this.goodsId}}">
                              <div class="brand-list-item-img">
                                <img src="{{ this.mediaUrl }}">
                              </div>
                              <div class="content">
                                <div class="title">{{ this.goodsName }}</div>
                                <div class="price">￥{{ currency(this.sellPrice, 2) }}</div>
                                <div class="original-price">￥{{ currency(this.tagPrice, 2) }}</div>
                              </div>
                          </a>
                      </div>
                      {{/each}}
                  </div>
              </div>
              </div>
          </div>
        </div>
      {{/each}}

      <div class="brand-section">
        <div class="go-search-btn" on-click="more()">MORE</div>
      </div>
    </div>
  `,

  data: {
    list: window.__initPageData__,
    offset: 2,
    partionId: window.__partionId__
  },

  methods: {
    more() {
      let page = this.get('offset')

      let list = getStoreList({
        offset: page,
        partionId: this.get('partionId')
      }).then(res => {
        if (res.items) {
          this.set('offset', ++page)
          this.set('list', this.get('list').concat(res.items))
        }
      })
    }
  }
})
