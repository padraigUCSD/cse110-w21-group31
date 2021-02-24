# Sprint Review


Christine Phan:
- Implemented the navbar and the sidebar menu, including writing the HTML and CSS, adding different CSS groupings/combinators to make the sidebar slide in when the hamburger menu is clicked and to make the sidebar slide out when the X is clicked.

Dexter Hamilton:
- Implemented basic tests for sound notification, waiting on full notification controller
- Implemented tests for start button (hide on click, start, etc)

Josh Chou
- Implemented the sound notification core functionality, including writing the notification javascript to bind and trigger the notifications on our custom state switcher. 

David Cruz
- Implemented timer logic (controller), such as setting the timer and registering callbacks on certain events (timer tick, timer reaches 0, etc.)
- Implemented pomodoro cycle state machine (controller), to automatically transition from pomo to break
- Implemented pomo count tracking (controller), to advance to a long break after 4 pomos
- Implemented long break skip feature (controller and view), to allow user to skip the 30 minute long break after at least 15 minutes had passed. 
- Wrote unit tests for controlling the timer, and checking state transitions

Diego Alfaro:
- Implemented timer view, binding the timer controller to the index html page so it updates every time the timer changes.

Stephen Wang:
- Implemented unit tests for controlling the pomo counter, such as testing the constructor, if it advances to a break/pomo, indicators

Nhat Nguyen:
- Implemented the bubbles indicator and background changing.

Padraig MacGabann: 
- Implemented code review system to clear any code submissions into the repo
- Defined project directory structure
- Architected CI/CD workflow and set up deployment environments, first with IBM Cloud Foundry and later with Netlify Edge
- Provided coaching & primary implementation support for E1S3 (bubbles/indicators) and E1S4 (background color change), ensuring proper separation of view and controller
- Provided coaching & implementation support for controller unit tests
- Managed pull requests and merged test branches

<img src='https://i.imgur.com/XTvwvw0.gif' title='Current Preview' width='' alt='Video Walkthrough' />
(Gif doesn't include sound notification)
