'use strict';
const injectTemplete = `<div class="offline-toast" style="{{toastStyle}}">
  <span>{{toastText}}</span>
  <span style="float:right;height:100%;line-height:50px;">
      <div class="offline-toast-close-btn" style="display:inline-block;cursor:pointer;width:28px;height:28px;line-height:28px;text-align:center;border-radius:28px;background:rgba(0,0,0,.2);">
          <i class="fa fa-times" aria-hidden="true"></i>
      </div>
  </span>
</div>
<script>
  if(navigator.onLine === false){
    $('.offline-toast').fadeIn()
  }
  $('.offline-toast-close-btn').click(function(){
      $('.offline-toast').fadeOut()
  })
  window.addEventListener('online',  function(){
      $('.offline-toast').fadeOut()
  });
  window.addEventListener('offline', function(){
      $('.offline-toast').fadeIn()
  }); 
</script>`
if (hexo.config.offline_tips && hexo.config.offline_tips.enable) {
  hexo.extend.filter.register("after_render:html", function (source) {
    const lastBodyPos = source.lastIndexOf('</body>')
    if (lastBodyPos < 0) {
      return source
    }
    const opt = Object.assign({
      toastText: '当前处于离线状态',
      toastStyle: 'display:none;position:fixed;left:0;right:0;bottom:0;flex-direction:row;justify-content:space-between;align-items:center;background-color:#dc322f;color:#fff;font-size:16px;height:50px;line-height:50px;padding:0 8px;'
    }, hexo.config.offline_tips.options)
    const inject = hexo.render.renderSync({ text: injectTemplete, engine: 'swig' }, opt)
    return source.substring(0, lastBodyPos) + inject + source.substring(lastBodyPos)
  });
}