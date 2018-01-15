export default {
  template: `
    <ul class="dashboard-main-nav">
      {{#each navs}}
      <li class="item {{#if currentPath === path}}active{{/if}}">
        <a href="{{path}}">{{name}}</a>
      </li>
      {{/each}}
    </ul>
  `,

  data() {
    return {
      navs: [
        { name: '个人中心', path: '/member' },
        { name: '订单管理', path: '/member/order' },
        { name: 'VIP CLUB', path: '/member/vipclub' },
        { name: '钱包', path: '/member/wallet' },
        { name: '收藏夹', path: '/member/favorite' },
        { name: '个人资料', path: '/member/profile' },
        { name: '地址管理', path: '/member/address' },
        { name: '账号安全', path: '/member/security' },
        { name: '关于', path: '/help' }
      ],

      currentPath: '/member'
    }
  },

  afterMount() {
    this.set('currentPath', window.location.pathname)
  }
}
