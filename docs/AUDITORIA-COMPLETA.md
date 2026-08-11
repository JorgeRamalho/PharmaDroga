# Auditoria Completa — Pharmadroga

**Data:** 11/08/2026  
**Ambiente testado:** Live Server — `http://127.0.0.1:5502/index.html`  
**Ferramenta:** Playwright (varredura automatizada + screenshots 375px e 1440px)  
**Escopo:** SEO, usabilidade, responsividade, layout, identidade visual, tipografia, UX/UI e arquitetura de desenvolvimento

---

## 1. Resumo executivo

| Área                   | Nota | Status                                                           |
| ---------------------- | ---- | ---------------------------------------------------------------- |
| Identidade visual / UI | 9/10 | Excelente design system documentado                              |
| Tipografia             | 8/10 | Hierarquia clara; fontes via `@import` (performance)             |
| Responsividade         | 7/10 | Breakpoints funcionais; alguns alvos de toque pequenos           |
| UX / Usabilidade       | 6/10 | Navegação clara; links placeholder; React ausente no Live Server |
| SEO                    | 4/10 | Meta básica ok; faltam OG, schema, sitemap, canonical            |
| Acessibilidade         | 5/10 | Sem `<main>`, skip link, estilos de foco visíveis                |
| Arquitetura dev        | 6/10 | Stack híbrida funcional via Vite; conflito com Live Server       |

**Achado crítico:** erro de console ao carregar `/src/main.tsx` no Live Server (MIME `application/octet-stream`). Newsletter e simulador React **não aparecem** nesse ambiente.

---

## 2. Varredura Playwright — resultados técnicos

### 2.1 Console e erros

```
Failed to load module script: Expected a JavaScript-or-Wasm module script
but the server responded with a MIME type of "application/octet-stream".
@ http://127.0.0.1:5502/src/main.tsx
```

**Causa:** Live Server serve `.tsx` como arquivo estático, sem transpilação.  
**Solução:** usar `npm run dev` (Vite) ou `npm run build` + servir `dist/`.

### 2.2 Estrutura da página (DOM)

| Elemento                       | Quantidade / valor                                 |
| ------------------------------ | -------------------------------------------------- |
| `<h1>`                         | 1 — "Sua saúde merece confiança e economia"        |
| `<h2>`                         | 5 — hierarquia correta                             |
| Seções com ID                  | `inicio`, `ofertas`, `pagamento`, `marca`, `lojas` |
| Cards de oferta                | 6 (renderizados via JS)                            |
| Links totais                   | 19                                                 |
| Links `href="#"` (placeholder) | 8                                                  |
| Imagens `<img>`                | 0 (ícones via SVG inline)                          |
| `#react-root` preenchido       | **Não** (Live Server)                              |
| Overflow horizontal (375px)    | **Não**                                            |

### 2.3 Contadores animados (seção Lojas)

Após scroll, valores exibidos: `520+`, `27`, `15.000+`, `8`.

**Bug identificado:** o contador "Milhões de clientes" deveria exibir `8M+`, mas mostra apenas `8` — lógica em `js/main.js` (`animateCounter`) trata `target === 8` apenas no ramo `>= 1000`.

### 2.4 Meta tags detectadas

| Tag           | Valor                                                                                      |
| ------------- | ------------------------------------------------------------------------------------------ |
| `lang`        | `pt-BR`                                                                                    |
| `title`       | Pharmadroga — Saúde, Confiança e Preços Justos                                             |
| `description` | Pharmadroga — Sua saúde com confiança, preços justos e parcelamento em até 6x sem juros... |
| `theme-color` | `#0A5C5C`                                                                                  |
| `viewport`    | width=device-width, initial-scale=1.0                                                      |
| Open Graph    | **Ausente**                                                                                |
| Twitter Card  | **Ausente**                                                                                |
| Canonical     | **Ausente**                                                                                |
| JSON-LD       | **Ausente**                                                                                |

---

## 3. SEO — análise detalhada

### Pontos positivos

- `lang="pt-BR"` correto para público brasileiro
- Um único `<h1>` por página
- Meta `description` presente e alinhada ao posicionamento
- Títulos de seção descritivos (`Ofertas da Semana`, `Facilidade de Pagamento`, etc.)
- Favicon inline SVG (sem requisição extra)

### Lacunas e recomendações

