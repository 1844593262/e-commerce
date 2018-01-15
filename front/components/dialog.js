export default {
  template: `
    <div style="display: none">
      {{#if titleType === 'center'}}
      <div class="sd-layer-title">{{ title }}</div>
      {{else if titleType === 'both-side'}}
      <div class="sd-layer-title">
        <span class="header-text-left">{{ title }}</span>
        <span class="header-text-right">{{ subTitle.textLeft }}{{ subTitle.textRight }}</span>
      </div>
      {{/if}}
      {{$children}}
    </div>
  `,

  data() {
    return {
      instance: ''
    }
  },

  propTypes: {
    value: {
      type: 'boolean',
      value: false
    },

    title: {
      type: 'string',
      value: '信息'
    },

    size: {
      type: 'string',
      value: 'normal'
    },

    area: {
      type: 'array'
    },

    titleType: {
      type: 'string',
      value: 'center'
    },

    subTitle: {
      type: 'object',
    }
  },

  computed: {
    areas() {
      let o

      if (this.get('size') === 'normal') {
        o = ['590px', '395px']
      } else if (this.get('size') === 'large') {
        o = ['840px', '520px']
      }

      return this.get('area') || o
    }
  },

  watchers: {
    value(val) {
      if (val) {
        let instance = layer.open({
          type: 1,
          title: false,
          closeBtn: 0,
          shadeClose: true,
          move: false,
          area: this.get('areas'),
          content: $(this.$el),
          end: () => {
            this.set('value', false)
            layer.close(this.get('instance'))
            this.set('instance', null)
          }
        })

        this.set('instance', instance)
      } else {
        layer.close(this.get('instance'))
        this.set('instance', null)
      }
    }
  }
}
