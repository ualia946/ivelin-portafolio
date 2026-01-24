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
    await botonChatBot.click()
    await expect(botonChatBot).toBeHidden()


    const input = page.getByPlaceholder('Escribe tu pregunta...')
    await input.fill("¿Cómo te llamas?")
    await page.getByTestId('sendButton').click()

    await expect(page.getByText('¿Cómo te llamas?')).toBeVisible()
    await expect(page.getByText('Pensando...')).toBeVisible()
    await expect(page.getByText('Pensando...')).toBeHidden({timeout: 30000})

    await expect(page.getByText('Hola! Me llamo Ivelin.')).toBeVisible()
})