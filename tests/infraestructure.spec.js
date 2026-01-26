import {test, expect} from '@playwright/test'

test("Nodos del grafo generados", async ({page}) => {
    await page.goto("/infraestructure")
    await page.waitForSelector('.react-flow__node', {state: 'visible'})

    const nodesNumber = await page.locator('.react-flow__node').count()
    
    expect(nodesNumber).toBeGreaterThan(0)
})

test("Nodo raíz generado correctamente", async({page}) => {
    await page.goto("/infraestructure")
    await page.waitForSelector('.react-flow__node', {state: 'visible'})
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

test("El nodo se pone en rojo si el servicio está detenido o sin funcionar", async({page}) => {
    await page.route('**/api/obtenerInfraestructura', async route => {
        const fakeResponse = {
            nodes: [
                {
                    id: "rg-webapp",
                    position: {x:0, y:0},
                    data: { label: "rg-webapp", name: "rg-webapp", type: "Resource Group", location: "Spain Central" }
                },
                {
                    id: "cosmos-db-test", 
                    position: {x:100, y:0},
                    data: {
                        name: "cosmos-ivelin-portafolio",
                        type: "Azure Cosmos DB", 
                        location: "westeurope"
                    }   
                }
            ],
            edges: [
                {
                    id: "edge-1",
                    source: "rg-webapp",
                    target: "cosmos-db-test",
                    label: "Contiene"
                }
            ]
        };
        await route.fulfill({ json: fakeResponse });
    })

    await page.route('**/api/obtenerEstadoSistema', async route => {
        const fakeStatus = {
            statusCosmos: 'disconnected',
            statusMongo: 'connected',
            otherResources: 'connected'
        };
        await route.fulfill({ json: fakeStatus });
    })


    await page.goto("/infraestructure");
    await page.waitForSelector('.react-flow__node', { state: 'visible', timeout: 10000 });

    const node = page.locator('.react-flow__node').filter({ hasText: 'cosmos-ivelin-portafolio' });
    await expect(node).toBeVisible();

    const redLight = node.locator('.bg-red-500');
    await expect(redLight).toBeVisible();
})