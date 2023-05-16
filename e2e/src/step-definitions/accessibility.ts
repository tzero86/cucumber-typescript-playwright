import { Then } from '@cucumber/cucumber'
import { getViolations, injectAxe } from 'axe-playwright'
import { ScenarioWorld } from './setup/world'
import { logger } from '../logger'
import { getCurrentPageId } from '../support/navigation-behavior'
import { env } from '../env/parseEnv'
import { createHtmlReport } from 'axe-html-reporter'


Then(
    /^I inject Axe accessibility engine$/,
    async function (this: ScenarioWorld) {
        const {
            screen: { page }
        } = this

        logger.log(`Injecting Axe accessibility engine`)

        await injectAxe(page)
    }
)

Then(
    /^I generate an accessibility analysis report$/,
    async function (this: ScenarioWorld) {
        const {
            screen: { page },
            globalConfig
        } = this

        const pageId = getCurrentPageId(page, globalConfig)
        logger.log(`Generating an accessibility analysis report for page ${pageId}`)

        createHtmlReport({ results: { violations: await getViolations(page)}, 
            options: {
                outputDir: `${env('ACCESSIBILITY_REPORT_PATH')}`,
                reportFileName: `${pageId}_${env('HTML_ACCESSIBILITY_FILE')}.html`,
            }
        
        })
    }
)