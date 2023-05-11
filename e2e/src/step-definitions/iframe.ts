import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { waitFor, waitForResult, waitForSelectInIframe, waitForSelector } from "../support/wait-for-behavior"
import { getElementLocator } from "../support/web-element-helper"
import { ElementKey } from "../env/global"
import { getIframeElement, inputValueOnIframe } from "../support/html-behavior"
import { logger } from "../logger"


Then(
    /^I fill in the "([^"]*)" input on the "([^"]*)" iframe with "([^"]*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, iframeKey: ElementKey, inputValue: string) {
        const {
            screen: { page },
            globalConfig,
        } = this
        logger.log(`I fill in the ${elementKey} input on the ${iframeKey} iframe with ${inputValue}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)

        await waitFor(async () => {
            const elementIframe = await getIframeElement(page, iframeIdentifier)

            if(elementIframe) {
                const elementStable = await waitForSelectInIframe(elementIframe, elementIdentifier)
                if (elementStable) {
                    await inputValueOnIframe(elementIframe, elementIdentifier, inputValue)
                    return { result: waitForResult.PASS}
                } else {
                    return { result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey}
                }
            } else {
                return { result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey}
            }
        },
        globalConfig,
        { target: elementKey})
    }
)