| Prioridade | Item                 | Ação recomendada                                                   |
| ---------- | -------------------- | ------------------------------------------------------------------ |
| Alta       | Open Graph + Twitter | `og:title`, `og:description`, `og:image`, `og:url`, `twitter:card` |
| Alta       | JSON-LD              | `Organization` + `PharmacyOrDrugStore` (Schema.org)                |
| Média      | Canonical URL        | `<link rel="canonical" href="...">`                                |
| Média      | Sitemap + robots.txt | Gerar em build ou manualmente                                      |
| Média      | Keywords semânticas  | Reforçar termos: drogaria, farmácia, parcelamento, PIX             |
| Baixa      | hreflang             | Só se houver versão EN no futuro                                   |

### Texto e copy

- Tom: confiança + economia + facilidade de pagamento — **consistente**
- CTAs claros: "Explorar Ofertas", "Formas de Pagamento", "Quero economizar"
- Prova social: "+ de 500 lojas", estatísticas nacionais
- Footer com CNPJ placeholder (`00.000.000/0001-00`) — substituir ou remover em produção

---

## 4. UX e usabilidade

### Fluxo de navegação

```
Header → Hero → Trust Bar → Ofertas → Pagamento → Marca → Lojas → [React] → Footer
```

- Scroll suave implementado (`scroll-behavior: smooth` + JS)
- Nav ativa por seção (IntersectionObserver)
- Menu mobile com `aria-expanded` e `aria-label="Abrir menu"`

### Problemas de usabilidade

| Problema                         | Impacto                                          | Correção                                                     |
| -------------------------------- | ------------------------------------------------ | ------------------------------------------------------------ |
| 8 links com `href="#"`           | Frustração; parece site incompleto               | Criar páginas ou modais; usar `aria-disabled` se intencional |
| React não carrega no Live Server | Newsletter e calculadora ausentes                | Documentar ambiente; usar Vite                               |
| Sem `<main>`                     | Leitor de tela não identifica conteúdo principal | Envolver seções em `<main id="main">`                        |
| Sem skip link                    | Teclado precisa tabular todo o header            | `<a href="#main" class="skip-link">Ir ao conteúdo</a>`       |
| Logo link `#`                    | Recarrega topo sem feedback                      | `href="#inicio"` ou `/`                                      |

### Interações testadas

- Produtos: 6 cards renderizados com preço, desconto e parcelamento
- Animações reveal: IntersectionObserver com threshold 0.15
- Contadores: animam ao entrar na viewport (com bug no "8M+")

---

## 5. Acessibilidade (WCAG 2.1)

| Critério                                 | Status      | Observação                                       |
| ---------------------------------------- | ----------- | ------------------------------------------------ |
| Contraste hero (texto branco sobre teal) | Provável OK | Título `rgb(255,255,255)` sobre gradiente escuro |
| Foco visível (`:focus-visible`)          | **Falha**   | Nenhuma regra global detectada no CSS principal  |
| Alvos de toque ≥ 44×44px                 | **Parcial** | Menu hamburger 40×32px                           |
| Labels em formulários                    | OK (React)  | Newsletter usa `aria-label` no input             |
| Landmarks                                | **Parcial** | `header`, `footer`, `nav`; falta `main`          |
| SVG decorativos                          | OK          | `aria-hidden="true"` no logo                     |
| Paleta de cores                          | OK          | `aria-label="Paleta de cores da marca"`          |

---

## 6. Responsividade

### Breakpoints (`css/style.css`)

| Breakpoint | Adaptações principais                                                  |
| ---------- | ---------------------------------------------------------------------- |
| `≤ 1024px` | Hero 1 coluna; ofertas 2 colunas; footer 2 colunas; paleta 3 colunas   |
| `≤ 768px`  | Menu hamburger; nav overlay; ofertas 1 coluna; oculta "Encontrar Loja" |

### Screenshots Playwright

- **Mobile 375×812:** layout empilhado, sem overflow horizontal
- **Desktop 1440×900:** grid hero 2 colunas, trust bar 4 colunas, ofertas 3 colunas

### Gaps responsivos

- Falta breakpoint intermediário para tablets landscape (ex.: 820px)
- Botões do header competem por espaço entre 769px e 1024px
- Componentes React têm media query própria em `react.css` (`≤ 768px`)

---

## 7. Layout e composição visual

### Hierarquia visual

1. **Hero** — gradiente institucional, badge de credibilidade, card de pagamento
2. **Trust bar** — 4 pilares com ícones SVG
3. **Ofertas** — grid de cards com tag de desconto
4. **Pagamento** — mock de cartão + features numeradas (6x, 5%, 24h)
5. **Marca** — swatches + amostras tipográficas (meta-seção de design system)
6. **Lojas** — estatísticas animadas
7. **Footer** — 4 colunas institucionais

### Consistência

