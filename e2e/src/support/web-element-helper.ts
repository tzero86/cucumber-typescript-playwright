import { Page } from "playwright"
import  { GlobalConfig, ElementKey, ElementLocator } from "../env/global"
import { getCurrentPageId } from "./navigation-behavior"


export const getElementLocator = (
    page: Page,
    elementKey: ElementKey,
    globalConfig: GlobalConfig
): ElementLocator => {
    const currentPage = getCurrentPageId(page, globalConfig)
    const {  pageElementMappings } = globalConfig
    return pageElementMappings[currentPage]?.[elementKey] || pageElementMappings.common?.[elementKey]
}