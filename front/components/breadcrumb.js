export default {
  template: `
    <ol class="breadcrumb">
      <li><a href="{{allLink}}">{{ allText }}</a></li>
      {{#each items:index}}
        {{#if index !== items.length - 1}}
        <li><a href="/search?cate={{this.categoryId}}">{{ this.name }}</a></li>
        {{/if}}
        {{#if index === items.length - 1}}
          <li class="active">{{name}}</li>
        {{/if}}
      {{/each}}
    </ol>
  `,

  propTypes: {
    items: {
      type: 'array'
    },

    showAll: {
      type: 'boolean',
      value: true
    },

    allLink: {
      type: 'string',
      value: '/search'
    },

    allText: {
      type: 'string',
      value: '全部'
    }
  }
}
