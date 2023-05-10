

// The reason we don't need globalconfig here is because we won't need to access the mappings at all

import { When } from "@cucumber/cucumber"
import { ScenarioWorld } from "./setup/world"
import { logger } from "../logger"

When(
    /^I click (accept)?(dismiss)? on the alert dialog$/,
    async function(this: ScenarioWorld, acceptDialog: boolean, dismissDialog: boolean) {

        const {
            screen: { page },
        } = this

        logger.log(`I click on the ${acceptDialog?'accept':'dismiss'} on the alert dialog`)

        if(!!dismissDialog) {
            page.on('dialog', dialog => dialog.dismiss())   
        } else {
            page.on('dialog', dialog => dialog.accept())
        }
    }
)