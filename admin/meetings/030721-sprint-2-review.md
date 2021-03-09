## Access the google doc with attached images [here](https://docs.google.com/document/d/17iK6Hen8_th9qyASrt9GvUHyQVlQRTUddHoH02goKlY/edit?usp=sharing)

Josh
- Worked with Padraig to sort out “breakpoints” which were able to be solved through setting meta tags with viewports and scaling.
- Made a [ppt:](https://docs.google.com/presentation/d/1rjm-UZ4hkReRsHgM7vzs0ZRjP53eYtdox-RqtQDFFkI/edit?usp=sharing)
- Daily-standup notes
- Meeting notes scribe

David
- Set up CI for Cypress DOM testing and visual diff testing
- Wrote some DOM and visual diff tests

Fixed a visual bug where the timer in long break mode would start at 15 minutes, instead of 30
- Code review for unit tests and features
- Wrote some ADRs documenting project architecture

Padraig
- Collaborated with Josh and Did manual QA on rc-1 to figure out what fixes to make, incl. Fixing navbar errors, sizing issues, etc.
- Did code review for frontend work, including getting labels and switches to work well
- Made NotificationController into a class so that we can modify it in SettingsView as well as set up the basics of SettingView and the no mercy toggle therein
- Collaborated with Diego and David to implement AutoBreak/Pomo logic within pcc
- Documented our updated CI/CD pipeline in a pdf file in the ci dir to reflect current ops, and set up the QA and prod environments in Netlify.

Diego
- Collaborated with Padraig on AutoBreak/AutoPomo implementation in pomo-counter-controller.js.
- Bug fixes for AutoPomo/AutoBreak (pomo-counter-controller.js, timer-controller.js, timer-controls-view.js)
prevent skip button from showing up prematurely (and not disappearing after)
- reset time display when skip button is pressed instead of showing remaining time in long break

Nick
- Writing tests for the timer-controller.js
- Collaborate with Stephen and Dexter to test the notification-controller.js

Christine
- Daily standups
- Weekly discussion with Chad
- Worked with Padraig to get clarification of the tasks for this week and to review the labels for the switches
- Labels for switches (AutoBreak, AutoPomo, NoMercy)

Stephen
- Daily standups and weekly team/mentor meetings
- Unit tests for playSound in notification-controller.js
- Worked with Nick and Dexter to write tests for the constructor and setSound in notification-controller.js

Dexter
- Daily Standups
- Worked with Padraig and David to develop Cypher and Vis-Diff tests
- Tested Notification-Controller.js with Nick and Stephen


