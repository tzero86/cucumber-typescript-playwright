import  { Frame, Page } from "playwright"
import { ElementLocator, GlobalConfig, WaitForTarget, WaitForTargetType } from "../env/global";
import { envNumber } from "../env/parseEnv";
import { logger } from "../logger";
import { handleError } from "./error-helper";


export const enum waitForResult {
    PASS = 1,
    FAIL = 2,
    ELEMENT_NOT_AVAILABLE = 3,
}


export type waitForResultWithContext = {
    result: waitForResult,
    replace?: string
}




/**
 * This is a TypeScript function that waits for a certain condition to be met within a specified
 * timeout period and handles errors accordingly.
 * @param predicate - A function that returns a result indicating whether the condition being waited
 * for has been met or not. It can return a value of type `waitForResult`, `Promise<waitForResult>`,
 * `waitForResultWithContext`, or `Promise<waitForResultWithContext>`.
 * @param {GlobalConfig} globalConfig - The global configuration object that contains various settings
 * and configurations for the test suite or application.
 * @param [options] - An optional object containing the following properties:
 * @returns A function that takes in a predicate function, a global configuration object, and optional
 * options object, and returns a Promise that resolves to void.
 */
export const waitFor = async <T>(

    predicate: () => waitForResult | Promise<waitForResult> | waitForResultWithContext | Promise<waitForResultWithContext>,
    globalConfig: GlobalConfig,
    options?: { timeout?: number; wait?: number, target?: WaitForTarget, type?: WaitForTargetType, failureMessage?: string}

): Promise<void> => {

    const { timeout= 20000, wait= 2000, target = '', type = 'element'} = options || {}
    const sleep = (ms: number) => new Promise(resolve => setTimeout(resolve, ms))
    const startDate = new Date()
    let notAvailableContext: string | undefined

    try {
        while (new Date().getTime() - startDate.getTime() < timeout) {
            const result = await predicate()
            let resultAs: waitForResult
            
            if((result as waitForResultWithContext).result) {
                notAvailableContext = (result as waitForResultWithContext).replace
                resultAs = (result as waitForResultWithContext).result
            } else {
                resultAs = result as waitForResult
            }

            if (resultAs === waitForResult.PASS) {
                return
            } else if (resultAs === waitForResult.FAIL) {
                throw new Error(options?.failureMessage || `Test Assertion has failed.`)
            }
    
            await sleep(wait)
            logger.debug(`Waiting for ${wait}ms`)
        }
        throw new Error(`Wait time of ${timeout}ms for ${notAvailableContext || target} has been exceeded.`)
    } catch (error) {
        handleError(globalConfig.errorsConfig, error as Error, target, type)
    }
}




/**
 * This TypeScript function waits for a selector to be visible on a page and returns a boolean
 * indicating whether it was found or not.
 * @param {Page} page - The Playwright Page object on which the selector will be searched.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents a CSS selector, XPath expression, or a function that returns a DOM element. It is used to
 * identify the element on the page that the function should wait for.
 * @returns The function `waitForSelector` returns a Promise that resolves to a boolean value. It
 * returns `true` if the element identified by `elementIdentifier` is found and becomes visible within
 * the specified timeout period, and `false` if the element is not found or does not become visible
 * within the timeout period.
 */
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

/**
 * This function waits for a selector to be visible on a specific page and returns a boolean indicating
 * whether or not it was found.
 * @param {Page} page - The current page being tested.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the selector used to identify the element on the page. It can be a CSS selector, XPath
 * expression, or any other valid selector supported by the page's underlying DOM engine.
 * @param {Page[]} pages - An array of Playwright Page objects.
 * @param {number} pageIndex - The pageIndex parameter is a number that represents the index of the
 * page in the pages array that we want to wait for the selector on.
 * @returns a Promise that resolves to a boolean value. If the specified element is found on the page
 * within the specified timeout, the Promise resolves to true. If the element is not found within the
 * timeout or an error occurs, the Promise resolves to false.
 */
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


/**
 * This TypeScript function waits for a selector to be visible in an iframe and returns a boolean
 * indicating success or failure.
 * @param {Frame} elementIframe - The iframe element in which the selector needs to be located.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is an object that
 * contains information about how to locate the element within the iframe. It could be a CSS selector,
 * an XPath expression, or any other valid method of locating elements in the DOM.
 * @returns A boolean value is being returned. If the selector is found within the specified timeout,
 * the function returns `true`. If the selector is not found within the specified timeout or an error
 * occurs, the function returns `false`.
 */
export const waitForSelectInIframe = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
): Promise<boolean> => {
    try {
        await elementIframe?.waitForSelector(elementIdentifier, { 
            state: 'visible',
            timeout: envNumber('SELECTOR_TIMEOUT'),
        })
        return true
    } catch (error) {
        return false
    }
}