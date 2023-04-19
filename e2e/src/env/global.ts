export type PageId = string
export type PagesConfig = Record<PageId, Record<string, string>>
export type HostConfig = Record<string, string>
export type GlobalConfig = {
    hostsConfig: HostConfig
    pagesConfig: PagesConfig
}