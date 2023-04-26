import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"


Then(
    /^I wait "([^"]*)" seconds$/,
    async function (this: ScenarioWorld, seconds: string) {
        const {
            screen: { page },
        } = this

        console.log(`🕕 I wait ${seconds} seconds`)
        await page.waitForTimeout(parseInt(seconds, 10) * 1000)
    }
)