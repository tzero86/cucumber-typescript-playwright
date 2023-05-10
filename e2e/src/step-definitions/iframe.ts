import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { waitFor, waitForSelector } from "../support/wait-for-behavior"
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
            const iframeStable = await waitForSelector(page, iframeIdentifier)
            if (iframeStable) {
                const elementIFrame = await getIframeElement(page, iframeIdentifier)
                if (elementIFrame) {
                    await inputValueOnIframe(elementIFrame, elementIdentifier, inputValue)
                }
            }
            return iframeStable
        })
    }
)


