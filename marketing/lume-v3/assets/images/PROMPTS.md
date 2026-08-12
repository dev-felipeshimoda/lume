# Prompts das imagens | LUME v3

O conjunto recebeu uma nova cena-base e uma pessoa geradas pelo ImageGen em 11/08/2026. A abertura usa exatamente três WebP alinhadas com 2560 × 1440 pixels: cenário completo, plano intermediário transparente e primeiro plano transparente com piso, escadas e pessoa. O wordmark “LUME” permanece em HTML.

## Abertura parallax | cenário

```text
Use case: stylized-concept
Asset type: new wide master scene for the fullscreen LUME parallax opening
Primary request: create an original photorealistic 16:9 architectural studio scene that fills the entire horizontal canvas with meaningful scenery on both sides, with no empty side bars and no stretched elements
Scene/backdrop: deep charcoal atmospheric wall with one soft neutral overhead glow; broad matte-black architectural terraces extend continuously to both lateral edges
Subject: a centered symmetrical staircase leading toward a calm open central axis, surrounded by varied frosted-glass portals and dark monolithic platforms across the full width; no person in this master image
Style/medium: high-end photorealistic architectural CGI, physically plausible materials, premium editorial technology aesthetic
Composition/framing: true wide 16:9 landscape; architecture reaches both lateral edges; central staircase and top landing remain fully visible; lower 28 percent is continuous matte dark floor and stairs; open central negative space for the HTML word LUME
Lighting/mood: neutral white rim lighting, restrained bloom, realistic contact shadows, calm and monumental
Color palette: monochrome only, #080808, #0C0C0C, #141414, #8C8C8A, #F2F2F0
Materials/textures: realistic matte stone floor, fine seams, frosted glass with controlled translucency, precise edges and subtle imperfections
Constraints: no text, no letters, no logo, no watermark, no people, no mountain, no vegetation, no colored light, no rainbow refraction, no chrome, no empty black side margins; keep the bottom edge predominantly #0C0C0C
```

## Abertura parallax | pessoa

```text
Use case: stylized-concept
Asset type: opaque human foreground cutout for a fullscreen parallax website opening
Primary request: one solitary gender-neutral adult seen fully from behind, standing still and looking slightly upward toward a distant light
Subject: full body visible, calm upright posture, feet close together, head slightly raised, wearing a minimal matte charcoal technical jacket with a subtle hood and straight dark trousers, refined contemporary silhouette
Style/medium: photorealistic editorial studio cutout, restrained premium technology aesthetic
Composition/framing: portrait subject centered, back view only, generous empty padding on every side, figure occupies about 62 percent of image height
Lighting/mood: soft neutral rim light from above and ahead of the person, quiet contemplative mood, crisp opaque silhouette
Scene/backdrop: perfectly flat solid #00ff00 chroma-key background for local background removal
Color palette: subject uses only #0B0B0B, #141414, #4A4A48, and subtle #F2F2F0 rim highlights
Constraints: background must be one uniform #00ff00 color with no shadows, gradients, texture, reflections, floor plane, lighting variation, cast shadow, contact shadow, or halo; no green anywhere on the subject; no text, no letters, no logo, no watermark, no props; no visible face; no extra people; crisp edges; keep the complete figure inside the frame
```

## Abertura parallax | recortes finais

### Plano intermediário

```text
Use case: background-extraction
Asset type: middle parallax layer for the LUME website
Primary request: remove every upright translucent rectangular glass portal and replace the open areas behind them with one perfectly flat solid #00ff00 chroma-key color
Invariants: preserve every dark architectural platform, ground surface, stair, seam, highlight and shadow; preserve the original camera, perspective, crop, lighting, monochrome materials and 2560 × 1440 proportion; no person
Constraints: no glass rectangles; do not add, remove, resize, move or redesign any platform, floor or stair; no text, logo or watermark
```

### Primeiro plano

```text
Use case: compositing
Asset type: front parallax layer for the LUME website
Primary request: create the front-depth layer containing only the foreground floor, the complete stairs and the same centered person, then replace everything else with one perfectly flat solid #00ff00 chroma-key color
Person placement: keep the subject centered and move it vertically only as needed so both shoes make direct natural contact with the top central stair surface
Invariants: preserve the camera, perspective, 2560 × 1440 proportion, floor texture, stair geometry, monochrome lighting, person's identity, clothes, body, pose and scale
Constraints: remove every tower, glass portal, sky, wall, light glow and distant architecture; no added objects, text, logo or watermark
```

## Abertura anterior, arquivada

Esta imagem não é carregada pela página atual. O efeito foi transferido para a seção de processo e passou a usar `lume-processo-etapas.webp`.

