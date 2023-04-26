import { Frame, Page } from "@playwright/test"
import { ElementLocator } from "../env/global"


/**
 * This TypeScript function clicks on a specified element on a web page.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the page's content.
 * @param {ElementLocator} elementIdentifier - The `elementIdentifier` parameter is a string that
 * represents a CSS selector, XPath expression, or a unique identifier for an HTML element on a web
 * page. It is used to locate the element that needs to be clicked.
 */
export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.click(elementIdentifier)
}


/**
 * This TypeScript function fills an input field on a web page with a given value.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the web page loaded in that tab or window.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents a CSS selector or an XPath expression used to locate a specific element on a web page. It
 * is used by the function to focus on the element and fill it with the provided input.
 * @param {string} input - The input parameter is a string that represents the text that needs to be
 * entered into the specified element on the web page.
 */
export const inputValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    input: string
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.fill(elementIdentifier, input)
}


/**
 * This TypeScript function selects a specified option from a dropdown menu on a web page.
 * @param {Page} page - The Playwright Page object that represents the current page being automated.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the HTML element on the page. It is
 * used to identify the element on which the selectValue function will be performed.
 * @param {string} option - The value of the option that needs to be selected from the dropdown list.
 */
export const selectValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.selectOption(elementIdentifier, option)
}

/**
 * This TypeScript function checks a specified element on a web page.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the page's content.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the element on the web page. It is
 * used by the function to focus on the element and check it.
 */
export const checkElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.check(elementIdentifier)
}


/**
 * This TypeScript function focuses on an element and unchecks it.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the web page loaded in that tab or window.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the HTML element on the web page. It
 * is used by the Playwright library to interact with the element.
 */
export const uncheckElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.uncheck(elementIdentifier)
}



/**
 * This TypeScript function retrieves the value of a specified HTML select element on a given page.
 * @param {Page} page - The page parameter is of type Page, which is likely a reference to a Playwright
 * Page object. This object represents a single tab or window in a browser and provides methods for
 * interacting with the page's content and functionality.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a string that
 * can be used to locate an element on a web page. It can be a CSS selector, an XPath expression, or
 * any other valid method of locating an element. In this case, it is used to locate an
 * HTMLSelectElement on the page.
 * @returns The `getValue` function returns a Promise that resolves to a string or null value. The
 * string value is the `value` property of the HTMLSelectElement identified by the `elementIdentifier`
 * parameter. If the element is not found, the function returns null.
 */
export const getValue = async (
    page: Page,
    elementIdentifier: ElementLocator   
): Promise<string | null> => {
    
    const value = await page.$eval<string, HTMLSelectElement>(elementIdentifier, el => {
        return el.value
    })
    return value
}


/**
 * This TypeScript function returns the content frame of an iframe element identified by a given
 * selector on a web page.
 * @param {Page} page - The Playwright Page object representing the current web page.
 * @param {ElementLocator} iframeIdentifier - The identifier used to locate the iframe element on the
 * page. It could be a CSS selector, XPath expression, or any other valid method of locating elements
 * on a web page.
 * @returns a Promise that resolves to either a Frame object, undefined, or null.
 */
export const getIframeElement = async (
    page: Page,
    iframeIdentifier: ElementLocator,
): Promise<Frame | undefined | null> => {
    await page.waitForSelector(iframeIdentifier)
    const elementHandle = await page.$(iframeIdentifier)
    const elementIframe = await elementHandle?.contentFrame()
    return elementIframe
}


/**
 * This TypeScript function inputs a given value into a specified element within an iframe.
 * @param {Frame} elementIframe - This is a variable representing an iframe element on a webpage.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a way to locate
 * an element on a web page. It could be a CSS selector, an XPath expression, or any other method of
 * identifying an element. The elementIdentifier parameter in this function is the specific identifier
 * used to locate the element within the iframe.
 * @param {string} inputValue - The value that will be inputted into the specified element on the
 * iframe.
 */
export const inputValueOnIframe = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
    inputValue: string
): Promise<void> => {
    await elementIframe.fill(elementIdentifier, inputValue)
}


/**
 * This TypeScript function fills an input element on a specific page with a given value.
 * @param pages - an array of Page objects representing the pages in the application
 * @param {number} pageIndex - The index of the page in the `pages` array where the element to be
 * filled with `inputValue` is located. The index starts from 0.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a way to locate
 * an element on a web page. It can be a CSS selector, an XPath expression, or a combination of tag
 * name and attribute values. The elementIdentifier parameter in the inputValueOnPage function is the
 * specific ElementLocator that identifies the element on the
 * @param {string} inputValue - The value that needs to be inputted into the specified element on the
 * page.
 */
export const inputValueOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator,
    inputValue: string
): Promise <void> => {
    await pages[pageIndex].focus(elementIdentifier)
    await pages[pageIndex].fill(elementIdentifier, inputValue)
}