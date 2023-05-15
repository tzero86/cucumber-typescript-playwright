export type PageId = string
export type PagesConfig = Record<PageId, Record<string, string>>
export type HostConfig = Record<string, string>
export type ElementKey = string
export type ElementLocator = string
export type WaitForTargetType = string
export type WaitForTarget = PageId | ElementKey
export type MockConfigKey = string
export type MockServerKey = string
export type MockPayloadKey = string
export type PageElementMappings = Record<PageId, Record<ElementKey, ElementLocator>>
export type MockPayloadMappings = Record<string, string>
export type EmailsConfig = Record<string, string>
export type ErrorsConfig = ErrorConfig[]
export type MocksConfig = Record<string, string>
export type GlobalVariables = { [key: string]: string}

export type ErrorConfig = {
    originalErrorMsgRegexString: string,
    parsedErrorMsg: string
}

export type GlobalConfig = {
    hostsConfig: HostConfig
    pagesConfig: PagesConfig
    mocksConfig: MocksConfig
    pageElementMappings: PageElementMappings
    mockPayloadMappings: MockPayloadMappings
    errorsConfig: ErrorsConfig
    emailsConfig: EmailsConfig
}

