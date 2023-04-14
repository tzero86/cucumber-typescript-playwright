import { BeforeAll, Before, After, AfterAll } from '@cucumber/cucumber';

const { chromium } = require('playwright')


BeforeAll(async () => {
    global.browser = await chromium.launch({ 
        headless: true 
    })
})

AfterAll(async () => {
    await global.browser.close()
})


Before(async (scenario) => {
    global.context = await global.browser.newContext({
        recordVideo: {
            dir: `./reports/videos/${scenario.pickle.name}`,
        }
    })
    global.page = await global.context.newPage()
    await global.page.waitForLoadState()
})


After(async (scenario) => {
    const scenarioStatus = scenario.result?.status
    if (scenarioStatus === 'FAILED') {
        await global.page.screenshot({
            path: `./reports/screenshots/${scenario.pickle.name}.png`
        })
    }

    await global.page.close()
    await global.context.close()
})