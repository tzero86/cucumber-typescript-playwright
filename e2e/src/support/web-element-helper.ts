import { Page } from "playwright"
import  { GlobalConfig, ElementKey, ElementLocator } from "../env/global"
import { getCurrentPageId } from "./navigation-behavior"


/**
 * This TypeScript function returns an element locator based on the current page and element key
 * provided, using a global configuration object.
 * @param {Page} page - The current page object being used in the automation script. It is an
 * instance of the Playwright Page class.
 * @param {ElementKey} elementKey - The `elementKey` parameter is a string that represents the unique
 * identifier for a specific element on a web page. This identifier is used to locate the element using
 * various methods such as CSS selectors, XPath expressions, or other attributes.
 * @param {GlobalConfig} globalConfig - The `globalConfig` parameter is an object that contains
 * configuration settings for the entire test suite. It may include settings such as the base URL for
 * the application being tested, the timeout duration for certain actions, and mappings of page
 * elements to their locators.
 * @returns an `ElementLocator` which is a string that represents the locator strategy and value used
 * to identify a web element on a web page. The locator strategy and value are obtained from the
 * `pageElementMappings` object in the `globalConfig` parameter, using the `currentPage` and
 * `elementKey` parameters as keys. If the `pageElementMappings` object does not contain a
 */
export const getElementLocator = (
    page: Page,
    elementKey: ElementKey,
    globalConfig: GlobalConfig
): ElementLocator => {
    const currentPage = getCurrentPageId(page, globalConfig)
    const {  pageElementMappings } = globalConfig
    return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey]
}