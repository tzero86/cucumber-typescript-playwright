import { expect, test } from "@playwright/test"


test('Create a new user post', async ({ request }) => {
    const response = await request.post('/posts', {
        data: {
            title: 'This is a new post',
            body: 'This is the body of the post',
            userId: 1
        }
    })

    expect(response.status()).toBe(201)
    expect(await response.json()).toEqual(expect.objectContaining({
        "id": 101,
        "title": 'This is a new post',
        "body": 'This is the body of the post',
        "userId": 1
    }))

})