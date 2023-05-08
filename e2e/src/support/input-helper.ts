import { GlobalConfig } from "../env/global"

const isLookupVariable = (input: string, lookupTrigger: string): boolean => {
    return !!(lookupTrigger && input.startsWith(lookupTrigger))
}

const getLookupVariable = (input: string, lookupTrigger: string, globalConfig: GlobalConfig): string => {
    const key = input.substring(lookupTrigger.length)
    const lookupValue = globalConfig.emailsConfig[key] ?? process.env[key]

    if (!lookupValue) {
        throw new Error(`Unable to get ${input} lookup trigger.`)
    }
    return lookupValue
}



export const parseInput = (input: string, globalConfig: GlobalConfig): string => {
    const lookupTrigger = process.env.VAR_LOOKUP_TRIGGER ?? "$."
    return isLookupVariable(input, lookupTrigger) ? getLookupVariable(input, lookupTrigger, globalConfig) : input
}

