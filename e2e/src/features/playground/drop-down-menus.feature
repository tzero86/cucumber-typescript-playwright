Feature: As a user I can interact with drop down menus

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and asserts on drop down menus
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        Then the "drop down button" should be displayed
        And I click the "drop down button" button
        And the "drop down profile" should be displayed
        And the "drop down profile" should contain the text "Profile"
        When I click the "drop down profile" button
        Then the "drop down profile" should not be displayed
        And I click the "drop down button" button
        And the "drop down my account" should be displayed
        And the "drop down my account" should contain the text "My account"
        When I click the "drop down my account" button
        Then the "drop down my account" should not be displayed
        And I click the "drop down button" button
        And the "drop down logout" should be displayed
        And the "drop down logout" should contain the text "Logout"
        And I click the "drop down logout" button
        Then the "drop down logout" should not be displayed