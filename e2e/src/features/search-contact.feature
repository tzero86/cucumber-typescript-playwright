Feature: As a user I expect to be able to search a new contact

    Background:
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page


    @smoke
    @regression
    Scenario: As a user I don't expect to see a results for a contact that doesn't exist
        Given I am on the "home" page
        When I fill in the "search" input with "Patricio Estrella"
        Then the "contact" should not be displayed
        And the "no items message" should contain the text "There are no items to display"



    @regression
    Scenario: As a user I can search for a new contact
        When I fill in the "name" input with "Maggie Simpson"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "939-555-0113"
        And I fill in the "street" input with "742 Evergreen Terrace"
        And I fill in the "city" input with "Springfield"
        And I click the "save" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Maggie Simpson"
        And the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should contain the text "Maggie Simpson"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should contain the text "Female"
        And the "address label" should contain the text "Address:"
        And the "address" should contain the text "742 Evergreen Terrace, Springfield"
        And the "edit" should be displayed
        And the "delete" should be displayed



    @regression
    Scenario: As a user I can search for a edited contact
        When I fill in the "name" input with "Marge Simpson"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "939-555-0113"
        And I fill in the "street" input with "742 Evergreen Terrace"
        And I fill in the "city" input with "Springfield"
        And I click the "save" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Marge Simpson"
        And the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should contain the text "Marge Simpson"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should contain the text "Female"
        And the "address label" should contain the text "Address:"
        And the "address" should contain the text "742 Evergreen Terrace, Springfield"
        And the "edit" should be displayed
        And the "delete" should be displayed
        And I click the "edit" button
        And I am directed to the "edit contact" page
        And I fill in the "name" input with "Homer Simpson"
        Then I select the "Male" option from the "gender"
        And I fill in the "phone" input with "636-555-8904"
        And I fill in the "street" input with "742 Evergreen Terrace"
        And I fill in the "city" input with "Springfield"
        And I click the "save" button
        And I fill in the "search" input with "Homer Simpson"
        And the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should contain the text "Homer Simpson"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should contain the text "Male"
        And the "address label" should contain the text "Address:"
        And the "address" should contain the text "742 Evergreen Terrace, Springfield"
        And the "edit" should be displayed
        And the "delete" should be displayed