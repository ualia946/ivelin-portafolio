import {test, expect} from '@playwright/test'

test("Informe generado correctamente", async ({page}) => {
    await page.goto("/informe-costes")

    const informe = page.getByTitle('Informe PowerBI')
    await expect(informe).toBeVisible({timeout: 30000})

    const contenedorInforme = page.getByTestId('iframe-container')
    await expect(contenedorInforme).toHaveAttribute('style', /padding-bottom:\s*56.25%/)
})

test.describe('Versión Móvil', () => {
    test.use({viewport: {width: 375, height: 667}})

    test('Informe generado correctamente', async ({page}) => {
        await page.goto("/informe-costes")

        const informe = page.getByTitle('Informe PowerBI')
        await expect(informe).toBeVisible({timeout: 30000})

        const contenedorInforme = page.getByTestId('iframe-container')
        await expect(contenedorInforme).toHaveAttribute('style', /padding-bottom:\s*200%/)
    })
})