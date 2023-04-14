import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'


Then(
    /^the "([^"]*)" should contain the text "(.*)"$/,
    async function (elementKey: string, expectedElementText: string) {
        console.log(`The ${elementKey} should contain the text ${expectedElementText}`)
        const content = await global.page.textContent('[data-id="contacts"]')
        expect(content).toBe(expectedElementText)
    }
)

Then(
    /^the "([^"]*)" should be displayed$/,
    async function (elementKey: string) {
        console.log(`The ${elementKey} should be displayed`)
        const locator = await global.page.locator(`[data-id="header-logo"]`)
        await expect(locator).toBeVisible()
    }
)