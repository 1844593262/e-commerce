let APIBASEURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000/api'
  : '/api/mall'

let CLUBAPIBASEURL = process.env.NODE_ENV === 'development'
  ? 'http://localhost:9000/clubapi'
  : '/api/club-mall'


var API = axios.create({
  baseURL: APIBASEURL,
  withCredentials: true
})

var CLUBAPI = axios.create({
  baseURL: CLUBAPIBASEURL,
  withCredentials: true
})

function setInterceptor(instance) {
  instance.interceptors.request.use(config => {
    return config
  }, error => {
    return Promise.reject(error)
  })

  instance.interceptors.response.use(response => response, error => Promise.resolve(error.response))
}

function wrapAPI() {
  return API.post(url, data).then(checkStatus)
}

setInterceptor(API)
setInterceptor(CLUBAPI)

function checkStatus(response) {
  if (response.status === 200 || response.status === 304) {
    return response
  }

  return {
    code: response.status,
    data: response.data
  }
}

function apiPost(url, data) {
  return API.post(url, data).then(checkStatus)
}

let APIS = {
  API: {
    get(url, params) {
      return API.get(url, { params }).then(checkStatus).then(res => res.data)
    },

    post(url, data) {
      return API.post(url, data).then(checkStatus).then(res => res.data)
    },

    put(url, data) {
      return API.put(url, data).then(checkStatus).then(res => res.data)
    },

    delete(url, data) {
      return API.delete(url, { data }).then(checkStatus).then(res => res.data)
    }
  },

  CLUBAPI: {
    get(url, params) {
      return CLUBAPI.get(url, { params }).then(checkStatus).then(res => res.data)
    },

    post(url, data) {
      return CLUBAPI.post(url, data).then(checkStatus).then(res => res.data)
    },

    put(url, data) {
      return CLUBAPI.put(url, data).then(checkStatus).then(res => res.data)
    },

    delete(url, data) {
      return CLUBAPI.delete(url, { data }).then(checkStatus).then(res => res.data)
    }
  }
}


//登陆
function login(data) {
  return APIS.API.post('/auth/login', data)
}

// 登出
function logout() {
  return APIS.API.post('/auth/logout')
}

// 获取动态验证码
function getCaptchaImage(data) {
  return `${APIBASEURL}/captcha/image?rand=${data}`
}

// 获取动态短信验证码
function getSmsCode(data) {
  return APIS.API.post('/sms/vcode', data)
}

// 验证手机验证码
function validateSmsCode(data) {
  return APIS.API.post('/sms/vcode/check', data)
}

// 注册
function register(data) {
  return APIS.API.post('/auth/register', data)
}

// 重设密码
function authPassword(data) {
  return APIS.API.put('/auth/password', data)
}

// 获取首页项目id
function getPartion() {
  return APIS.API.get('/homepage/default/partion')
}

// 商品馆品牌列表
function getStoreList(data) {
  return APIS.API.get('/homepage/store')
}

// 店铺分类汇总
function getStoreGroup(data) {
  return APIS.API.post('/store/group', data)
}

// 店铺分类汇总分页
function getStoreGroupCate(data) {
  return APIS.API.get('/store/group/category')
}

// 收藏商品
function favorGoods(data) {
  return APIS.API.post('/member/favorite/goods', data)
}

// 取消收藏
function cancelFavorGoods(id) {
  return APIS.API.delete(`/member/favorite/${id}`)
}

//获取个人中心收藏的全部分类的数量和名字
function DashboardCollectionList() {
  return APIS.API.get('/member/favorite/goods/count')
}

//获取个人中心收藏的分类的商品
function DashboardCollectData(id,type) {
  return APIS.API.get(`/member/favorite?categoryId=${id}&favoriteType=${type}`)
}

//获取用户详情&&获取我的可用积分
//删除收藏夹
function  delDashboardCollect(id) {
  return APIS.API.delete(`/member/favorite/${id}`)
}

