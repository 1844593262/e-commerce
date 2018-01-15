export default {
  template: `
    <div class="city-cascade-module {{#if type === 'only-select'}}only-select{{/if}}">
      <cascadeItem items="{{ items }}" name="省" model="value.0" type="{{ type }}"></cascadeItem>
      <cascadeItem items="{{ activeCityData }}" name="市" model="value.1" type="{{ type }}"></cascadeItem>
    </div>
  `,

  data() {
    activeCityData: []
  },

  propTypes: {
    items: {
      type: 'array'
    },

    value: {
      type: 'array'
    },

    type: {
      type: 'string',
      default: 'text' // only-select
    }
  },

  watchers: {
    items: {
      watcher(val, oldVal) {
        if (!this.get('value.0')) {
          this.set('value.0', val[0].code)
          this.set('activeCityData', val[0].geoRespList)
        }

        let c1 = this.get('items').filter(item => {
          return item.code === Number(this.get('value')[0])
        })

        if (c1.length) {
          this.set('activeCityData', c1[0].geoRespList)
          this.set('value.1', c1[0].geoRespList[0].code)
        }
      }
    },

    'value.**': {
      watcher(val, oldVal) {
        let c1 = this.get('items').filter(item => {
          return item.code === Number(this.get('value')[0])
        })

        if (c1.length) {
          this.set('activeCityData', c1[0].geoRespList)
        }

        this.fire('geoUpdated', {
          value: this.get('value')
        })
      },
      sync: true
    }
  },

  components: {
    cascadeItem: {
      template: `
        <div class="inline-form-control">
          <select class="form-control" model="value">
            {{#each items}}
              <option value='{{this.code}}' selected="{{ this.code === value ? 'selected' : '' }}">{{this.name}}</option>
            {{/each}}
          </select>
          {{#if type !== 'only-select'}}
            <span class="term">{{ name }}</span>
          {{/if}}
        </div>
      `,

      propTypes: {
        items: {
          type: 'array',
          value() {
            return []
          }
        },

        name: {
          type: 'string',
          value: ''
        },

        value: {
          type: 'numeric',
          value: ''
        },

        type: {
          type: 'string',
          default: 'text' // only-select
        }
      },

      watchers: {
        items(val, oldVal) {
          if (val && oldVal && oldVal.length && val.length) {
            this.set('value', val[0].code)
          }
        }
      }
    }
  }
}
