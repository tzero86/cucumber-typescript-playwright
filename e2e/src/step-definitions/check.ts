import { Then } from '@cucumber/cucumber'
import { ScenarioWorld } from './setup/world'
import { ElementKey } from '../env/global'
import { getElementLocator } from '../support/web-element-helper'
import { waitFor } from '../support/wait-for-behavior'
import { checkElement, uncheckElement } from '../support/html-behavior'
import { logger } from '../logger'



Then(
    /^I (check)?(uncheck)? the "([^"]*)" (?:check box|radio button|switch)$/,
    async function(this: ScenarioWorld, checked: boolean, unchecked: boolean, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this

        logger.log(`☑️ I ${unchecked?'uncheck ':'check'} the ${elementKey} check box|radio button|switch`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, {
                state: 'visible',
            })
            if (result) {
                if (!!unchecked) {
                    await uncheckElement(page, elementIdentifier)
                } else {
                    await checkElement(page, elementIdentifier)
                }
            }
            return result
        })
    }
)