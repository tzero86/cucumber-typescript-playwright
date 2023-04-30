import { DataTable, Then } from '@cucumber/cucumber'
import { ElementKey } from '../../env/global'
import { getElementLocator } from '../../support/web-element-helper'
import { ScenarioWorld } from '../setup/world'
import { waitFor } from '../../support/wait-for-behavior'
import * as deepDiff from 'deep-diff'


Then(
    /^the "([^"]*)" table should( not)? equal the following:$/,
    async function(this: ScenarioWorld, elementKey: ElementKey, negate: boolean, dataTable: DataTable) {
        const {
            screen: { page },
            globalConfig
        } = this

        console.log(`The ${elementKey} table should ${negate ? 'not ': ''}equal the following: ${dataTable}`)
        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const dataBefore = await page.$$eval(elementIdentifier+" tbody tr", (rows) => {
            return rows.map((row) => {
                const cells = row.querySelectorAll('td')
                return Array.from(cells).map(cell => cell.textContent)
            })
        })
        console.log('dataBefore: ', JSON.stringify(dataBefore))
        console.log('dataTable: ', JSON.stringify(dataTable.raw()))

        await waitFor(async () => {
            return JSON.stringify(dataBefore) === JSON.stringify(dataTable.raw()) === !negate
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

        
        console.log(`The headers of the ${elementKey} table should ${negate ? 'not ': ''}equal the following: ${dataTable}`)

        const elementIdentifier = getElementLocator(page, elementKey, globalConfig)
        const headersBefore = await page.$$eval(elementIdentifier+" thead", (headers) => {
            return headers.map((header) => {
                const headers = header.querySelectorAll('th')
                return Array.from(headers).map(header => header.textContent?.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').trim().normalize('NFC'))

            })
        })
        
        const normalizedDataTable = dataTable.raw()
        console.log('headersBefore: ', JSON.stringify(headersBefore))
        console.log('normalizedDataTable: ', JSON.stringify(normalizedDataTable))
        const differences = deepDiff.diff(headersBefore, normalizedDataTable);
        console.log('Differences: ', differences);

        await waitFor(async () => {
           return JSON.stringify(headersBefore) == JSON.stringify(normalizedDataTable) === !negate
        })
        
        
        
    }
)

