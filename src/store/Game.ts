import { action, makeObservable, observable } from "mobx";
import { Card, TypeCard } from "../types";
import { cards as allCards, cards } from "../cards";
class Game {
  trumpCard: TypeCard = TypeCard.bubi;
  isMyStep: boolean = false;
  isGetCard: boolean = false;
  isMyAttack: boolean = false;
  deckCards: Array<Card> = [];
  attackCard: Card = allCards[0];

  constructor() {
    makeObservable(this, {
      isMyStep: observable,
      deckCards: observable,
      isMyAttack: observable,
      attackCard: observable,
      isGetCard: observable,
      reduceCards: action,
    });
  }

  toggleStep() {
    this.isMyStep = !this.isMyStep;
  }

  toggleAttack() {
    this.isMyAttack = !this.isMyAttack;
  }

  setIsGetCard(isGetCard: boolean) {
    this.isGetCard = isGetCard;
  }

  setAttackCard(card: Card) {
    this.attackCard = card;
  }

  defineStep(myCards: Card[], hisCards: Card[]) {
    const myJuniorTrumpRank = this.defineJuniorTrumpCard(myCards);
    const hisJuniorTrumpRank = this.defineJuniorTrumpCard(hisCards);

    if (myJuniorTrumpRank) {
      if (myJuniorTrumpRank < hisJuniorTrumpRank || !hisJuniorTrumpRank) {
        this.toggleStep();
        this.toggleAttack();
      }
    }
  }

  mixDeck() {
    this.deckCards = this.deckCards.sort(() => Math.random() - 0.5);
    this.trumpCard = this.deckCards[35].type;
  }

  startGame() {
    this.deckCards = allCards;
    this.mixDeck();

    const firstHisCards = this.reduceCards(6);
    const firstMyCards = this.reduceCards(6);

    this.defineStep(firstMyCards, firstHisCards);

    return {
      firstHisCards,
      firstMyCards,
    };
  }
  addPlayersCards(my: any, his: any) {
    const myNeed = 6 - my.cards.length;
    const hisNeed = 6 - his.cards.length;

    my.addCards(this.reduceCards(myNeed > 0 ? myNeed : 0));
    his.addCards(this.reduceCards(myNeed > 0 ? hisNeed : 0));
  }

  defineJuniorTrumpCard(cards: Card[]) {
    const trumpRanks = cards
      .filter((card) => card.type === this.trumpCard)
      .map((card) => card.rank);

    if (trumpRanks.length) {
      return Math.min(...trumpRanks);
    }

    return 0;
  }
  reduceCards(countCards: number): Array<Card> {
    const removedCard = this.deckCards.splice(0, countCards);
    return removedCard;
  }
}

export default Game;
