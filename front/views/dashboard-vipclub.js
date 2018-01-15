import '../boot'
import {
  getMemberProfile,
  getPoint
} from '../api'

new Yox({
  el: '.js-body-blanceInter',

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
        <Tabnav items="{{ tabItems }}">
        </Tabnav>

        <TabContainer>
          <TabPane name="consum-point" active="{{ true }}">
            <div class="dashboard-vipclub-status clearfix">
              <div class="media">
                <div class="media-left">
                  <img class="banner-img" src="/static/image/vipclub_img_card.png">
                </div>
                <div class="media-body">
                  <div class="content">
                    <div class="vipclub-status-item card">
                      <span class="term">会员卡号</span>
                      <span class="detail">
                        NO.{{profileData.userName ? profileData.userName : ''}}
                      </span>
                    </div>
                    <div class="vipclub-status-item point">
                      <span class="term">当前积分</span>
                      <span class="detail">
                        <span class="point-content">{{profileData.pointAccount ? profileData.pointAccount : 0}}</span>
                      </span>
                    </div>
                    <div class="vipclub-status-item grade">
                      <span class="term">账号等级</span>
                      <span class="detail">
                        <span>{{profileData.leverName ? profileData.leverName : ''}}</span>
                      </span>
                    </div>
                    <div class="vipclub-point-action clearfix">
                      <a class="charge-point-btn pull-left" href="/member/pointexchange">
                      </a>
                    </div>
                    <div class="dashboard-vipclub-status-extra">
                      <a href="/help/user/point" class="link-item">积分获得和使用</a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div class="dashboard-vipclub-point-main">
              <div class="dashboard-vipclub-filter">
                <div class="item {{active == 'DETAILS'? 'active' : ''}}" id="tabchange" on-click="getPoint()">
                  <div>积分变动明细</div>
                </div>
                <div class="item {{active == 'PLUS'? 'active' : ''}}" on-click='getPointAdd()' id="addPoint">
                  <div>积分增加</div>
                </div>
                <div class="item {{active == 'MENUS'? 'active' : ''}}"  on-click='getPointReduce()'>
                  <div>积分减少</div>
                </div>
              </div>
            </div>
            <table class="vipclub-point-table">
              <colgroup>
                <col style="width: 255px">
                <col style="width: 165px">
                <col style="width: 245px">
                <col>
              </colgroup>
              <tbody class="item-header">
                <tr>
                  <td>来源和用途</td>
                  <td>积分变化</td>
                  <td>日期</td>
                </tr>
              </tbody>
              <tbody class="item-body">
                {{#each pointData.items}}
                  <tr>
                    <td>
                      {{this.remark ? this.remark : ''}}
                    </td>
                    <td>
                      {{#if this.adjustType == 'ADD'}}
                        <span class="point-plus">{{this.amount ? this.amount : ''}}</span>
                      {{else if this.adjustType == 'REDUCE'}}
                        <span class="point-plus"> - {{this.amount ? this.amount : ''}}</span>
                      {{/if}}
                    </td>
                    <td>
                      {{this.createTime ? moment(this.createTime, 'YYYY-MM-DD HH:mm:ss') : ''}}
                    </td>
                  </tr>
                {{/each}}
              </tbody>
            </table>
          </TabPane>
        </TabContainer>

        <Pagination total="{{profileData.total ? profileData.total : 0}}">
        </Pagination>
      </div>
    </div>
  `,

  data: {
    profileData: {},
    tabItems: [
      { label: '消费积分', name: 'consum-point' },
    ],
    pointparams: {
      accountType: '',
      adjustType: ''
    },
    active: 'DETAILS',
    pointData: {},
    AddPointData: {},
    ReducePointData: {}
  },

  afterMount() {
    Promise.all([
      getMemberProfile(),
      getPoint({ accountType: 'POINT' })
    ]).then(res => {
      const [profileData, pointData] = res

      this.set('profileData', profileData ? profileData : {})
      this.set('pointData', pointData ? pointData : {})
    })
  },

  methods: {
    getPoint(){
      this.set('active','DETAILS');

      getPoint({
        accountType: 'POINT'
      }).then(res=> {
        this.set('pointData', res ? res : {})
      })
    },

    getPointAdd(){
      this.set('active','PLUS');
      getPoint({
        accountType: 'POINT',
        adjustType: 'ADD'
      }).then(res=> {
        this.set('pointData', res ? res : {})
      })
    },

    getPointReduce(){
      this.set('active','MENUS');
      getPoint({
        accountType: 'POINT',
        adjustType: 'REDUCE'
      }).then(res=> {
        this.set('pointData', res ? res : {})
      })
    }
  }
})
