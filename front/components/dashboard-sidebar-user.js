export default {
  template: `
    <div class="dashborad-user-base-info">
      <div class="user-avatar">
        <img src="{{ avatar ? avatar : '/static/image/avatar-default.jpg' }}">
      </div>
      <div class="user-name">
        {{ name  }}
      </div>
    </div>
  `,

  propTypes: {
    name: {
      type: 'string'
    },

    avatar: {
      type: 'string'
    }
  }
}
