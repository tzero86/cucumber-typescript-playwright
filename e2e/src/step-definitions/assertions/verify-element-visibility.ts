import { Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { waitFor } from '../../support/wait-for-behavior'
import { logger } from '../../logger'
import { getElement, getElementAtIndex, getElements } from '../../support/html-behavior'



Then(
    /^the "([^"]*)" should( not)? be displayed$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, negate: boolean) {
        const {
            screen: { page },
            globalConfig
        } = this
        logger.log(`👁️ The ${elementKey} should ${negate ? 'not ': ''}be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        
        await waitFor(async () => {
            const isElementVisible =  await getElement(page, elementIdentifier) != null
            return isElementVisible === !negate
        })
    }
)


Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" "([^"]*)" should( not)? be displayed$/,
    async function (this: ScenarioWorld, elementPosition: string, elementKey: ElementKey, negate: boolean) {

        const {
            screen: { page },
            globalConfig
        } = this

        logger.log(`👁️ The ${elementPosition} ${elementKey} should ${negate ? 'not ': ''}be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const index = Number(elementPosition.match(/\d/g)?.join('')) - 1

        await waitFor(async () => {
            const isElementVisible = (await getElementAtIndex(page, elementIdentifier, index)) != null
            return isElementVisible === !negate
        })
    }
)

Then(
    /^I should( not)? see "(\d*)" "([^"]*)" displayed$/,
    async function (this: ScenarioWorld, negate: boolean, expectedCount: string, elementKey: ElementKey) {
        const {
            screen: {page},
            globalConfig
        } = this

        logger.log(`👁️ I should ${negate ? 'not ': ''}see ${expectedCount} ${elementKey} displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const element = await getElements(page, elementIdentifier)
            return (Number(expectedCount) === element.length) === !negate
        })
    }
)