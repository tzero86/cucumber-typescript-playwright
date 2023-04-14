import { Given } from '@cucumber/cucumber'

Given(
    /^I am on the "([^"]*)" page$/,
    async function name(pageName: string) {
        
        console.log(`I am on the ${pageName} page`)
        await global.page.goto('http://localhost:3000')

    }
)