/*
 * Sistema de animações de scroll da LUME.
 * Estrutura: Hero, corte, O estúdio, Serviços, Processo, A realidade, Dúvidas e Contato.
 * Direção: movimento suave, curto e funcional, implementado sem biblioteca adicional.
 */
(function () {
  'use strict';

  var root = document.documentElement;
  var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var revealDuration = 750;
  var staggerStep = 80;
  var staggerLimit = 240;

  /*
   * Grupos com data-stagger revelam seus filhos em sequência.
   * O atributo pode receber um seletor, como data-stagger=".placa".
   */
  document.querySelectorAll('[data-stagger]').forEach(function (group) {
    var selector = group.getAttribute('data-stagger') || ':scope > *';
    group.querySelectorAll(selector).forEach(function (element, index) {
      element.classList.add('rev');
      element.style.setProperty(
        '--reveal-delay',
        Math.min(index * staggerStep, staggerLimit) + 'ms'
      );
    });
  });

  var revealElements = Array.prototype.slice.call(document.querySelectorAll('.rev'));

  /* Sem JavaScript ou com movimento reduzido, o conteúdo permanece totalmente visível. */
  if (reducedMotion) {
    revealElements.forEach(showImmediately);
    return;
  }

  root.classList.add('scroll-ready');

  /*
   * A revelação acontece uma única vez. O conteúdo não desaparece ao voltar a rolar,
   * evitando que a leitura seja interrompida.
   */
  if ('IntersectionObserver' in window) {
    var revealObserver = new IntersectionObserver(onReveal, {
      threshold: 0.16,
      rootMargin: '0px 0px -8% 0px'
    });
    revealElements.forEach(function (element) {
      revealObserver.observe(element);
    });
  } else {
    revealElements.forEach(showImmediately);
  }

  /*
   * Efeitos contínuos são reservados a camadas decorativas.
   * Um único requestAnimationFrame atende todos os elementos e evita trabalho duplicado.
   */
  var progressElements = Array.prototype.slice.call(
    document.querySelectorAll('[data-scroll-progress]')
  );
  var processExpansionElement = document.querySelector('[data-process-expansion]');
  var parallaxElements = Array.prototype.slice.call(
    document.querySelectorAll('[data-parallax]')
  );
  var frameId = 0;
  var pageVisible = !document.hidden;

  function onReveal(entries) {
    entries.forEach(function (entry) {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('visto');
      revealObserver.unobserve(entry.target);
      markRevealComplete(entry.target);
    });
  }

  function showImmediately(element) {
    element.classList.add('visto');
    element.classList.add('rev-final');
  }

  /* Depois da entrada, devolve aos cards seus timings curtos de hover. */
  function markRevealComplete(element) {
    var style = getComputedStyle(element);
    var delay = parseFloat(style.getPropertyValue('--reveal-delay')) || 0;
    var duration = parseFloat(style.getPropertyValue('--reveal-duration')) || revealDuration;
    setTimeout(function () {
      element.classList.add('rev-final');
    }, duration + delay + 40);
  }

  function clamp(value, minimum, maximum) {
    return Math.min(Math.max(value, minimum), maximum);
  }

  /* Progresso 0 ao entrar pela base da tela e 1 ao sair pelo topo. */
  function getProgress(bounds, viewport) {
    return clamp((viewport - bounds.top) / (viewport + bounds.height), 0, 1);
  }

  function updateProgressElement(element, progress) {
    var shift = (progress - 0.5) * 36;
    element.style.setProperty('--scroll-progress', progress.toFixed(4));
    element.style.setProperty('--scroll-shift', shift.toFixed(2) + 'px');

    /* O hero só começa a derivar depois de ocupar o primeiro enquadramento. */
    if (element.classList.contains('hero')) {
      var heroExit = clamp((progress - 0.5) * 2, 0, 1);
      element.style.setProperty('--hero-shift', (heroExit * 14).toFixed(2) + 'px');
      element.style.setProperty('--hero-scale', (1 + heroExit * 0.012).toFixed(4));
      element.style.setProperty('--hero-headline-shift', '0px');
      element.style.setProperty('--hero-support-opacity', '1');
      element.style.setProperty('--hero-support-shift', '0px');
    }

    /* A luz do contato cresce devagar e nunca altera a posição do CTA. */
    if (element.id === 'contato') {
      var contactProgress = clamp((progress - 0.18) / 0.62, 0, 1);
      element.style.setProperty('--contact-light', (0.25 + contactProgress * 0.55).toFixed(3));
      element.style.setProperty('--contact-scale', (1.02 + contactProgress * 0.08).toFixed(3));
    }
  }

  function updateParallaxElement(element, progress, strength) {
    var offset = (progress - 0.5) * strength * 100;
    element.style.setProperty('--parallax-y', offset.toFixed(2) + 'px');
  }

  function updateProcessExpansion(element, bounds, viewport) {
    var availableScroll = Math.max(bounds.height - viewport, 1);
    var progress = clamp(-bounds.top / availableScroll, 0, 1);
    var viewportWidth = root.clientWidth;
    var mobile = viewportWidth < 768;
    var startWidth = Math.min(300, viewportWidth * (mobile ? 0.64 : 0.3));
    var startHeight = Math.min(400, startWidth * 4 / 3);
    var mediaWidth = startWidth + (viewportWidth - startWidth) * progress;
    var mediaHeight = startHeight + (viewport - startHeight) * progress;
    var titleOffset = viewportWidth * (mobile ? 0.92 : 0.78) * progress;

    element.style.setProperty('--process-expansion-width', mediaWidth.toFixed(2) + 'px');
    element.style.setProperty('--process-expansion-media-height', mediaHeight.toFixed(2) + 'px');
    element.style.setProperty('--process-expansion-radius', (16 * (1 - progress)).toFixed(2) + 'px');
    element.style.setProperty('--process-title-left', (-titleOffset).toFixed(2) + 'px');
    element.style.setProperty('--process-title-right', titleOffset.toFixed(2) + 'px');
    element.style.setProperty('--process-expansion-bg', (0.72 * (1 - progress)).toFixed(3));
    element.style.setProperty('--process-expansion-shade', (0.34 - progress * 0.18).toFixed(3));
    element.style.setProperty('--process-hint-opacity', (1 - clamp(progress / 0.2, 0, 1)).toFixed(3));
  }

  function updateFrame() {
    frameId = 0;
    if (!pageVisible) return;
    var viewport = innerHeight || root.clientHeight;

    /* Todas as medidas são lidas antes das escritas para evitar layout thrashing. */
    var processExpansionMeasure = processExpansionElement ? {
      element: processExpansionElement,
      bounds: processExpansionElement.getBoundingClientRect()
    } : null;
    var progressMeasures = progressElements.map(function (element) {
      return { element: element, progress: getProgress(element.getBoundingClientRect(), viewport) };
    });
    var parallaxMeasures = parallaxElements.map(function (element) {
      var bounds = element.getBoundingClientRect();
      if (bounds.bottom < -80 || bounds.top > viewport + 80) return null;
      return {
        element: element,
        progress: getProgress(bounds, viewport),
        strength: clamp(parseFloat(element.getAttribute('data-parallax')) || 0.18, -0.35, 0.35)
      };
    });

    if (processExpansionMeasure) {
      updateProcessExpansion(processExpansionMeasure.element, processExpansionMeasure.bounds, viewport);
    }
    progressMeasures.forEach(function (measure) {
      updateProgressElement(measure.element, measure.progress);
    });
    parallaxMeasures.forEach(function (measure) {
      if (measure) updateParallaxElement(measure.element, measure.progress, measure.strength);
    });
  }

  function scheduleFrame() {
    if (frameId || !pageVisible) return;
    frameId = requestAnimationFrame(updateFrame);
  }

  function onVisibilityChange() {
    pageVisible = !document.hidden;
    if (pageVisible) scheduleFrame();
  }

  addEventListener('scroll', scheduleFrame, { passive: true });
  addEventListener('resize', scheduleFrame, { passive: true });
  document.addEventListener('visibilitychange', onVisibilityChange);

  /* A primeira medição evita saltos quando a página abre em uma âncora. */
  scheduleFrame();

  /* Mantido como dado legível para auditoria do timing definido no manual. */
  root.style.setProperty('--reveal-duration', revealDuration + 'ms');
})();
