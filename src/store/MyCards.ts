import { makeObservable, observable } from "mobx";
import PlayerCards from "./PlayerCards";
import { Card } from "../types";
import { game } from ".";

class MyCards extends PlayerCards {
  cards: Array<Card> = [];

  constructor() {
    super();

    makeObservable(this, {
      cards: observable,
    });
  }

  checkMyStep(card: Card, battleFieldCards: Card[]) {
    if (game.isMyAttack) {
      return this.myAttack(card, battleFieldCards);
    }

    return this.myDefense(card, game.attackCard);
  }

  myAttack(card: Card, battleFieldCards: Card[]) {
    if (
      !battleFieldCards.length ||
      battleFieldCards.some((c) => c.rank === card.rank)
    ) {
      game.setAttackCard(card);
      this.reduceCard(card.id);
      return card;
    }
    alert("This is no such card on battlefield");
  }

  myDefense(card: Card, attackCard: Card) {
    const strongerCard =
      card.rank > attackCard.rank && card.type === attackCard.type;
    const strongerTrumpCard =
      attackCard.type !== game.trumpCard && card.type === game.trumpCard;

    if (strongerCard || strongerTrumpCard) {
      this.reduceCard(card.id);
      return card;
    }

    alert("He has stronger card on hand");
  }
}

export default new MyCards();
