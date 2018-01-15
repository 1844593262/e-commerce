import EmptyPlaceholder from './components/empty-placeholder'
import Pagination from './components/pagination'
import Breadcrumb from './components/breadcrumb'
import TabContainer from './components/tab-container'
import Tabnav from './components/tab-nav'
import TabPane from './components/tab-pane'
import NumberSelector from './components/number-selector'
import ShoppingItem from './components/items/shopping-item'
import GoodsAttrSelection from './components/items/goods-attr-selection-item'
import GoodsDetailAttrItem from './components/items/goods-detail-attr-item'
import CartGeneralListItem from './components/items/cart-general-list-item'
import CartInvalidListItem from './components/items/cart-invalid-list-item'
import CartNumItem from './components/items/cart-num-item'
import CartDeleteItem from './components/items/cart-delete-item'
import CartCheckAllItem from './components/items/cart-check-all-item'
import CartReceiveAddressItem from './components/items/cart-receive-address-item'
import CartMemberPointItem from './components/items/cart-member-point-item'
import CartSelfPickItem from './components/items/cart-self-pick-item'
import CartCouponItem from './components/items/cart-coupon-item'
import MessageBox from './components/message-box'
import Dialog from './components/dialog'
import DashboardSidebarNav from './components/dashboard-sidebar-nav'
import DashboardSidebarUser from './components/dashboard-sidebar-user'
import OrderItem from './components/items/order-item'
import CouponItem from './components/items/coupon-item'
import CityCascade from './components/city-cascade'
import ModifyAddressModal from './components/dialog/modify-address-dialog'
import ModifyPaypwModal from './components/dialog/modify-paypw-dialog'
import WchatPayModal from './components/dialog/wechat-pay-dialog'

Yox.component({
  EmptyPlaceholder,
  Pagination,
  Breadcrumb,
  TabContainer,
  Tabnav,
  TabPane,
  NumberSelector,
  ShoppingItem,
  GoodsAttrSelection,
  GoodsDetailAttrItem,
  CartGeneralListItem,
  CartInvalidListItem,
  CartNumItem,
  CartDeleteItem,
  CartCheckAllItem,
  CartReceiveAddressItem,
  CartMemberPointItem,
  CartSelfPickItem,
  CartCouponItem,
  Dialog,
  DashboardSidebarNav,
  DashboardSidebarUser,
  OrderItem,
  CouponItem,
  CityCascade,
  ModifyAddressModal,
  ModifyPaypwModal,
  WchatPayModal
})

Yox.filter('arrayHas', function (array, item) {
  return array.indexOf(item) !== -1
})

Yox.filter('currency', function (val = 0, decimals = 0) {
  val = parseFloat(val) / 100;
  if (decimals !== 0) {
    return val.toFixed(decimals);
  } else {
    return val;
  }
})

Yox.filter('moment', function (val, format) {
  if (val) {
    return moment(val).format(format)
  }
})

Yox.filter('orderStatusFilter', function (val) {
  return {
    'PRE_PAY': '待支付',
    'CANCEL': '已取消',
    'PRE_DELIVER': '待发货',
    'PRE_ACCEPT': '待收货',
    'REFUNDING': '退款中',
    'REFUNDED': '已退款',
    'CLOSE': '已关闭',
    'PRE_EVALUATE': '待评价',
    'COMPLETE': '已完成',
  }[val]
})

Yox.prototype.$alert = function(content, title = '信息') {
  layer.alert(content, { move: false })
}
