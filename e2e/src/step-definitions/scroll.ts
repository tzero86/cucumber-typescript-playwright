import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from './setup/world'
import { waitFor } from '../support/wait-for-behavior'
import { ElementKey } from '../env/global'
import { scrollIntoView } from '../support/html-behavior'
import { getElementLocator } from '../support/web-element-helper'


Then(
    /^I scroll to the "([^"]*)"$/,
    async function(this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page},
            globalConfig
        } = this

        console.log(`I scroll to the ${elementKey}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, { state: 'visible' })
            if (result) {
                await scrollIntoView(page, elementIdentifier)
            }
            return result
        })
    }
)