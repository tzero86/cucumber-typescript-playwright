import { Page } from "playwright"
import  { GlobalConfig, ElementKey, ElementLocator } from "../env/global"
import { getCurrentPageId } from "./navigation-behavior"



/**
 * This TypeScript function retrieves an element locator based on a given page, element key, and global
 * configuration.
 * @param {Page} page - The current page object being used in the automation script.
 * @param {ElementKey} elementKey - The key or identifier for the element that needs to be located on
 * the page.
 * @param {GlobalConfig} globalConfig - The `globalConfig` parameter is an object that contains global
 * configuration settings for the automation framework. It may include things like page element
 * mappings, test data, and other settings that are used across multiple tests or pages.
 * @returns an `ElementLocator` which is a string that represents the identifier for a specific element
 * on a web page. The `getElementLocator` function takes in a `Page` object, an `ElementKey` string,
 * and a `GlobalConfig` object as parameters. It then uses the `pageElementMappings` property from the
 * `GlobalConfig` object to find the identifier for the
 */
export const getElementLocator = (
    page: Page,
    elementKey: ElementKey,
    globalConfig: GlobalConfig
): ElementLocator => {
    const {  pageElementMappings } = globalConfig
    const currentPage = getCurrentPageId(page, globalConfig)
    const elementIdentifier = pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey]
    if(!elementIdentifier) {
        throw Error(`💣 Unable to Find the ${elementKey} mapping on the ${currentPage} page.`)
    }
    return elementIdentifier
}