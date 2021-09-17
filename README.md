# Hodlnaut Technical Test

Get value of user account in terms of the USD. Implementation is found in the amountController.js

## Getting Started

* To start
* Open cmd and navigate to folder
* npm install
* npm start
* Server will be running on localhost:3000
* endpoint is at http://localhost:3000/test/:id

## Questions

2. Which took the most time? What did you find most difficult?

Setting up the file structure and the test case. Checking how to have async in for loops as initially I tried using Promise.all

3. If we wanted the balance to update on the frontend more often (10 times per second), how would you improve the current system to handle this?

Subscribe to the api to constantly check if there are updates. Cache the rates in the frontend and only change them when they are out of date.

4. How did you find the test overall? If you have any suggestions on how we can improve the test, we'd love to hear them!

This is pretty refreshing as it differs from the usual Hackerrank and codility. I feel those test for IQ and logic while this one really test
experience and if we've been doing things right or just doing things that are not in line with the convention.
