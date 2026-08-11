export function initBrandPdfExport(): void {
  const button = document.getElementById('exportBrandPdf');
  if (!button) return;

  button.addEventListener('click', () => {
    document.body.classList.add('print-brand');

    const cleanup = (): void => {
      document.body.classList.remove('print-brand');
      window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);
    window.print();
  });
}
