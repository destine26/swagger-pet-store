# API Automation using Pactum.js

This project demonstrates automated testing of RESTful APIs using Mocha, a JavaScript test framework, and Pactum.js, a versatile API testing library.

## Overview

This test suite is designed to automate the testing of an API that manages pets in a pet store in Swagger pet store. It covers various scenarios such as adding new pets, updating existing pets, and finding pets by status or tags.

## Technologies Used

*Pactum.js - Pactum.js is a powerful library for writing expressive and flexible API tests in JavaScript, allowing for easy creation of HTTP requests and assertions.
*Mocha - Mocha is a feature-rich JavaScript test framework running on Node.js, making asynchronous testing simple.

## Installation

# install pactum
npm install -D pactum

# install a test runner
npm install -D mocha

# install dependencies
npm install

## Running Tests
Update the scripts in package.json

{
  "scripts": {
    "pet": "mocha pet.js"
  }
}


To run the tests, execute the following command

npm run pet

# Test Cases

1.Add a New Pet to the Store
Scenario -Adds a new pet with specified tags and status.
Expectation - Expects the API to respond with a status code of 200 and the response time to be within 3000 milliseconds.

2.Create Pets with Different Tags & Status
Scenario - Creates at least 4 pets with different tags and status.
Expectation - Expects each API request to add a new pet to the store with a status code of 200 and the response time to be within 3000 milliseconds.

3.Store the ID of the New Pet in a JSON File
Scenario - Stores the ID of the new pet in a JSON file.
Expectation - Expects the API to respond with a status code of 200 and the response time to be within 3000 milliseconds. The ID of the new pet is stored in a JSON file named petIds.json.

4.Update an Existing Pet
Scenario - Updates an existing pet in the store.
Expectation  Expects the API to respond with a status code of 200 and the response time to be within 3000 milliseconds.

5.Find Pets by Status
Scenario - Finds pets in the store by their status.
Expectation - Expects the API to respond with a status code of 200 and the response time to be within 3000 milliseconds.

6.Find Pets by Tags
Scenario - Finds pets in the store by their tags.
Expectation - Expects the API to respond with a status code of 200 and the response time to be within 3000 milliseconds.