Feature: As a user I Expect to be able to navigate to the home page

    @smoke
    @regression
    Scenario: As a user I expect to be able to see contacts
        Given I am on the "home" page
        And the "header logo" should be displayed
        Then the "contacts header" should contain the text "Contacts"
