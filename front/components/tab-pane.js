export default {
  template: `
    <div
      role="tabpanel"
      class="tab-pane {{#if active}}active{{/if}}"
      id="{{name}}">
      {{$children}}
    </div>
  `,

  propTypes: {
    name: {
      type: 'string'
    },

    active: {
      type: 'boolean',
      value: false
    }
  },

  watcher: {
    active(val) {
      console.log(val)
    }
  }
}
