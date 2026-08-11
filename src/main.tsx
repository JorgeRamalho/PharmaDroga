import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { registerSW } from 'virtual:pwa-register';
import App from '@/App';
import { initLanding } from '@/scripts/landing';
import '@/styles/main.css';

initLanding();

registerSW({ immediate: true });

const rootElement = document.getElementById('react-root');

if (rootElement) {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
}
