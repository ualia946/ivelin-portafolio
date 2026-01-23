import {test, expect} from '@playwright/test'

test("Nodos del grafo generados", async ({page}) => {
    await page.goto("/infraestructure")
    await page.waitForSelector('.react-flow__node', {state: 'visible'})

    const nodesNumber = await page.locator('.react-flow__node').count()
    
    expect(nodesNumber).toBeGreaterThan(0)
})

test("Nodo raíz generado correctamente", async({page}) => {
    await page.goto("/infraestructure")
    const rootNode = page.locator('.react-flow__node').filter({hasText: 'rg-webapp'})
    await expect(rootNode).toBeVisible()
})

test("Contenido de los nodos generados correctamente", async({page}) => {
    await page.goto("/infraestructure")
    await page.waitForSelector('.react-flow__node', {state: 'visible'})
    for(const n of await page.locator('.react-flow__node').all()){
        const image = n.locator('img')
        await expect(image).toBeVisible()
        
        const isLoaded = await image.evaluate( (img) => (img.naturalWidth > 0 ? true : false))
        expect(isLoaded).toBeTruthy()

        const text = await n.innerText()
        expect(text.length).toBeGreaterThan(0)
    }
})

test("Aristas del grafo generadas", async({page}) => {
    await page.goto("/infraestructure")
    await page.waitForSelector('.react-flow__edge-interaction', {state: 'visible'})

    const edgesNumber = await page.locator('.react-flow__edge-interaction').count()
    expect(edgesNumber).toBeGreaterThan(0)
})