Feature: As a user I expect to be able to edit a new contact

    Background:
        Given I am on the "home" page
        And I click the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should equal the text "Create Contact"


    @smoke
    @regression
    Scenario: As a user I can edit a new contact
        When I fill in the "name" input with "Kurt Cobain"
        And I select the "Male" option from the "gender"
        And I fill in the "phone" input with "9898989898"
        And I fill in the "street" input with "124 Second St"
        And I fill in the "city" input with "Seattle"
        And I click the "save" button
        When I am directed to the "home" page
        And I fill in the "search" input with "Kurt Cobain"
        Then the "contact" should be displayed
        And I click the "edit" button
        Then I am directed to the "edit contact" page
        And I fill in the "name" input with "Cort Kobain"
        And I select the "Male" option from the "gender"
        And I fill in the "phone" input with "9898989898"
        And I fill in the "street" input with "124 Second St"
        And I fill in the "city" input with "Los Angeles"
        And I click the "save" button
        Then I am directed to the "home" page
        When I fill in the "search" input with "Cort Kobain"
        Then the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should equal the text "Cort Kobain"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should not equal the text "Female"
        And the "address label" should contain the text "Address:"
        And the "address" should equal the text "124 Second St, Los Angeles"
        And the "edit" should be displayed
        And the "delete" should be displayed
        


        