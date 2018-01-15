var res = {}

var spliter = '_'
var r = {}
var keys = []
var selectedCache = []

function getAllKeys(arr) {
  var result = []
  for (var i = 0; i < arr.length; i++) { result.push(arr[i].path) }
  return result
}

/**
 * 取得集合的所有子集「幂集」
*/
function powerset(arr) {
  var ps = [[]];
  for (var i = 0; i < arr.length; i++) {
    for (var j = 0, len = ps.length; j < len; j++) {
      ps.push(ps[j].concat(arr[i]));
    }
  }
  return ps;
}

/**
 * 计算组合数据
 */
function combineAttr(data, keys) {
  var allKeys = []
  var result = {}

  for (var i = 0; i < data.length; i++) {
    var item = data[i]
    var values = []

    for (var j = 0; j < keys.length; j++) {
      var key = keys[j]
      if (!result[key]) result[key] = []
      if (result[key].indexOf(item[key]) < 0) result[key].push(item[key])
      values.push(item[key])
    }
    allKeys.push({
      path: values.join(spliter),
      sku: item['skuId']
    })
  }
  return {
    result: result,
    items: allKeys
  }
}

/**
 * 生成所有子集是否可选、库存状态 map
 */
function buildResult(items) {
  var allKeys = getAllKeys(items)

  for (var i = 0; i < allKeys.length; i++) {
    var curr = allKeys[i]
    var sku = items[i].sku
    var values = curr.split(spliter)

    // var allSets = getAllSets(values)
    var allSets = powerset(values)

    // 每个组合的子集
    for (var j = 0; j < allSets.length; j++) {
      var set = allSets[j]
      var key = set.join(spliter)

      if (res[key]) {
        res[key].skus.push(sku)
      } else {
        res[key] = {
          skus: [sku]
        }
      }
    }
  }

  return res
}

export {
  combineAttr,
  buildResult
}
