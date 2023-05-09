import { devices } from "playwright";
import { envNumber } from "../env/parseEnv";


/**
 * This function returns the width and height of the viewport based on the environment settings.
 * @returns The function `getViewPort` returns an object with two properties: `width` and `height`,
 * both of which are of type `number`. The values of these properties depend on the value of the
 * `emulation` variable and the environment variables `BROWSER_WIDTH` and `BROWSER_HEIGHT`.
 */
export const getViewPort = (): { width: number, height: number } => {
    let viewPort
    const emulation = process.env.EMULATION || 'browser'


    if (emulation != 'browser') {
        const device = devices[emulation]
        viewPort = {
            width: device.viewport.width,
            height: device.viewport.height
        }
    } else {
        viewPort = {
            width: envNumber('BROWSER_WIDTH'),
            height: envNumber('BROWSER_HEIGHT')
        }
    }
    return viewPort
}