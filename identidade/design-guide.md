# Identidade visual — LUME (v2)

> Como a marca aparece em tudo que o MazyOS gera.
> As skills de conteúdo, carrossel e post leem esse arquivo antes de criar qualquer visual.
> Fonte completa: `contexto-lume/LUME-manual-de-marca.md` (seção 8).

## Conceito

Composição em dois territórios: o claro, onde a luz acontece, e o escuro, onde o conteúdo respira. Entre os dois, um corte diagonal, a assinatura estrutural da marca. O brilho vem do contraste e da luz, nunca da cor. Paleta praticamente monocromática. Não existe cor de acento.

---

## Cores

**Território claro (topo do site)**
- Fundo principal: `#F0EFED` (off-white quente)
- Fundo alternativo / cards: `#E4E3E0` (cinza claro)
- Texto principal: `#111111` (quase preto)
- Texto secundário: `#5A5A58` (cinza quente)
- Bordas: `rgba(0,0,0,.10)`

**Território escuro (restante do site)**
- Fundo: `#0B0B0B` (preto quente)
- Rodapé: `#141414`
- Cards: `#1A1A1A` (grafite)
- Cards em hover: `#212121`
- Texto principal: `#F2F2F0` (branco suave)
- Texto secundário: `#8C8C8A`
- Texto terciário: `#5E5E5C`
- Bordas: `rgba(255,255,255,.09)`

- **Cor proibida:** qualquer cor de acento. Nenhum azul, nenhum dourado. Todo destaque nasce do contraste claro/escuro.

---

## Tipografia

- **Família única:** Geist (alternativa: Inter)
- **Pesos permitidos:** 200, 300, 400, 500. Jamais Bold 700+.

- Título do hero: `clamp(2.5rem, 5.4vw, 4.35rem)` · peso 200 · CAIXA ALTA · tracking -.01em · line-height 1.06
- Título de seção grande: `clamp(2.4rem, 5.6vw, 4.3rem)` · peso 200 · CAIXA ALTA
- Título de seção médio: `clamp(1.9rem, 4vw, 3.1rem)` · peso 200 · CAIXA ALTA
- Rótulo de seção: 11px · peso 400 · CAIXA ALTA · tracking .34em
- Corpo: 13px · peso 300 · line-height 1.75
- Título de card: 15px · peso 400

**Assinatura tipográfica:** títulos gigantes, finíssimos, em caixa alta, contra rótulos minúsculos com tracking exagerado. A hierarquia nasce do contraste de escala, não do peso.

---

## Estilo geral

Sofisticado, silencioso, tecnológico, preciso, minimalista, premium. Sem exageros, sem brilho excessivo, tudo controlado. Espaço vazio generoso.

---

## Elementos-chave

- **Corte diagonal (assinatura):** faixa de 112px onde o claro é cortado por diagonal revelando o escuro. `clip-path:polygon(56% 0,100% 0,100% 100%,40.3% 100%)`. A imagem de luz do hero continua por trás do corte.
- Bordas: quase invisíveis (10% no claro, 9% no escuro)
- Border-radius dos cards: 10px
- Botões: raio 6px. Botão escuro `#111111` no claro; botão claro `#F2F2F0` no escuro; botão de contorno no escuro
- Sombras: elevação sutil de 1px no hover dos botões; card sobe 4px no hover
- Sublinhado do hero: traço manuscrito em SVG que se escreve sozinho ao carregar (1,6s), abaixo do texto
- Selo de vidro: `rgba(247,246,243,.55)` + `backdrop-filter: blur(10px)` (marcador 24h)
- Marcadores circulares: círculos vazados de 16px na faixa do corte

**Ícones:** sempre outline, espessura 1.6 a 1.8px, sem preenchimento. Embutidos como sprite SVG interno, sem dependência externa.

**Espaçamento:** entre seções 112px · largura útil máxima 1280px · margem lateral 40px desktop / 26px celular.

**Animações:** discretas. Revelação ao rolar (fade + subida 16px, 0,75s, escalonado). Hover 0,25 a 0,3s sem deslocar layout. Tudo respeita `prefers-reduced-motion`.

---

## Imagens da marca

A LUME não usa fotos de escritório, notebook ou pessoas. Usa luz. A luz não cria nada, revela o que já existe.

Regras para novas imagens:
- Sempre branco quente, nunca branco puro nem cinza frio
- Luz sempre em diagonal, vindo do alto
- Contraste baixíssimo, sem áreas escuras
- Espaço vazio generoso onde o texto vai entrar
- Nenhum objeto reconhecível, nenhuma pessoa, nenhuma tecnologia visível

Prompt de referência do hero e direções das imagens pendentes: manual, seção 9.

---

## O que NUNCA fazer

- Introduzir cor de acento
- Usar peso 700+ na tipografia
- Fotos de pessoas, objetos ou tecnologia visível
- Repetir "presença digital" mais de 3 vezes na página
- Quebrar a proporção monocromática claro/escuro

---

## Logo

- **Arquivo:** *(a definir, adicionar em `identidade/logo.svg` ou `.png`)*
- **Onde usar:** header, CTA final, materiais de Instagram
- A marca escreve LUME em caixa alta, peso fino (200), tracking controlado

---

## Observações adicionais

Landing page oficial: `lume-v2.html`. Specs técnicas e armadilhas conhecidas (details/summary, aspect-ratio, scrollIntoView) na seção 12 do manual.
