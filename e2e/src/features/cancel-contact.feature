Feature: As a user I expect to be able to cancel the creation of a new contact

    Background:
        Given I am on the "home" page
        And I click the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should equal the text "Create Contact"

    
    @smoke
    @regression
    Scenario: As a user I can cancel creating a new contact
        When I fill in the "name" input with "Layla Dawud"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "666999666"
        And I fill in the "street" input with "69 Main St"
        And I fill in the "city" input with "Los Angeles"
        And I click the "cancel" button
        When I am directed to the "home" page
        And I fill in the "search" input with "Layla Dawud"
        Then the "contact" should not be displayed
        