import { PlaywrightTestConfig } from '@playwright/test'


const config: PlaywrightTestConfig = {
    use: {
        baseURL: 'https://jsonplaceholder.typicode.com',
        extraHTTPHeaders: {
            'content-type': 'application/json; charset=UTF-8'
        }
    }

}

export default config