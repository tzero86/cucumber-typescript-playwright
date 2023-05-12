import { ErrorsConfig, WaitForTarget, WaitForTargetType } from "../env/global"
import { logger } from "../logger"


export const getErrorSummary = (errDetail: string): string => {
    return errDetail.split('\n')[0]
}


export const parseErrorMessage = (
    errList: ErrorsConfig,
    errorSummary: string,
    targetName: string,
    targetType: string
): string => {
    const targetErrorIndex = errList
        .map(err => RegExp(err.originalErrorMsgRegexString))
        .findIndex(errRegex => errRegex.test(errorSummary),)
    return targetErrorIndex > -1
        ? errList[targetErrorIndex].parsedErrorMsg.replace(/{}/g, targetName).replace(/<>/g, targetType)
        : errorSummary
}


export const handleError = (
    errList: ErrorsConfig,
    err: Error,
    target?: WaitForTarget,
    type?: WaitForTargetType
): void => {
    const errorDetail = err?.message ?? ''
    const errorSummary = getErrorSummary(errorDetail)
    const targetName = target ?? ''
    const targetType = type ?? ''

    if (!errList || !errorSummary) {
        logger.error(errorDetail)
        throw new Error(errorDetail)
    }

    const parsedErrorMessage = parseErrorMessage(errList, errorSummary, targetName, targetType)
    
    logger.error(parsedErrorMessage)
    throw new Error(parsedErrorMessage)
}