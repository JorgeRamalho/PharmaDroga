# Pharmadroga

Landing page institucional da rede de drogarias **Pharmadroga** — saúde, confiança, preços justos e parcelamento em até 6x sem juros.

🌐 **Site:** https://pharmadroga.vercel.app/  
📂 **Repositório:** https://github.com/JorgeRamalho/Pharmadroga

## Stack

- HTML semântico + CSS design system modular (`src/styles/`)
- JavaScript vanilla (`js/main.js`) — navegação, ofertas, tema, lojas, newsletter e calculadora
- React + TypeScript + Vite

## Início rápido

```bash
git clone https://github.com/JorgeRamalho/Pharmadroga.git
cd Pharmadroga
npm install
npm run dev
```

Ou abra `index.html` com o **Live Server** (VS Code / Cursor).

### Ambiente de desenvolvimento

| Ambiente        | Como abrir                           | Uso                    |
| --------------- | ------------------------------------ | ---------------------- |
| **Live Server** | Abrir `index.html` no Live Server    | Preview local diário   |
| Produção        | Deploy Netlify / hospedagem estática | Build conforme host    |

## Scripts

| Comando              | Descrição                         |
| -------------------- | --------------------------------- |
| `npm run dev`        | Servidor de desenvolvimento Vite  |
| `npm run build`      | Build de produção em `dist/`      |
| `npm run preview`    | Pré-visualiza o build (`:4174`)   |
| `npm run check`      | Typecheck + lint + format + build |
| `npm run test:e2e`   | Testes smoke Playwright           |
| `npm run lighthouse` | Auditoria Lighthouse CI           |

## Deploy (Netlify)

1. Conecte o repositório no [Netlify](https://app.netlify.com)
2. Build command: `npm run build`
3. Publish directory: `dist`

Ou use o `netlify.toml` já configurado na raiz.

## Estrutura

```
src/
├── main.tsx           → Entry único (React + landing + PWA)
├── scripts/           → landing, i18n, store-finder, brand-pdf
├── i18n/              → traduções PT/EN
├── services/          → API de produtos
├── data/              → products, stores, payment-methods, info-modals
├── components/        → Newsletter, Calculadora
├── styles/            → tokens, base, components, sections…
└── types/
public/                → API JSON, og-image, robots, sitemap
docs/                  → Auditoria e documentação técnica
```

### Fase 6 — recursos

- **PWA** — instalável (manifest + service worker)
- **i18n** — toggle PT/EN no header
- **Busca de lojas** — CEP na seção `#lojas` (ex.: `01310-100`)
- **API de produtos** — `public/api/products.json`
- **PDF da marca** — botão em `#marca` (impressão do navegador)

## Documentação

Consulte a pasta [`docs/`](./docs/README.md) para auditoria completa, mapa de organização e plano de implementação.

## Autor

Jorge R. Barbosa  
LinkedIn: https://www.linkedin.com/in/jorge-r-barbosa-aabb0417b/  
GitHub: https://github.com/JorgeRamalho

## Licença

Projeto educacional / portfólio.
