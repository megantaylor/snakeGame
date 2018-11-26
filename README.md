# Instructions

- Open index.html in Chrome or Firefox
- Use your arrow keys to change the snake's direction: up, left, right, and down.
- Eat food to gain points.
- Don't run the snake into the wall, or its own tail.
- Each time the snake eats, the game will get a little bit faster.

# Discussion

This is actually the first thing I've ever built using the Canvas API! It was super fun, but I definitely feel like I'm missing a couple of concepts that would be obvious with more experience.

I started with the simplest possible working version I could write, given the rubric. Then I eliminated most of the bugs and added a couple of easy features (speed increase, end game alert, play btn to initialize/reinitialize the game) before I ran out of time.

I tested this in the latest versions of Chrome, Firefox and Safari.

# Requirements

- ~3 hours of coding time
- client-side app
- vanilla JavaScript
- ES6 where appropriate

# Next Steps

- fix end game alert timing
- use requestAnimationFrame instead of setTimeout
- what happens if this is loaded on a mobile device?
- what should the game do if the window is resized during play?
- speed value decrease actually means the game is going faster, convert this into a user-friendly unit in UI
- set upper limit on snake speed to prevent setTimeout issues
- canvas lines seem blurry
- add game over screen instead of alert
- make canvas area responsive to screen size (figure out what the ideal canvas size for this game is?)
- disable play button if game in progress or allow pause?
- general UI polish: colors, typography, button styling, graphics
- separate canvas js from game js, break game js down into modules (snake, food, engine)
- super bonus next step: refactor the whole thing with state-based functional approach
