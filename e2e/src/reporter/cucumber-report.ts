import reporter,  { Options } from 'cucumber-html-reporter'
import { env } from '../env/parseEnv'
import dotenv from 'dotenv'

dotenv.config({path: env('COMMON_CONFIG_FILE')})


const options: Options = {
    theme: 'bootstrap',
    jsonFile: env('JSON_REPORT_FILE'),
    output: env('HTML_REPORT_FILE'),
    screenshotsDirectory: env('SCREENSHOT_PATH'),
    brandTitle: '📆' + new Date().toLocaleDateString('en-US'),
    storeScreenshots: true,
    reportSuiteAsScenarios: true,
    launchReport: false,
    columnLayout: 1,
    name: `E2E Test Report`,

}

reporter.generate(options)