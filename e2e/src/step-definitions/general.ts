import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { logger } from "../logger"


Then(
    /^I wait "([^"]*)" seconds$/,
    async function (this: ScenarioWorld, seconds: string) {
        const {
            screen: { page },
        } = this

        logger.log(`🕕 I wait ${seconds} seconds`)
        await page.waitForTimeout(parseInt(seconds, 10) * 1000)
    }
)