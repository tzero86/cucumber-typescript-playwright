import { Frame, Page } from "@playwright/test";
import { ElementLocator } from "../env/global";
import { ElementHandle } from "playwright";

/**
 * This TypeScript function clicks on a specified element on a web page.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the page's content.
 * @param {ElementLocator} elementIdentifier - The `elementIdentifier` parameter is a string that
 * represents a CSS selector, XPath expression, or a unique identifier for an HTML element on a web
 * page. It is used to locate the element that needs to be clicked.
 */
export const clickElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.click(elementIdentifier);
};

/**
 * This TypeScript function fills an input field on a web page with a given value.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the web page loaded in that tab or window.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents a CSS selector or an XPath expression used to locate a specific element on a web page. It
 * is used by the function to focus on the element and fill it with the provided input.
 * @param {string} input - The input parameter is a string that represents the text that needs to be
 * entered into the specified element on the web page.
 */
export const inputValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    input: string
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.fill(elementIdentifier, input);
};

/**
 * This TypeScript function selects a specified option from a dropdown menu on a web page.
 * @param {Page} page - The Playwright Page object that represents the current page being automated.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the HTML element on the page. It is
 * used to identify the element on which the selectValue function will be performed.
 * @param {string} option - The value of the option that needs to be selected from the dropdown list.
 */
export const selectValue = async (
    page: Page,
    elementIdentifier: ElementLocator,
    option: string
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.selectOption(elementIdentifier, option);
};

/**
 * This TypeScript function checks a specified element on a web page.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the page's content.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the element on the web page. It is
 * used by the function to focus on the element and check it.
 */
export const checkElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.check(elementIdentifier);
};

/**
 * This TypeScript function focuses on an element and unchecks it.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the web page loaded in that tab or window.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the HTML element on the web page. It
 * is used by the Playwright library to interact with the element.
 */
export const uncheckElement = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    await page.focus(elementIdentifier);
    await page.uncheck(elementIdentifier);
};

/**
 * This TypeScript function retrieves the value of a specified HTML select element on a given page.
 * @param {Page} page - The page parameter is of type Page, which is likely a reference to a Playwright
 * Page object. This object represents a single tab or window in a browser and provides methods for
 * interacting with the page's content and functionality.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a string that
 * can be used to locate an element on a web page. It can be a CSS selector, an XPath expression, or
 * any other valid method of locating an element. In this case, it is used to locate an
 * HTMLSelectElement on the page.
 * @returns The `getValue` function returns a Promise that resolves to a string or null value. The
 * string value is the `value` property of the HTMLSelectElement identified by the `elementIdentifier`
 * parameter. If the element is not found, the function returns null.
 */
export const getValue = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<string | null> => {
    await page.waitForSelector(elementIdentifier);
    const value = await page.$eval<string, HTMLSelectElement>(
        elementIdentifier,
        (el) => {
            return el.value;
        }
    );
    return value;
};

/**
 * This TypeScript function returns the content frame of an iframe element identified by a given
 * selector on a web page.
 * @param {Page} page - The Playwright Page object representing the current web page.
 * @param {ElementLocator} iframeIdentifier - The identifier used to locate the iframe element on the
 * page. It could be a CSS selector, XPath expression, or any other valid method of locating elements
 * on a web page.
 * @returns a Promise that resolves to either a Frame object, undefined, or null.
 */
export const getIframeElement = async (
    page: Page,
    iframeIdentifier: ElementLocator
): Promise<Frame | undefined | null> => {
    await page.waitForSelector(iframeIdentifier);
    const elementHandle = await page.$(iframeIdentifier);
    const elementIframe = await elementHandle?.contentFrame();
    return elementIframe;
};

/**
 * This TypeScript function inputs a given value into a specified element within an iframe.
 * @param {Frame} elementIframe - This is a variable representing an iframe element on a webpage.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a way to locate
 * an element on a web page. It could be a CSS selector, an XPath expression, or any other method of
 * identifying an element. The elementIdentifier parameter in this function is the specific identifier
 * used to locate the element within the iframe.
 * @param {string} inputValue - The value that will be inputted into the specified element on the
 * iframe.
 */
export const inputValueOnIframe = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
    inputValue: string
): Promise<void> => {
    await elementIframe.fill(elementIdentifier, inputValue);
};

/**
 * This TypeScript function fills an input element on a specific page with a given value.
 * @param pages - an array of Page objects representing the pages in the application
 * @param {number} pageIndex - The index of the page in the `pages` array where the element to be
 * filled with `inputValue` is located. The index starts from 0.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a way to locate
 * an element on a web page. It can be a CSS selector, an XPath expression, or a combination of tag
 * name and attribute values. The elementIdentifier parameter in the inputValueOnPage function is the
 * specific ElementLocator that identifies the element on the
 * @param {string} inputValue - The value that needs to be inputted into the specified element on the
 * page.
 */
