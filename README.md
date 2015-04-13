# Match Game

## Overview
 This is a demo React application using Fluxxor to manage boilerplate Store, Dispatcher, and Action code.

 A mix of paired cards are generated on each new page load. The state of the game is managed in the GameStore.  As cards get clicked, GameStore events are triggered that update the state which in turn, update the necessary React components.

## Usage
1. Download dependencies:
 ```
 npm install
 ```
2. Bundle javascript:
 ```
 gulp
 ```
3. Run web server (default: listening on port 3000):
 ```
 node index.js
 ```