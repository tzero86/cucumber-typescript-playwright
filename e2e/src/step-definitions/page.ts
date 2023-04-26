import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { waitFor } from "../support/wait-for-behavior"
import { getElementLocator } from "../support/web-element-helper"
import { ElementKey } from "../env/global"
import { inputValueOnPage } from "../support/html-behavior"

Then(
    /^I fill in the "([^"]*)" input on the "([0-9]+th|[0-9]+st|[0-9]+nd|[0-9]+rd)" tab with "([^"]*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, tabNumber: ElementKey, inputValue: string) {
        const {
            screen: { page, context },
            globalConfig
        } = this

        console.log(`I fill in the ${elementKey} input on the ${tabNumber} tab with ${inputValue}`)

        const pageIndex = Number(tabNumber.match(/\d/g)?.join("")) - 1
        await page.waitForTimeout(1000)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        await waitFor(async () => {
            let pages = context.pages()
            const result = await pages[pageIndex].waitForSelector(elementIdentifier, { "state": "visible" })
            if (result) {
                await inputValueOnPage(pages, pageIndex, elementIdentifier, inputValue)
            }
            return result
        })
    }
)
