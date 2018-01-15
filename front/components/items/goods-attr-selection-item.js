import { buildResult } from '../../utils/sku-calc'

export default {
  template: `
    <div class="action-section goods-attr-section-mod">
      {{#each skuList:index}}
        <GoodsDetailAttrItem
          unselected-attrs="{{ unselectedAttrs }}"
          name="{{this.attrLabel}}"
          attrs="{{this.skuAttrList}}"
          attr-index="{{ index }}"
          on-attrSelected="goodsAttrSelected"
          on-attrUnselected="goodsAttrUnSelected">
        </GoodsDetailAttrItem>
      {{/each}}

      <div class="attr-item number-count clearfix">
        <div class="attr-name">
          数量
        </div>
        <div class="attr-selection">
          <NumberSelector count="{{ count }}">
          </NumberSelector>
          {{#if stock}}
          <span class="stock">(库存: {{ stock }}件)</span>
          {{/if}}
        </div>
      </div>
    </div>
  `,

  data() {
    return {
      unselectedAttrs: [],
      selectedAttrNames: [],
      selectedAttrIndex: [],
      count: 1,
    }
  },

  propTypes: {
    skuKeys: {
      type: 'array'
    },

    skuList: {
      type: 'array',
      value() {
        return []
      }
    },

    combinedAttr: {
      type: 'object',
      value() {
        return {}
      }
    },

    stock: {
      type: 'numeric',
      value: 0
    }
  },

  watchers: {
    count(val) {
      this.fire('goodsNumberChange', { val })
    }
  },

  computed: {
    allAttrs() {
      let o = this.get('combinedAttr')
      if (o.result) {
        return o.result
      }

      return {}
    },

    allPath() {
      let o = this.get('combinedAttr')
      if (o.items) {
        return buildResult(o.items)
      }

      return {}
    }
  },

  events: {
    numberSelectorChange(e, value) {
      this.set('count', value.value)
    },

    goodsAttrSelected(e, item) {
      this.set('unselectedAttrs', this.generateUnselectedAttrs(item, 'select'))
    },

    goodsAttrUnSelected(e, item) {
      this.set('unselectedAttrs', this.generateUnselectedAttrs(item, 'unselect'))
    }
  },

  methods: {
    generateUnselectedAttrs(item, action) {
      let skuKeys = this.get('skuKeys')
      let attrs = this.get('selectedAttrNames')
      let attrIndex = this.get('selectedAttrIndex')
      let allPath = this.get('allPath')
      let unselectedAttrs = new Array(skuKeys.length)

      for (let i = 0; i < unselectedAttrs.length; i++) {
        unselectedAttrs[i] = []
      }

      if (action === 'select') {
        attrs[item.index] = item.name
        attrIndex[item.index] = item.attrValueIndex
      } else {
        attrs[item.index] = ''
        attrIndex[item.index] = ''
      }

      skuKeys.forEach((skukey, skuKeyIndex) => {
        this.get('allAttrs')[skukey].forEach((attr, attrIndex) => {

          // 遍历所有未选属性
          let originSelectedAttrNames = this.get('selectedAttrNames').slice()
          if (this.get('selectedAttrNames')[skuKeyIndex] === attr) {
            return
          }

          originSelectedAttrNames[skuKeyIndex] = attr
          originSelectedAttrNames = originSelectedAttrNames.reduce((prev, next) => {
            if (next !== '' && next !== undefined) {
              prev.push(next)
            }

            return prev
          }, [])

          let checkPath = originSelectedAttrNames.join('_')

          if (!allPath[checkPath]) {
            if (!unselectedAttrs[skuKeyIndex]) {
              unselectedAttrs[skuKeyIndex] = []
            }

            unselectedAttrs[skuKeyIndex].push(attrIndex)
          }
        })
      })

      let isAllAttrSelected = true
      for (let i = 0; i < attrs.length; i++) {
        if (attrs[i] === '' || attrs[i] === undefined) {
          attrs[i] === ''
          isAllAttrSelected = false
        }
      }

      if (attrs.length === skuKeys.length && isAllAttrSelected) {
        this.fire('goodsSkuSelected', { id: allPath[attrs.join('_')] })
      } else {
        this.fire('goodsSkuUnselected')
      }

      return unselectedAttrs
    }
  }
}