export const inputValueOnPage = async (
    pages: Array<Page>,
    pageIndex: number,
    elementIdentifier: ElementLocator,
    inputValue: string
): Promise<void> => {
    await pages[pageIndex].focus(elementIdentifier);
    await pages[pageIndex].fill(elementIdentifier, inputValue);
};

/**
 * This TypeScript function clicks on a specific element at a given position on a web page.
 * @param {Page} page - The page object represents the current web page that is being automated.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the element on the web page.
 * @param {number} elementPosition - The elementPosition parameter is a number that represents the
 * position of the element to be clicked within a list of elements that match the given
 * elementIdentifier. For example, if there are 5 elements that match the identifier and
 * elementPosition is set to 3, then the function will click on the third element
 */
export const clickElementAtIndex = async (
    page: Page,
    elementIdentifier: ElementLocator,
    elementPosition: number
): Promise<void> => {
    const elements = await page.$$(elementIdentifier);
    if (elementPosition >= elements.length) {
        throw new Error(
            `Element index ${elementPosition} is out of range, you are trying to click a non-existent element.`
        );
    }
    const element = elements[elementPosition];
    await element?.click();
};

/**
 * This TypeScript function retrieves the value of a specified attribute from a web page element.
 * @param {Page} page - The Playwright Page object that represents the current web page being automated.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents a unique identifier for the HTML element on the page. It can be a CSS selector, an XPath
 * expression, or any other valid locator strategy supported by the Playwright library. This parameter
 * is used to locate the element on the page and retrieve its attribute value
 * @param {string} attributeName - The name of the attribute whose value is to be retrieved from the
 * element. For example, if you want to get the value of the "href" attribute of an anchor tag, you
 * would pass "href" as the attributeName parameter.
 * @returns The function `getAttributeText` returns a promise that resolves to a string or null value.
 */
export const getAttributeText = async (
    page: Page,
    elementIdentifier: ElementLocator,
    attributeName: string
): Promise<string | null> => {
    const attributeText = await page
        .locator(elementIdentifier)
        .getAttribute(attributeName);
    return attributeText;
};

/**
 * This TypeScript function scrolls a web page to a specified element.
 * @param {Page} page - The Playwright page object that represents the current web page being automated.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents a CSS selector, XPath expression, or a function that returns a DOM element. It is used to
 * locate the element on the web page that needs to be scrolled into view.
 */
export const scrollIntoView = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<void> => {
    const element = page.locator(elementIdentifier);
    await element.scrollIntoViewIfNeeded();
};


/**
 * This TypeScript function checks if a given element on a web page is checked or not and returns a
 * boolean value.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the web page loaded in that tab or window.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a way to locate
 * an element on a web page. It can be a string selector, a function that returns an element, or an
 * object that contains information about the element's attributes. In this function, the
 * elementIdentifier parameter is the ElementLocator used to locate the
 * @returns A boolean value indicating whether the specified element is checked or not.
 */
export const elementChecked = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<boolean>  => {
    const checked = await page.isChecked(elementIdentifier)
    return checked

}


/**
 * This TypeScript function retrieves the text content of a specified element on a web page.
 * @param {Page} page - The page object represents the current web page that is being automated using Playwright.
 * @param {ElementLocator} elementIdentifier - The `elementIdentifier` parameter is a variable that
 * represents the locator of a specific element on a web page. It can be a CSS selector, XPath
 * expression, or any other supported locator strategy that can be used to identify the element. The
 * `getElementText` function uses this parameter to locate the element
 * @returns a Promise that resolves to a string or null value. The string value is the text content of
 * the element identified by the provided element locator, while the null value is returned if the
 * element is not found on the page.
 */
export const getElementText =  async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<string | null> => {
    const elementText = await page.textContent(elementIdentifier)
    return elementText
}


/**
 * This TypeScript function checks if a specified element on a web page is enabled or not.
 * @param {Page} page - The page object represents a single tab or window in a web browser and provides
 * methods to interact with the page's content.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a way to locate
 * an element on a web page. It can be a string selector (e.g. CSS selector, XPath), a function that
 * returns a DOM element, or a Playwright ElementHandle. The elementIdentifier parameter in the
 * isElementEnabled function is the
 * @returns The function `isElementEnabled` returns a Promise that resolves to a boolean value
 * indicating whether the specified element is enabled or not.
 */
export const elementEnabled = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<boolean> => {
    const elementEnabled = await page.isEnabled(elementIdentifier)
    return elementEnabled
}


