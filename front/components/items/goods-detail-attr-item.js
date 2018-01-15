export default {
  template: `
    <div class="attr-item clearfix">
      <div class="attr-name">
        {{ name }}
      </div>
      <div class="attr-selection">
        {{#each attrs:index}}
          {{#if unselectedAttr.length && arrayHas(unselectedAttr, index) }}
            <span
              class="attr-selection-item disabled
              {{#if index === selected}} active{{/if}}">
              {{this.attrValue}}
            </span>
          {{else}}
            <span
              class="attr-selection-item
              {{#if index === selected}} active{{/if}}"
              on-click="selectAttr(index, this)">
              {{this.attrValue}}
            </span>
          {{/if}}
        {{/each}}
      </div>
    </div>
  `,

  data() {
    return {
      selected: '',
      unselectedAttr: []
    }
  },

  propTypes: {
    attrIndex: {
      type: 'number'
    },

    name: {
      type: 'string'
    },

    attrs: {
      type: 'array'
    },

    unselectedAttrs: {
      type: 'array'
    }
  },

  watchers: {
    unselectedAttrs(val) {
      let index = this.get('attrIndex')
      this.set('unselectedAttr', val[index])
    }
  },

  methods: {
    isAttrDisabled(index) {
      return this.get('unselectedAttr').indexOf(index)
    },

    selectAttr(index, attrs) {
      if (this.get('selected') === index) {
        this.set('selected', '')
        this.fire('attrUnselected', {
          index: this.get('attrIndex'),
          name: attrs.attrValue,
          attrValueIndex: index
        })
      } else {
        this.set('selected', index)
        this.fire('attrSelected', {
          index: this.get('attrIndex'),
          name: attrs.attrValue,
          attrValueIndex: index
        })
      }
    }
  }
}
