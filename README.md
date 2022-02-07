# BubbleTrouble

## Description
Bubble Trouble can be categorized as an Indi version of the famous game of 80's, this game will got only 1 level where
the enemies will appear non-stop till your player die.

## MVP
- The player will be able to move between the screen jumping and falling depending of their position
- The player will be able to shoot to the enemies
- The enemies will appear randomly at the top of the screen and will start moving in direction of the player.

## Backlog
- Instead kill the enemies when get a shoot, they will be put inside the bubble.
- Add an highscore register

## Data Structure

### main.js
- startGame
- eventListeners for keystrokes

### game.js
- Game class: 
  - clearBackground
  - drawBackground
  - spawnAttack
  - gameLoop

### player.js
- Player class:
  - drawPlayer
  - moveLeft
  - moveRight
  - jump
  - gravity
  - getImageUsed

### enemy.js
- Enemy class:
  - drawEnemy
  - moveLeft
  - moveRight
  - getImageUsed

### attack.js
- Attack class:
  - drawAttack
  - moveAttack