/**
 * This TypeScript function returns the text content of an element at a specified position on a web
 * page.
 * @param {Page} page - The Playwright Page object representing the current web page being automated.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the element on the page. It is used
 * to identify the element from which to retrieve the text.
 * @param {number} index - The position of the element in the list of elements matching the
 * given element identifier. For example, if there are 5 elements matching the identifier and
 * elementPosition is 2, then the function will return the text content of the second element in the
 * list.
 * @returns a string or null value. The string value is the text content of the element located at the
 * specified position using the provided element identifier. If the element is not found, the function
 * returns null.
 */
export const getElementTextAtIndex = async (
    page: Page,
    elementIdentifier: ElementLocator,
    index: number
): Promise<string|null> => {
    const elementTextAtIndex = await page.textContent(`${elementIdentifier}>>nth=${index}`)
    return elementTextAtIndex
}



/**
 * This TypeScript function returns an element handle for a given element identifier on a web page.
 * @param {Page} page - The page parameter is of type Page, which is a class from the Playwright library
 * that represents a single tab or window in a browser. It is used to interact with the web page, such
 * as navigating to URLs, clicking on elements, and retrieving information from the page.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents a CSS selector or an XPath expression used to locate an element on a web page. It is used
 * by the function to find and return the element as an ElementHandle object.
 * @returns an `ElementHandle` that can contain either an `SVGElement` or an `HTMLElement`, or `null`
 * if the element is not found.
 */
export const getElement = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
    const element = await page.$(elementIdentifier)
    return element
}


/**
 * This TypeScript function returns an element at a specified index on a web page.
 * @param {Page} page - The Playwright Page object representing the current page being automated.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the element on the web page. It is
 * used to identify the element that needs to be accessed.
 * @param {number} index - The index parameter is a number that represents the position of the element
 * that we want to retrieve. It is used in conjunction with the elementIdentifier parameter to locate
 * the specific element on the page.
 * @returns an `ElementHandle` that represents an SVG or HTML element at a specific index within a
 * parent element identified by `elementIdentifier`. If no element is found at the specified index, the
 * function returns `null`.
 */
export const getElementAtIndex = async (
    page: Page,
    elementIdentifier: ElementLocator,
    index: number
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
    const elementAtIndex = await page.$(`${elementIdentifier}>>nth=${index}`)
    return elementAtIndex
}




/**
 * This TypeScript function returns an array of SVG or HTML elements identified by a given locator on a
 * web page.
 * @param {Page} page - The page parameter is of type Page, which is a class from the Playwright library
 * that represents a single tab or window in a browser. It is used to interact with the web page, such
 * as navigating to URLs, clicking on elements, and retrieving information from the page.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents a CSS selector used to identify the HTML or SVG elements on the web page. It is used by
 * the Playwright library to locate the elements on the page.
 * @returns an array of ElementHandle objects that represent SVG or HTML elements on a web page.
 */
export const getElements = async (
    page: Page,
    elementIdentifier: ElementLocator
): Promise<ElementHandle<SVGElement | HTMLElement>[]> => {
    const elements = await page.$$(elementIdentifier)
    return elements
}



/**
 * This TypeScript function returns a promise that resolves to an element handle within an iframe based
 * on a given element locator.
 * @param {Frame} elementIframe - This parameter is of type `Frame` and represents the iframe element
 * that contains the element we want to retrieve.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a string used
 * to locate an element on a web page. It can be a CSS selector, an XPath expression, or any other
 * valid method of locating an element. In this function, it is used to locate an element within an
 * iframe.
 * @returns a Promise that resolves to either an ElementHandle of type SVGElement or HTMLElement, or
 * null.
 */
export const getElementWithinIframe = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,

): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
    const visibleOnIframeElement = await elementIframe?.$(elementIdentifier)
    return visibleOnIframeElement
}



/**
 * This TypeScript function retrieves the text content of an element within an iframe.
 * @param {Frame} elementIframe - This parameter is of type `Frame` and represents the iframe element
 * that contains the element we want to retrieve text from.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a way to locate
 * an element within the iframe. It could be a CSS selector, an XPath expression, or any other method
 * of locating an element within the DOM.
 * @returns a Promise that resolves to a string or null value. The string value is the text content of
 * an element within an iframe, identified by the provided element locator. If the element is not found
 * or there is an error, the function will return null.
 */
export const getTextWithinIframeElement = async (
    elementIframe: Frame,
    elementIdentifier: ElementLocator,
): Promise<string | null> => {
    const textWithinIframeElement = await elementIframe?.textContent(elementIdentifier)
    return textWithinIframeElement
}



