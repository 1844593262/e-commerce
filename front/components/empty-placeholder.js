export default {
  template: `
    <div class="module-empty-placeholder">
      <img src="/static/image/kulian.png">
      <div class="content">{{ text }}</div>
    </div>
  `,

  propTypes: {
    text: {
      type: 'string'
    }
  }
}
