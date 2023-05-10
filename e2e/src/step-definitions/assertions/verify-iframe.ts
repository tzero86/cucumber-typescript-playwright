import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "../setup/world"
import { ElementKey } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { getIframeElement } from "../../support/html-behavior"
import { waitFor } from "../../support/wait-for-behavior"
import { logger } from "../../logger"



Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, iframeKey: ElementKey, negate: boolean) {
        const {
            screen: { page },
            globalConfig,
        } = this
        logger.log(`the ${elementKey} on the ${iframeKey} iframe should${negate ? " not" : ""} be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)

        await waitFor(async () => {
            const elementIFrame = await getIframeElement(page, iframeIdentifier)
            const isElementVisible = (await elementIFrame?.$(elementIdentifier)) !== null
            return isElementVisible !== negate
        })
    }
)

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? contain the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, iframeKey: ElementKey, negate: boolean, expectedElementText: string) {
        const {
            screen: { page },
            globalConfig
        } = this

        logger.log(`the ${elementKey} on the ${iframeKey} iframe should${negate ? " not" : ""} contain the text ${expectedElementText}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)

        await waitFor(async () => {
            const elementIFrame = await getIframeElement(page, iframeIdentifier)
            const elementText = await elementIFrame?.textContent(elementIdentifier)
            return elementText?.includes(expectedElementText) !== negate
        })
    }
)

Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? equal the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, iframeKey: ElementKey, negate: boolean, expectedElementText: string) {
        const {
            screen: { page },
            globalConfig
        } = this

        logger.log(`the ${elementKey} on the ${iframeKey} iframe should${negate ? " not" : ""} equal the text ${expectedElementText}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)
        
        await waitFor(async () => {
            const elementIFrame = await getIframeElement(page, iframeIdentifier)
            const elementText = await elementIFrame?.textContent(elementIdentifier)
            return elementText === expectedElementText === !negate
        })
    }
)