/**
 * This TypeScript function returns the title of a specific page within an array of pages.
 * @param {Page} page - This parameter is of type `Page` and represents the current page being
 * processed.
 * @param {Page[]} pages - An array of Page objects representing the pages in a website or web
 * application.
 * @param {number} pageIndex - The index of the page within the `pages` array for which we want to
 * retrieve the title.
 * @returns The function `getTitleWithinPage` returns a promise that resolves to a string or null
 * value. The string value is the title of the page at the specified index within the `pages` array,
 * and null is returned if the page does not have a title.
 */
export const getTitleWithinPage = async (
    page: Page,
    pages: Page[],
    pageIndex: number,
): Promise<string | null> => {
    const titleWithinPage = await pages[pageIndex].title()
    return titleWithinPage
}



/**
 * This TypeScript function returns an element handle on a specific page based on an element
 * identifier.
 * @param {Page} page - The current page being navigated by the automation script.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector or XPath expression used to locate the element on the page. It is used
 * by the Playwright library to find the element on the page.
 * @param {Page[]} pages - An array of Page objects representing the different pages of a website or
 * web application.
 * @param {number} pageIndex - pageIndex is a number that represents the index of the page in the array
 * of pages passed as a parameter to the function. It is used to specify which page to search for the
 * element on.
 * @returns an `ElementHandle` that can contain either an `SVGElement` or an `HTMLElement`, or `null`
 * if the element is not found on the page.
 */
export const getElementOnPage = async (
    page: Page,
    elementIdentifier: ElementLocator,
    pages: Page[],
    pageIndex: number,
): Promise<ElementHandle<SVGElement | HTMLElement> | null> => {
    const elementOnPage = await pages[pageIndex].$(elementIdentifier)
    return elementOnPage
}



/**
 * This function retrieves the text content of a specified element on a given page.
 * @param {Page} page - The current page being used for the function.
 * @param {ElementLocator} elementIdentifier - ElementLocator is a type that represents a way to locate
 * an element on a web page. It could be a CSS selector, an XPath expression, or any other method of
 * identifying an element. The elementIdentifier parameter in this function is the specific identifier
 * used to locate the element whose text content is being retrieved
 * @param {Page[]} pages - An array of Page objects representing the pages of a website.
 * @param {number} pageIndex - The pageIndex parameter is a number that represents the index of the
 * page within the pages array that contains the element whose text content we want to retrieve.
 * @returns a promise that resolves to a string or null value. The string value is the text content of
 * the element identified by the `elementIdentifier` parameter within the page specified by the
 * `pageIndex` parameter. If the element is not found, the function returns null.
 */
export const  getElementTextWithinPage = async (
    page: Page,
    elementIdentifier: ElementLocator,
    pages: Page[],
    pageIndex: number,
): Promise<string | null> => {
    const elementTextWithinPage = await pages[pageIndex].textContent(elementIdentifier)
    return elementTextWithinPage
}



/**
 * This function retrieves table data from a web page and returns it as a JSON string.
 * @param {Page} page - The page object represents the current web page that is being automated using Playwright.
 * @param {ElementLocator} elementIdentifier - The elementIdentifier parameter is a string that
 * represents the CSS selector for the table element on the web page. It is used to locate the table
 * element on the page and extract its data.
 * @returns The function `getTableData` returns a Promise that resolves to a stringified JSON
 * representation of the table data extracted from the web page using the provided `page` and
 * `elementIdentifier` parameters.
 */
export const getTableData = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<string> => {
    const table = await page.$$eval(elementIdentifier+" tbody tr", (rows) => {
        return rows.map((row) => {
            const cells = row.querySelectorAll('td')
            return Array.from(cells).map(cell => cell.textContent)
        })
    })
    return JSON.stringify(table)
}


/**
 * This TypeScript function retrieves table headers from a web page using a given element identifier.
 * @param {Page} page - The Playwright Page object that represents the current page being automated.
 * @param {ElementLocator} elementIdentifier - The identifier for the HTML element that contains the
 * table for which we want to retrieve the headers.
 * @returns a Promise that resolves to a stringified JSON array of table headers.
 */
export const getTableHeaders = async (
    page: Page,
    elementIdentifier: ElementLocator,
): Promise<string> => {
    const headers = await page.$$eval(elementIdentifier+" thead", (headers) => {
        return headers.map((header) => {
            const headers = header.querySelectorAll('th')
            return Array.from(headers).map(header => header.textContent?.replace(/[\u200B-\u200D\uFEFF]/g, '').replace(/\s+/g, ' ').trim().normalize('NFC'))

        })
    })
    return JSON.stringify(headers)
}