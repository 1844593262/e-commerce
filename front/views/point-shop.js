import qs from 'query-string'
import '../boot'

$(document).ready(function () {
  new Yox({
    el: '.js-search-result-container',
    template: `
    <div>
      <div class="search-filter">
        <span class="filter-single-kind filter-all" on-click="handleSearchByFilter('together')">综合</span>
        <span class="filter-single-kind filter-hot" on-click="handleSearchByFilter('salesVolume')">人气</span>
        <span class="filter-single-kind filter-discount" on-click="handleSearchByFilter('discount')">折扣</span>
        <span class="filter-single-kind filter-new" on-click="handleSearchByFilter('updateTime')">新品</span>
        <div class="filter-drop drop-price">
          <div class="title">价格</div>
          <ul class="drop-select">
            <li on-click="handleSearchByFilter('price', 'ASC')">价格从低到高</li>
            <li on-click="handleSearchByFilter('price', 'DESC')">价格从高到低</li>
          </ul>
        </div>
        <div class="filter-price-range pull-left">
          <input class="range-min-max pull-left" type="text" placeholder="￥最小金额" model="minPrice">
          <div class="line pull-left">-</div>
          <input class="range-min-max pull-left" type="text" placeholder="最大金额" model="maxPrice">
          <div class="make-sure pull-left" on-click="handleSearchByPrice()">确定</div>
        </div>
      </div>

      {{#if result && result.length > 0 }}
        <div class="search-result-container">
          {{#each result}}
            <ShoppingItem
              class="search-result-item"
              id="{{ this.goodsId }}"
              title="{{ this.goodsName }}"
              image="{{ this.url }}"
              price="{{ this.sellPrice }}"
              origin-price="{{ this.tagPrice }}"
              no-action="{{ true }}"
              is-club="{{ true }}">
            </ShoppingItem>
          {{/each}}
        </div>
        <div>
          <Pagination on-currentChange="searchListPageChange"></Pagination>
        </div>
      {{else}}
        <EmptyPlaceholder text="亲，找不到对应商品~">
        </EmptyPlaceholder>
      {{/if}}
    </div>
  `,
    data: {
      result: window.__pageInitData__.result,
      sortBy: 'updateTime',
      sortOrder: 'DESC',
      minPrice: '',
      maxPrice: ''
    },

    events: {
      searchListPageChange(event, page) {
        console.log(event, page)
        return false
      }
    },

    methods: {
      handleSearchByCate(cateId) {
        window.location.href = `/club?cate=${cateId}&sortBy=${this.get('sortBy')}`
      },

      handleSearchByFilter(filter, order) {
        let filtes = qs.parse(window.location.search)

        filtes.sortBy = filter
        filtes.sortOrder = order

        window.location.href = `/club?${qs.stringify(filtes)}`
      },

      handleSearchByPrice() {
        let filtes = qs.parse(window.location.search)

        filtes.minPrice = this.get('minPrice')
        filtes.maxPrice = this.get('maxPrice')

        window.location.href = `/club?${qs.stringify(filtes)}`
      }
    }
  })
})
