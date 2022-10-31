https://user-images.githubusercontent.com/102887694/199010944-02d8b36f-30e4-40c8-8a3f-3757075017c3.mov

<h1 align="center">
	Rising Sign
</h1>

## Overview


- **Rising Sign is a dating app with depth, which allows users to filter prospective matches by astrological sign.** Standard features of a dating app are implemented including: live chat, matching and unmatching and picture uploads.


The site is live here: https://rising-sign.herokuapp.com/
 ...get matching!

 We aim to combine the fun of modern dating application with the ancient matchmaking wisdom of astrology.


Rising Sign is built with the MERN Stack: MongoDB, Express, React and Node.js.


## Features and Techniques

A lot of work went into the visual styling of the site, creating a cosmic motif. In order to simulate the look of an infinite ride through a field of stars on our landing page, we started with one "star" of width and height 3px, set it to position: fixed so that it has no affect on other elements of the page, and used a JS function to generate a bunch of box-shadows with random x and y offsets and blur and spread values. This is done twice, with the first layer receiving an @keyframes infinite zoom animation, and the second layer an additional delay animation to stagger the two.

 ```
.space-layer{
   position: fixed;
   top: 50%;
   left: 50%;
   height: 3px;
   width: 3px;
   background-color: rgba(255, 255, 255, 0.65);
   border-radius: 50%;
   box-shadow: -16vw -19vh 3px 0px rgba(255, 255, 255, 0.65),27vw 13vh 1px 3px rgba(255, 255, 255, 0.65),41vw -38vh 0px 3px rgba(255, 255, 255, 0.65),23vw -5vh 1px 2px rgba(255, 255, 255, 0.65),9vw 40vh 0px 3px rgba(255, 255, 255, 0.65),-33vw -11vh 2px 2px rgba(255, 255, 255, 0.65),-36vw -37vh 1px 2px rgba(255, 255, 255, 0.65),9vw 48vh 0px 1px rgba(255, 255, 255, 0.65),29vw 35vh 1px 1px rgba(255, 255, 255, 0.65),11vw -5vh 1px 3px rgba(255, 255, 255, 0.65),-44vw -9vh 1px 3px rgba(255, 255, 255, 0.65),44vw -16vh 3px 1px rgba(255, 255, 255, 0.65),-9vw -47vh 0px 0px rgba(255, 255, 255, 0.65),27vw -27vh 1px 0px rgba(255, 255, 255, 0.65),24vw -31vh 2px 2px rgba(255, 255, 255, 0.65),2vw 21vh 1px 0px rgba(255, 255, 255, 0.65),-23vw -12vh 0px 2px rgba(255, 255, 255, 0.65),-18vw 25vh 0px 3px rgba(255, 255, 255, 0.65),50vw -25vh 3px 3px rgba(255, 255, 255, 0.65),49vw -47vh 3px 0px rgba(255, 255, 255, 0.65),18vw 7vh 0px 3px rgba(255, 255, 255, 0.65),-28vw -25vh 3px 3px rgba(255, 255, 255, 0.65),16vw 29vh 3px 0px rgba(255, 255, 255, 0.65),23vw 25vh 1px 3px rgba(255, 255, 255, 0.65),30vw 2vh 3px 1px rgba(255, 255, 255, 0.65),28vw 1vh 1px 0px rgba(255, 255, 255, 0.65),24vw 45vh 0px 1px rgba(255, 255, 255, 0.65),38vw -2vh 1px 0px rgba(255, 255, 255, 0.65),7vw -2vh 1px 3px rgba(255, 255, 255, 0.65),40vw -40vh 2px 1px rgba(255, 255, 255, 0.65),-23vw -7vh 0px 0px rgba(255, 255, 255, 0.65),-40vw -24vh 2px 0px rgba(255, 255, 255, 0.65);
   animation-name: zoom;
   animation-duration: 13s;
   animation-timing-function: linear;
   animation-iteration-count: infinite;
}
 ```


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

Git clone the repo. Cd into backend and run 'npm install. Do the same in the frontend directory. Then run `npm run dev` in the backend and `npm start` on the frontend to fire up backend and frotend servers.


