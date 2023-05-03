Feature: As a user I can interact with switches.


    @smoke
    @regression
    Scenario: As a user I can interact and assert on switches
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And the "switch one" switch should be checked
        Then I uncheck the "switch one" switch
        And the "switch one" switch should not be checked
        And I check the "switch one" switch
        And the "switch one" switch should be checked
        And the "switch two" should not be enabled
