import { When } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { clickElement } from "../support/html-behavior"
import { waitFor } from "../support/wait-for-behavior"
import { getElementLocator } from "../support/web-element-helper"
import { ElementKey } from "../env/global"

When(
    /^I click the "([^"]*)" (?:button|link|icon|element)$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this

        console.log(`I click on the ${elementKey} button|link|icon|element`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const result = await page.waitForSelector(elementIdentifier, {
                state: "visible",
            })
            if (result) {
                await clickElement(page, elementIdentifier)
            }
            return result
        })
    }
)