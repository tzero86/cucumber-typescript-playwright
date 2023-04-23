Feature: As a user I can interact with radio buttons.

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on radio buttons
        Given I am on the "home" page
        And the "playground" should be displayed
        And I click the "playground" button
        Then I am directed to the "playground" page
        