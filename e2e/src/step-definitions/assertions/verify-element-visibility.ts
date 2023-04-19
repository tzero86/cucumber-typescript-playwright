import { Then } from '@cucumber/cucumber'
import { expect } from '@playwright/test'
import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'



Then(
    /^the "([^"]*)" should contain the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, expectedElementText: string) {
        const {
            screen: { page },
            globalVariables,
            globalConfig
        } = this
        console.log(`The ${elementKey} should contain the text ${expectedElementText}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig)
        const content = await page.textContent(elementIdentifier)
        expect(content).toBe(expectedElementText)
    }
)

Then(
    /^the "([^"]*)" should be displayed$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalVariables,
            globalConfig
        } = this
        console.log(`The ${elementKey} should be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalVariables, globalConfig)
        const locator = page.locator(elementIdentifier)
        await expect(locator).toBeVisible()
    }
)