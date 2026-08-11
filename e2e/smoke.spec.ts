import { expect, test } from '@playwright/test';

test.describe('Pharmadroga smoke', () => {
  test('carrega a homepage com título e H1', async ({ page }) => {
    await page.goto('/');

    await expect(page).toHaveTitle(/Pharmadroga/);
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/confiança e economia/i);
  });

  test('navega para seção Ofertas', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('navigation').getByRole('link', { name: 'Ofertas' }).click();

    await expect(page.locator('#ofertas')).toBeInViewport();
    await expect(page.locator('.offer-card')).toHaveCount(6);
  });

  test('anima contadores na seção Lojas', async ({ page }) => {
    await page.goto('/');
    await page.locator('#lojas').scrollIntoViewIfNeeded();

    await expect(page.locator('.stat__number').nth(0)).toHaveText('520+', { timeout: 5000 });
    await expect(page.locator('.stat__number').nth(3)).toHaveText('8M+', { timeout: 5000 });
  });

  test('exibe simulador de parcelamento React', async ({ page }) => {
    await page.goto('/');

    await expect(page.getByRole('heading', { name: 'Simulador de Parcelamento' })).toBeVisible();
    await expect(page.getByRole('button', { name: 'PIX' })).toBeVisible();
  });

  test('valida newsletter com e-mail inválido', async ({ page }) => {
    await page.goto('/');
    await page.locator('.react-newsletter').scrollIntoViewIfNeeded();

    await page.getByRole('textbox', { name: 'E-mail para newsletter' }).fill('teste@invalido');
    await page.getByRole('button', { name: 'Quero economizar' }).click();

    await expect(page.getByText('Informe um e-mail válido.')).toBeVisible();
  });

  test('abre modal institucional do footer', async ({ page }) => {
    await page.goto('/');
    await page.getByRole('link', { name: 'Sobre nós' }).click();

    await expect(page.getByRole('dialog')).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Sobre a Pharmadroga' })).toBeVisible();
  });

  test('busca lojas por CEP válido', async ({ page }) => {
    await page.goto('/');
    await page.locator('#lojas').scrollIntoViewIfNeeded();

    await page.locator('#storeCepInput').fill('01310-100');
    await page.locator('#storeFinderSubmit').click();

    await expect(page.locator('.store-finder__list')).toBeVisible({ timeout: 5000 });
    await expect(page.locator('.store-card')).toHaveCount(2);
  });

  test('alterna idioma para inglês', async ({ page }) => {
    await page.goto('/');
    await page.locator('#langToggle').click();

    await expect(page.getByRole('navigation').getByRole('link', { name: 'Deals' })).toBeVisible();
    await expect(page.getByRole('heading', { level: 1 })).toContainText(/trust and savings/i);
  });
});
