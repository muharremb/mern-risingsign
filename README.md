<h1 align="center">
	Rising Sign
</h1>

## Overview


- **Rising Sign is a dating app with depth, which allows user to filter prospective matches by astrological sign.** Standard features of a dating app are implemented including: live chat, matching and unmatching and picture uploads.


The site is live here: https://rising-sign.herokuapp.com/
 ...get matching!

 We aim to combine the fun of modern dating application with the ancient matchmaking wisdom of astrology.


Rising Sign is built with the MERN Stack: MongoDB, Express, React and Node.js.


## Features and Techniques

A lot of work went into the visual styling of the site, creating a cosmic motif. In order to simulate the look of an infinite ride through a field of stars on our landing page, we started with one "star" of width and height 3px, set it to position: fixed so that it has no affect on other elements of the page, and used a JS function to generate a bunch of box-shadows with random x and y offsets and blur and spread values. This is done twice, with the first layer receiving an @keyframes infinite zoom animation, and the second layer an additional delay animation to stagger the two.


 ``` @keyframes zoom {
   0%{
      transform: scale(.75);
      opacity: 0;
   }
   10%{
      opacity: .15;
   }
   40%{
      opacity: 1;
   }
   100%{
      transform: scale(1.5);
      opacity: 0;
   }
}

 ```

## Development setup

Git clone the repo. Cd into backend and run 'npm install. Do the same in the frontend directory. Then run 'npm start dev' in the backend and 'npm start' on the frontend to fire up backend and frotend servers.