```text
Use case: stylized-concept
Asset type: fullscreen scroll expansion intro image for the LUME technology studio website
Primary request: a premium abstract scene showing light being revealed through one frosted glass surface, designed to work first as a narrow vertical crop and then expand into a full cinematic landscape
Scene/backdrop: deep warm black architectural studio space fading toward a restrained luminous center
Subject: one large translucent frosted-glass plane seen close-up, with a precise diagonal shaft of white light crossing its center, abstract enough to feel like material and atmosphere rather than a product
Style/medium: hyperreal minimal CGI, fine-art editorial direction, quiet luxury, exact and controlled
Composition/framing: 2:1 landscape, strongest visual detail concentrated in the central vertical third so the initial 300 by 400 crop remains compelling, dark calm margins that become visible during expansion, no important object near edges
Lighting/mood: low-key cinematic light, soft diffusion, restrained bloom, subtle depth, silent and sophisticated
Color palette: achromatic only, #0B0B0B, #141414, #F2F2F0, #8C8C8A
Materials/textures: matte frosted glass, fine grain, delicate edge reflections, smooth tonal transitions
Constraints: no text, no letters, no logo, no watermark, no people, no recognizable room furniture, no color accents, no rainbow refraction, no chrome, no multiple objects, no busy details, center must remain readable behind large white HTML typography
```

## Transição entre abertura e hero

```text
Use case: compositing
Asset type: seamless transition image between the LUME parallax opening and hero
Primary request: create one original photorealistic wide 16:9 architectural bridge frame that makes the opening flow imperceptibly into the hero
Scene/backdrop: the distant symmetrical staircase and dark terraces gradually dissolve into a quieter charcoal studio and continuous matte floor
Composition/framing: full-width low-contrast transition with meaningful dark floor texture across every lateral edge; no hard horizon, visible seam or empty side bars
Lighting/mood: neutral overhead glow fading gently into controlled darkness
Color palette: #050505, #0C0C0C, #141414, #343432 and restrained #F2F2F0 highlights
Constraints: no text, no letters, no logo, no people, no prominent foreground object, no new glass monolith, no color, no rainbow refraction, no watermark
```

## Hero

```text
Use case: stylized-concept
Asset type: full-screen premium website hero background for LUME
Primary request: create an original photorealistic wide 16:9 hero background that feels like the natural continuation immediately below the opening scene
Scene/backdrop: deep charcoal architectural studio with a continuous matte-black floor, subtle perspective seams and quiet atmospheric depth
Subject: one refined large transparent frosted-glass monolith positioned on the right third, with visible background architecture passing subtly through it, realistic optical thickness, restrained edge refraction and believable contact shadow; keep the entire left half calm for the headline and buttons
Style/medium: high-end photorealistic architectural CGI, premium technology editorial aesthetic, physically plausible glass and stone
Composition/framing: true wide 16:9 landscape; visual content fills every edge; no empty side bars; the monolith never sits behind the left-side copy area
Color palette: monochrome only, #080808, #0C0C0C, #141414, #8C8C8A, #F2F2F0
Constraints: no text, no letters, no logo, no people, no vegetation, no mountain, no colored light, no rainbow refraction, no chrome, no watermark
```

## O estúdio

O arquivo permanece arquivado, mas a seção “O estúdio” atual voltou ao layout somente textual e não carrega esta imagem.

## Acompanhamento das etapas

O visual complementar usa o mesmo arquivo 16:9 da expansão do processo para manter a linguagem e o nível de detalhe consistentes.

## Expansão do processo

```text
Use case: stylized-concept
Asset type: high-resolution scroll-expansion visual for the LUME section Como trabalhamos
Primary request: create one coherent architectural installation that visually expresses Imersão, Visualização, Construção and Continuidade from left to right
Scene/backdrop: deep black studio with a subtly textured matte floor and one continuous dark plinth
Subject: exactly four connected stations; a deep recessed frosted-glass chamber, a transparent observation plane with internal contours, an assembly of interlocking glass and matte-stone layers, and a continuous illuminated glass loop
Style/medium: cinematic high-end architectural photography with physically based CGI, photorealistic, premium and restrained
Composition/framing: true wide 16:9 landscape; four stages read clearly from left to right; the central vertical crop remains meaningful during the initial scroll state
Lighting/mood: neutral white edge light gradually becoming more confident across the sequence, realistic contact shadows and restrained bloom
Color palette: monochrome only, #0B0B0B, #141414, #F2F2F0, #8C8C8A
Materials/textures: thick frosted glass, transparent glass, finely textured matte stone, subtle dust and surface imperfections
Constraints: exactly four distinct stages, no text, no labels, no numbers, no letters, no logo, no people, no colored light, no rainbow refraction, no chrome, no interface graphics, no watermark; avoid four identical rectangular doors
```

