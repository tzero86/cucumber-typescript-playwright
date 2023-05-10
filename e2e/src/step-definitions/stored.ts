import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { waitFor } from "../support/wait-for-behavior"
import { getElementLocator } from "../support/web-element-helper"
import { ElementKey } from "../env/global"
import { logger } from "../logger"



Then(
    /^I retrieve the "([^"]*)" text and store it as "([^"]*)" in global variables$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, variableName: string) {
        const {
            screen: { page },
            globalConfig,
            globalVariables
        } = this

        logger.log(`I retrieve the ${elementKey} text and store it as ${variableName} in global variables`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, { state: 'visible'})
            if (result) {
                const elementText = await page.textContent(elementIdentifier)
                if(elementText !== null) {
                    globalVariables[variableName] = elementText
                }
            }
            return result
        
        })
    }
)
