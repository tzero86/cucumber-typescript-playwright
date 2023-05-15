Feature: As a user I expect to be able to search a new contact


    @smoke
    @regression
    Scenario: As a user I don't expect to see a results for a contact that doesn't exist
        Given I am on the "home" page
        When I fill in the "search" input with "Patricio Estrella"
        Then the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"