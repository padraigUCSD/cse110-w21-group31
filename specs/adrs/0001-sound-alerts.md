# Signal the user's attention with audio cues

## Context and Problem Statement

When the timer transitions between a pomo, a break, and a longer break, we need to notify the user.
How should we get the user's attention?

## Decision Drivers <!-- optional -->

* Minimal distractions
* Easy to set up

## Considered Options

* Play a sound at each transition
* Display a push notification

## Decision Outcome

Chosen option: play a sound, because:

* It does not require the user to be looking at the screen, if the task they are trying to accomplish is not performed on their computer
* It does not require the user to grant the app access to push notifications, which many users may be hesitant to accept.
* Push notifications are persistent, and thus a distraction until they are dismissed. An audio cue can last for only a second or so.
