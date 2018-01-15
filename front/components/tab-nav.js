export default {
  template: `
    <ul class="nav nav-tabs {{#if noTopBorder}}no-top-border{{/if}} {{#if noBorder}}no-border{{/if}} {{#if divider}}has-divider{{/if}}" role="tablist">
      {{#each items:index }}
        <li
          role="presentation"
          class="{{ index === 0 ? 'active' : '' }}">
          <a href="#{{ name }}" role="tab" data-toggle="tab" on-click="toggleTab(name)">
            {{ label }}
          </a>
        </li>
      {{/each}}
    </ul>
  `,

  data() {
    return {
      value: ''
    }
  },

  propTypes: {
    items: {
      type: 'array'
    },

    noBorder: {
      type: 'boolean',
      value: false
    },

    noTopBorder: {
      type: 'boolean',
      value: false
    },

    divider: {
      type: 'boolean',
      value: false
    }
  },

  methods: {
    toggleTab(name) {
      this.set('value', name)
    }
  }
}
