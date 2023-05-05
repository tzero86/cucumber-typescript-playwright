Feature: As a user I expect to be able to refresh the page and see the application


    @smoke
    @regression
    Scenario: as a User I can refresh the browser and be on the page expected
        Given I am on the "home" page
        And I refresh the "home" page
        When I click the "playground" button
        And I am directed to the "playground" page
        Then I refresh the "playground" page
        