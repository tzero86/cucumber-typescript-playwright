import { Given } from '@cucumber/cucumber'
import { PageId } from '../env/global'
import { navigateToPage, currentPageMatchesPageId } from '../support/navigation-behavior'
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