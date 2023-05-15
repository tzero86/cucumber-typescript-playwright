Feature: As a user I expect to be able to create contacts

    Background:
        Given I am on the "home" page
        And I click the "create" button
        Then I am directed to the "create contact" page
        And the "create contact header" should equal the text "Create Contact"


    @smoke
    @regression
    Scenario: as a User I expect to be able to create a new contact
        When I fill in the "name" input with "John Saurio"
        And I select the "Male" option from the "gender"
        And I fill in the "phone" input with "1234567890"
        And I fill in the "street" input with "123 Main St"
        And I fill in the "city" input with "New York"
        And I click the "save" button
        Then I am directed to the "home" page
        And I fill in the "search" input with "John Saurio"
        And the "search" should not equal the text "John Sauri"
        Then the "full name label" should contain the text "Name:"
        And the "name" should equal the text "John Saurio"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should not equal the text "Female"
        And the "address label" should contain the text "Address:"
        And the "address" should equal the text "123 Main St, New York"
        And the "edit" should be displayed
        And the "delete" should be displayed




    @regression
    Scenario: as a User I do not expect to saved contacts to persist after I refresh the page
        When I fill in the "name" input with "Tanya Hardie"
        And I select the "Female" option from the "gender"
        And I fill in the "phone" input with "45454546"
        And I fill in the "street" input with "123 Second St"
        And I fill in the "city" input with "California"
        And I click the "save" button
        Then I am directed to the "home" page
        When I fill in the "search" input with "Tanya Hardie"
        Then the "full name label" should contain the text "Name:"
        And the "name" should equal the text "Tanya Hardie"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should not equal the text "Male"
        And the "address label" should contain the text "Address:"
        And the "address" should equal the text "123 Second St, California"
        And the "edit" should be displayed
        And the "delete" should be displayed
        And I refresh the "home" page
        And I fill in the "search" input with "Tanya Hardie"
        Then the "contact" should not be displayed



    @regression
    Scenario: As a user I can create multiple new contacts
        When I fill in the "name" input with "Rod Flanders"
        And I select the "Male" option from the "gender"
        And I fill in the "phone" input with "421-555-0113"
        And I fill in the "street" input with "740 Evergreen Terrace"
        And I fill in the "city" input with "Springfield"
        And I click the "save" button
        And I am directed to the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        And I fill in the "name" input with "Todd Flanders"
        Then I select the "Male" option from the "gender"
        And I fill in the "phone" input with "421-555-0113"
        And I fill in the "street" input with "740 Evergreen Terrace"
        And I fill in the "city" input with "Springfield"
        And I click the "save" button
        And I am directed to the "home" page
        And I fill in the "search" input with "Rod Flanders"
        And the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should contain the text "Rod Flanders"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should contain the text "Male"
        And the "address label" should contain the text "Address:"
        And the "address" should contain the text "740 Evergreen Terrace, Springfield"
        And the "edit" should be displayed
        And the "delete" should be displayed
        And I fill in the "search" input with "Todd Flanders"
        And the "contact" should be displayed
        And the "full name label" should contain the text "Name:"
        And the "name" should contain the text "Todd Flanders"
        And the "gender label" should contain the text "Gender:"
        And the "gender" should contain the text "Male"
        And the "address label" should contain the text "Address:"
        And the "address" should contain the text "740 Evergreen Terrace, Springfield"
        And the "edit" should be displayed
        And the "delete" should be displayed
        And I fill in the "search" input with "Flanders"
        And the "1st" "contact" should be displayed
        And the "2nd" "contact" should be displayed