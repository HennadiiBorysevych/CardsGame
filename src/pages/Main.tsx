import { observer } from "mobx-react-lite";
import React, { useEffect } from "react";
import BattleFieldComponent from "../components/BattleFieldComponent";
import DeckComponent from "../components/DeckComponent";
import GameOver from "../components/GameOver";
import HisCardsComponents from "../components/HisCardsComponent";
import MyActions from "../components/MyActions";
import MyCardsComponents from "../components/MyCardsComponent";
import { battleField, hisCards, myCards, game } from "../store";

const Main: React.FC = observer(() => {
  const startGame = () => {
    const { firstHisCards, firstMyCards } = game.startGame();
    hisCards.addCards(firstHisCards);
    hisCards.addCards(firstHisCards);
    myCards.addCards(firstMyCards);
  };

  const hisAction = () => {
    if (!game.isMyStep) {
      const battleFieldCards = [...battleField.cards.his, battleField.cards.my];

      const hisJuniorCard = hisCards.defineCardForAction(battleFieldCards);

      if (hisJuniorCard) {
        battleField.addHisCard(hisJuniorCard);
      } else {
        battleField.clearBattleField(myCards,hisCards)
      }
    }
  };

  useEffect(startGame, []);

  useEffect(hisAction, [game.isMyStep]);

  return (
    <>
      <HisCardsComponents cards={hisCards.cards} />
      <MyCardsComponents cards={myCards.cards} onStep={() => {}} />
      <BattleFieldComponent cards={battleField.cards} />
    </>
  );
});

export default Main;
