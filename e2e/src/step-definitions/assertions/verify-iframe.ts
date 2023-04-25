import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "../setup/world"
import { ElementKey } from "../../env/global"
import { getElementLocator } from "../../support/web-element-helper"
import { getIframeElement } from "../../support/html-behavior"
import { waitFor } from "../../support/wait-for-behavior"



Then(
    /^the "([^"]*)" on the "([^"]*)" iframe should( not)? be displayed$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, iframeKey: ElementKey, negate: boolean) {
        const {
            screen: { page },
            globalConfig,
        } = this
        console.log(`the ${elementKey} on the ${iframeKey} iframe should${negate ? " not" : ""} be displayed`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const iframeIdentifier = getElementLocator(page, iframeKey, globalConfig)
        const elementIFrame = await getIframeElement(page, iframeIdentifier)

        await waitFor(async () => {
            const isElementVisible = (await elementIFrame?.$(elementIdentifier)) !== null
            return isElementVisible !== negate
        })
    }
)