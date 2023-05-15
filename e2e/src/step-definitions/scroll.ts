import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { waitFor, waitForResult, waitForSelector } from "../support/wait-for-behavior"
import { ElementKey } from "../env/global"
import { scrollElementIntoView } from "../support/html-behavior"
import { getElementLocator } from "../support/web-element-helper"
import { logger } from "../logger"

Then(
    /^I scroll to the "([^"]*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        } = this

        logger.log(`I scroll to the ${elementKey}`);
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        await waitFor(async () => {
            const elementStable = await waitForSelector( page, elementIdentifier)
            if (elementStable) {
                await scrollElementIntoView(page, elementIdentifier)
                return waitForResult.PASS
            }
            return waitForResult.ELEMENT_NOT_AVAILABLE
        },
        globalConfig,
        { target: elementKey});
    }
);
