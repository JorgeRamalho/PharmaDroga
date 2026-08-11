# Plano de Implementação — Pharmadroga

Roadmap priorizado com base na auditoria Playwright (11/08/2026).

---

## Fase 0 — Imediato (1–2 horas) ✅

Objetivo: corrigir bloqueios e quick wins.

- [x] **Padronizar ambiente de dev** — `npm run dev` / `npm start`; tabela no README; comentário em `index.html`
- [x] **Corrigir contador `8M+`** em `js/main.js` — `formatCounterDisplay()` centraliza formatação
- [x] **Remover chamada duplicada** `initScrollReveal()`
- [x] **README.md na raiz** com comandos, estrutura e tabela de ambientes

---

## Fase 1 — Acessibilidade e semântica (2–4 horas) ✅

Objetivo: WCAG 2.1 nível A mínimo.

- [x] **`<main id="main">`** — conteúdo principal envolvido (hero → react-root)
- [x] **Skip link** — "Ir ao conteúdo principal" com estilo `:focus-visible`
- [x] **`:focus-visible` global** — links, botões e inputs em `style.css` + componentes React
- [x] **Menu hamburger 44×44px** — `min-width/min-height` + `aria-controls`
- [x] **Logo** — `href="#inicio"` no header e footer + `aria-label`
- [x] **Headings** — card do hero: `<h2>` → `<p class="hero__card-title">` (h1 único na página)

---

## Fase 2 — SEO on-page (3–5 horas) ✅

Objetivo: indexação e compartilhamento social.

- [x] **Open Graph + Twitter Card** — meta tags completas no `<head>`
- [x] **`public/og-image.png`** — imagem 1200×630 com identidade Pharmadroga
- [x] **JSON-LD** — `Organization` + `Pharmacy` em `@graph`
- [x] **Canonical** — `https://www.pharmadroga.com.br/` (atualizar no deploy real)
- [x] **`public/robots.txt`** e **`public/sitemap.xml`**
- [x] **CNPJ** — marcado como fictício no footer

---

## Fase 3 — UX e conteúdo (4–8 horas) ✅

Objetivo: eliminar fricção e links mortos.

- [x] **Links do footer** — 6 modais acessíveis com conteúdo placeholder (`data-info-modal`)
- [x] **Cards de oferta** — hover, `:active`, `:focus-within` consistentes
- [x] **CTA "Ver produto"** — botão em cada card + toast de feedback
- [x] **Newsletter** — `role="status"` e `aria-live` nos feedbacks de validação

---

## Fase 4 — Reorganização de código (1–2 dias) ✅

Objetivo: manutenibilidade e single source of truth.

- [x] **`src/data/products.ts`** — produtos e ícones SVG centralizados
- [x] **`src/data/payment-methods.ts`** e **`src/data/info-modals.ts`**
- [x] **`public/`** — assets estáticos (Fase 2)
- [x] **CSS modular** — `tokens`, `base`, `components`, `sections`, `animations`, `responsive` + `main.css`
- [x] **`src/scripts/landing.ts`** — lógica vanilla migrada para TypeScript
- [x] **Entry único** — apenas `/src/main.tsx` no `index.html`
- [x] **Tipos alinhados** — `ProductIcon`, `PaymentMethod`, dados compartilhados

---

## Fase 5 — Qualidade e deploy (1–2 dias) ✅

Objetivo: pipeline profissional.

- [x] **ESLint + Prettier** — `eslint.config.js` flat + scripts `lint`, `format`, `check`
- [x] **Playwright E2E** — `e2e/smoke.spec.ts` (home, nav, contadores, calculadora, newsletter, modal)
- [x] **Lighthouse CI** — `lighthouserc.cjs` (A11y/SEO ≥ 90) + workflow GitHub Actions
- [x] **Deploy Netlify** — `netlify.toml` (build `dist/`, SPA redirect, headers)
- [x] **Fontes** — `preconnect` + `<link>` no HTML (removido `@import` do CSS)

---

## Fase 6 — Evolução de produto (backlog) ✅

- [x] **Busca de lojas (CEP)** — formulário em `#lojas`, dados mock por região + link para mapa
- [x] **API de produtos** — `public/api/products.json` + `src/services/products-api.ts` (fallback local)
- [x] **PWA** — `vite-plugin-pwa`, manifest, service worker e cache de API/fontes
- [x] ~~**Dark mode**~~ — removido; site permanece no tema claro
- [x] **Export PDF guia de marca** — botão em `#marca` com `@media print` dedicado
- [x] **i18n EN** — `src/i18n/` + toggle PT/EN no header (HTML estático + React)

---

## Cronograma sugerido

| Semana | Fases | Entregável                            |
| ------ | ----- | ------------------------------------- |
| 1      | 0 + 1 | Site funcional via Vite + a11y básica |
| 2      | 2 + 3 | SEO completo + links resolvidos       |
| 3      | 4     | Código reorganizado                   |
| 4      | 5     | Deploy + testes automatizados         |

---

## Critérios de aceite (Definition of Done)

1. `npm run build` sem erros TypeScript
2. Zero erros no console em Vite dev e preview
3. Lighthouse SEO ≥ 85, A11y ≥ 85
4. Responsivo testado em 375px, 768px, 1024px, 1440px
5. Documentação `docs/` atualizada a cada fase concluída

---

## Referências

- [AUDITORIA-COMPLETA.md](./AUDITORIA-COMPLETA.md) — findings detalhados
- [ESTRUTURA-E-ORGANIZACAO.md](./ESTRUTURA-E-ORGANIZACAO.md) — mapa de pastas
- Screenshots: `audit-mobile-375.png`, `audit-desktop-1440.png` (captura Playwright)
