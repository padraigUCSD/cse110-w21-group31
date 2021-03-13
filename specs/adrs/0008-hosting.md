# Use Netlify to host our DEV, QA, and Production/Live environments

* Status: accepted
* Deciders: Padraig MacGabann, David Cruz
* Date: 2021-02-15 

## Context and Problem Statement

How should we host our Development, QA, and Production Environments?

## Decision Drivers <!-- optional -->

* Time-to-value
* Schedule Risk
* Prior expertise with hyperscalers 
* Customer Experience (CX)
* Optimizing Interaction Design of our CI pipeline for our dev team - the more clicks a process has, the less efficient it is, and the harder it will be for us to maintain compliance with the IT service vision
* Team has no budget

## Considered Options

* IBM Cloud Foundry
* Netlify Edge CDN
* AWS Amplify
* Azure App Service

## Decision Outcome

Chosen option: "Netlify Edge CDN", because it is an easy-to-use, fast and powerful solution that provides differentiated services such as deploy previews for PRs that improve the developer experience. Benefically, using Netlify will be free for the current context of this project.

NOTE: Upon the transition from IBM to Netlify, master now deploys to a DEV environment https://100minutes-dev.netlify.app/ instead of QA automatically. This is to realize the full and proper implemenation of the QA environment as a promoted stage for manual QA.  QA will now reflect release candidates entering (manual) QA - and may have accelerated clocks to aid manual testers in working through all stages of the pomo cycles in a reasonable amount of time.

### Positive Consequences <!-- optional -->

* Provides a mature solution that is easy-to-use, fast and powerful
* Provides differentiated services such as deploy previews for PRs that improve the developer experience

### Negative Consequences <!-- optional -->

* Creates re-work for CI/CD team related to documentation and change management

## Pros and Cons of the Options <!-- optional -->

### IBM Cloud Foundry

* Good, because it builds and deploys automatically from master on each new commit
* Good, because it can be set up easily
* Good, because while not free in cost, hosting costs applied to Padraig's IBM Cloud account would be reimbursed by IBM due to a prior agreement, incurring no costs for the team.
* Bad, because requires source to be configured as a node.js server (creates work that adds no value, and needless complexity) 
* Bad, because it lacks deploy previews by default
* Bad, because the free URLs are either hard to remember for everyone (XXX.us-south.cf.appdomain.cloud), or from the perspective of customers when the app is deployed to the live env (XXX.mybluemix.net)

Spec:
![ci v1 chart png](https://ligmabukkit.s3-us-west-1.amazonaws.com/cse110/adr-0008/CSE+110+CI_CD+-+v1.png)


### Netlify Edge CDN

* Good, because it builds and deploys automatically from master on each new commit
* Good, because it provides deploy previews
* Good, because it can be set up easily
* Good, because our project is free-tier eligible on Netlify, incurring no costs for the team.
* Good, because the free URLs are easy to remember (XXX.netlify.app)
* Bad, because it will require us to revert work for IBM Cloud Foundry and re-update CI/CD documentation

Spec:
![ci v2 chart png](https://ligmabukkit.s3-us-west-1.amazonaws.com/cse110/adr-0008/CSE+110+CI_CD+-+v2.png)

### AWS Amplify

* Good, because it builds and deploys automatically from master on each new commit
* Good, because our project is free-tier eligible on AWS, incurring no costs for the team.
* Bad, because it will take longer to configure without being distinctly better than other options for our purposes

### Azure App Service

* Good, because it builds and deploys automatically from master on each new commit
* Good, because it can be set up easily
* Bad, because requires source to be configured as a node.js server (creates work that adds no value, and needless complexity) 
* Bad, because our project is not eligible for free-tier on Azure, requiring the team to authorize an expense account and spin up some sort of finance function. This is beyond 

## Links 

This change is reflected in v2 of our CI/CD pipeline diagram under /specs/ci. This chart is also shown above under the netlify option.


