import { Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { waitFor, waitForSelector } from '../../support/wait-for-behavior'
import { logger } from '../../logger'
import { getElementText } from '../../support/html-behavior'



Then(
    /^the "([^"]*)" should( not)? equal the "([^"]*)" stored in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
        const {
            screen: {page},
            globalConfig,
            globalVariables
        } = this
        logger.log(`The ${elementKey} should ${negate ? 'not ': ''}equal the ${globalVariables[variableKey]} stored in global variables`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)
            if (elementStable) {
                const elementText = await getElementText(page, elementIdentifier)
                return (elementText === globalVariables[variableKey]) === !negate
            } else {
                return elementStable
            }
            
        })
    }
)


Then(
    /^the "([^"]*)" should( not)? contain the "([^"]*)" stored in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, variableKey: string) {
        const {
            screen: {page},
            globalConfig,
            globalVariables
        } = this
        logger.log(`The ${elementKey} should ${negate ? 'not ': ''}contain the ${globalVariables[variableKey]} stored in global variables`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)
            if (elementStable) {
                const elementText = await getElementText(page, elementIdentifier)
                return (elementText?.includes(globalVariables[variableKey])) === !negate
            } else {
                return elementStable
            }
        })

    }
)
