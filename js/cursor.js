(function () {
  var isMobile = window.matchMedia('(max-width: 768px)').matches;
  if (isMobile) return;

  var cursor = document.createElement('div');
  cursor.className = 'custom-cursor';
  cursor.innerHTML = '<img src="/img/mouse1.png" alt="">';
  document.body.appendChild(cursor);

  var cursorImg = cursor.querySelector('img');
  var mouseX = 0, mouseY = 0;
  var curX = 0, curY = 0;
  var isHovering = false;

  var scale = 1.0;
  var hoverScale = 1.15;
  var hotspotX = 2;
  var hotspotY = 1;

  var TRAIL_OFFSET_X = 12;
  var TRAIL_OFFSET_Y = 14;

  var TRAIL_COUNT = 8;
  var trailDots = [];
  for (var i = 0; i < TRAIL_COUNT; i++) {
    var dot = document.createElement('div');
    dot.className = 'cursor-trail';
    document.body.appendChild(dot);
    trailDots.push({ el: dot, x: 0, y: 0, alpha: 1 - i / TRAIL_COUNT });
  }

  document.addEventListener('mousemove', function (e) {
    mouseX = e.clientX;
    mouseY = e.clientY;
  });

  var interactiveSelector = 'a, button, input, textarea, select, [role="button"], .card-widget, .recent-post-item, .article-sort-item, #nav .site-page, #nav-right .nav-right-item, .article-sort-item-title, .aside-list-item .title, .toc-link, .pagination a, .pagination .current, .reward-btn, .share-button, #rightside button, .search-close-button, .btn, .page-number, .flink-list-card, .site-card, .gallery-group, .post-meta-edit, .post-reward, .comment-reply-btn, .card-archive-list-link, .article-sort-title, .widget-open, .mobile-toc-content';

  document.addEventListener('mouseover', function (e) {
    if (e.target.closest(interactiveSelector)) {
      isHovering = true;
      cursor.classList.add('cursor-hover');
    }
  });

  document.addEventListener('mouseout', function (e) {
    if (e.target.closest(interactiveSelector)) {
      isHovering = false;
      cursor.classList.remove('cursor-hover');
    }
  });

  function animate() {
    curX += (mouseX - curX) * 0.22;
    curY += (mouseY - curY) * 0.22;

    var s = isHovering ? hoverScale : scale;
    cursorImg.style.transform = 'translate(' + (-hotspotX) + 'px,' + (-hotspotY) + 'px) scale(' + s + ')';

    cursor.style.left = curX + 'px';
    cursor.style.top = curY + 'px';

    var trailBaseX = curX + TRAIL_OFFSET_X;
    var trailBaseY = curY + TRAIL_OFFSET_Y;

    for (var i = 0; i < trailDots.length; i++) {
      var td = trailDots[i];
      var targetX = i === 0 ? trailBaseX : trailDots[i - 1].x;
      var targetY = i === 0 ? trailBaseY : trailDots[i - 1].y;
      var ease = 0.08 - i * 0.006;
      td.x += (targetX - td.x) * Math.max(ease, 0.025);
      td.y += (targetY - td.y) * Math.max(ease, 0.025);
      td.el.style.left = td.x + 'px';
      td.el.style.top = td.y + 'px';
      td.el.style.opacity = (1 - i / TRAIL_COUNT) * 0.7;
    }

    requestAnimationFrame(animate);
  }

  animate();
})();