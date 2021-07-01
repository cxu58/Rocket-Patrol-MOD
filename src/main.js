// name:Chenyang Xu
// title:Rocket Patrol Mods
// date:6.30
// time: I took ten hours
// Breakdown:140
//Display the time remaining (in seconds) on the screen (10)
//In my game, players can see the time remaining for them.
//Create a new spaceship type (w/ new artwork) that's smaller, moves faster, and is worth more points (20)
//I create a new ship called "bird" in my game, which worth 40, 50, 60 scores, and they are smaller and faster.
//Implement an alternating two-player mode (20)
//In my game menu scene, I add two choice for players so that they can choose two game mode: single player or multiplayer.
//Implement a new timing/scoring mechanism that adds time to the clock for successful hits (20)
//In the game, when players hit one ship, they will get five more seconds to play, which helps them get a higher score.
//Implement mouse control for player movement and mouse click to fire (20)
//players can control the rocket through their mouse.
//Implement a simultaneous two-player mode (30)
//There are two rockets in multiplayer mode. Players can compete with each other to get a higher score.
//10 + 20 + 20 + 20 + 20 + 30 + 20(successful tutorial) = 140
//I learned a lot from Guanchen. Thank you for teaching me how to show time remaining and how to make a connection between player's mouse and rocket's behavior!
let config = {
    type: Phaser.CANVAS,
    width: 640,
    height: 480,
    scene: [ Menu, Play, SinglePlayer]
}

let game = new Phaser.Game(config);

// set UI sizes
let borderUISize = game.config.height / 15;
let borderPadding = borderUISize / 3;

// reserve keyboard variables
let keyF, keyR, keyj, keyA, keyD, keyLEFT, keyRIGHT;