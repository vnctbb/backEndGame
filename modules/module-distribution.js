'use strict'

/**
 * Module pour la distribution des cartes
 */

const toolbox = require('./module-toolbox.js');

const allCardGiven = [];

// fonction qui donne une carte
function takeCard (db) {
  let index = toolbox.getRandomNumber(db);
  if(db[index].given){
    while(db[index].given){
      index = toolbox.getRandomNumber(db);
    }
  }
  db[index].given = true;
  allCardGiven.push(db[index]);
  const item = db[index];
  const infoGiven = {
    id : item._id,
    titre : item.titre
  }
  return infoGiven;
};

// fonction qui créé une main de carte pour un joueur
function giveHand (nbOfCardNeeded, db) {
  const hand = [];
  for(let i = 0; i<nbOfCardNeeded; i++){
    hand.push(takeCard(db));
  };
  return hand;
};

// fonction qui vérifié l'ordre des cartes
function cardVerification (liste, id) {
  const orderFullInformation = [];
  let actualCard;
  liste.forEach(card => {
    allCardGiven.forEach(cardFullInfo => {
      if(card == cardFullInfo._id){
        orderFullInformation.push(cardFullInfo);
        if(id == cardFullInfo._id)
          actualCard = cardFullInfo;
      }
    });
  });
  let returnValue = true;
  for(let i = 1; i<orderFullInformation.length; i++) {
    if(orderFullInformation[i].date < orderFullInformation[i-1].date){
      returnValue = false;
    }
  };
  const retour = {
    actualCard : actualCard,
    returnValue : returnValue
  };
  return retour;
};

module.exports = {
  giveHand : giveHand,
  takeCard : takeCard,
  cardVerification : cardVerification
};