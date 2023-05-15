Feature: As a user I expect to be able to validate a new contact

    Background:
        Given I am on the "home" page
        And I click the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should equal the text "Create Contact"

    

    @smoke
    @regression
    Scenario: As a user I can hit validation errors on each field then create a new contact
        When I click the "save" button
        Then the "error message" should contain the text "Error: The "name" field can't be empty."
        And I fill in the "name" input with "Michael Fox"
        And I click the "save" button
        Then the "error message" should contain the text "Error: The "phone" field can't be empty."
        And I fill in the "phone" input with "1234567890"
        And I click the "save" button
        Then the "error message" should contain the text "Error: The "street" field can't be empty."
        And I fill in the "street" input with "1234 Main St"
        And I click the "save" button
        Then the "error message" should contain the text "Error: The "city" field can't be empty."
        And I fill in the "city" input with "Denver"
        And I click the "save" button
        Then I am directed to the "home" page
        When I fill in the "search" input with "Michael Fox"
        Then the "contact" should be displayed


    
