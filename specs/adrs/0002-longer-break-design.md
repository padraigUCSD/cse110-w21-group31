# Allow users to skip the "longer break" timer after 15 minutes

## Context and Problem Statement

The Pomodoro philosophy defines the length of a longer break as anything between 15 and 30 minutes. How should we allow users to choose the length of their longer breaks?

## Considered Options

* Have users enter the length of the break before it starts
* Initially set the timer to 15 minutes, but allow the break to be extended
* Initially set the timer to 30 minutes, but allow the break to be skipped after 15 minutes

## Decision Outcome

Chosen option "Initially set the timer to 30 minutes, but allow the break to be skipped after 15 minutes", because:

* Users may not initially know how long of a break they want to take
* Entering the length of the break is a hassle for already overworked users :)
* If the timer is initially set to 15 minutes but the user has not returned to the app by that time, it is unclear how we would decide whether to extend the break or start a new pomo
* Setting the timer to 30 minutes gives users the freedom to step away from the app for as long as they need
