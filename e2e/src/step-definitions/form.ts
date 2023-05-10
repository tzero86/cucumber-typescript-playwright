import { Then } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { inputValue, selectValue } from "../support/html-behavior"
import { waitFor, waitForSelector } from "../support/wait-for-behavior"
import { getElementLocator } from "../support/web-element-helper"
import { ElementKey } from "../env/global"
import { parseInput } from "../support/input-helper"
import { logger } from "../logger"


Then(
    /^I fill in the "([^"]*)" input with "([^"]*)"$/,
    async function (this: ScenarioWorld, elementKey: ElementKey, input: string) {
        const {
            screen: { page },
            globalConfig,
        } = this

        logger.log(`I fill in the ${elementKey} input with ${input}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)
            if (elementStable) {
                const parsedInput = parseInput(input, globalConfig)
                await inputValue(page, elementIdentifier, parsedInput  )
            }
            return elementStable
        })

    }
)


Then(
    /^I select the "([^"]*)" option from the "([^"]*)"$/,
    async function (this: ScenarioWorld, option: string, elementKey: ElementKey) {
        const {
            screen: { page },
            globalConfig,
        }= this

        logger.log(`I select the ${option} option from the ${elementKey} dropdown`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)

            if (elementStable) {
                await selectValue(page, elementIdentifier, option)
            }
            return elementStable
        })
    }
)