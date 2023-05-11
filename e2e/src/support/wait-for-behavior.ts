import  { Frame, Page } from "playwright"
import { ElementLocator } from "../env/global";
import { envNumber } from "../env/parseEnv";
import { logger } from "../logger";

/**
 * The function `waitFor` waits for a given predicate to return a truthy value within a specified
 * timeout period.
 * @param predicate - A function that returns a value or a promise that resolves to a value. This value
 * is what the function waits for before resolving.
 * @param [options] - An optional object that can contain two properties:
 * @returns The function `waitFor` returns a Promise that resolves to the value returned by the
 * `predicate` function. If the `predicate` function does not return a truthy value within the
 * specified `timeout` period, the function throws an error with a message indicating that the timeout
 * has occurred.
 */
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