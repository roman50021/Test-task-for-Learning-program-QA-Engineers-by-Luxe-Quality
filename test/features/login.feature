
  Feature: Login page tests (Cucumber)

    Scenario: User clicks Login with empty fields
      Given User is located on the main page of saucedemo website
      When User clicks "Login" button
      Then User should see "Epic sadface: Username is required" error message
