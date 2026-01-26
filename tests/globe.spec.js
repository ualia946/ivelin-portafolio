import {test, expect} from '@playwright/test'

test("El globo terráqueo se renderiza correctamente", async ({page}) => {
    await page.route('**/api/obtenerTraficoGeo', async route => {
        const trafficPoints ={
                locations: [{
                id: '212.46.38.67',
                type: 'localizacion',
                protocol: 'IPv4',
                location: {
                    country: 'Spain',
                    country_code: 'ES',
                    city: 'Madrid',
                    emoji: '🇪🇸'
                },
                latitude: 40.4167754,
                longitude: -3.7037902
            }]
        } 

        await route.fulfill({json: trafficPoints})
    })

    await page.route('https://ipwho.is/', async route => {
        const userLocation = {
            ip: '212.46.38.67',
            country: 'Spain',
            city: 'Madrid',
            flag: {
                emoji: '🇪🇸'
            }
        }

        await route.fulfill({json: userLocation})
    })

    await page.goto('/map')

    const globeContainer = page.getByTestId('globe-container')
    await expect(globeContainer).toBeVisible()

    const globeReady = page.locator('[data-testid="globe-ready-signal"]')
    await expect(globeReady).toBeAttached({timeout: 30000})

    const canvas = globeContainer.locator('canvas')
    await expect(canvas).toBeVisible({timeout: 30000})

    const geoInformation = page.getByTestId('geo-information')
    await expect(geoInformation).toBeVisible()
})