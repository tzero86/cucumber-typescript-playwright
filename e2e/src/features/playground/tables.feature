Feature: As a user I can interact with tables.

    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert table data
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And the "basic" table should equal the following:
            | 159 | 6   | 24 | 4   |
            | 237 | 9   | 37 | 4.3 |
            | 262 | 16  | 24 | 6   |
            | 305 | 3.7 | 67 | 4.3 |
            | 356 | 16  | 49 | 3.9 |
        And the "basic" table should not equal the following:
            | 159 | 6   | 24 | 4   |
            | 237 | 92  | 37 | 4.3 |
            | 262 | 11  | 24 | 6   |
            | 305 | 3.2 | 67 | 4.3 |
            | 356 | 16  | 49 | 3.9 |


    @dev
    @smoke
    @regression
    Scenario: As a user I can interact and assert on table headers
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And the headers of the "basic" table should equal the following:
            |Dessert (100g serving)|Calories|Fat (g)|Carbs (g)|Protein (g)|


