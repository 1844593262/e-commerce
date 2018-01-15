export default {
  template: `
    <div class="ju-pagination">

      <ul class="pagination">
        {{#if pageCount > 0}}
        <li
          class="number {{ currentPage === 1 ? 'active' : '' }}">
          <a on-click="click(1)" href="#">1</a>
        </li>
        {{/if}}

        {{#if showPrevMore}}
          <li><span class="dot">...</span></li>
        {{/if}}

        {{#each pagers}}
          <li
            class="{{ currentPage === this ? 'active' : '' }}">
            <a on-click="click(this)" href="#">{{ this }}</a>
          </li>
        {{/each}}

        {{#if showNextMore }}
          <li><span class="dot">...</span></li>
        {{/if}}

        {{#if pageCount > 1}}
          <li
            class="{{ currentPage === pageCount ? 'active' : '' }}">
            <a on-click="click(pageCount)" href="#">{{ pageCount }}</a></li>
        {{/if}}

        <li><a class="next" href="#"></a></li>
        <li>第 <input class="page-number-input" type="text"> 页</li>
        <li><div class="confirm">确定</div></li>
      </ul>

    </div>
  `,

  data () {
    return {
      pagerCount: 7
    }
  },

  methods: {
    click(val) {
      if (val !== this.get('currentPage')) {
        this.set('currentPage', val)
        this.fire('currentChange', { currentPage: val })
      }
      return false
    }
  },

  propTypes: {
    total: {
      type: 'numeric',
      value: 0
    },

    pageSize: {
      type: 'number',
      value: 10
    },

    currentPage: {
      type: 'number',
      value: 1
    }
  },

  computed: {
    pageCount () {
      return Math.ceil(this.get('total') / this.get('pageSize'))
    },

    showPrevMore() {
      const pagerCount = Number(this.get('pagerCount'))
      const currentPage = Number(this.get('currentPage'))
      const pageCount = Number(this.get('pageCount'))

      let showPrevMore = false
      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - 3) {
          showPrevMore = true
        }
      }

      return showPrevMore
    },

    showNextMore() {
      const pagerCount = Number(this.get('pagerCount'))
      const currentPage = Number(this.get('currentPage'))
      const pageCount = Number(this.get('pageCount'))

      let showNextMore = false
      if (pageCount > pagerCount) {
        if (currentPage < pageCount - 3) {
          showNextMore = true
        }
      }

      return showNextMore
    },

    pagers() {
      const pagerCount = this.get('pagerCount')

      const currentPage = Number(this.get('currentPage'))
      const pageCount = Number(this.get('pageCount'))

      let showPrevMore = false
      let showNextMore = false

      if (pageCount > pagerCount) {
        if (currentPage > pagerCount - 3) {
          showPrevMore = true
        }

        if (currentPage < pageCount - 3) {
          showNextMore = true
        }
      }

      const array = []

      if (showPrevMore && !showNextMore) {
        const startPage = pageCount - (pagerCount - 2)
        for (let i = startPage; i < pageCount; i++) {
          array.push(i)
        }
      } else if (!showPrevMore && showNextMore) {
        for (let i = 2; i < pagerCount; i++) {
          array.push(i)
        }
      } else if (showPrevMore && showNextMore) {
        const offset = Math.floor(pagerCount / 2) - 1
        for (let i = currentPage - offset; i <= currentPage + offset; i++) {
          array.push(i)
        }
      } else {
        for (let i = 2; i < pageCount; i++) {
          array.push(i)
        }
      }

      return array
    }
  }
}
