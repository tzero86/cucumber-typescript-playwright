import { Then } from '@cucumber/cucumber'
import { waitFor } from '../../support/wait-for-behavior'
import { ScenarioWorld } from '../setup/world'
import { getElementLocator } from '../../support/web-element-helper'
import { ElementKey } from '../../env/global'
import { logger } from '../../logger'


Then(
    /^the "([^"]*)" (?:check box|radio button|switch) should( not)? be checked$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: { page },
            globalConfig,
        } = this

        logger.log(`☑️ The ${elementKey} check box|radio button|switch should ${negate ? 'not ': ''}be checked`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        await waitFor(async () => {
            const isElementChecked = await page.isChecked(elementIdentifier)
            return isElementChecked === !negate
        })


    }
)