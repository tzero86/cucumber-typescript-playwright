import { expect, test } from "@playwright/test"


test('Update user post', async ({ request }) => {
    const response = await request.put('/posts/1', {
        data: {
            id: 1,
            title: 'Existing Post',
            body: 'This is the body of the existing post',
            userId: 1
        }
    })

    expect(response.ok()).toBeTruthy()
    expect(response.status()).toBe(200)
    expect(await response.json()).toEqual(expect.objectContaining({
        "id": 1,
        "title": 'Existing Post',
        "body": 'This is the body of the existing post',
        "userId": 1
    }))

})


test('Update user post that does not exist', async ({ request }) => {
    const response = await request.put('/posts/666', {
        data: {
            id: 1,
            title: 'Existing Post',
            body: 'This is the body of the existing post',
            userId: 1
        }
    })

    expect(response.ok()).toBeFalsy()
    expect(response.status()).toBe(500)
    expect(response.statusText()).toEqual('Internal Server Error')
    expect(await response.text()).toContain("Cannot read properties of undefined (reading 'id')")

})