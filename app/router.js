'use strict';

/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app
  router.get('/', controller.home.index)
  router.get('/search', controller.search.index)

  router.get('/login', controller.auth.login)
  router.get('/register', controller.auth.register)
  router.post('/setpassword', controller.auth.setpassword)
  router.post('/regsuccess', controller.auth.regsuccess)
  router.get('/forgotpassword', controller.auth.findpassword)
  router.post('/forgotsetpassword', controller.auth.findsetpassword)
  router.post('/forgotpasswordsuccess', controller.auth.findpasswordsuccess)

  router.get('/brand', controller.brand.index)
  router.get('/brand/:id', controller.brand.detail)

  router.get('/goods/:id', controller.goods.detail)

  router.get('/club', controller.point.shop)
  router.get('/club/item/:id', controller.point.item)

  router.get('/member', controller.dashboard.index)
  router.get('/member/order', controller.dashboard.orderManage)
  router.get('/member/order/:id', controller.dashboard.orderManageDetail)
  router.get('/member/vipclub', controller.dashboard.vipclub)
  router.get('/member/favorite', controller.dashboard.collection)
  router.get('/member/collectionclear', controller.dashboard.collectionClear)
  router.get('/member/profile', controller.dashboard.profile)
  router.get('/member/address', controller.dashboard.addressManage)
  router.get('/member/addressmanageclear', controller.dashboard.addressmanageClear)
  router.get('/member/security', controller.dashboard.security)
  router.get('/member/wallet', controller.dashboard.wallet)
  router.get('/member/coupon', controller.dashboard.coupon)
  router.get('/member/cart', controller.cart.cartconfirm)
  router.get('/member/pointexchange', controller.dashboard.exchange)

  router.get('/help', controller.terms.index)
  router.get('/help/about', controller.terms.aboutJumax)
  router.get('/help/rules/comment', controller.terms.UserCommentRules)
  router.get('/help/agreement', controller.terms.Useragreement)
  router.get('/help/user/point', controller.terms.UserPoint)
  router.get('/help/user/level', controller.terms.UserLevel)
  router.get('/help/aftersale', controller.terms.afterSale)
  router.get('/help/delivery', controller.terms.delivAccept)
  router.get('/help/paymentrefund', controller.terms.paymentrefund)
  router.get('/help/tutorial', controller.terms.newvaluablebook)
  router.get('/help/rules/coupon', controller.terms.CouponRule)
  router.get('/help/private', controller.terms.UserPrivate)

  router.post('/order/preview', controller.cart.cartsubmit)
  router.get('/order/:id/pay', controller.cart.cartpay)
  router.get('/order/:id/result', controller.cart.cartpaysuccess)

  router.post('/club/order/preview', controller.point.clubpreview)
  router.get('/club/order/:id/pay', controller.point.clubpay)

};
