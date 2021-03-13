# Reconfigure structure of sidebar component in index.html

* Status: accepted
* Deciders: Christine Phan, Padraig MacGabann
* Date: 2021-03-06

Technical Story: E2S2

## Context and Problem Statement

Should we (1) have the labels sit *on top* of the toggle switches, as was found to be implemented easily in an experiment on another PR; or (2) have the labels sit *inline* with the toggle switches, as was specified in the design docs?

## Decision Drivers <!-- optional -->

* Design Document
* Project Velocity & Schedule Risk
* Hidden cost of future work that may arise from either choice
* Personal schedule constraints of decision makers

## Considered Options

* Have the labels sit *on top* of the toggle switches
* Have the labels sit *inline* with the toggle switches

## Decision Outcome

Chosen option: "Have the labels sit on top of the toggle switches", because it reduces time-to-value and delivers on the needs of the story without compromising anything signifcant for end users.

### Positive Consequences <!-- optional -->

* Causes issue to be ready for review several days ahead of schedule
* Eliminates need for Christine to continue working on fixing styling issues for E2S2
* Eliminates need for future work on special breakpoint styling rules for mobile landscape

### Negative Consequences <!-- optional -->

* Minor deviation from design document

## Pros and Cons of the Options <!-- optional -->

### Have the labels sit on top of the toggle switches

Example:
![change labels example](https://ligmabukkit.s3-us-west-1.amazonaws.com/cse110/adr-0010.png)

* Good, because it's easier to implement, not requiring tons of alignment corrections
* Good, because it doesn't create more work down the road for resizing the sizebar on mobile landscape 
* Bad, (arbitrarily) because it deviates slightly from the design doc

### Have the labels sit inline with the toggle switches

Example:
![keep labels as spec'd example](https://ligmabukkit.s3-us-west-1.amazonaws.com/cse110/adr-0010/interface-docs-adr-0010.PNG)

* Good, because it is intuitive
* Bad, because a lot of time has already spent trying to make the text align with the switch, which still isn't done yet (significant schedule risk).
* Bad, because it will create more work down the road for resizing the sizebar on mobile landscape 

## Links <!-- optional -->
Convo with christine:
![convo with christine](https://ligmabukkit.s3-us-west-1.amazonaws.com/cse110/adr-0010/adr-0010-convo.PNG)


