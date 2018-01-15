import qs from 'query-string'
import '../boot'

$(document).ready(function () {
  new Yox({
    el: '.js-search-result-container',
    template: `
    <div class="">
      <div class="select-list-wrapper">
        <div class="select-result-nav">
          <Breadcrumb items="{{categoryParentsList}}" all-text="全部结果"></Breadcrumb>
        </div>
        <ul class="select-list-main">
          <li class="brand-li">
            <div class="brand-title pull-left">品牌: </div>
            <div class="brand-kinds {{#if isMore}}active{{/if}}">
              {{#each stores }}
                <label class="brand-single">
                  <input type="checkbox" model="storeSelected" value="{{ this.storeId }}">{{ this.storeName }}
                </label>
              {{/each}}
            </div>
          </li>
          <li class="brand-li li-bottom-none">
            <div class="brand-title pull-left">分类: </div>
            <div class="sort-style-kinds">
              {{#each categories}}
                <span class="sort-style-single" on-click="handleSearchByCate(this.categoryId)">{{ this.name }}</span>
              {{/each}}
            </div>
          </li>

          {{#if !isMore}}
          <div class="select-multiple">多选</div>
          <div class="select-more" on-click="toggleMore()">更多</div>
          {{else}}
          <div class="select-more" on-click="toggleMore()">收起</div>
          {{/if}}

          {{#if isMore}}
            <span class="select-submit" on-click="handleSearchByStore()">提交</span>
            <span class="select-cancel" on-click="toggleMore()">取消</span>
          {{/if}}
        </ul>
      </div>

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
              origin-price="{{ this.tagPrice }}">
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
      categories: window.__pageInitData__.categories,
      categoryParentsList: window.__pageInitData__.categoryParentsList,
      stores: window.__pageInitData__.stores,
      result: window.__pageInitData__.result,
      storeSelected: window.__pageInitData__.storeIds,
      isMore: false,
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

    watchers: {
      storeSelected(val) {
        if (this.get('storeSelected').length > 5) {
          this.$alert('最多只能选择五个品牌')
          this.removeAt('storeSelected', this.get('storeSelected').length -1)
        }
      }
    },

    methods: {
      handleSearchByCate(cateId) {
        window.location.href = `/search?cate=${cateId}&sortBy=${this.get('sortBy')}`
      },

      handleSearchByStore() {
        let ids = qs.stringify({
          storeIds: this.get('storeSelected')
        })

        window.location.href = `/search?${ids}&sortBy=${this.get('sortBy')}`
      },

      toggleMore() {
        this.set('isMore', !this.get('isMore'))
      },

      handleSearchByFilter(filter, order) {
        let filtes = qs.parse(window.location.search)

        filtes.sortBy = filter
        filtes.sortOrder = order

        window.location.href = `/search?${qs.stringify(filtes)}`
      },

      handleSearchByPrice() {
        let filtes = qs.parse(window.location.search)

        filtes.minPrice = this.get('minPrice')
        filtes.maxPrice = this.get('maxPrice')

        window.location.href = `/search?${qs.stringify(filtes)}`
      }
    }
  })
})