## Contato

```text
Use case: lighting-weather
Asset type: full-width final CTA background for the LUME website
Primary request: make the image substantially whiter and more luminous while preserving the same abstract frosted-glass language
Lighting adjustment: expand the soft neutral-white frosted glow through roughly the central 65 percent of the frame and reduce the heavy dark vignette without losing material detail
Composition/framing: clean luminous center for the CTA with gently darker neutral margins
Materials/textures: realistic frosted glass grain, soft optical diffusion, subtle highlight rolloff and believable surface detail
Constraints: no text, no letters, no logo, no people, no colored light, no rainbow refraction, no hard white clipping, no watermark
```

## Atualização final do processo

### Cada etapa com clareza

Modo: edição por referência de `lume-processo-etapas.webp`.

```text
Preservar a mesma composição e a ordem das quatro esculturas: portal profundo com degraus, placa transparente com linhas curvas, construção modular de pedra e vidro, e portal contínuo arredondado. Manter o desenho reconhecível e elevar apenas o realismo com vidro fosco, acrílico translúcido, alumínio escuro, microtextura física, reflexos plausíveis, iluminação branca suave, sombras reais, fundo preto e base polida. Composição 16:9 de alta resolução. Sem palavras, letras, números, pessoas ou elementos extras.
```

Arquivo final: `lume-processo-etapas-v2.webp`, 3840 x 2160.

### Cubo flutuante

Modo: edição por referência de `lume-hero-source.png` e isolamento posterior em canal alfa.

```text
Criar um único cubo com cantos suavemente arredondados usando a mesma linguagem material do retângulo do hero: vidro fosco branco quente, translúcido, com profundidade interna, microtextura, refração e brilho suave. Mostrar em perspectiva três quartos, levemente inclinado na diagonal, com duas faces e o topo visíveis. O cubo deve flutuar, sem piso, base ou sombra fixa, centralizado e com respiro amplo. Composição 4:3, sem texto, símbolos, pessoas ou outros objetos.
```

Arquivo final: `lume-processo-cubo-flutuante-v3.webp`, 2560 x 1920, com transparência real.

### Avatares dos relatos

Modo: geração individual com ImageGen, com variação intencional de pessoa, enquadramento, luz e linguagem fotográfica.

```text
1. Square testimonial avatar. Candid environmental portrait of a Japanese-Brazilian woman in her early 30s, short dark bob haircut, working at a ceramics studio beside a large window. Medium shot from slightly above, relaxed real expression, warm late-afternoon natural light, visible clay texture and subtle film grain. No text, logos, watermark or beauty retouching.

2. Square testimonial avatar. Close portrait of a Black Brazilian male architect in his late 30s, shaved head, subtle beard and round glasses, standing outdoors beside a concrete facade. Off-center composition, overcast daylight, cool neutral palette and real skin texture. No text, logos, watermark or studio backdrop.

3. Square testimonial avatar. Side-profile portrait of a Brazilian woman in her mid 40s with light brown skin and curly shoulder-length hair, wearing a simple white blouse inside a calm contemporary clinic. Chest-up framing, soft cool daylight, shallow depth of field and natural skin texture. No text, medical logos or watermark.

4. Square testimonial avatar. Environmental portrait of a Black Brazilian man in his early 30s working behind the counter of a small independent coffee shop. Waist-up framing, genuine half smile, linen apron, warm tungsten and window light, with wood and coffee equipment blurred in the background. No text, brand logos or watermark.

5. Square testimonial avatar. Tight black-and-white portrait of a young Indigenous-Brazilian creative director with long straight dark hair and distinctive cheekbones. Direct calm gaze, high-contrast natural side light, grainy analog 35mm photography and unretouched skin. No text, jewelry logos or watermark.

6. Square testimonial avatar. Seated portrait of an older Brazilian man in his late 50s, olive skin, salt-and-pepper hair and moustache, wearing a dark knit polo at an architecture desk. Three-quarter body angle, looking down at a paper model, soft window light and muted documentary photography. No text, logos or watermark.

7. Square testimonial avatar. Bright candid street portrait of an Afro-Brazilian woman entrepreneur in her late 20s with natural braids, wearing a mustard jacket outside a small flower shop. Wide framing, natural midday sunlight, spontaneous smile and honest phone-photography texture. No visible text, logos or watermark.
```

Arquivos finais, todos em 512 x 512: `lume-avatar-mirela-sato.webp`, `lume-avatar-rafael-menezes.webp`, `lume-avatar-livia-furtado.webp`, `lume-avatar-caio-nobrega.webp`, `lume-avatar-taina-alcantara.webp`, `lume-avatar-otavio-salles.webp` e `lume-avatar-dandara-paiva.webp`.
