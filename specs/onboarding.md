# New Developer Onboarding Guide

Welcome to Team 31! Please follow this guide to configure your environment and get up to speed with our project architecture.

## Environment

Hardware will not be provided to you, we operate as a bring-your-own-device team.
Many of our tools require a \*nix environment, either Linux or Mac OS.
[WSL](https://docs.microsoft.com/en-us/windows/wsl/install-win10) may work on Windows but is not recommended.

NodeJS v15 and NPM v7 are also required.

## Useful Commands

* `npm install` - download dependencies, must be run prior to starting, linting, or testing the project
* `npm start` - start the web app on http://localhost:8080
* `npm test` - run controller unit tests with Jest
* `npm run lint` - run ESLint to verify code style
* `npm run cypress` - open Cypress to run UI tests against the app
* `npm run cypress:headless` - run Cypress without a UI, most useful for generating visual diff screenshots

## Git Branching Strategy

We follow typical Git practices.
Each feature should be completed on a separate branch, as pushes to master will be blocked by Github.
Commits should ideally be small, focused, and worded in the imperative tense.
See https://chris.beams.io/posts/git-commit/ for inspiration.

After completing, linting, and testing a feature, commit it to your branch and push it to Github for code review.
For source code changes, CI must pass and each pull request must be approved by at least one other developer.

## Application Architecture

The HTML and CSS of the app are defined in index.html and css/ respectively.

Application logic is separated into two layers: controllers and views.
See specs/system\_diagrams for a high-level overview.

Controllers (found in controllers/) store the application state and logical components of the application, such as the current time on the timer, the number of consecutive pomos, and abstract things like that.
Views (found in views/) subscribe to application state and use DOM APIs to visually express the state in the application.

Specifically, views attach *callbacks* to controllers, and callbacks are called whenever the application state changes.
This ensures that the view is kept consistent with the state of the application.

To register a callback, call one of the `add*Callback(id, callback)` functions on a controller, like so:

```js
timerController.addTimeCallback('id', time => console.log(`There are ${time} seconds left`));
```

## Testing Strategy

Controllers are unit tested using Jest.
These tests are stored alongside the controllers, and are given the suffix `.test.js`.
Unit tests should not exercise DOM APIs and should primarily test controller state and callbacks.

We use Cypress to test the app end to end, which is the most reliable method of testing views.
Cypress tests are written in cypress/integration/timer.spec.js.

Finally, we use Cypress visual diff testing to prevent visual regressions.
Visual diff testing allows us to programatically control the application, take screenshots, then compare these screenshots with reference screenshots for visual regressions.
If you change the appearance of the application and a visual diff test fails, you can regenerate the reference screenshot by removing it from cypress/snapshots/visual-diff.spec.js/, then running `npm run cypress:headless` to regenerate it.
Manually verify that the screenshot looks correct then commit it to the repo.

## Documentation

Please document all public functions (especially those in controllers) following standard [JSDoc](https://jsdoc.app/) conventions.
Documentation is rendered to HTML and deployed to https://padraigucsd.github.io/cse110-w21-group31/docs/ on each merge to master.

## Continuous Integration

All pull requests and merges to master are run against our CI pipeline.
This pipeline consists of lint checks, unit tests, UI tests, and visual diff tests.
Please note that all of these CI steps can and should be run locally, prior to opening a PR, to reduce commit spam and clutter.
See the commands above for more information.

After these CI steps complete, their results will be posted to the status checks section at the bottom of the PR.
If any of the steps fail, click "Details" to see the error log.
If a visual diff test fails, the difference will be attached to the CI run as an artifact- click "Details" next to the e2e check, then click "ci" on the left and scroll down to find the artifact.

## Continuous Deployment

The application is deployed to four types of deployments:

* **Deploy previews** are deployed on each PR. These allow you to preview the result of a PR without having to checkout the branch locally. To access a deploy preview, click the Details link next to deploy-preview status check on a PR.
* The **Dev environment** is deployed on each merge to master. The Dev environment can be found here: https://100minutes-dev.netlify.app/
* The **QA environment** is promoted manually, prior to a release. The QA environment can be found here: https://100minutes-qa.netlify.app/
* The **Production environment** is also promoted manually after thorough testing in the QA environment. It can be found here: https://100minutes.netlify.app/
