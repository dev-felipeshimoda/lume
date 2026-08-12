/* Estados de navegação e menu do design system da LUME. */
(function () {
  'use strict';

  var body = document.body;
  var toggle = document.querySelector('.menu-toggle');
  var toggleText = toggle ? toggle.querySelector('.sr-only') : null;
  var menu = document.getElementById('mobile-menu');
  if (!toggle || !menu) return;

  var menuLinks = Array.prototype.slice.call(menu.querySelectorAll('a[href^="#"]'));
  var navLinks = Array.prototype.slice.call(document.querySelectorAll('.nav a[href^="#"], .mobile-nav a[href^="#"]'));
  var inactiveRegions = Array.prototype.slice.call(document.querySelectorAll('main, footer, .zap, .topo-acao'));
  var desktop = matchMedia('(min-width: 1201px) and (hover: hover) and (pointer: fine)');

  function setMenu(open) {
    body.classList.toggle('menu-aberto', open);
    toggle.setAttribute('aria-expanded', String(open));
    toggle.setAttribute('aria-label', open ? 'Fechar menu' : 'Abrir menu');
    if (toggleText) toggleText.textContent = open ? 'Fechar menu' : 'Abrir menu';
    menu.setAttribute('aria-hidden', String(!open));
    inactiveRegions.forEach(function (region) {
      region.inert = open;
    });
    if (open && menuLinks[0]) requestAnimationFrame(function () { menuLinks[0].focus(); });
  }

  toggle.addEventListener('click', function () {
    setMenu(!body.classList.contains('menu-aberto'));
  });

  menuLinks.forEach(function (link) {
    link.addEventListener('click', function () {
      setMenu(false);
      toggle.focus({ preventScroll: true });
    });
  });

  menu.addEventListener('click', function (event) {
    if (event.target === menu) {
      setMenu(false);
      toggle.focus();
    }
  });

  document.addEventListener('keydown', function (event) {
    if (event.key !== 'Escape' || !body.classList.contains('menu-aberto')) return;
    setMenu(false);
    toggle.focus();
  });

  function onDesktopChange(event) {
    if (event.matches) setMenu(false);
  }

  if (desktop.addEventListener) desktop.addEventListener('change', onDesktopChange);
  else desktop.addListener(onDesktopChange);

  /* O item ativo acompanha a seção central sem alterar o histórico da página. */
  if ('IntersectionObserver' in window) {
    var sections = Array.prototype.slice.call(document.querySelectorAll('main section[id]'));
    var activeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        navLinks.forEach(function (link) {
          var active = link.getAttribute('href') === '#' + entry.target.id;
          if (active) link.setAttribute('aria-current', 'location');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-34% 0px -55% 0px', threshold: 0 });

    sections.forEach(function (section) {
      activeObserver.observe(section);
    });
  }
})();

(function () {
  'use strict';

  var track = document.querySelector('#servicos .grade-servicos');
  var previous = document.querySelector('[data-services-prev]');
  var next = document.querySelector('[data-services-next]');
  var indicator = document.querySelector('[data-services-indicator]');
  if (!track || !previous || !next || !indicator) return;

  var cards = Array.prototype.slice.call(track.querySelectorAll('.servico'));
  var mobile = matchMedia('(max-width: 620px)');
  var currentIndex = 0;
  var frame = 0;

  function setControls(index) {
    currentIndex = Math.min(Math.max(index, 0), cards.length - 1);
    indicator.textContent = String(currentIndex + 1).padStart(2, '0') + ' / ' + String(cards.length).padStart(2, '0');
    previous.disabled = currentIndex === 0;
    next.disabled = currentIndex === cards.length - 1;
  }

  function updateCurrentCard() {
    frame = 0;
    if (!mobile.matches) {
      setControls(0);
      return;
    }

    var trackLeft = track.getBoundingClientRect().left;
    var nearestIndex = 0;
    var nearestDistance = Infinity;
    cards.forEach(function (card, index) {
      var distance = Math.abs(card.getBoundingClientRect().left - trackLeft);
      if (distance < nearestDistance) {
        nearestDistance = distance;
        nearestIndex = index;
      }
    });
    setControls(nearestIndex);
  }

  function scheduleUpdate() {
    if (!frame) frame = requestAnimationFrame(updateCurrentCard);
  }

  function goTo(index) {
    var target = Math.min(Math.max(index, 0), cards.length - 1);
    var left = cards[target].offsetLeft - cards[0].offsetLeft;
    track.scrollTo({ left: left, behavior: 'smooth' });
    setControls(target);
  }

  previous.addEventListener('click', function () { goTo(currentIndex - 1); });
  next.addEventListener('click', function () { goTo(currentIndex + 1); });
  track.addEventListener('scroll', scheduleUpdate, { passive: true });
  addEventListener('resize', scheduleUpdate, { passive: true });
  if (mobile.addEventListener) mobile.addEventListener('change', scheduleUpdate);
  setControls(0);
})();

(function () {
  'use strict';

  var timeline = document.querySelector('[data-process-timeline]');
  if (!timeline) return;

  var steps = Array.prototype.slice.call(timeline.querySelectorAll('[data-timeline-step]'));
  var details = Array.prototype.slice.call(timeline.querySelectorAll('[data-timeline-detail]'));
  var interactive = matchMedia('(min-width: 1201px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)');
  var frame = 0;

  function clamp(value, min, max) {
    return Math.min(Math.max(value, min), max);
  }

  function updateTimeline() {
    frame = 0;

    if (!interactive.matches) {
      steps.forEach(function (step, index) {
        step.classList.add('is-reached');
        step.classList.toggle('is-current', index === 0);
        step.style.setProperty('--timeline-stage-progress', '100%');
      });
      details.forEach(function (detail, index) {
        detail.classList.toggle('is-active', index === 0);
      });
      return;
    }

    var bounds = timeline.getBoundingClientRect();
    var distance = Math.max(timeline.offsetHeight - innerHeight, 1);
    var progress = clamp(-bounds.top / distance, 0, 1);
    var segment = 1 / steps.length;
    var activeIndex = Math.min(steps.length - 1, Math.floor(Math.min(progress, 0.9999) * steps.length));
    if (progress >= 1) activeIndex = steps.length - 1;

    steps.forEach(function (step, index) {
      var localProgress = clamp((progress - index * segment) / segment, 0, 1);
      step.classList.toggle('is-reached', index === 0 || localProgress > 0);
      step.classList.toggle('is-current', index === activeIndex);
      step.style.setProperty('--timeline-stage-progress', (localProgress * 100).toFixed(2) + '%');
    });

    details.forEach(function (detail, index) {
      detail.classList.toggle('is-active', index === activeIndex);
    });
  }

  function scheduleTimeline() {
    if (!frame) frame = requestAnimationFrame(updateTimeline);
  }

  addEventListener('scroll', scheduleTimeline, { passive: true });
  addEventListener('resize', scheduleTimeline, { passive: true });
  if (interactive.addEventListener) interactive.addEventListener('change', scheduleTimeline);
  scheduleTimeline();
})();

(function () {
  'use strict';

  if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
  document.querySelectorAll('[data-dark-grid] .fala').forEach(function (card) {
    card.addEventListener('pointermove', function (event) {
      var bounds = card.getBoundingClientRect();
      card.style.setProperty('--grid-x', (event.clientX - bounds.left).toFixed(1) + 'px');
      card.style.setProperty('--grid-y', (event.clientY - bounds.top).toFixed(1) + 'px');
    });
    card.addEventListener('pointerleave', function () {
      card.style.setProperty('--grid-x', '50%');
      card.style.setProperty('--grid-y', '50%');
    });
  });
})();

(function () {
  'use strict';

  var row = document.querySelector('[data-scroll-velocity]');
  if (!row || matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  var track = row.querySelector('.velocidade-trilho');
  if (!track || typeof track.animate !== 'function') return;

  track.classList.add('velocidade-js');
  var animation = track.animate([
    { transform: 'translate3d(0,0,0)' },
    { transform: 'translate3d(-50%,0,0)' }
  ], {
    duration: 28000,
    iterations: Infinity,
    easing: 'linear'
  });

  var lastY = scrollY;
  var lastTime = performance.now();
  var targetRate = 1;
  var currentRate = 1;
  var rateFrame = 0;

  function settleRate() {
    currentRate += (targetRate - currentRate) * 0.16;
    animation.updatePlaybackRate(currentRate);
    targetRate += (1 - targetRate) * 0.08;

    if (Math.abs(currentRate - 1) > 0.015 || Math.abs(targetRate - 1) > 0.015) {
      rateFrame = requestAnimationFrame(settleRate);
      return;
    }

    currentRate = 1;
    targetRate = 1;
    rateFrame = 0;
    animation.updatePlaybackRate(1);
  }

  function reactToScroll() {
    var now = performance.now();
    var elapsed = Math.max(now - lastTime, 16);
    var distance = Math.abs(scrollY - lastY);
    targetRate = Math.min(4.2, 1 + distance / elapsed * 1.6);
    lastY = scrollY;
    lastTime = now;
    if (!rateFrame) rateFrame = requestAnimationFrame(settleRate);
  }

  addEventListener('scroll', reactToScroll, { passive: true });

  if ('IntersectionObserver' in window) {
    var observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) animation.play();
        else animation.pause();
      });
    });
    observer.observe(row);
  }

  document.addEventListener('visibilitychange', function () {
    if (document.hidden) animation.pause();
    else animation.play();
  });
})();
