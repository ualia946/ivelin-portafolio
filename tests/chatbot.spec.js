import {test,expect} from '@playwright/test'

test('Respuesta chat bot existosa', async ({page}) => {
    page.route('**/api/obtenerRespuestaChatBot', async route => {
        const respuestaChatBot = {
            reply: "Hola! Me llamo Ivelin.",
            headers: {'Content-Type': 'application/json'}
        }

        await new Promise(resolve => setTimeout(resolve, 5000))
        await route.fulfill({json: respuestaChatBot})
    })

    await page.goto('/')
    
    const botonChatBot = page.locator('#open-chat')
    const chatBot = page.getByTestId('chatBot')
    await botonChatBot.click()
    await expect(chatBot).toBeVisible({timeout: 15000})
    await expect(botonChatBot).toBeHidden()

    const input = page.getByPlaceholder('Escribe tu pregunta...')
    await input.fill("¿Cómo te llamas?")
    await page.getByTestId('sendButton').click()

    await expect(page.getByText('¿Cómo te llamas?')).toBeVisible()
    await expect(page.getByText('Pensando...')).toBeVisible()
    await expect(page.getByText('Pensando...')).toBeHidden({timeout: 30000})

    await expect(page.getByText('Hola! Me llamo Ivelin.')).toBeVisible()
})

test('Respuesta chat bot fuera de contexto', async ({page}) => {

    page.route('**/api/obtenerRespuestaChatBot', async route => {
        const respuestaChatBot = {
            reply: "Lo siento, esa información no está detallada en mi CV actual. Mi CV se centra en mi experiencia profesional y académica en Ingeniería Informática.",
            headers: {'Content-Type': 'application/json'}
        }

        await new Promise(resolve => setTimeout(resolve, 5000))
        await route.fulfill({json: respuestaChatBot})
    })

    await page.goto('/')

    const botonChatBot = page.locator('#open-chat')
    const chatBot = page.getByTestId('chatBot')
    await botonChatBot.click()
    await expect(chatBot).toBeVisible()
    await expect(botonChatBot).toBeHidden()

    const input = page.getByPlaceholder('Escribe tu pregunta...')
    await input.fill("¿Cuál es el tiempo mañana?")
    await page.getByTestId('sendButton').click()

    await expect(page.getByText('¿Cuál es el tiempo mañana?')).toBeVisible()
    await expect(page.getByText('Pensando...')).toBeVisible()
    await expect(page.getByText('Pensando...')).toBeHidden({timeout: 30000})

    await expect(page.getByText('Lo siento, esa información no está detallada en mi CV actual.', {exact: false})).toBeVisible({timeout: 10000})
})