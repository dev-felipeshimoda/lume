# LUME

> Estúdio de tecnologia focado em presença digital. Esse repositório é a
> operação: memória da marca, identidade visual, projetos e entregas.

**Digital crafted with precision.**

A LUME projeta como uma empresa é percebida na internet: sites
institucionais, plataformas e sistemas, landing pages e conteúdo visual.
O repositório concentra tudo que o estúdio precisa pra operar, e serve de
contexto pro Claude Code trabalhar dentro da marca sem precisar ser
lembrado das regras a cada sessão.

---

## Estrutura

`_memoria/` é o cérebro. Quem é a LUME, como ela fala, o que está em foco.
Dividido em `empresa.md`, `preferencias.md` e `estrategia.md`. É lido antes
de qualquer resposta, então a qualidade da memória define a qualidade da
saída.

`identidade/` é o rosto aplicado. O `design-guide.md` traz cores,
tipografia e padrão visual que toda peça gerada precisa respeitar: a marca
é monocromática, sem cor de acento, tipografia fina.

`contexto-lume/` guarda o manual de marca completo, a fonte de verdade
sobre posicionamento, voz e território de referência.

`marketing/` é o conteúdo da própria LUME. Aqui mora o `lume-v3/`, a
landing page do estúdio.

`saidas/`, `dados/` e `scripts/` são o operacional: documentos pontuais,
arquivos a analisar e automações.

`templates/` guarda modelos reaproveitáveis, inclusive base pra skills novas.

---

## O site

`marketing/lume-v3/` é a landing page atual. HTML único e autossuficiente,
com `design-system.css` para tokens e componentes, e os módulos `parallax.js`,
`glass.js`, `scroll.js` e `ui.js`. Já vem com `netlify.toml` e `vercel.json`
para deploy direto.

---

## Comandos

**Núcleo**
`/abrir` carrega o contexto antes de trabalhar · `/salvar` faz commit e push
· `/atualizar` varre o projeto e atualiza a memória · `/novo-projeto` cria
pasta isolada por cliente · `/mapear-rotinas` transforma o que se repete em
skill.

**Conteúdo e SEO**
`/carrossel` monta carrosséis 1080x1350 na identidade da marca ·
`/publicar-tema` entrega artigo, carrossel e legendas amarrados · `/seo`
roda o fluxo completo de 8 passos · `/responder-avaliacoes` escreve
respostas pras reviews do Google · `/aprovar-post` publica blog, Instagram
e Facebook num comando.

**Anúncios**
`/anuncio-google` monta a campanha em CSV pronto pro Google Ads Editor ·
`/relatorio-ads` lê os exports de Google e Meta e devolve relatório semanal.

**Produção**
`/analisar-dados` lê CSV, XLSX e PDF e gera resumo executivo ·
`/email-profissional` rascunha email a partir de contexto livre.

---

## Regras da casa

As regras de operação ficam em `CLAUDE.md` e valem pra qualquer sessão.
As principais:

- Toda tarefa visual lê `identidade/design-guide.md` antes de criar.
- Cliente novo vira `clientes/<Nome>/` com `briefing.md` próprio.
- Saída pública usa voz de estúdio ("a LUME", "nós"). Conversa interna é direta.
- Nada de portfólio, depoimento, logo ou número inventado. A ausência de
  prova social é decisão estratégica, não falta de material.
- Os quatro diferenciais (100%, 24h, acompanhamento próximo, até ficar certo)
  são promessas públicas: valem enquanto forem verdade.

---

[lume.digital](https://lume.digital) · contato@lume.digital
