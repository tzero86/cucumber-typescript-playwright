Feature: As a user I can interact with checkboxes


    @smoke
    @regression
    Scenario: As a user I can interact and assert on checkboxes
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And the "blue" check box should not be checked
        And I check the "green" check box
        And I check the "grey" check box
        And the "red" check box should not be checked
        And the "purple" check box should not be checked
        And I uncheck the "green" check box
        And the "green" check box should not be checked
