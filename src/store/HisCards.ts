import { action, makeObservable, observable } from "mobx";
import PlayerCards from "./PlayerCards";
import { Card } from "../types";

class HisCards extends PlayerCards {
  cards: Array<Card> = [];
  constructor() {
    super();

    makeObservable(this, {
      cards: observable,
    });
  }

  defineJuniorExistCard(battleFieldCards: Card[]) {
    const existRankCards = this.cards.filter(
      (card) => !!battleFieldCards.find((c) => c.rank === card.rank)
    );
    return existRankCards.length ? this.defineJuniorCard(existRankCards) : null;
  }
  defineJuniorCard(cards: Card[]): Card {
    const juniorCard = cards.reduce((acc, curCard) =>
      acc?.rank < curCard?.rank ? acc : curCard
    );
    if (juniorCard) {
      this.reduceCard(juniorCard.id);
    }
    return juniorCard;
  }
}

export default new HisCards();
