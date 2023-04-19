import dotenv from 'dotenv'
import { env, getJsonFromFile } from './env/parseEnv'
import { HostConfig, GlobalConfig, PagesConfig } from './env/global'


dotenv.config({path: env('COMMON_CONFIG_FILE')})

const hostsConfig: HostConfig = getJsonFromFile(env('HOSTS_URLS_PATH'))
console.log(`hostsConfig: ${JSON.stringify(hostsConfig)}`)
const pagesConfig: PagesConfig = getJsonFromFile(env('PAGE_URLS_PATH'))
console.log(`pagesConfig: ${JSON.stringify(pagesConfig)}`)

const worldParameters: GlobalConfig = {
    hostsConfig,
    pagesConfig,
}


const common = `./src/features/**/*.feature \
                --require-module ts-node/register \
                --require ./src/step-definitions/**/**/*.ts \
                --world-parameters '${JSON.stringify(worldParameters)}' \
                -f json:./reports/report.json \
                --format progress-bar`


const dev = `${common} --tags '@dev'`
const smoke = `${common} --tags '@smoke'`
const regression = `${common} --tags '@regression'`

export { dev , smoke , regression }