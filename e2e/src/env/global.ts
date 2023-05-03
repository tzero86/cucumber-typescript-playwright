export type PageId = string
export type PagesConfig = Record<PageId, Record<string, string>>
export type HostConfig = Record<string, string>
export type ElementKey = string
export type ElementLocator = string
export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>
export type GlobalConfig = {
    hostsConfig: HostConfig
    pagesConfig: PagesConfig
    pageElementMappings: PageElementMappings
}
export type GlobalVariables = { [key: string]: string}