import { expect, test } from "@playwright/test"


test('Retrieve user posts', async ({ request }) => {
    const response = await request.get('/posts')
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
})

test('Retrieve a user post', async ({ request }) => {
    const response = await request.get('/posts/1')
    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual(expect.objectContaining({
        "id": 1,
        "userId": 1,
    }))
})


test('Cannot retrieve animals from the API', async ({ request }) => {
    const response = await request.get('/animals')
    expect(response.ok()).toBeFalsy()
    expect(response.status()).toBe(404)
    expect(response.statusText()).toEqual('Not Found')
})