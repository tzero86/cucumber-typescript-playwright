import { DataTable, Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { waitFor, waitForSelector } from '../../support/wait-for-behavior'
import * as deepDiff from 'deep-diff'
import { logger } from '../../logger'
import { getTableData, getTableHeaders } from '../../support/html-behavior'


Then(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
        const {
            screen: { page },
            globalConfig
        } = this

        logger.log(`The ${elementKey} table should ${negate ? 'not ': ''}equal the following: ${dataTable}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)

            if (elementStable) {
                const tableData = await getTableData(page, elementIdentifier)
                logger.log('dataBefore: ', tableData)
                logger.log('dataTable: ', JSON.stringify(dataTable.raw()))
                return tableData === JSON.stringify(dataTable.raw()) === !negate
            } else {
                return elementStable
            }
        })

    }
)

Then(
    /^the headers of the "([^"]*)" table should( not)? equal the following:$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
        const {
            screen: { page },
            globalConfig
        } = this

        
        logger.log(`The headers of the ${elementKey} table should ${negate ? 'not ': ''}equal the following: ${dataTable}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)

        await waitFor(async () => {
            const elementStable = await waitForSelector(page, elementIdentifier)

            if (elementStable) {
                const normalizedDataTable = JSON.stringify(dataTable.raw())
                const tableHeaders = await getTableHeaders(page, elementIdentifier)
                logger.log('headersBefore: ', tableHeaders)
                logger.log('normalizedDataTable: ', normalizedDataTable)
                const differences = deepDiff.diff(tableHeaders, normalizedDataTable);
                logger.log(`Differences: ${differences === undefined  ? 'No Differences Found' : differences }`);
                return tableHeaders == normalizedDataTable === !negate

            } else {
                return elementStable
            }
        })
    }
)

