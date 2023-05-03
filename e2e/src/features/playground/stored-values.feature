Feature: As a user I can interact with stored values


    @smoke
    @regression
    Scenario: As a user I can interact and asserts on stored values
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I retrieve the "first value" text and store it as "first value" in global variables
        And the "second value" should equal the "first value" stored in global variables
        And the "fourth value" should not equal the "first value" stored in global variables
        And the "fourth value" should contain the "first value" stored in global variables
        And the "first value" should contain the "first value" stored in global variables
        And the "third value" should not contain the "first value" stored in global variables