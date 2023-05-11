export type PageId = string
export type PagesConfig = Record<PageId, Record<string, string>>
export type HostConfig = Record<string, string>
export type ElementKey = string
export type ElementLocator = string
export type WaitForTargetType = string
export type WaitForTarget = PageId | ElementKey
export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>
export type EmailsConfig = Record<string, string>
export type ErrorsConfig = ErrorConfig[];
export type GlobalVariables = { [key: string]: string}

export type ErrorConfig = {
    originalErrorMsgRegexString: string,
    parsedErrorMsg: string
}

export type GlobalConfig = {
    hostsConfig: HostConfig
    pagesConfig: PagesConfig
    pageElementMappings: PageElementMappings
    errorsConfig: ErrorsConfig
    emailsConfig: EmailsConfig
}

