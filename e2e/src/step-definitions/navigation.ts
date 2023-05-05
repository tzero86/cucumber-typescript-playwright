import { Given } from '@cucumber/cucumber'
import { PageId } from '../env/global'
import { navigateToPage, currentPageMatchesPageId, reloadPage } from '../support/navigation-behavior'
import { ScenarioWorld } from './setup/world'
import { waitFor } from '../support/wait-for-behavior'

Given(
    /^I am on the "([^"]*)" page$/,
    async function name(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig,
        } = this
        console.log(`I am on the ${pageId} page`)
        await navigateToPage(page, pageId, globalConfig)
        await waitFor(() => currentPageMatchesPageId(page, pageId, globalConfig))
    }
)

Given(
    /^I am directed to the "([^"]*)" page$/,
    async function name(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig,
        } = this
        console.log(`I am directed to the ${pageId} page`)
        await waitFor(() => currentPageMatchesPageId(page, pageId, globalConfig))
    }
)

Given(
    /^I refresh the "([^"]*)" page$/,
    async function name(this: ScenarioWorld, pageId: PageId) {
        const {
            screen: { page },
            globalConfig,
        } = this
        console.log(`I refresh the ${pageId} page`)
        await reloadPage(page)
        await waitFor(() => currentPageMatchesPageId(page, pageId, globalConfig), {
            timeout: 30000,
        })
    }
)