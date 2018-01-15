import '../boot'
import { getStoreGroup, getStoreGroupCate } from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-brand-list',

    template: `
      <div class="brand-list-commodity">
        <div class="brand-list-commodity-con">
          <div class="brand-list-commodity-whole">
            <div class="brand-list-all-commodity">
                ALL commodity
            </div>
            <div class="brand-list-all-shopping">
                全部商品
            </div>
          </div>
          <div class="brand-list-all-item">
              <ul class="brand-list-tab clearfix">
                {{#each group:index}}
                  {{#if index < 6}}
                    <li
                      class="brand-list-con pull-left {{#if activeTab === index}}active{{/if}}"
                      on-click="brandSwitch(index, this.categoryId)">
                      <span class="item">{{ this.categoryName }} <b>{{ this.totalGoodsCount }}</b></span>
                    </li>
                  {{/if}}
                {{/each}}
              </ul>
          </div>
        </div>

        <div class="wrapper">
          <div class="search-result-container">
            {{#each cateList}}
              <ShoppingItem
                class="search-result-item"
                id="{{ this.goodsId }}"
                title="{{ this.title }}"
                image="{{ this.mediaUrl }}"
                price="{{ this.sellPrice }}"
                origin-price="{{ this.tagPrice }}">
              </ShoppingItem>
            {{/each}}
          </div>

          <Pagination></Pagination>
        </div>
      </div>
  `,

    data: {
      storeId: window.__brandId__,
      categoryId: '',
      activeTab: 0,
      group: [],
      cateList: [],
      offset: 0,
      partionId: window.__partionId__
    },

    afterMount() {
      Promise.all([
        getStoreGroup({
          partionId: this.get('partionId'),
          storeId: this.get('storeId'),
          categoryId: this.get('categoryId')
        }),
        getStoreGroupCate({
          limit: 16,
          offset: this.get('offset'),
          partionId: this.get('partionId'),
          categoryId: this.get('categoryId'),
          storeId: this.get('storeId')
        })
      ]).then(res => {
        let [group, groupCate] = res

        this.set('group', group.goodsCategoryList)
        this.set('cateList', groupCate.items)
      })
    },

    methods: {
      brandSwitch(index, cateId) {
        this.set('offset', 0)
        this.set('activeTab', index)
        this.set('categoryId', cateId ? cateId : '')

        getStoreGroupCate({
          limit: 16,
          offset: this.get('offset'),
          partionId: this.get('partionId'),
          categoryId: this.get('categoryId'),
          storeId: this.get('storeId')
        }).then(res => {
          this.set('cateList', res.items)
        })
      }
    }
  })
})
