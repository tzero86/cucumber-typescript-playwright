Feature: As a user I expect to be able to delete a new contact

    Background:
        Given I am on the "home" page
        And I click the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should equal the text "Create Contact"

 
    @smoke
    @regression
    Scenario: As a user I can delete a new contact
        When I fill in the "name" input with "Kurt Cobain"
        And I select the "Male" option from the "gender"
        And I fill in the "phone" input with "9898989898"
        And I fill in the "street" input with "124 Second St"
        And I fill in the "city" input with "Seattle"
        And I click the "save" button
        When I am directed to the "home" page
        And I fill in the "search" input with "Kurt Cobain"
        Then the "contact" should be displayed
        And I click accept on the alert dialog
        When I click the "delete" button
        When I fill in the "search" input with "Kurt Cobain"
        Then the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"

        