- Container max-width uniforme
- Espaçamento de seções (`section`) coerente
- Uso consistente de `--radius-*`, `--shadow-*` e gradientes de marca

---

## 8. Identidade visual e design system

### Posicionamento de marca

> Rede de drogarias acessível, confiável, com foco em economia e facilidade de pagamento.

### Paleta (tokens CSS)

| Token           | Hex       | Uso                             |
| --------------- | --------- | ------------------------------- |
| Teal Profundo   | `#0A5C5C` | Autoridade, header, theme-color |
| Teal Vivo       | `#148F8F` | Destaques, hover                |
| Teal Claro      | `#1CB5B5` | Gradientes, acentos             |
| Coral Quente    | `#E85D4C` | Ofertas, urgência positiva      |
| Âmbar Economia  | `#F4A261` | Preço baixo                     |
| Verde Aprovação | `#2D9D78` | Pagamento, confirmação          |

### Gradientes

- `--gradient-brand`: 135° teal progressivo
- `--gradient-payment`: verde → teal para resultados de pagamento

**Avaliação:** identidade madura, documentada inline no CSS — pronta para exportar como guia de marca formal.

---

## 9. Tipografia

| Papel   | Família           | Pesos   | Uso                       |
| ------- | ----------------- | ------- | ------------------------- |
| Display | Plus Jakarta Sans | 600–800 | Títulos, logo, CTAs       |
| Body    | Inter             | 400–600 | Parágrafos, UI            |
| Price   | Space Grotesk     | 500–700 | Preços, parcelas, números |

### Escala tipográfica

Tokens de `--text-xs` (0.75rem) a `--text-6xl` (3.75rem) — escala modular consistente.

### Performance tipográfica

- Fontes carregadas via `@import` do Google Fonts no CSS
- **Recomendação:** migrar para `<link rel="preconnect">` + `<link>` no HTML ou self-host para LCP

---

## 10. Estratégia de desenvolvimento

### Stack atual

```
index.html (shell)
├── css/style.css      → Design system + layout estático
├── js/main.js         → Produtos, nav, animações (ES modules)
└── src/ (Vite + React)
    ├── main.tsx       → Mount em #react-root
    ├── App.tsx        → NewsletterBanner + PaymentCalculator
    ├── components/    → Componentes isolados
    ├── styles/react.css
    └── types/index.ts → Interfaces TypeScript
```

### Pontos de atenção

| Item                | Detalhe                                                             |
| ------------------- | ------------------------------------------------------------------- |
| Arquitetura híbrida | HTML estático + ilha React — válido, mas exige Vite em dev          |
| Duplicação          | `initScrollReveal()` chamado 2× em `main.js` (linhas 230 e 235)     |
| Tipos subutilizados | `Product`, `BrandColor` definidos em TS mas produtos estão só em JS |
| Sem testes          | Nenhum teste unitário ou E2E configurado                            |
| Sem ESLint/Prettier | Qualidade depende de revisão manual                                 |
| `dist/` versionado? | Presente localmente; deve estar no `.gitignore` (já está)           |

---

## 11. Matriz de prioridades (quick wins)

| #   | Ação                                                | Esforço | Impacto                   |
| --- | --------------------------------------------------- | ------- | ------------------------- |
| 1   | Servir via `npm run dev` ou build                   | Baixo   | Crítico — React funcional |
| 2   | Corrigir contador `8M+`                             | Baixo   | Médio                     |
| 3   | Adicionar `<main>` + skip link + `:focus-visible`   | Baixo   | Alto (a11y)               |
| 4   | Meta OG + JSON-LD                                   | Médio   | Alto (SEO)                |
| 5   | Substituir links `#` placeholder                    | Médio   | Alto (UX)                 |
| 6   | Aumentar área do menu hamburger (44px)              | Baixo   | Médio                     |
| 7   | Unificar dados de produtos em JSON/TS compartilhado | Médio   | Médio (manutenção)        |
| 8   | README + guia de marca PDF/export                   | Baixo   | Médio (profissionalismo)  |

---

## 12. Conclusão

O projeto Pharmadroga apresenta **identidade visual e design system de alto nível**, com landing page bem estruturada e copy alinhada ao posicionamento. A experiência estática funciona bem no Live Server, mas **metade da proposta técnica (React) fica invisível** nesse ambiente.

Para elevar o projeto a padrão profissional de produção, as prioridades são: **ambiente de build correto**, **SEO on-page completo**, **acessibilidade básica (main, foco, skip link)** e **eliminação de links mortos**.

Próximo passo detalhado: [PLANO-IMPLEMENTACAO.md](./PLANO-IMPLEMENTACAO.md)