//获取用户详情
function getMemberProfile() {
  return APIS.API.get('/member/profile')
}

//获取查询用户余额变化明细
function getPoint(data) {
  return APIS.API.get('/member/accountLog', data)
}

//获取我的浏览历史
function getrecordHistory(type) {
  return APIS.API.get(`/member/viewHistory/group?viewType=${type}`)
}

//删除历史记录
function delrecordHistory(id) {
  return APIS.API.delete(`/member/viewHistory/${id}`)
}

// 添加浏览历史
function addrecordHistory(data) {
  return APIS.API.post('/member/viewHistory/goods', data)
}

//获取我最近的订单
function getRecentorder() {
  return APIS.API.get('/order')
}

//获取我的评论
function getcommentted(startnum,endnum) {
  return APIS.API.get(`/review?offset=${startnum}&limit=${endnum}`)
}

//获取收获地址
function getreceiverAddress() {
  return APIS.API.get(`/receiverAddress?offset=${0}&limit=${20}`)
}

//新增收货地址
function addAddress(data) {
  return APIS.API.post('/receiverAddress', data)
}

//编辑收货地址
function modifyAddress(id, data) {
  return APIS.API.put(`/receiverAddress/${id}`, data)
}

//删除收货地址
function delAddress(id) {
  return APIS.API.delete(`/receiverAddress/${id}`)
}

//获取订单管理
function getOrderManagement(start,end,type) {
  return APIS.API.get(`/order?offset=${start}&limit=${end}&s=${type}`)
}

// 订单详情
function getOrderDetail(id) {
  return APIS.API.get(`/order/${id}`)
}

// 获取顶部购物车列表
function getTopCartList() {
  return APIS.API.get(`/shoppingCart/topShow`)
}

// 获取购物车列表
function getCartList() {
  return APIS.API.get('/shoppingCart')
}

// 添加商品到购物车列表
function addToCart(data) {
  return APIS.API.post('/shoppingCart', data)
}

// 删除购物车单个商品
function delCartSingle(id) {
  return APIS.API.delete(`/shoppingCart/${id}`)
}

// 批量删除购物车选中商品
function delCartSelect(data) {
  return APIS.API.delete("/shoppingCart", data)
}

// 购物车数量变更
function putCartQuantity(data, id) {
  return APIS.API.put(`/shoppingCart/${id}/quantity`, data)
}

// 购物车结算（预下单）
function postCartPreOrder(data) {
  return APIS.API.post("/preOrder", data)
}

// 获取自提点
function getSelfPickupSite(id) {
  return APIS.API.get('/selfPickupSite', {
    partionId: id
  })
}

// 获取会员积分规则
function getMemberPointRule(id) {
  return APIS.API.get('/member/pointRule')
}

// 计算提交订单金额
function postCartOrderAmount(data) {
  return APIS.API.post('/orderConfirm/amount', data)
}

// 提交订单
function postCartOrderConfirm(data) {
  return APIS.API.post('/orderConfirm', data)
}

// 获取订单金额,已付金额
function getGoToPay(id) {
  return APIS.API.get(`/order/${id}/goToPay`)
}

// 支付
function postCartOrderPayment(id, data) {
  return APIS.API.put(`/orderPayment/${id}/payment`, data)
}

//取消订单
function putCancelOrder(id) {
  return APIS.API.put(`/order/${id}/cancel`)
}

//获取优惠券
function getCoupon(data) {
  return APIS.API.get('/couponDist/myCoupon', data)
}

//我的优惠券总的数量
function getCouponTotal() {
  return APIS.API.get('/couponDist/totalNum')
}

//获取各个类型的优惠券的数量
function getCouponTypeNum() {
  return APIS.API.get('/couponDist/typeTotalNum')
}

//钱包余额的充值
function getBalancerecharge(data) {
  return APIS.API.get('/member/accountLog', data)
}

//钱包余额的消费
function getBalanceconsum(data) {
  return APIS.API.get('/member/accountLog', data)
}

