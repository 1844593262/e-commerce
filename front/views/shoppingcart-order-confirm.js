import '../boot'
import {
    getCartList,
    putCartQuantity,
    delCartSingle,
    postCartPreOrder,
    delCartSelect
  } from '../api'

$(document).ready(function () {
    new Yox({
        el: '.js-shopping-cart-confirm-wrapper',
        template: `
        <div>
            {{#if !list.normalGoods.quantity && list.invalidList.length === 0 }}
            <div class="shopping-cart-nocontent">
                <div class="shoppingcart-clear clearfix">
                    <div class="shoppingcart-clear-con clearfix">
                        <div class="shoppingcart-clear-img pull-left">
                            <img src="../static/image/msg_img_dis.png" alt="">
                        </div>
                        <div class="shoppingcart-clear-cart pull-left">
                            <div class="shoppingcart-clear-tilte">
                                购物车空空如也~
                            </div>
                            <a href="#" class="shopping-clear-go-to-see">去首页看看</a>
                        </div>
                    </div>
                </div>
            </div>
            {{/if}}

            {{#if !!list.normalGoods.quantity || list.invalidList.length > 0 }}
            <div class="shopping-cart-con">
                <ul class="nav nav-tabs has-divider cart-nav-margin" role="tablist">
                    <li role="presentation" class="active">
                        <a href="#shoppingMall" role="tab" data-toggle="tab">
                            钜MAX商城({{ list.normalGoods.quantity }})
                        </a>
                    </li>
                    <li role="presentation">
                        <a href="#invalidProduct" role="tab" data-toggle="tab">
                            失效商品({{ list.invalidList.length }})
                        </a>
                    </li>
                </ul>
                <div class="tab-content">

                    <div role="tabpanel" class="tab-pane active" id="shoppingMall">
                        <div class="{{#if !list.normalGoods.wholeActivityItems.length }}hidden{{/if}}">
                            {{#each list.normalGoods.wholeActivityItems:fIndex }}
                            <div class="js-shop js-shop-check">
                                <ul class="nav nav-tabs has-divider cart-nav-margin" role="tablist">
                                    <li role="presentation" class="active">
                                        <a href="#wholeActivity" role="tab" class="cart-nav-title" data-toggle="tab">
                                            {{ this.activityName}}
                                            ({{ this.items.length }})
                                        </a>
                                    </li>
                                </ul>

                                <div role="tabpanel" class="tab-pane active" id="wholeActivity">
                                    <div class="shopping-cart-thead">
                                        <table class="shopping-cart-table">
                                            <thead class="shopping-cart-table-head">
                                                <th class="all-choice">
                                                <CartCheckAllItem
                                                    currentGoodsList="{{ this }}"
                                                    fIndex="{{ fIndex }}"
                                                    on-checkAll="cartCheckAll">
                                                </CartCheckAllItem>
                                                </th>
                                                <th class="cart-all-choice">
                                                    <span class="quanxuan">全选</span>
                                                </th>
                                                <th class="goods-infor">商品信息</th>
                                                <th class="each-price">商品单价</th>
                                                <th class="goods-number">数量</th>
                                                <th class="goods-total-price">商品总金额</th>
                                                <th class="goods-operate">操作</th>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>
                                    <div class="shopping-cart-wrapper">
                                        <div class="shopping-cart-table-margin">
                                            <table class="shopping-cart-table">
                                                <thead style="border-right:1px solid #ccc;">
                                                    <th class="all-choice"></th>
                                                    <th class="cart-all-choice"></th>
                                                    <th class="goods-infor"></th>
                                                    <th class="each-price"></th>
                                                    <th class="goods-number"></th>
                                                    <th class="goods-total-price"></th>
                                                    <th class="goods-operate"></th>
                                                </thead>

                                                {{#each this.items:sIndex }}
                                                    <CartGeneralListItem
                                                        list="{{ this }}"
                                                        fIndex="{{ fIndex }}"
                                                        sIndex="{{ sIndex }}"
                                                        types="{{ wholeType }}"
                                                        on-checkSingle="cartCheckSingle"
                                                        on-deleteSingle="cartDeleteSingle">
                                                        </CartGeneralListItem>
                                                {{/each}}

                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {{/each}}
                        </div>

                        <div class="{{#if !list.normalGoods.structureItems.length }}hidden{{/if}}">
                            {{#each list.normalGoods.structureItems:fIndex }}
                            <div class="js-shop js-shop-check">
                                <ul class="nav nav-tabs has-divider cart-nav-margin" role="tablist">
                                    <li role="presentation" class="active">
                                        <a href="#structureItems" role="tab" class="cart-nav-title" data-toggle="tab">
                                            {{ this.title}}
                                            ({{ this.quantity }})
                                        </a>
                                    </li>
                                </ul>

                                <div role="tabpanel" class="tab-pane active" id="structureItems">
                                    <div class="shopping-cart-thead">
                                        <table class="shopping-cart-table">
                                            <thead class="shopping-cart-table-head">
                                                <th class="all-choice">
                                                <CartCheckAllItem
                                                    currentGoodsList="{{ this }}"
                                                    fIndex="{{ fIndex + wholeActivityLength }}"
                                                    on-checkAll="cartCheckAll">
                                                    </CartCheckAllItem>
                                                </th>
                                                <th class="cart-all-choice">
                                                    <span class="quanxuan">全选</span>
                                                </th>
                                                <th class="goods-infor">商品信息</th>
                                                <th class="each-price">商品单价</th>
                                                <th class="goods-number">数量</th>
                                                <th class="goods-total-price">商品总金额</th>
                                                <th class="goods-operate">操作</th>
                                            </thead>
                                            <tbody>
                                            </tbody>
                                        </table>
                                    </div>

                                    <div class="shopping-cart-wrapper">
                                        <div class="shopping-cart-table-margin">
                                            <table class="shopping-cart-table">
                                                <thead style="border-right:1px solid #ccc;">
                                                    <th class="all-choice"></th>
                                                    <th class="cart-all-choice"></th>
                                                    <th class="goods-infor"></th>
                                                    <th class="each-price"></th>
                                                    <th class="goods-number"></th>
                                                    <th class="goods-total-price"></th>
                                                    <th class="goods-operate"></th>
                                                </thead>

                                                {{#each this.activityItems:mIndex }}
                                                    <tbody>
                                                        <tr>
                                                            <td colspan="7">
                                                                {{ this.activityName }}
                                                            </td>
                                                        </tr>
                                                    </tbody>
                                                    {{#each this.items:sIndex }}
                                                        <CartGeneralListItem
                                                            list="{{ this }}"
                                                            fIndex="{{ fIndex }}"
                                                            mIndex="{{ mIndex }}"
                                                            sIndex="{{ sIndex }}"
                                                            types="{{ strucType }}"
                                                            on-checkSingle="cartCheckSingle"
                                                            on-deleteSingle="cartDeleteSingle">
                                                            </CartGeneralListItem>
                                                    {{/each}}
                                                {{/each}}

                                                {{#each this.generalItems:sIndex }}
                                                    <CartGeneralListItem
                                                        list="{{ this }}"
                                                        fIndex="{{ fIndex }}"
                                                        sIndex="{{ sIndex }}"
                                                        types="{{ generType }}"
                                                        on-checkSingle="cartCheckSingle"
                                                        on-deleteSingle="cartDeleteSingle">
                                                        </CartGeneralListItem>
                                                {{/each}}
                                            </table>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        {{/each}}
                        </div>

                        <div class="cart-total-calcu">
                            <div class="cart-total-calcu-con clearfix">
                                <div class="left-section pull-left">
                                    <div class="cart-alread-choice pull-left">已选
                                        <span class="cart-alread-choice-number">({{ selectLength }})</span>
                                    </div>
                                    <span class="cart-del pull-left" on-click="deleteSelect()">删除选中商品</span>
                                </div>
                                <div class="right-section pull-left clearfix">
                                    <span class="shopping-total-price pull-left">商品总金额 :</span>
                                    <b class="cart-red pull-left">￥{{ currency(totalAmount, 2) }}</b>
                                    <div class="cart-red-calculate pull-left" on-click="gotoPay()">
                                        <form method="POST" action="/order/preview" id="totalAmountPay">
                                            <input class="js-cart-predata" type="hidden" name="preOrderList" value="{{ predata }}">
                                        </form>
                                        结算
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div role="tabpanel" class="tab-pane" id="invalidProduct">
                        <div class="shopping-cart-thead">
                            <table class="shopping-cart-table">
                                <thead class="shopping-cart-table-head">
                                    <th class="all-choice">
                                        <div class="all-choice-inp">
                                            <input type="checkbox">
                                        </div>
                                    </th>
                                    <th class="cart-all-choice">
                                        <span class="quanxuan"> 全选</span>
                                    </th>
                                    <th class="goods-infor">商品信息</th>
                                    <th class="each-price">商品单价</th>
                                    <th class="goods-number">数量</th>
                                    <th class="goods-total-price">商品总价</th>
                                    <th class="goods-operate">操作</th>
                                </thead>
                                <tbody>
                                </tbody>
                            </table>
                        </div>
                        <div class="shopping-cart-wrapper">
                            <div class="shopping-cart-table-margin">
                                <table class="shopping-cart-table">
                                    <thead class="cart-title-top">
                                        <tr class="cart-title-row">
                                            <th class="all-choice"></th>
                                            <th class="cart-all-choice"></th>
                                            <th class="goods-infor"></th>
                                            <th class="each-price"></th>
                                            <th class="goods-number"></th>
                                            <th class="goods-total-price"></th>
                                            <th class="goods-operate"></th>
                                        </tr>
                                    </thead>
                                    <tbody class="cart-item">

                                    {{#each list.invalidList }}
                                        <CartInvalidListItem
                                        invalidList="{{ this }}">
                                        </CartInvalidListItem>
                                    {{/each}}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        <div class="cart-total-calcu">
                            <div class="cart-total-calcu-con clearfix">
                                <div class="left-section pull-left">
                                    <div class="cart-alread-choice pull-left">已选
                                        <span class="cart-alread-choice-number">(0)</span>
                                    </div>
                                    <span class="cart-del pull-left" on-click="deleteSelect()">删除选中商品</span>
                                </div>
                            </div>
                        </div>

                    </div>

                </div>
            </div>

            <div class="slider-recom">
                <div class="title add-margin-top-title">
                    <span>为你推荐</span>
                </div>
            </div>

            <div class="search-result-container search-result-margin-bottom">
                <div class="search-result-item shopping-item">
                    <div class="shopping-item-image">
                        <a href="./goods">
                            <img src="../../static/image/shopping-item.jpg">
                        </a>
                    </div>
                    <div class="content">
                        <div class="title">
                            小卡帕KAPPAKIDS轻质跑鞋
                        </div>
                        <div class="price">
                            ¥279.00
                        </div>
                        <div class="origin-price">
                            ¥399.00
                        </div>
                        <div class="action">
                            <div class="item">
                                <img src="../../static/image/cart_yel_icon.png">
                            </div>
                            <div class="item">
                                <img src="../../static/image/heart_yel.png">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="search-result-item shopping-item">
                    <div class="shopping-item-image">
                        <a href="./goods">
                            <img src="../../static/image/shopping-item.jpg">
                        </a>
                    </div>
                    <div class="content">
                        <div class="title">
                            小卡帕KAPPAKIDS轻质跑鞋
                        </div>
                        <div class="price">
                            ¥279.00
                        </div>
                        <div class="origin-price">
                            ¥399.00
                        </div>
                        <div class="action">
                            <div class="item">
                                <img src="../../static/image/cart_yel_icon.png">
                            </div>
                            <div class="item">
                                <img src="../../static/image/heart_yel.png">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="search-result-item shopping-item">
                    <div class="shopping-item-image">
                        <a href="./goods">
                            <img src="../../static/image/shopping-item.jpg">
                        </a>
                    </div>
                    <div class="content">
                        <div class="title">
                            小卡帕KAPPAKIDS轻质跑鞋
                        </div>
                        <div class="price">
                            ¥279.00
                        </div>
                        <div class="origin-price">
                            ¥399.00
                        </div>
                        <div class="action">
                            <div class="item">
                                <img src="../../static/image/cart_yel_icon.png">
                            </div>
                            <div class="item">
                                <img src="../../static/image/heart_yel.png">
                            </div>
                        </div>
                    </div>
                </div>

                <div class="search-result-item shopping-item">
                    <div class="shopping-item-image">
                        <a href="./goods">
                            <img src="../../static/image/shopping-item.jpg">
                        </a>
                    </div>
                    <div class="content">
                        <div class="title">
                            小卡帕KAPPAKIDS轻质跑鞋
                        </div>
                        <div class="price">
                            ¥279.00
                        </div>
                        <div class="origin-price">
                            ¥399.00
                        </div>
                        <div class="action">
                            <div class="item">
                                <img src="../../static/image/cart_yel_icon.png">
                            </div>
                            <div class="item">
                                <img src="../../static/image/heart_yel.png">
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {{/if}}

        </div>
    `,

        data: {
            wholeType: 'wholeType',
            activType: 'activType',
            generType: 'generType',
            list: {},
            predata: {
                "source": "SHOPPING_CART",
                "items": []
            },
            handleData: [],
            wholeActivityLength: 0,
            selectLength: 0,
            totalAmount: 0 // 结算总价
        },

        afterMount() {
            this.getList()
        },

        events: {
            // 商品全选
            cartCheckAll(event, data) {
                let fIndex = data.fIndex
                let wholeActivityItems = data.items
                let activityItems = data.activityItems
                let generalItems = data.generalItems

                let handleData = this.get("handleData")

                // 全选
                if (data.checked) {
                    handleData[fIndex] = []
                    if (!!wholeActivityItems && wholeActivityItems.length > 0) {
                        $.each(wholeActivityItems, (wholeActivityIndex, wholeActivityItem) => {
                            handleData[fIndex].push(wholeActivityItem)
                        })
                    }

                    if (!!activityItems && activityItems.length > 0) {
                        $.each(activityItems, (index, item) => {
                            $.each(item.items, (activityIndex, activityItem) => {
                                handleData[fIndex].push(activityItem)
                            })
                        })
                    }

                    if (!!generalItems && generalItems.length > 0) {
                        $.each(generalItems, (generalIndex, generalItem) => {
                            handleData[fIndex].push(generalItem)
                        })
                    }
                } else { // 取消全选
                    handleData[fIndex] = []
                }
                console.log(this.get("handleData"), "全选-after")
            },

            // 商品单选
            cartCheckSingle(event, data) {
                let handleData = this.get("handleData")
                let fIndex = data.fIndex

                // 单选
                if (data.checked) {
                    handleData[fIndex].push(data)
                } else { // 取消单选
                    let delIndex = ''
                    $.each(handleData, (index, item) => {
                        if (item.length) {
                            $.each(item, (index, item) => {
                                if (data.shoppingCartId === item.shoppingCartId) {
                                    delIndex = index
                                }
                            })
                        }
                    })
                    this.removeAt(`handleData.${fIndex}`, delIndex)
                    // handleData[fIndex].splice(delIndex, 1)
                }
                console.log(handleData, "取消-after")
            },

            // 商品单删
            cartDeleteSingle(event, data) {
                let handleData = this.get("handleData")
                let fIndex = data.fIndex
                if (data.deleted === true) {
                    let delIndex = ''
                    $.each(handleData, (index, item) => {
                        if (item.length) {
                            $.each(item, (index, item) => {
                                if (data.shoppingCartId === item.shoppingCartId) {
                                    delIndex = index
                                }
                            })
                        }
                    })
                    this.removeAt(`handleData.${fIndex}`, delIndex)
                    // handleData[fIndex].splice(delIndex, 1)
                }
                console.log(handleData, "删除-after")
            },

            // 合计总价更新
            updateFinalAmount() {
                let handleData = this.get("handleData")

                let totalAmount = 0
                let selectLength = 0
                handleData.forEach(item => {
                    selectLength += item.length
                    item.forEach((e, i) => {
                        totalAmount += e.quantity * e.sellPrice
                    })
                });
                this.set("totalAmount", totalAmount)
                this.set("selectLength", selectLength)
            },

        },

        methods: {
            // 获取商品列表
            getList() {
                getCartList().then(res => {
                    let handleData = this.get("handleData")
                    let selectLength = 0
                    let wholeActivityLength = this.get("wholeActivityLength")

                    this.set('list', res)
                    this.set("totalAmount", res.normalGoods.totalAmount)

                    // 全部活动商品
                    if (!!res.normalGoods.wholeActivityItems && res.normalGoods.wholeActivityItems.length > 0) {
                        // 记录 structureItems 的长度
                        this.set("wholeActivityLength", res.normalGoods.wholeActivityItems.length)

                        $.each(res.normalGoods.wholeActivityItems, (fIndex, fItem) => {
                            handleData[fIndex] = new Array() // 为查询参数创建一个二维数组
                            fItem.checked = true;
                            $.each(fItem.items, (sIndex, sItem) => {
                                sItem.checked = true;
                                handleData[fIndex][sIndex] = sItem
                            })
                        })
                    }

                    // 店铺商品
                    if (!!res.normalGoods.structureItems && res.normalGoods.structureItems.length > 0) {
                        $.each(res.normalGoods.structureItems, (fIndex, item) => {
                            item.checked = true // 店铺默认全选
                            handleData[fIndex + wholeActivityLength] = new Array() // 为查询参数创建一个二维数组
                            // 活动商品
                            $.each(item.activityItems, (index, item) => {
                                $.each(item.items, (activityIndex, item) => {
                                    item.checked = true // 活动商品默认单选
                                    handleData[fIndex + wholeActivityLength][activityIndex] = item
                                })
                            })

                            // 普通商品
                            $.each(item.generalItems, (generalIndex, item) => {
                                item.checked = true // 普通商品默认单选
                                handleData[fIndex + wholeActivityLength][generalIndex] = item
                            })
                        })
                    }


                    handleData.forEach(item => {
                        selectLength += item.length
                    });
                    this.set("selectLength", selectLength)
                })
            },

            // 选中商品删除
            deleteSelect() {
                let allSelectGoods = $(".js-shop-check")
                let singleSelectGoods = $(".js-good-checksingle")
                let handleData = this.get("handleData")
                let selectArr = []
                handleData.forEach((item, index) => {
                    item.forEach((e, i) => {
                        selectArr.push(e.shoppingCartId)
                    })
                })

                if (selectArr.length) {
                    allSelectGoods.each(function () {
                        $(this).remove()
                    });

                    singleSelectGoods.each(function () {
                        $(this).remove()
                    });

                    console.log(selectArr)

                    delCartSelect(selectArr).then(res => {
                        if(res) {
                            this.$alert("删除成功")
                        }else {
                            this.$alert("删除失败")
                        }
                    })

                    handleData.forEach((item, index) => {
                        handleData[index] = []
                    })
                }else {
                    this.$alert("请选择商品")
                }
                console.log(handleData, "选中删除-after")
            },

            // 结算
            gotoPay() {
                let checkAllData = this.get("predata")
                let handleData = this.get("handleData")
                // 清空predata上次选中
                checkAllData.items = []

                console.log(handleData, "结算数据")
                $.each(handleData, (index, item) => {
                    $.each(item, (index, item) => {
                        if (!!item.defaultActivityId) {
                            checkAllData.items.push({
                                "shoppingCartId": item.shoppingCartId,
                                "goodsSkuId": item.goodsSkuId,
                                "quantity": item.quantity,
                                "activityId": item.defaultActivityId
                            })
                        } else {
                            checkAllData.items.push({
                                "shoppingCartId": item.shoppingCartId,
                                "goodsSkuId": item.goodsSkuId,
                                "quantity": item.quantity
                            })
                        }
                    })
                })

                if (checkAllData.items.length) {

                    let dataJson = JSON.stringify(checkAllData)
                    $('.js-cart-predata').val(dataJson)
                    postCartPreOrder(checkAllData).then(res => {
                        if (res.code === "200") {
                            $("#totalAmountPay").submit()
                        } else {
                            this.$alert(res.message)
                        }
                    })
                } else {
                    this.$alert("请选择结算商品")
                }
            }

        }
    })
})

