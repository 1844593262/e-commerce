import cookies from 'js-cookie'
import '../boot'
import {
  DashboardCollectionList,
  DashboardCollectData,
  delDashboardCollect,
  getMemberProfile
} from '../api'

$(document).ready(function () {
  new Yox({
    el: '.js-goods-collection',
    template: `
      <div class="dashboard-main clearfix">
        <div class="dashboard-left pull-left">
          <DashboardSidebarUser
            name="{{ profileData.userName }}">
          </DashboardSidebarUser>

          <div class="dashboard-main-sidebar">
            <DashboardSidebarNav>
            </DashboardSidebarNav>
          </div>
        </div>
        <div class="dashboard-right pull-right">
          <ul class="nav nav-tabs has-divider" role="tablist">
            <li role="presentation" class="active">
              <a href="#collect" role="tab" data-toggle="tab">
                {{showstatusFilter(CollectionfirstData.categoryName) ? showstatusFilter(CollectionfirstData.categoryName) : ''}} ({{CollectionfirstData.count ? CollectionfirstData.count : 0}})
              </a>
            </li>
          </ul>

          {{#if CollectionfirstData.count}}
            <div class="tab-content">
              <div role="tabpanel" class="tab-pane active" id="collect">
                <div class="collect">
                  <div class="search-filter search-filter-back clearfix">
                    {{#each CollectionData}}
                      <span class="filter-single-kind filter-all filter-size pull-left"  on-click="tabclassif(this.categoryId,'GOODS')">
                      {{categoryName}}<span class="item">({{count}})</span></span>
                    {{/each}}
                  </div>
                  <div class="collect-con clearfix">

                    <div class="clearfix collect-ul">
                    {{#each ListData}}
                      <div class="collect-con-item pull-left">
                        <a href="/goods/{{this.itemId}}">
                          <div class="collect-con-img"><img src="{{this.goodsImage}}" alt=""></div>
                          <div class="collect-con-active active">
                            <div class="collect-con-title">{{this.goodsName}}</div>
                            <div class="collect-price active">
                              <span class="collect-nowprice">¥{{currency(this.sellPrice)}}</span>
                              <span class="collect-oldprice">¥{{currency(this.tagPrice)}}</span>
                            </div>
                          </div>
                          <span class="collect-del" on-click="collectdel(this.itemId)"></span>
                        </a>
                      </div>
                    {{/each}}
                    </div>
                    {{include '../components/pagination.art'}}
                    </div>
                </div>
              </div>
              <div class="dashboard-collection-clear" style="display:none">
                <div class="dashboard-collection-clear-con">
                    <div class="collection-clear-con-img">
                      <img src="../../static/image/favorite_img_nofavorite.png" alt="">
                    </div>
                    <div class="collection-clear-con-title">你还没有任何收藏呢</div>
                </div>
              </div>
            </div>
          {{else}}
            <EmptyPlaceholder text="暂无数据">
            </EmptyPlaceholder>
          {{/if}}
        </div>
      </div>
    `,

    data: {
      profileData: {},
      CollectionfirstData: {},
      CollectionData: [],
      ListData: [],
      cateparams: {
        categoryId: 42,
        favoriteType: 'GOODS'
      }
    },

    afterMount() {
      Promise.all([
        getMemberProfile(),
        DashboardCollectionList()
      ]).then(res => {
        const [profileData, collectionData] = res

        if (profileData) {
          this.set('profileData', profileData)
        }

        if (collectionData) {
          this.set('CollectionData', collectionData)

          let allclassifi = collectionData.shift()
          this.set('CollectionfirstData', allclassifi ? allclassifi : [])
          this.set('cateparams.categoryId', collectionData[0] ? collectionData[0].categoryId : '')

          DashboardCollectData(this.get('cateparams.categoryId'), this.get('cateparams.favoriteType')).then(res => {
            this.set('ListData', res.items ? res.items : [])
          })
        }
      })
    },

    methods: {
      tabclassif(categoryIdparams, typeparams){
        DashboardCollectData(categoryIdparams,typeparams).then(res=> {
          this.set('ListData', res.items ? res.items : [])
        })
      },

      collectdel(id) {
        delDashboardCollect(id).then(res=> {
          // TODO 局部刷新
          window.location.reload()
        })
      }
    },

    filters: {
      showstatusFilter (data) {
        switch(data) {
          case 'all':
            return '全部收藏'
            break;
        }
      }
    }
  })
})






