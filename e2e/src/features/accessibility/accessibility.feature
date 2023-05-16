Feature: Generate accessbility rerports across our website


    @smoke
    @regression
    @accessibility
    Scenario: Generate accessbility rerport for the Home Page
        Given I am on the "home" page
        And I inject Axe accessibility engine
        Then I generate an accessibility analysis report
        

    @smoke
    @regression
    @accessibility
    Scenario: Generate accessbility rerport for the Create Contact Page
        Given I am on the "home" page
        And I click the "create" button
        When I am directed to the "create contact" page
        And I inject Axe accessibility engine
        Then I generate an accessibility analysis report




    @smoke
    @regression
    @accessibility
    Scenario: Generate accessbility rerport for the Edit Contact Page
        Given I am on the "home" page
        And I click the "1st" "edit" button
        When I am directed to the "edit contact" page
        And I inject Axe accessibility engine
        Then I generate an accessibility analysis report


    @dev
    @smoke
    @regression
    @accessibility
    Scenario: Generate accessbility rerport for the Playground Page
        Given I am on the "home" page
        And I click the "playground" button
        When I am directed to the "playground" page
        And I inject Axe accessibility engine
        Then I generate an accessibility analysis report