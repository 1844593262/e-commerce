export default {
  template: `
    <div class="search-result-item shopping-item {{#if noAction}}no-action{{/if}}">
      <div class="shopping-item-image">
        {{#if isClub}}
          <a href="/club/item/{{ id }}">
            <img src="{{ image }}">
          </a>
        {{else}}
          <a href="/goods/{{ id }}">
            <img src="{{ image }}">
          </a>
        {{/if}}
      </div>
      {{#if !isClub}}
      <div class="meta">
        {{#if discount !== '10.0' && originPrice !== 0 }}
          <span class="desc">吊牌价</span>
          <span>{{ discount }}</span>折
        {{/if}}
      </div>
      {{/if}}
      <div class="content">
        <div class="title">
          {{ title }}
        </div>
        <div class="price">
          {{#if isClub}}
            {{ currency(price) }}积分
          {{else}}
            ¥{{ currency(price, 2) }}
          {{/if}}
        </div>
        {{#if !isClub}}
        <div class="origin-price">
          ¥{{ currency(originPrice, 2) }}
        </div>
        {{/if}}
        {{#if !noAction}}
          <div class="action">
            <div class="item">
              <img src="/static/image/cart_yel_icon.png">
            </div>
            <div class="item">
              <img src="/static/image/heart_yel.png">
            </div>
          </div>
        {{/if}}
      </div>
    </div>
  `,

  propTypes: {
    id: {
      type: 'numeric'
    },

    title: {
      type: 'string'
    },

    image: {
      type: 'string'
    },

    price: {
      type: 'numeric'
    },

    originPrice: {
      type: 'numeric'
    },

    noAction: {
      type: 'boolean',
      value: false
    },

    isClub: {
      type: 'boolean',
      value: false
    }
  },

  computed: {
    discount () {
      let discount = this.get('price') * 10 / this.get('originPrice')
      return discount.toFixed(1)
    }
  }
}
