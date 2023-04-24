Feature: As a user I can interact with autocomplete inputs

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and asserts on autocomplete inputs
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I fill in the "movies" input with "The G"
        And I click the "the godfather" link
        And the "movies" should contain the value "The Godfather"
        And the "movies" should not contain the value "The Godfather: Part II"
