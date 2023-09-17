import { game } from ".";
import { Card, CoupleCard } from "../types";
import { action, makeObservable, observable } from "mobx";

class BattleField {
  cards: CoupleCard = {
    my: [],
    his: [],
  };

  constructor() {
    makeObservable(this, {
      cards: observable,
      addMyCard: action,
      addHisCard: action,
    });
  }

  addMyCard = (card: Card) => {
    this.cards.my.push(card);
    game.toggleStep();
  };

  addHisCard = (card: Card) => {
    this.cards.his.push(card);
    game.toggleStep();
  };

  clearBattleField<T, K>(myCards: T, hisCards: K) {
    this.cards.my = [];
    this.cards.his = [];

    game.addPlayersCards(myCards, hisCards);

    if (!game.isGetCard) {
      game.toggleStep();
      game.toggleAttack();
    } else {
      game.setIsGetCard(false);
    }
  }
}

export default new BattleField();
