'use strict'

/**
 * Module pour créer de nouveau joueur
 */

const distribution = require('./module-distribution.js');
const everyPlayer = require('./module-competitor.js');

// constructeur de joueur
class NewPlayer {
  constructor (id, username, db, avatar) {
    this.id = id;
    this.name = username;
    this.hand = distribution.giveHand(4, db);
    this.avatar = avatar;
    this.nbOfCard = 4;
    this.streaks = 1;
    this.points = 0;
    this.ready = false;
  };
  // méthode pour passer ready à true
  nowReady () {
    everyPlayer.list.forEach(onePlayer => {
      if(onePlayer.id == this.id){
        this.ready = true;
        onePlayer.ready = true;
      }
    });
  }
  // methode carte bien positionnée
  positionOk (index) {
    this.hand.splice(index, 1);
    this.nbOfCard -= 1;
    this.points += 100 * this.streaks;
    this.streaks += 0.2;
  }
}

module.exports = NewPlayer;