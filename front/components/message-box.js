export default function messageBox(opts) {
  var time = opts.time || 0;
  var closeBtn = !!opts.closeBtn ? 1 : 0;
  var area = opts.area || ['590px', '395px'];
  var cancelId = opts.cancelId || ('confirmCancel' + new Date().getTime());
  var sureId = opts.sureId || ('confirmSure' + new Date().getTime());
  var titleMsg = opts.title || false;
  var imgName = opts.imgName || '';
  var remindMsg = opts.remindMsg || '';
  var noticeMsgL = opts.noticeMsgL || '';
  var noticeMsgR = opts.noticeMsgR || '';
  var btnSure = !!opts.btns ? opts.btns[0] : '确定';
  var btnCancel = !!opts.btns ? opts.btns[1] : '取消';
  var shadeClose = (opts.shadeClose == false) ? false : true;
  var isHideBtn = !!opts.isHideBtn ? "none" : "inline-block";
  var isHideCancelBtn = !!opts.isHideCancelBtn ? "none" : "inline-block";
  var content = opts.content;

  var layerIndex = layer.open({
    type: 1, // 页面层
    title: titleMsg || false, // 标题
    time: time, // 自动关闭 单位毫秒
    closeBtn: closeBtn, // 右上角按钮
    area: area, // 宽高
    shadeClose: shadeClose, // 是否点击遮罩关闭
    content: content || '<div class="model-content">' +  // 内容
      '<div class="remind-text">' +
      '<img class="remind-text-left" src="/static/image/' + imgName + '" alt="">' +
      '<span class="remind-text-right">' + remindMsg + '</span>' +
      '</div>' +
      '<div class="notice-text">' +
      '<span class="notice-text-left">' + noticeMsgL + '</span>' +
      '<span class="notice-text-right">' + noticeMsgR + ' </span>' +
      '</div>' +
      '<div class="confirm-btns" style="display: ' + isHideBtn + '">' +
      '<span class="confirm-sure defalut-btn" id="' + sureId + '">' + btnSure + '</span>' +
      '<span class="confirm-cancel defalut-btn" id="' + cancelId + '" style="display: ' + isHideCancelBtn + '">' + btnCancel + '</span>' +
      '</div>' +
      '</div>'
  });

  // 取消
  $('#' + cancelId).on('click', function () {
    if (!!opts.no) {
      opts.no();
    }
    layer.close(layerIndex);
  });
  // 确认
  $('#' + sureId).on('click', function () {
    var result = true;
    if (!!opts.yes) {
      result = (opts.yes() === false) ? false : true;
    }
    if (result) {
      layer.close(layerIndex);
    }
  });

  return layerIndex;
}
