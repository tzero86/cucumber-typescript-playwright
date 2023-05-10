import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "../setup/world"
import { ElementKey } from "../../env/global"
import { waitFor, waitForSelectorOnPage } from "../../support/wait-for-behavior"
import { getElementLocator } from "../../support/web-element-helper"
import { logger } from "../../logger"
import { getElementOnPage, getElementTextWithinPage, getTitleWithinPage } from "../../support/html-behavior"


const NEW_TAB_TIMEOUT: number = 2000;

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "(.*)"$/,
    async function (this: ScenarioWorld, tabNumber: ElementKey, negate: boolean, expectedTabTitle: string) {
        const {
            screen : {page, context},
        } = this

        logger.log(`the ${tabNumber} tab|window should${negate ? " not" : ""} contain the title ${expectedTabTitle}`)
        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(NEW_TAB_TIMEOUT)

        await waitFor(async () => {
            let pages = context.pages()
            const pageTitle = await getTitleWithinPage(page, pages, pageIndex)
            return pageTitle?.includes(expectedTabTitle) !== negate
        })
    }
)


Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? be displayed$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, tabNumber: ElementKey, negate: boolean) {
        const {
            screen: {page, context},
            globalConfig
        } = this

        logger.log(`the ${elementKey} on the ${tabNumber} tab|window should${negate ? " not" : ""} be displayed`)

        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(NEW_TAB_TIMEOUT)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            let pages = context.pages()
            const isElementVisible = await getElementOnPage(page, elementIdentifier, pages, pageIndex) !== null
            return isElementVisible === !negate
        })
    }
)


Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, tabNumber: ElementKey, negate: boolean, expectedText: string) {
        const {
            screen: {page, context},
            globalConfig
        } = this

        logger.log(`the ${elementKey} on the ${tabNumber} tab|window should${negate ? " not" : ""} contain the text ${expectedText}`)

        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(NEW_TAB_TIMEOUT)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {

            let pages = context.pages()
            const elementStable = await waitForSelectorOnPage(page, elementIdentifier, pages, pageIndex)
            
            if (elementStable) {
                const elementText = await getElementTextWithinPage(page, elementIdentifier, pages, pageIndex)
                return elementText?.includes(expectedText) === !negate
            } else {
                return elementStable
            }
        })
    }
)

Then(
    /^the "([^"]*)" on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? equal the text "(.*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, tabNumber: ElementKey, negate: boolean, expectedText: string) {
        const {
            screen: {page, context},
            globalConfig
        } = this

        logger.log(`the ${elementKey} on the ${tabNumber} tab|window should${negate ? " not" : ""} equal the text ${expectedText}`)

        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(NEW_TAB_TIMEOUT)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {

            let pages = context.pages()
            const elementStable = await waitForSelectorOnPage(page, elementIdentifier, pages, pageIndex)

            if (elementStable) {
                const elementText = await getElementTextWithinPage(page, elementIdentifier, pages, pageIndex)
                return elementText === expectedText === !negate
            } else {
                return elementStable
            }
        })
    }
)