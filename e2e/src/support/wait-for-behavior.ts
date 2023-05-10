import  { Page } from "playwright"
import { ElementLocator } from "../env/global";
import { envNumber } from "../env/parseEnv";
import { logger } from "../logger";

export const waitFor = async <T>(

    predicate: () => T | Promise<T>,
    options?: { timeout?: number; wait?: number}

): Promise<T> => {

    const { timeout= 20000, wait= 2000} = options || {}
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const startDate = new Date()

    while (new Date().getTime() - startDate.getTime() < timeout) {
        const result = await predicate()

        if (result) { return result }

        await sleep(wait)
        logger.log(`Waiting for ${wait}ms`)
    }

    throw new Error(`Timeout after ${timeout}ms`)
}


export const waitForSelector = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<boolean> => {
    try {
        await page.waitForSelector(elementIdentifier, {
            state: 'visible',
            timeout: envNumber('SELECTOR_TIMEOUT'),
        })
        return true
    } catch (error) {
        return false
    }
}

export const waitForSelectorOnPage = async (
    page: Page,
    elementIdentifier: ElementLocator,
    pages: Page[],
    pageIndex: number,
): Promise<boolean> => {
    try{
        await pages[pageIndex].waitForSelector(elementIdentifier, {
            state: 'visible',
            timeout: envNumber('SELECTOR_TIMEOUT'),
        })
        return true
    } catch (error) {
        return false
    }
}