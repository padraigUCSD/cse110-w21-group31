# Use a pub-sub architecture to propagate app state

## Context and Problem Statement

We have a number of visual effects and controls in our views that need to read and update system state in the controllers.
How do we propagate this state to views?

## Decision Drivers <!-- optional -->

* Separation of concerns
* Testability (specifically, unit tests for controllers)
* Minimizing merge conflicts for different features

## Considered Options

* Controllers instantiate views then call view methods to update the UI
* Views connect to controllers and read state variables (such as time, current pomo, etc.) directly
* A pub-sub architecture whereby views subscribe to events emitted from controllers

## Decision Outcome

Chosen option: "A pub-sub architecture whereby views subscribe to events emitted from controllers", because:

* Controllers instantiating views would make it impossible to isolate controllers from the views, slowing down unit test development
* Controllers instantiating views would lead to poor separation of concerns - we do not want function calls such as `backgroundColorView.setBackgroundColor()` in our business logic controllers
* Controllers instantiating views would lead to merge conflicts between different features - e.x. a developer working on the background color change and a developer working on the pomo bubbles would have to add view logic to the same section of the controller logic
* Directly reading state variables makes it difficult to reconcile state in views if the state is changed. This would likely require each view looping indefinitely, re-reading the state variables to respond to changes, which would lead to poor performance.
* A pub-sub architecture would allow for strict separation of concerns and reactive UI updates to business logic.

### Positive Consequences <!-- optional -->

* Developers can work on different views responding to the same state independently, without causing merge conflicts
* We can be certain that views will always have the latest state if they are configured correctly

### Negative Consequences <!-- optional -->

* There is additional boilerplate required to store callbacks, write functions to register callbacks, and use explicit setters to set state variables while firing callbacks
* Debugging can potentially become more difficult if developers are not aware of which views are subscribed to a specific state variable.
    * Solution: Require subscribers to register a unique ID to refer to their callbacks, so that developers can look at the list of callbacks and know which callbacks were registered by which view and feature.
