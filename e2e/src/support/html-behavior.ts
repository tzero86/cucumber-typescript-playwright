import { Page } from "@playwright/test"
import { ElementLocator } from "../env/global"


export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.click(elementIdentifier)
}


export const inputValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    input: string
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.fill(elementIdentifier, input)
}


export const selectValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.selectOption(elementIdentifier, option)
}

export const checkElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.focus(elementIdentifier)
    await page.check(elementIdentifier)
}


export const getValue = async (
    page: Page,
    elementIdentifier: ElementLocator   
): Promise<string | null> => {
    
    const value = await page.$eval<string, HTMLSelectElement>(elementIdentifier, el => {
        return el.value
    })
    return value
}
