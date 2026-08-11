# Documentação — Projeto Pharmadroga

Índice central da documentação técnica, de marca e de auditoria do projeto.

| Documento                                                  | Conteúdo                                                             |
| ---------------------------------------------------------- | -------------------------------------------------------------------- |
| [AUDITORIA-COMPLETA.md](./AUDITORIA-COMPLETA.md)           | Auditoria Playwright: SEO, UX/UI, responsividade, identidade visual  |
| [ESTRUTURA-E-ORGANIZACAO.md](./ESTRUTURA-E-ORGANIZACAO.md) | Mapa de pastas, arquitetura híbrida e plano de reorganização         |
| [PLANO-IMPLEMENTACAO.md](./PLANO-IMPLEMENTACAO.md)         | Roadmap priorizado em fases (correções, SEO, acessibilidade, deploy) |

## Visão geral do projeto

Landing page institucional da rede fictícia **Pharmadroga**, combinando:

- **HTML semântico** + **CSS design system** + **JavaScript vanilla** (navegação, ofertas, animações)
- **React 19 + TypeScript** (newsletter e simulador de parcelamento via Vite)

## Comandos

```bash
npm install
npm run dev      # Vite — http://localhost:5173 (recomendado)
npm run build    # Gera dist/ para produção
npm run preview  # Pré-visualiza o build
```

> **Atenção:** Live Server (`127.0.0.1:5502`) não compila TypeScript. Os componentes React **não carregam** nesse ambiente.

## Data da auditoria

11 de agosto de 2026 — varredura Playwright em `http://127.0.0.1:5502/index.html`
