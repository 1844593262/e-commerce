import cookies from 'js-cookie'
import 'jquery.jedate'
import '../boot'
import {
  getMemberProfile,
  getProvnceandCity,
  putProfile,
  updateUserProfile
} from '../api'

new Yox({
  el: '.js-dashboard-main',

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
        <ul class="nav nav-tabs no-border has-divider" role="tablist">
          <li role="presentation" class="active">
            <a href="#profile" role="tab" data-toggle="tab">
              基本信息
            </a>
          </li>
        </ul>

        <div class="tab-content">
          <div role="tabpanel" class="tab-pane active" id="profile">
            <div class="dashboard-profile-main">

              <form class="form dashboard-profile-form">
                <div class="form-block">
                  <label class="control-label">账号</label>
                  <div class="form-control-wrapper">
                    <div class="form-control-static">
                      {{ modelData.userName ? modelData.userName : ''}}
                    </div>
                  </div>
                </div>
                <div class="form-block">
                  <label class="control-label">性别</label>
                  <div class="form-control-wrapper" >
                    <label class="radio-inline">
                      <input type="radio" name="inlineRadioOptions" value="MALE" model="modelData.gender"> 男
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="inlineRadioOptions" value="FEMALE" model="modelData.gender"> 女
                    </label>
                    <label class="radio-inline">
                      <input type="radio" name="inlineRadioOptions" value="UNKNOWN" model="modelData.gender"> 保密
                    </label>
                  </div>
                </div>

                <div class="form-block">
                  <label class="control-label">身份证号</label>
                  <div class="form-control-wrapper">
                    <input type="text" class="form-control form-control-fix-width" placeholder="身份证号" model="modelData.idCardNo">
                  </div>
                </div>

                <div class="form-block">
                  <label class="control-label">生日</label>
                  <div class="form-control-wrapper">
                    <input class="form-control form-control-fix-width js-datepicker" type="text" placeholder="生日" model="modelData.birthday">
                  </div>
                </div>

                <div class="form-block">
                  <label class="control-label">所在地区</label>

                    <div class="form-control-wrapper">
                      <CityCascade
                        items="{{ cityData }}"
                        value="{{ citySelected }}">
                      </CityCascade>
                    </div>
                </div>

                <div class="action">
                  <div class="btn btn-primary btn-sm btn-block" on-click="saveProfile()">保存</div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,

  data: {
    profileData: {},
    modelData: {
      userName: '',
      gender: '',
      birthday: '',
      provinceCode: '',
      idCardNo: '',
      cityCode: ''
    },
    cityData: [],
    citySelected: []
  },

  afterMount() {
    Promise.all([
      getMemberProfile(),
      getProvnceandCity()
    ]).then(res => {
      const [profile, geoData] = res

      if (profile) {
        this.set('modelData.userName', profile.userName)
        this.set('modelData.birthday', moment(profile.birthday).format('YYYY-MM-DD'))
        this.set('modelData.gender', profile.gender)
        this.set('modelData.idCardNo', profile.idCardNo)
        this.set('modelData.provinceCode', profile.provinceCode)
        this.set('modelData.cityCode', profile.cityCode)
        this.set('profileData', profile)
      }

      if (geoData) {
        this.set('cityData', geoData)
      }
    })

    $.jeDate('.js-datepicker', {
      format: 'YYYY-MM-DD',
      minDate: '1970-01-01',
      language: {
        name: 'cn',
        month: ['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11', '12'],
        weeks: ['日', '一', '二', '三', '四', '五', '六'],
        times: ['小时', '分钟', '秒数'],
        clear: '清空',
        today: '今天',
        yes: '确定',
        close: '关闭'
      },
      festival: false,
      skinCell: 'jedateblue',
      isTime: false,
      okfun: date => {
        this.set('modelData.birthday', date.val)
      }
    })
  },

  events: {
    geoUpdated(e, data) {
      this.set('citySelected', data.value)

      this.set('modelData.provinceCode', data.value[0])
      this.set('modelData.cityCode', data.value[1])
    }
  },

  methods: {
    saveProfile() {
      putProfile(this.get('modelData')).then(res => {
        if (res) {
          this.$alert('更新成功')
        }
      })
    }
  }
})

