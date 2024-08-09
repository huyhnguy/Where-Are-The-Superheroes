# Where Are The Superheroes?

## Demo

[https://wheres-waldo-frontend.vercel.app/](https://wheres-waldo-frontend.vercel.app/)

![Screenshot of front page]( wheres-waldo-pic.png "Front page")

## Description

### Overview
This project allows the user to play a game similar to Where's Waldo except they are looking for superheroes. I built this to figure out how to make a photo tagging app that is able to recognize the specific areas that a user is clicking and then use that information to give the user feedback. What makes this project unique is the superhero theme it has.

### Key Features
- audio cues for incorrect guesses, correct guesses, and for winning the game
- hint pop up when the user hasn't found a character for 2 minutes
- feedback to user for their guesses
- timer that keeps track of the user's time
- scoreboard for the user to compare their score with other users

### Technology Stack
- React
- NodeJS
- Express
- MongoDB
- Mongoose
- Postman
- Heroku (backend API)
- Vercel (frontend)
- HTML
- CSS
- Javascript

## Usage

Find all the characters noted on the screen. A hint pop up will show if no character is found for 2 minutes that will present an option for the user to receive or to not receive a hint. If they click yes, it will provide a hint message for one of the unfound characters. Once all the characters are found, submit your name and the site will redirect the user to the scoreboard. From there, the user can look at all the scores and can replay the game by pressing the replay button at the bottom right.

## Future Improvements

On mobile screens, the user will want to zoom because the image is so small. Once they do zoom, the fixed header for the timer and characters go out of view. The pop ups also go out of view. In the future I'd like to implement a way for the headers, the pop ups to remain in view even if the user zooms.

## Credits

- Main image was found at https://www.reddit.com/r/gaming/comments/7r9tlf/where_is_waldo/
- All icons were from an icon library at https://fontawesome.com/icons