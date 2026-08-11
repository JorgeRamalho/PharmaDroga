import { VitePWA } from 'vite-plugin-pwa';
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['og-image.png', 'robots.txt', 'sitemap.xml'],
      manifest: {
        name: 'Pharmadroga — Saúde, Confiança e Preços Justos',
        short_name: 'Pharmadroga',
        description:
          'Rede de drogarias com cuidado farmacêutico, preços justos e parcelamento em até 6x sem juros.',
        theme_color: '#0A5C5C',
        background_color: '#f7f9fa',
        display: 'standalone',
        lang: 'pt-BR',
        start_url: '/',
        icons: [
          {
            src: '/og-image.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'any',
          },
          {
            src: '/og-image.png',
            sizes: '512x512',
            type: 'image/png',
            purpose: 'maskable',
          },
        ],
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,json,txt,xml,woff2}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-cache',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
              expiration: { maxEntries: 10, maxAgeSeconds: 60 * 60 * 24 * 365 },
            },
          },
          {
            urlPattern: /\/api\/products\.json$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'products-api-cache',
              expiration: { maxEntries: 1, maxAgeSeconds: 60 * 60 },
            },
          },
        ],
      },
    }),
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  server: {
    host: true,
    port: 5174,
    strictPort: false,
    open: '/',
  },
  preview: {
    host: true,
    port: 4174,
    strictPort: false,
  },
});
