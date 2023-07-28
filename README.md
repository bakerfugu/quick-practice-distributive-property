# Quick Interactive Math Practice

![Screenshot of Distributive Property Widget](https://i.imgur.com/Nc0abVU.png)

This is an interactive widget made to help students check their understanding of the distributive property. It uses a grid visualization for each question and answer to emphasize how the distributive property works. There are five questions, with a small celebration once you get all of them!

You can check out a [live demo here](https://csb-c0wic.netlify.app/).

If you want to edit the code, [try it out on Code Sandbox.](https://codesandbox.io/s/github/bakerfugu/quick-practice-distributive-property)

The widget has several components made to be easily adaptable in other projects. The BlockGrid component displays a grid of squares, then labels the dimensions of the grid. The Answer component is a selectable card displaying some BlockGrids and an answer description. The Question component displays a BlockGrid and text for the question, with four Answers below. The QuestionManager component decides which question should be displayed, and checks the answers when a user submits. All components scale relative to the screen size, though the LaTeX may not be perfect.

I made this widget as a part of my application for an internship at [Almost Fun](https://www.almostfun.org/).
