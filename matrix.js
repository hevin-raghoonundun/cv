// Matrix-style falling green code background.
// Lightweight vanilla JS canvas — no dependencies.
(function () {
  var canvas = document.getElementById('matrix');
  if (!canvas) return;
  var ctx = canvas.getContext('2d');
  var fontSize = 16;
  var cols = 0;
  var drops = [];

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    cols = Math.ceil(canvas.width / fontSize);
    drops = [];
    for (var i = 0; i < cols; i++) {
      drops[i] = Math.floor(Math.random() * -40);
    }
  }
  resize();

  var resizeTimer;
  window.addEventListener('resize', function () {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resize, 200);
  });

  var glyphs = 'アイウエオカキクケコサシスセソタチツテトナニヌ0123456789{}[]()<>/\\=+-*;:$#&|'.split('');

  var last = 0;
  function draw(now) {
    requestAnimationFrame(draw);
    if (document.hidden) return; // pause when tab is not visible
    if (now - last < 60) return; // ~16fps, classic rain cadence
    last = now;

    // translucent fade (theme bg colour) leaves fading green trails
    ctx.fillStyle = 'rgba(10, 1, 24, 0.12)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    ctx.font = fontSize + 'px monospace';

    for (var i = 0; i < cols; i++) {
      var ch = glyphs[(Math.random() * glyphs.length) | 0];
      var x = i * fontSize;
      var y = drops[i] * fontSize;
      ctx.fillStyle = Math.random() > 0.92 ? '#d7ffe6' : '#33ff8a';
      ctx.fillText(ch, x, y);
      if (y > canvas.height && Math.random() > 0.975) drops[i] = 0;
      drops[i]++;
    }
  }

  var reduce = window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  if (reduce) {
    // honour reduced-motion: paint a single faint static frame, no loop
    ctx.font = fontSize + 'px monospace';
    ctx.fillStyle = '#33ff8a';
    for (var c = 0; c < cols; c++) {
      if (Math.random() > 0.5) continue;
      ctx.fillText(
        glyphs[(Math.random() * glyphs.length) | 0],
        c * fontSize,
        Math.random() * canvas.height
      );
    }
  } else {
    requestAnimationFrame(draw);
  }
})();