// 获取e家积分
function getEPint() {
  return APIS.API.get('/member/ejiaPoints')
}

// 兑换e家积分
function chargePoint(data) {
  return APIS.API.post('/member/ejiaPoints', data)
}

//省市区的获取
function getProvnceandCity() {
  return APIS.API.get('/geoTree')
}

//个人资料的保存
function putProfile(data) {
  return APIS.API.put('/member/profile',data)
}

//更改密码
function updatePassword(data) {
  return APIS.API.put('/member/password', data)
}

//找回支付密码
function modifyPayPassword(data) {
  return APIS.API.put('/member/payPassword', data)
}

//确认收货
function confirmReceipt(id) {
  return APIS.API.put('/order/${id}/receipt');
}

function updateUserProfile() {
  return APIS.API.put('/member/profile')
}

// 预约试衣
function addFitting() {
  return APIS.API.post('/fitting', data)
}

function getCategoryParentsList(id) {
  return APIS.API.get(`/category/parentsList/${id}`)
}

//积分获取收获地址
function getClubReceiverAddress() {
  return APIS.CLUBAPI.get(`/receiverAddress?offset=${0}&limit=${20}`)
}

//积分新增收货地址
function postClubAddress(data) {
  return APIS.CLUBAPI.post('/receiverAddress', data)
}

//积分编辑收货地址
function putClubAddress(id, data) {
  return APIS.CLUBAPI.put(`/receiverAddress/${id}`, data)
}

//积分删除收货地址
function delClubAddress(id) {
  return APIS.CLUBAPI.delete(`/receiverAddress/${id}`)
}

// 积分立即购买（预下单）
function postClubPreOrder(data) {
  return APIS.CLUBAPI.post("/preOrder", data)
}

// 积分提交订单
function postClubOrderConfirm(data) {
  return APIS.CLUBAPI.post("/orderConfirm", data)
}

// 积分 获取订单金额,已付金额
function getClubGoToPay(id) {
  return APIS.CLUBAPI.get(`/order/${id}/goToPay`)
}

// 积分支付
function postClubOrderPayment(id, data) {
  return APIS.CLUBAPI.put(`/orderPayment/${id}/payment`, data)
}

// 积分余额
function getClubMemberProfile() {
  return APIS.CLUBAPI.get('/member/profile')
}

export {
  login,
  logout,
  getSmsCode,
  getCaptchaImage,
  validateSmsCode,
  register,
  authPassword,
  getPartion,
  getStoreList,
  getStoreGroup,
  getStoreGroupCate,
  favorGoods,
  cancelFavorGoods,
  DashboardCollectionList,
  DashboardCollectData,
  delDashboardCollect,
  getMemberProfile,
  getPoint,
  getrecordHistory,
  delrecordHistory,
  addrecordHistory,
  getRecentorder,
  getcommentted,
  getreceiverAddress,
  addAddress,
  modifyAddress,
  delAddress,
  getOrderManagement,
  getOrderDetail,
  getTopCartList,
  getCartList,
  addToCart,
  getSelfPickupSite,
  delCartSingle,
  delCartSelect,
  putCartQuantity,
  postCartPreOrder,
  getMemberPointRule,
  postCartOrderAmount,
  postCartOrderConfirm,
  getGoToPay,
  postCartOrderPayment,
  putCancelOrder,
  getCoupon,
  getCouponTotal,
  getCouponTypeNum,
  getBalancerecharge,
  getBalanceconsum,
  getProvnceandCity,
  getEPint,
  chargePoint,
  putProfile,
  updatePassword,
  modifyPayPassword,
  confirmReceipt,
  updateUserProfile,
  getClubReceiverAddress, // 积分
  postClubAddress,
  putClubAddress,
  delClubAddress,
  postClubPreOrder,
  postClubOrderConfirm,
  getClubGoToPay,
  postClubOrderPayment,
  getClubMemberProfile,
  addFitting,
  getCategoryParentsList
}
