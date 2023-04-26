Feature: As a user I can interact with windows.

    @smoke
    @regression
    Scenario: As a user I can interact and assert on windows
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I click the "open window" button
        Then the "2nd" window should contain the title "Contacts"
        And the "1st" window should contain the title "Playground"
        And I fill in the "search" input on the "2nd" window with "Sloane Juarez"
        And the "contact" on the "2nd" window should be displayed
        And the "full name label" on the "2nd" window should contain the text "Name:"
        And the "name" on the "2nd" window should equal the text "Sloane Juarez"
        And the "gender label" on the "2nd" window should contain the text "Gender:"
        And the "gender" on the "2nd" window should equal the text "Female"
        And the "address label" on the "2nd" window should contain the text "Address:"
        And the "address" on the "2nd" window should equal the text "8162 Tincidunt Rd., Ludhiana"
        And the "edit" on the "2nd" window should be displayed
        And the "delete" on the "2nd" window should be displayed