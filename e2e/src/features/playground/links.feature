Feature: As a user I can interact with links.

    
    @smoke
    @regression
    Scenario: As a user I can interact and assert on links
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I click the "primary" button
        Then the "primary" should contain the text "Primary"
        And the "secondary" should not be enabled
        And the "secondary" should equal the text "Disabled"
        And I click the "third" link
        And the "third" should contain the text "Link"