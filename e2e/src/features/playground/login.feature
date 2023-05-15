Feature: As a user I can interact with login forms

    Background:
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page

    
    @smoke
    @regression
    Scenario Outline: As a user I can populate login details leveraging env variables
        When I scroll to the "email"
        And I fill in the "email" input with "$.TEST_EMAIL"
        And I fill in the "password" input with "$.TEST_PASSWORD"
        Then the "email" should contain the value "admin@admin.com"
        And the "password" should contain the value "<password>"

        @localhost
        Examples:
            | password     |
            | Password1234 |

        @production
        Examples:
            | password       |
            | s3cur3p@ssw0rd |




    @smoke
    @regression
    Scenario Outline: As a user I expect validation on the login input for any invalid emails
        When I scroll to the "email"
        And I fill in the "email" input with "<email>"
        And I fill in the "password" input with "Password1234"
        Then the "email error" should contain the text "Please include an '@' in the email address."

        Examples:
            | email             |
            | testemail.invalid |
            | testemail         |
            | asdas.asdas       |



    @dev
    @smoke
    @regression
    Scenario: As a user I am able to input a random email
    When I fill in the "email" input with random "email"
    And I fill in the "password" input with random "password"
    