import dotenv from 'dotenv'
import { env, getJsonFromFile } from './env/parseEnv'
import { 
    HostConfig, GlobalConfig, PagesConfig, 
    EmailsConfig, PageElementMappings, MockPayloadMappings,
    ErrorsConfig, MocksConfig } from './env/global'
import * as fs from 'fs'
import { generateCucumberRuntimeTag } from './support/tag-helper'

const environment = env('NODE_ENV')

dotenv.config({ path: env('COMMON_CONFIG_FILE')})
console.log(`🟢 Running On: ${env('ENV_PATH')}${environment}.env`)
dotenv.config({ path: `${env('ENV_PATH')}${environment}.env`})


const hostsConfig: HostConfig = getJsonFromFile(env('HOSTS_URLS_PATH'))
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH'))
const emailsConfig: EmailsConfig = getJsonFromFile(env('EMAILS_URLS_PATH'))
const errorsConfig: ErrorsConfig = getJsonFromFile(env('ERRORS_URLS_PATH'))
const mocksConfig: MocksConfig = getJsonFromFile(env('MOCKS_URLS_PATH'))

const mappingFiles = fs.readdirSync(`${process.cwd()}${env('PAGE_ELEMENTS_PATH')}`)
const payloadFiles = fs.readdirSync(`${process.cwd()}${env('MOCK_PAYLOAD_PATH')}`)

const getEnvList = (): string[] => {
    const envList = Object.keys(hostsConfig)
    if (envList.length === 0) {
        throw Error(`💣 No environments found in ${env('HOSTS_URLS_PATH')}`)
    }
    return envList
}


const pageElementMappings: PageElementMappings = mappingFiles.reduce(
    (pageElementConfigAcc, file) => {
        const key = file.replace('.json', '')
        const elementMappings = getJsonFromFile(`${env('PAGE_ELEMENTS_PATH')}${file}`)
        return {...pageElementConfigAcc, [key]: elementMappings}
}, {})


const mockPayloadMappings: MockPayloadMappings = payloadFiles.reduce(
    (payloadConfigAcc, file) => {
        const key = file.replace('.json', '')
        const payloadMappings = getJsonFromFile(`${env('MOCK_PAYLOAD_PATH')}${file}`)
        return {...payloadConfigAcc, [key]: payloadMappings}
}, {})



const worldParameters: GlobalConfig = {
    hostsConfig,
    pagesConfig,
    errorsConfig,
    emailsConfig,
    mocksConfig,
    pageElementMappings,
    mockPayloadMappings,
}


const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                --world-parameters ${JSON.stringify(worldParameters)} \
                -f json:./reports/report.json \
                --format summary \
                --parallel ${env('PARALLEL')} \
                --retry ${env('RETRY')}`


const dev = generateCucumberRuntimeTag(common, environment, getEnvList(), 'dev' )
const smoke = generateCucumberRuntimeTag(common, environment, getEnvList(), 'smoke' )
const regression = generateCucumberRuntimeTag(common, environment, getEnvList(), 'regression' )
const accessibility = generateCucumberRuntimeTag(common, environment, getEnvList(), 'accessibility' )

export { dev , smoke , regression, accessibility }