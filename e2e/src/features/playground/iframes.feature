Feature: As a user I can interact with Iframes


    @smoke
    @regression
    Scenario: As a user I can interact and assert on iframes
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I scroll to the "basic iframe"
        And I fill in the "search" input on the "basic iframe" iframe with "Abraham Perry"
        And the "contact" on the "basic iframe" iframe should be displayed
        And the "full name label" on the "basic iframe" iframe should contain the text "Name:"
        And the "name" on the "basic iframe" iframe should equal the text "Abraham Perry"
        And the "gender label" on the "basic iframe" iframe should contain the text "Gender:"
        And the "gender" on the "basic iframe" iframe should equal the text "Male"
        And the "address label" on the "basic iframe" iframe should contain the text "Address:"
        And the "address" on the "basic iframe" iframe should equal the text "Ap #826-8849 Vulputate Street, Laramie"
        And the "edit" on the "basic iframe" iframe should be displayed
        And the "delete" on the "basic iframe" iframe should be displayed
