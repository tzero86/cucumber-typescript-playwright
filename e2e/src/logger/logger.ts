import { env } from "../env/parseEnv"
import { stringIsOfOptions } from "../support/options-helper"

const DEBUG = 'debug'
const LOG = 'log'
const ERROR = 'error'
const OFF = 'off'


const LOG_LEVELS = [DEBUG, LOG, ERROR, OFF] as const

export type LogLevel = typeof LOG_LEVELS[number]

type LogFunction = (...msg: any[]) => void

type Logger = {
    debug: LogFunction
    log: LogFunction
    error: LogFunction
}

const logFuncAtLevels = 
(logLevels: LogLevel[], logFunction: Logger = console) =>
    (logLevel: LogLevel, ...msg: any[]) => {
        if(logLevel !== OFF && logLevels.indexOf(logLevel) !== -1 && msg.length > 0) {
            logFunction[logLevel](...msg)
        }
    }

const getLogLevel = (logLevel: LogLevel): LogLevel[] => {
    const dynamicLogLevelIndex = LOG_LEVELS.indexOf(logLevel)
    return LOG_LEVELS.slice(dynamicLogLevelIndex)
}

const createLogger = (logLevel: LogLevel): Logger => {
    const activeLogLevels = getLogLevel(logLevel)
    const logger = logFuncAtLevels(activeLogLevels)

    return LOG_LEVELS.reduce(
        (accumulator: Record<string, LogFunction>, level: LogLevel) => ({
            ...accumulator,
            [level]: (...msg: any[]) => logger(level, ...msg),
        }), {}
    ) as Logger
}


let loggerSingleton: Logger | null = null

export const getLogger = (): Logger => {
    if(!loggerSingleton) {
        const logLevel = env('LOG_LEVEL')
        const validLogLevel = stringIsOfOptions<LogLevel>(logLevel, LOG_LEVELS)
        loggerSingleton = createLogger(validLogLevel)
    }
    return loggerSingleton
}