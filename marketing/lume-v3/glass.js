/*
 * Cena principal da LUME em Three.js.
 * O vidro é carregado depois do conteúdo e nunca bloqueia a leitura do hero.
 */
(function () {
  'use strict';

  var canvas = document.getElementById('vidro');
  var hero = canvas && canvas.closest('.hero');
  if (!canvas || !hero) return;

  var reducedMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = matchMedia('(min-width: 1021px)');
  var connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
  var dataSaver = connection && connection.saveData;
  var verySlowNetwork = connection && /(^|-)2g$/.test(connection.effectiveType || '');

  /*
   * A versão leve é o fundo de luz em CSS que já está no HTML.
   * Em telas menores o navegador não baixa a biblioteca nem inicializa a GPU.
   */
  if (!desktop.matches || dataSaver || verySlowNetwork) return;

  function carregarCena() {
    import('https://cdn.jsdelivr.net/npm/three@0.185.1/build/three.module.min.js')
      .then(iniciarCena)
      .catch(function () {
        canvas.remove();
      });
  }

  function agendarCarga() {
    /* A abertura usa só imagem, então a GPU espera o hero se aproximar. */
    if ('requestIdleCallback' in window) {
      requestIdleCallback(carregarCena, { timeout: 700 });
    } else {
      setTimeout(carregarCena, 120);
    }
  }

  if ('IntersectionObserver' in window) {
    var loadObserver = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) return;
      loadObserver.disconnect();
      agendarCarga();
    }, { rootMargin: '80% 0px' });
    loadObserver.observe(hero);
  } else {
    agendarCarga();
  }

  function iniciarCena(THREE) {
    if (!desktop.matches || !canvas.isConnected) return;

    var poucaMemoria = navigator.deviceMemory && navigator.deviceMemory <= 4;
    var poucosNucleos = navigator.hardwareConcurrency && navigator.hardwareConcurrency <= 4;
    var redeMediana = connection && connection.effectiveType === '3g';
    var economia = Boolean(poucaMemoria || poucosNucleos || redeMediana);

    /* Cena, câmera e renderer transparente sobre a composição do hero. */
    var scene = new THREE.Scene();
    var camera = new THREE.PerspectiveCamera(27, 1, 0.1, 30);
    camera.position.set(0, 0, 7.2);

    var renderer;
    try {
      renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        alpha: true,
        antialias: false,
        depth: true,
        stencil: false,
        powerPreference: economia ? 'low-power' : 'high-performance'
      });
    } catch (erro) {
      canvas.remove();
      return;
    }

    renderer.setClearColor(0x000000, 0);
    var currentDpr = Math.min(devicePixelRatio || 1, economia ? 1 : 1.35);
    renderer.setPixelRatio(currentDpr);
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.08;

    /*
     * Luz principal quente, preenchimento neutro e recorte frio.
     * A diferença de direção revela espessura sem introduzir cor na marca.
     */
    scene.add(new THREE.HemisphereLight(0xfffbf5, 0x77736c, 1.35));

    var keyLight = new THREE.DirectionalLight(0xfff6ec, 5.2);
    keyLight.position.set(3.8, 5.2, 5.5);
    scene.add(keyLight);

    var fillLight = new THREE.DirectionalLight(0xe8edf2, 2.1);
    fillLight.position.set(-4.5, 0.6, 3.2);
    scene.add(fillLight);

    var rimLight = new THREE.PointLight(0xffffff, 9, 8, 2);
    rimLight.position.set(2.8, -1.8, 2.6);
    scene.add(rimLight);

    /*
     * O plano reproduz apenas a área de luz atrás do volume.
     * As bordas transparentes se fundem ao gradiente CSS sem formar um retângulo.
     */
    var backdropMaterial = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      side: THREE.DoubleSide,
      vertexShader: [
        'varying vec2 vUv;',
        'void main() {',
        '  vUv = uv;',
        '  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);',
        '}'
      ].join('\n'),
      fragmentShader: [
        'varying vec2 vUv;',
        'void main() {',
        '  vec3 base = vec3(0.047, 0.047, 0.047);',
        '  vec3 luz = vec3(0.18, 0.18, 0.175);',
        '  float diagonal = smoothstep(0.08, 0.92, vUv.x + vUv.y * 0.72);',
        '  float halo = 1.0 - smoothstep(0.0, 0.88, distance(vUv, vec2(0.78, 0.74)));',
        '  vec3 cor = mix(base, luz, diagonal * 0.44 + halo * 0.32);',
        '  float esquerda = smoothstep(0.0, 0.20, vUv.x);',
        '  float inferior = smoothstep(0.0, 0.22, vUv.y);',
        '  gl_FragColor = vec4(cor, esquerda * inferior);',
        '}'
      ].join('\n')
    });
    var backdrop = new THREE.Mesh(new THREE.PlaneGeometry(8.5, 6.4), backdropMaterial);
    backdrop.position.z = -1.2;
    scene.add(backdrop);

    /* Ambiente procedural pequeno, usado apenas nos reflexos do material. */
    var environment = criarAmbiente(THREE);
    scene.environment = environment;

    /*
     * A forma é uma laje de cantos arredondados, criada por código.
     * Poucos segmentos mantêm a silhueta suave com um custo geométrico baixo.
     */
    var geometry = criarVolume(THREE, economia ? 4 : 7);
    var glassMaterial = new THREE.MeshPhysicalMaterial({
      color: 0xe1ddd5,
      metalness: 0,
      roughness: economia ? 0.18 : 0.22,
      transmission: economia ? 0 : 0.9,
      thickness: economia ? 0 : 0.72,
      ior: 1.44,
      attenuationColor: new THREE.Color(0xf1ede5),
      attenuationDistance: 3.4,
      clearcoat: 0.82,
      clearcoatRoughness: 0.2,
      specularIntensity: 0.92,
      envMapIntensity: 1.15,
      opacity: economia ? 0.68 : 1,
      transparent: economia,
      depthWrite: !economia
    });

    var volume = new THREE.Mesh(geometry, glassMaterial);
    var group = new THREE.Group();
    group.add(volume);
    scene.add(group);

    /* Hairline discreto para preservar a leitura da borda em telas sem antialias. */
    var edgeGeometry = new THREE.EdgesGeometry(geometry, 38);
    var edgeMaterial = new THREE.LineBasicMaterial({
      color: 0xfffbf5,
      transparent: true,
      opacity: economia ? 0.18 : 0.24
    });
    var edges = new THREE.LineSegments(edgeGeometry, edgeMaterial);
    edges.renderOrder = 2;
    volume.add(edges);

    /* Sombra de contato simples, sem shadow map e sem custo de render extra. */
    var shadowMaterial = new THREE.MeshBasicMaterial({
      color: 0x26231f,
      transparent: true,
      opacity: 0.075,
      depthWrite: false
    });
    var shadow = new THREE.Mesh(new THREE.CircleGeometry(1, 40), shadowMaterial);
    shadow.scale.set(1.5, 0.24, 1);
    shadow.position.set(0.18, -1.68, -0.3);
    scene.add(shadow);

    /* Pose final prevista no conceito visual da LUME. */
    var baseRotation = { x: 0.13, y: -0.38, z: 0.08 };
    var pointer = { x: 0, y: 0 };
    var target = { x: 0, y: 0 };
    var startTime = 0;
    var lastTime = 0;
    var frameId = 0;
    var visible = true;
    var destroyed = false;
    var settled = reducedMotion;
    var readyToRender = false;
    var sampledFrames = 0;
    var slowFrames = 0;

    if (reducedMotion) {
      group.rotation.set(baseRotation.x, baseRotation.y, baseRotation.z);
      group.scale.setScalar(1);
    } else {
      group.rotation.set(0.25, -0.82, 0.18);
      group.scale.setScalar(0.94);
      group.position.y = 0.08;
    }

    function resize(renderAfter) {
      var width = Math.max(1, canvas.clientWidth);
      var height = Math.max(1, canvas.clientHeight);
      renderer.setSize(width, height, false);
      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      /* Compensa canvases muito largos sem aumentar a geometria. */
      group.position.x = camera.aspect > 1.35 ? 0.18 : 0;
      if (readyToRender && renderAfter !== false) render();
    }

    function render() {
      if (!readyToRender || !visible || destroyed) return;
      renderer.render(scene, camera);
      if (!canvas.classList.contains('pronto')) {
        canvas.classList.add('pronto');
        hero.classList.add('vidro-pronto');
      }
    }

    function schedule() {
      if (!readyToRender || frameId || !visible || destroyed) return;
      frameId = requestAnimationFrame(animate);
    }

    /*
     * O loop existe apenas durante a entrada ou enquanto o volume se acomoda.
     * Quando o cursor para, a GPU também para.
     */
    function animate(time) {
      frameId = 0;
      if (!startTime) startTime = time;
      var frameDuration = lastTime ? time - lastTime : 16.667;
      var delta = Math.min(frameDuration / 16.667, 2);
      lastTime = time;

      /* Se a entrada perde frames, a resolução cai uma vez e preserva o material. */
      if (!economia && sampledFrames < 45) {
        sampledFrames += 1;
        if (frameDuration > 21) slowFrames += 1;
        if (sampledFrames === 45 && slowFrames >= 8 && currentDpr > 1) {
          currentDpr = 1;
          renderer.setPixelRatio(currentDpr);
          resize(false);
        }
      }

      if (!reducedMotion) {
        var progress = Math.min((time - startTime) / 1500, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        var damping = 1 - Math.pow(0.86, delta);

        pointer.x += (target.x - pointer.x) * damping;
        pointer.y += (target.y - pointer.y) * damping;

        group.rotation.x += (baseRotation.x + pointer.y - group.rotation.x) * damping;
        group.rotation.y += (baseRotation.y + pointer.x - group.rotation.y) * damping;
        group.rotation.z += (baseRotation.z + pointer.x * 0.12 - group.rotation.z) * damping;
        group.scale.setScalar(0.94 + eased * 0.06);
        group.position.y = 0.08 * (1 - eased);

        settled = progress >= 1 &&
          Math.abs(target.x - pointer.x) < 0.00035 &&
          Math.abs(target.y - pointer.y) < 0.00035;
      }

      render();
      if (!settled) schedule();
    }

    function onPointerMove(event) {
      var bounds = hero.getBoundingClientRect();
      var x = (event.clientX - bounds.left) / bounds.width * 2 - 1;
      var y = (event.clientY - bounds.top) / bounds.height * 2 - 1;
      target.x = THREE.MathUtils.clamp(x, -1, 1) * 0.1;
      target.y = THREE.MathUtils.clamp(y, -1, 1) * 0.055;
      settled = false;
      schedule();
    }

    function onPointerLeave() {
      target.x = 0;
      target.y = 0;
      settled = false;
      schedule();
    }

    function onVisibility(entries) {
      visible = entries[0].isIntersecting && !document.hidden;
      if (visible) {
        settled = false;
        schedule();
      } else if (frameId) {
        cancelAnimationFrame(frameId);
        frameId = 0;
      }
    }

    function onDocumentVisibility() {
      if (document.hidden) {
        visible = false;
        if (frameId) cancelAnimationFrame(frameId);
        frameId = 0;
      } else {
        var bounds = hero.getBoundingClientRect();
        if (bounds.bottom <= 0 || bounds.top >= innerHeight) return;
        visible = true;
        settled = false;
        schedule();
      }
    }

    function dispose() {
      destroyed = true;
      if (frameId) cancelAnimationFrame(frameId);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      hero.removeEventListener('pointermove', onPointerMove);
      hero.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('visibilitychange', onDocumentVisibility);
      geometry.dispose();
      edgeGeometry.dispose();
      glassMaterial.dispose();
      edgeMaterial.dispose();
      shadow.geometry.dispose();
      shadowMaterial.dispose();
      backdrop.geometry.dispose();
      backdropMaterial.dispose();
      environment.dispose();
      renderer.dispose();
    }

    var resizeObserver = new ResizeObserver(resize);
    var intersectionObserver = new IntersectionObserver(onVisibility, { threshold: 0 });
    resizeObserver.observe(canvas);
    intersectionObserver.observe(hero);

    if (!reducedMotion) {
      hero.addEventListener('pointermove', onPointerMove, { passive: true });
      hero.addEventListener('pointerleave', onPointerLeave, { passive: true });
    }
    document.addEventListener('visibilitychange', onDocumentVisibility);
    addEventListener('pagehide', dispose, { once: true });

    resize();

    function startRendering() {
      if (destroyed) return;
      readyToRender = true;
      schedule();
    }

    /* Compila os shaders em paralelo quando o navegador oferece suporte. */
    if (renderer.compileAsync) {
      renderer.compileAsync(scene, camera).then(startRendering).catch(startRendering);
    } else {
      startRendering();
    }
  }

  /* Cria o bloco arredondado sem baixar modelo 3D. */
  function criarVolume(THREE, segments) {
    var width = 2.06;
    var height = 2.82;
    var radius = 0.27;
    var x = -width / 2;
    var y = -height / 2;
    var shape = new THREE.Shape();

    shape.moveTo(x + radius, y);
    shape.lineTo(x + width - radius, y);
    shape.quadraticCurveTo(x + width, y, x + width, y + radius);
    shape.lineTo(x + width, y + height - radius);
    shape.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
    shape.lineTo(x + radius, y + height);
    shape.quadraticCurveTo(x, y + height, x, y + height - radius);
    shape.lineTo(x, y + radius);
    shape.quadraticCurveTo(x, y, x + radius, y);

    var geometry = new THREE.ExtrudeGeometry(shape, {
      depth: 0.36,
      steps: 1,
      curveSegments: segments,
      bevelEnabled: true,
      bevelThickness: 0.095,
      bevelSize: 0.095,
      bevelSegments: Math.max(3, Math.floor(segments / 2))
    });
    geometry.center();
    geometry.computeVertexNormals();
    return geometry;
  }

  /* Cubemap de 32 px por face, suficiente para reflexos foscos e quase sem memória. */
  function criarAmbiente(THREE) {
    var colors = [
      ['#fffaf2', '#d5d0c7'],
      ['#d9dde1', '#8d8c88'],
      ['#ffffff', '#e7e3dc'],
      ['#b7b4ae', '#5e5d5a'],
      ['#fff6ec', '#d4cec4'],
      ['#e1e4e7', '#777875']
    ];

    var faces = colors.map(function (pair) {
      var face = document.createElement('canvas');
      face.width = 32;
      face.height = 32;
      var context = face.getContext('2d');
      var gradient = context.createLinearGradient(0, 0, 32, 32);
      gradient.addColorStop(0, pair[0]);
      gradient.addColorStop(1, pair[1]);
      context.fillStyle = gradient;
      context.fillRect(0, 0, 32, 32);
      return face;
    });

    var texture = new THREE.CubeTexture(faces);
    texture.colorSpace = THREE.SRGBColorSpace;
    texture.needsUpdate = true;
    return texture;
  }
})();
