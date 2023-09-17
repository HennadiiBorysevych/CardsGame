import * as React from "react";
import { Card } from "../types";
import CardComponent from "./CardComponent";

interface IMyCardsComponentsProps {
  cards: Card[];
  onStep: (card: Card) => void;
}

const MyCardsComponents: React.FC<IMyCardsComponentsProps> = ({
  cards,
  onStep,
}) => {
  return (
    <div className="playerCards">
      {cards.map((card) => (
        <CardComponent key={card.id} card={card} onClick={() => onStep(card)} />
      ))}
    </div>
  );
};

export default MyCardsComponents;
