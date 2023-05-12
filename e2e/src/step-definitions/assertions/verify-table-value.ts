import { DataTable, Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { waitFor, waitForResult, waitForSelector } from '../../support/wait-for-behavior'
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
                logger.debug('dataBefore: ', tableData)
                logger.debug('dataTable: ', JSON.stringify(dataTable.raw()))
                if (tableData === JSON.stringify(dataTable.raw()) === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }
            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        },
        globalConfig,
        { 
            target: elementKey,
            failureMessage: `💣 Expected ${elementKey} table to ${negate ? 'not ': ''}equal the following: ${dataTable.raw()}`
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
                logger.debug('headersBefore: ', tableHeaders)
                logger.debug('normalizedDataTable: ', normalizedDataTable)
                const differences = deepDiff.diff(tableHeaders, normalizedDataTable);
                logger.debug(`Differences: ${differences === undefined  ? 'No Differences Found' : differences }`);
                if (tableHeaders == normalizedDataTable === !negate) {
                    return waitForResult.PASS
                } else {
                    return waitForResult.FAIL
                }

            } else {
                return waitForResult.ELEMENT_NOT_AVAILABLE
            }
        },
        globalConfig,
        { 
            target: elementKey,
            failureMessage: `💣 Expected the headers of ${elementKey} table to ${negate ? 'not ': ''}equal the following: ${dataTable}`
        })
    }
)

