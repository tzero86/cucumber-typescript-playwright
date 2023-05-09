export const generateCucumberRuntimeTag = (
    commonConfig: string,
    runtimeEnv: string,
    availableEnvsList: string[],
    runtimeTag: string
): string => {
    const tagExpression = availableEnvsList
        .filter(e => e !== runtimeEnv)
        .map(e => `(@${runtimeTag} and not @${e})`)
        .join(' and ')

    return `${commonConfig} --tags '${tagExpression}'`
}