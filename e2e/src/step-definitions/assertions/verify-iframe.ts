import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "../setup/world"
import { ElementKey } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { getElementWithinIframe, getIframeElement, getTextWithinIframeElement } from "../../support/html-behavior"
import { waitFor, waitForResult, waitForSelectInIframe } from "../../support/wait-for-behavior"
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
            if (elementIFrame) {
                const isElementVisible = await getElementWithinIframe(elementIFrame, elementIdentifier) !== null
                if (isElementVisible !== negate) {
                    return {result: waitForResult.PASS}
                } else {
                    return {result: waitForResult.FAIL, replace: elementKey}
                 }
            } else {
                return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey}
            }    
        },
        globalConfig,
        { 
            target: elementKey,
            failureMessage: `💣 Expected ${elementKey} to ${negate ? 'not ': ''}be displayed.`
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
            if(elementIFrame) {
                const elementStable = await waitForSelectInIframe(elementIFrame, elementIdentifier)
                if (elementStable) {
                    const elementText = await getTextWithinIframeElement(elementIFrame, elementIdentifier)
                    if (elementText?.includes(expectedElementText) !== negate) {
                        return {result: waitForResult.PASS}
                    } else {
                        return {result: waitForResult.FAIL, replace: elementKey}
                    }
                } else {
                    return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey}
                }
            } else {
                return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey}
            }            
        },
        globalConfig,
        { 
            target: elementKey,
            failureMessage: `💣 Expected ${elementKey} to ${negate ? 'not ': ''}contain the text ${expectedElementText}.`
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
            if(elementIFrame) {
                const elementStable = await waitForSelectInIframe(elementIFrame, elementIdentifier)
                if (elementStable) {
                    const elementText = await getTextWithinIframeElement(elementIFrame, elementIdentifier)
                    if (elementText === expectedElementText === !negate) {
                        return {result: waitForResult.PASS}
                    } else {
                        return {result: waitForResult.FAIL, replace: elementKey}
                    }
                } else {
                    return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: elementKey }
                }
            } else {
                return {result: waitForResult.ELEMENT_NOT_AVAILABLE, replace: iframeKey }
            }
        },
        globalConfig,
        { 
            target: elementKey,
            failureMessage: `💣 Expected ${elementKey} to ${negate ? 'not ': ''}equal the text ${expectedElementText}.`
        })
    }
)