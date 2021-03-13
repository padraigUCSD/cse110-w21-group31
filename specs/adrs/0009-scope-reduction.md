# Reduce the scope of our delivery and kill the task tracker feature

* Status:  accepted
* Deciders: Padraig MacGabann, Josh Chou, Nhat (Nick) Nguyen, David Cruz, Stephen Wang, Christine Phan, Dexter Hamilton, Diego Alfaro
* Date: 2021-02-25

NOTE: This ADR was syncronized on March 12, 2021, but has been mantained in our knowledge base since Feb. 25, 2021. See the team's meeting on Feb 25, 2021 for a citation of this.

## Context and Problem Statement

Should we kill the task tracker feature? This means we would stop work on issues E2S8, E2S9, and E2T2.

## Decision Drivers <!-- optional -->

* Schedule Risk
* Mentor Feedback & Change Request 
* Customer Research

## Considered Options

* Kill the all task tracker features
* Kill the requested features, and implement new features that leverage local storage
* Kill only some of the task tracker features or sub-features
* Proceed as planned and do not stop work on any planned features 

## Decision Outcome

Chosen option: "Kill the all task tracker features", because it substantially reduces schedule risk, prevents us from shipping lower-quality features, and improves customer experience by reducing clicks-per-action for end users. 

Change order: that we will completely kill the tasktracker feature  
Thus, Kill:
- E2S8
- E2S9
- E2T2

### Positive Consequences <!-- optional -->

* Substantially reduces schedule risk
* Coincides with mentor advice/reccomendation (that most customers in our segment use other methods of task tracking like notebooks, learning management systems or project management softwares)
* Prevents us from shipping low-quality, half-baked features
* Improves CX by reducing clicks-per-action for end users for important settings configurations

### Negative Consequences <!-- optional -->

* Eliminates some key product benefits for certain customer segments
* Deviates from project proposal

## Pros and Cons of the Options <!-- optional -->

### Kill the all task tracker features

Example - eliminating the feature removes a navigation layer from the hamburger menu, which would now open directly to the Settings view, which is more efficient for most of our customer base.

* Good, because it would decrease clicks per action for end users, improving CX
* Good, because doing this would substantially reduce schedule risk
* Good, because it coincides with mentor advice/reccomendation (that most customers in our segment use other methods of task tracking like notebooks, learning management systems or project management softwares)

### Kill the requested features, and implement new features that leverage local storage

At the team's meeting, it was proposed that new features that leverage local storage would be implemented instead of the task tracker. 

Example - when you refresh the page, the toggle switch settings would stay as you left them:

* Good, because it helps customers if they happen to refresh the page and want to keep their original settings
* Bad, because it increases complexity (this feature was never accounted for in the design docs per se, and as such schedule risk could have an unlimited upside)
* Bad, because this is an engineering-centric feature, not a customer-centric feature. At no point did user research reveal that this would be materially useful to our target customers. The above "good" reason is thus simply engineering-centric conjecture about users.

### Kill only some of the task tracker features or sub-features

Example: we might drop the feature that allows users to grab and re-order tasks after they have been created.

* Good, because it would allow us to deliver on the core promises of our task tracker for certain customer segments
* Bad, because it would increase clicks-per-action
* Bad, because it would result in tracker features that are lower-quality and detrimental to UX. There is no point in shipping a half-baked feature that has eliminated key elements that make a task intuitive and easy to use; at that point it is better that such a feature does not exist at all.

### Proceed as planned and do not stop work on any planned features 

* Good, because it would keep our project faithful to the original pitch and scope
* Good, because it would solve a problem that is nontrivial for a vocal minority of our potential end users
* Bad, because we have not broken down all of the various components needed to deliver on the tracker described in the design doc (changing/dragging order of tasks, editing a task name BEFORE creating it, etc.)
* Bad, because it would likely be delivered late or not even ship on time at all
* Bad, because it would not be the best use of reach time even if we did have such time and goes against mentor advice (i.e. Chad asserts that a user tutorial/walkthrough or accessibility changes would be more useful or relevant to our customers).

