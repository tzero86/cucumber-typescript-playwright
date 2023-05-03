Feature: As a user I can interact with hidden and displayed text

    @smoke
    @regression
    Scenario: As a user I can interact and asserts on hidden and displayed text
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        Then the "show hide text" should be displayed
        And the "show hide text" should equal the text "This is visible"
        When I click the "show hide" button
        Then the "show hide text" should not be displayed