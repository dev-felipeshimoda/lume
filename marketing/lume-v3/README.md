# LUME | Landing page v3

Site estático completo da LUME, sem etapa de build e sem dependências locais.

## Estrutura

- `index.html`: estrutura, conteúdo e estilos específicos das seções.
- `design-system.css`: cores, tipografia, grid, componentes e estados.
- `ui.js`: menu móvel e estado ativo da navegação.
- `parallax.js`: abertura de 120svh com GSAP, ScrollTrigger e Lenis, além do cabeçalho fixo ativado somente a partir do hero.
- `scroll.js`: expansão do processo e transições entre seções, mantendo o conteúdo do hero visível durante a rolagem.
- `glass.js`: implementação WebGL arquivada, não carregada pelo hero atual.
- `assets/images`: visuais WebP gerados para a abertura, transição, hero, processo e contato.
- `assets/images/PROMPTS.md`: direção e prompts finais usados na geração.
- `vercel.json`: configuração de publicação na Vercel.
- `netlify.toml`: configuração de publicação na Netlify.

## Abrir localmente

O site pode ser aberto diretamente pelo `index.html`. Para reproduzir o comportamento de produção por HTTP:

```powershell
cd "C:\Users\Felipe Shimoda\OneDrive\00_Projetos\LUME\Lume\marketing\lume-v3"
python -m http.server 8080
```

Depois, acesse `http://localhost:8080`.

## Biblioteca externa

A versão atual do hero usa somente a imagem WebP e não carrega Three.js. GSAP, ScrollTrigger e Lenis continuam sendo carregados pelas três linhas externas no fim do `index.html` para controlar a abertura.

As imagens WebP do projeto somam cerca de 585 KiB. As três camadas da abertura e a ponte visual usam 2560 × 1440 pixels. O hero atual não baixa nenhuma cena WebGL.

## Publicar gratuitamente na Vercel

1. Abra o PowerShell nesta pasta.
2. Instale a ferramenta: `npm install -g vercel`.
3. Crie uma prévia: `vercel`.
4. Confira o endereço fornecido.
5. Publique a versão final: `vercel --prod`.

A Vercel serve projetos compostos apenas por HTML, CSS e JavaScript sem exigir build. Consulte a [documentação oficial da Vercel](https://vercel.com/docs/deployments/overview).

## Publicar gratuitamente na Netlify

### Pela interface

1. Entre em [app.netlify.com/drop](https://app.netlify.com/drop).
2. Arraste a pasta `lume-v3` completa para a área indicada.
3. Aguarde o endereço terminado em `netlify.app`.

### Pelo PowerShell

```powershell
npm install -g netlify-cli
netlify deploy
netlify deploy --prod
```

O arquivo `netlify.toml` já informa que a própria pasta é o diretório de publicação. Consulte o [guia oficial da Netlify](https://docs.netlify.com/start/quickstarts/netlify-drop-quickstart/).

## Antes de publicar

- Confirmar se `contato@lume.digital` será o e-mail oficial.
- Confirmar o domínio `lume.digital`.
- Testar os links de WhatsApp em um aparelho real.
- Não publicar alterações sem revisar a versão mobile.
