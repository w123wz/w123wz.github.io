(function () {
  function initBannerParallax() {
    var header = document.querySelector('#page-header.not-home-page:not(.not-top-img)');
    if (!header) return;

    var nav = header.querySelector('#nav');
    var siteInfo = header.querySelector('#page-site-info');

    header.addEventListener('mousemove', function (e) {
      var rect = header.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;

      if (siteInfo) {
        siteInfo.style.transform =
          'translateY(-50%) translate(' + (x * 14).toFixed(1) + 'px,' + (y * 8).toFixed(1) + 'px)';
      }
    });

    header.addEventListener('mouseleave', function () {
      if (siteInfo) {
        siteInfo.style.transform = 'translateY(-50%) translate(0, 0)';
      }
    });
  }

  function onReady(cb) {
    if (document.readyState === 'complete' || document.readyState === 'interactive') {
      setTimeout(cb, 1);
    } else {
      document.addEventListener('DOMContentLoaded', cb);
    }
  }

  onReady(function () {
    initBannerParallax();
    if (window.btf && window.btf.addGlobalFn) {
      window.btf.addGlobalFn('pjaxRefresh', initBannerParallax, 'bannerParallaxInit');
      window.btf.addGlobalFn('pjaxSendOnce', function () {
        var h = document.querySelector('#page-header.not-home-page:not(.not-top-img)');
        if (h) h.replaceWith(h.cloneNode(true));
      }, 'bannerParallaxDestroy');
    }
  });
})();