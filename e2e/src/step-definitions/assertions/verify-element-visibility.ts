import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'


Then(
    /^the contacts header should contain the text Contacts$/,
    async function name() {
        console.log('the contacts header should contain the text Contacts')
        const content = await global.page.textContent('[data-id="contacts"]')
        expect(content).toBe('Contacts')
    }
)