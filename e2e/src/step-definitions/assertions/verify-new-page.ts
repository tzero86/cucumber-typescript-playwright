import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "../setup/world"
import { ElementKey } from "../../env/global"
import { waitFor } from "../../support/wait-for-behavior"
import { getElementLocator } from "../../support/web-element-helper"


const NEW_TAB_TIMEOUT: number = 300;

Then(
    /^the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" (?:tab|window) should( not)? contain the title "(.*)"$/,
    async function (this: ScenarioWorld, tabNumber: ElementKey, negate: boolean, expectedTabTitle: string) {
        const {
            screen : {page, context},
        } = this

        console.log(`the ${tabNumber} tab|window should${negate ? " not" : ""} contain the title ${expectedTabTitle}`)
        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(NEW_TAB_TIMEOUT)

        await waitFor(async () => {
            let pages = context.pages()
            const pageTitle = await pages[pageIndex].title()
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

        console.log(`the ${elementKey} on the ${tabNumber} tab|window should${negate ? " not" : ""} be displayed`)

        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(NEW_TAB_TIMEOUT)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            let pages = context.pages()
            const isElementVisible = await pages[pageIndex].$(elementIdentifier) !== null
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

        console.log(`the ${elementKey} on the ${tabNumber} tab|window should${negate ? " not" : ""} contain the text ${expectedText}`)

        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(NEW_TAB_TIMEOUT)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            let pages = context.pages()
            const elementText = await pages[pageIndex].textContent(elementIdentifier)
            return elementText?.includes(expectedText) === !negate
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

        console.log(`the ${elementKey} on the ${tabNumber} tab|window should${negate ? " not" : ""} equal the text ${expectedText}`)

        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(NEW_TAB_TIMEOUT)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            let pages = context.pages()
            const elementText = await pages[pageIndex].textContent(elementIdentifier)
            return (elementText === expectedText) === !negate
        })
    }
)