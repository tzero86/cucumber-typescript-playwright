import { Page } from "playwright"
import { GlobalConfig, PageId } from "../env/global"


export const navigateToPage = async (
    page: Page,
    pageId: PageId,
    { pagesConfig, hostsConfig }: GlobalConfig

): Promise <void> => {
    const {
        UI_AUTOMATION_HOST: hostName = 'localhost',
    } = process.env

    const hostPath = hostsConfig[`${hostName}`]
    const url = new URL(hostPath)
    const pagesConfigItem = pagesConfig[pageId]
    url.pathname = pagesConfigItem.route
    await page.goto(url.href)
}
    

const pathMatchesPageId = (
    path: string,
    pageId: PageId,
    { pagesConfig }: GlobalConfig
): boolean => {
    const pageRegexString = pagesConfig[pageId].regex
    const pageRegex = new RegExp(pageRegexString)
    return pageRegex.test(path)
}


export const currentPageMatchesPageId = (
    page: Page,
    pageId: PageId,
    globalConfig: GlobalConfig
): boolean => {
    const { pathname: currentPath} = new URL(page.url())
    console.log('currentPath: ', currentPath)
    return pathMatchesPageId(currentPath, pageId, globalConfig)
}


export const getCurrentPageId = (
    page: Page,
    globalConfig: GlobalConfig
): PageId => {
    const { pagesConfig } = globalConfig
    console.log('pagesConfig: ', pagesConfig)
    const pageConfigPageIds = Object.keys(pagesConfig)
    console.log('pageConfigPageIds: ', pageConfigPageIds)
    const { pathname: currentPath} = new URL(page.url()) 

    const currentPageId = pageConfigPageIds.find(pageId => 
        pathMatchesPageId(currentPath, pageId, globalConfig)
    )

    console.log('currentPageId: ', currentPageId)
        
    if (!currentPageId) {
        throw new Error(`Failed to get page name from current route: ${currentPath}, \
            possible pages: ${JSON.stringify((pagesConfig))} `)
    }
    return currentPageId
}