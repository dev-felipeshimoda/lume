(function () {
  'use strict';

  var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var hero = document.querySelector('.hero');
  var heroTransition = document.querySelector('.transicao-abertura-hero');
  var siteHeader = document.querySelector('.topo');
  var whatsappButton = document.querySelector('.zap');
  var headerFrame = 0;

  function updateHeader() {
    headerFrame = 0;
    if (!hero) return;
    var revealPoint = heroTransition ? heroTransition.offsetTop : hero.offsetTop;
    if (siteHeader) {
      siteHeader.classList.toggle('topo-visivel', scrollY >= Math.max(revealPoint - 2, 0));
    }
    if (whatsappButton) {
      var whatsappRevealPoint = Math.max(hero.offsetTop - innerHeight * 0.88, 0);
      whatsappButton.classList.toggle('zap-visivel', scrollY >= whatsappRevealPoint);
    }
  }

  function scheduleHeader() {
    if (headerFrame) return;
    headerFrame = requestAnimationFrame(updateHeader);
  }

  if (hero && (siteHeader || whatsappButton)) {
    addEventListener('scroll', scheduleHeader, { passive: true });
    addEventListener('resize', scheduleHeader, { passive: true });
    scheduleHeader();
  }

  function revealHero() {
    if (hero) hero.classList.add('hero-em-cena');
  }

  if (hero && 'IntersectionObserver' in window && !reducedMotion) {
    var heroObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (!entry.isIntersecting) return;
        revealHero();
        heroObserver.unobserve(entry.target);
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -6% 0px' });
    heroObserver.observe(hero);
  } else {
    revealHero();
  }

  if (reducedMotion) return;

  var parallaxRoot = document.querySelector('[data-parallax-root]');
  if (!parallaxRoot) return;

  var trigger = parallaxRoot.querySelector('[data-parallax-layers]');
  if (!trigger) return;

  var compactMotion = matchMedia('(max-width: 1200px), (pointer: coarse)').matches;
  var layers = compactMotion ? [
    { layer: '1', yPercent: 24 },
    { layer: '2', yPercent: 18 },
    { layer: '3', yPercent: 14 },
    { layer: '4', yPercent: 5 }
  ] : [
    { layer: '1', yPercent: 70 },
    { layer: '2', yPercent: 55 },
    { layer: '3', yPercent: 40 },
    { layer: '4', yPercent: 10 }
  ];

  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    var timeline = gsap.timeline({
      scrollTrigger: {
        trigger: trigger,
        start: '0% 0%',
        end: '100% 0%',
        scrub: 0
      }
    });

    layers.forEach(function (item, index) {
      timeline.to(
        trigger.querySelectorAll('[data-parallax-layer="' + item.layer + '"]'),
        { yPercent: item.yPercent, ease: 'none' },
        index === 0 ? undefined : '<'
      );
    });

    if (window.Lenis && !compactMotion) {
      try {
        var lenis = new Lenis({
          anchors: true,
          smoothWheel: true,
          lerp: 0.1
        });
        var tick = function (time) {
          lenis.raf(time * 1000);
        };

        lenis.on('scroll', ScrollTrigger.update);
        gsap.ticker.add(tick);
        gsap.ticker.lagSmoothing(0);

        addEventListener('pagehide', function () {
          gsap.ticker.remove(tick);
          lenis.destroy();
        }, { once: true });
      } catch (error) {
        document.documentElement.classList.remove('lenis', 'lenis-smooth', 'lenis-scrolling', 'lenis-stopped');
      }
    }

    addEventListener('load', function () {
      ScrollTrigger.refresh();
    }, { once: true });

    return;
  }

  /* O fallback preserva o efeito quando uma CDN estiver indisponível. */
  var scheduled = false;
  function updateFallback() {
    scheduled = false;
    var bounds = trigger.getBoundingClientRect();
    var progress = Math.min(Math.max(-bounds.top / Math.max(bounds.height, 1), 0), 1);
    layers.forEach(function (item) {
      trigger.querySelectorAll('[data-parallax-layer="' + item.layer + '"]').forEach(function (element) {
        element.style.transform = 'translate3d(0,' + (progress * item.yPercent).toFixed(3) + '%,0)';
      });
    });
  }

  function scheduleFallback() {
    if (scheduled) return;
    scheduled = true;
    requestAnimationFrame(updateFallback);
  }

  addEventListener('scroll', scheduleFallback, { passive: true });
  addEventListener('resize', scheduleFallback, { passive: true });
  scheduleFallback();
})();
