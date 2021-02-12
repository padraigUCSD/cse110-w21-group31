# Use Jest for testing, do not isolate src and tests

## Context and Problem Statement

We should be unit testing our controller code to reduce bugs and regressions.
How should we structure our tests?
Also, how should we organize our tests and source code?

## Considered Options

* Use Jest
* Use Mocha
* Use another testing library
* Store tests and source code in the same directory
* Isolate tests and source code

## Decision Outcome

Chosen options "Use Jest" and "Store tests and source code in the same directory" because:

* Jest is the most popular testing framework (as evidenced by NPM statistics), implying that it likely has the best support
* Storing tests and source code in the same directory will help keep test files small and composable, leading to fewer merge conflicts

