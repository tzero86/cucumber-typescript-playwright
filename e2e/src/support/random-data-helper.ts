import { faker } from '@faker-js/faker';

export const randomInputTypes = ['email', 'password'] as const
export type RandomInputType = typeof randomInputTypes[number]



export const randomEmail = (): string => {
    return faker.internet.exampleEmail()
}

export const randomPassword = (): string => {
    return faker.internet.password()
}


export const getRandomData = (randomInputType: RandomInputType): string => {
    switch(randomInputType) {
        case 'email':
            return randomEmail()
        case 'password':
            return randomPassword()
        default:
            throw new Error(`💣 Invalid Random Input Type: ${randomInputType}. It needs to be one of ${randomInputTypes.join(', ')}`)
    }
}