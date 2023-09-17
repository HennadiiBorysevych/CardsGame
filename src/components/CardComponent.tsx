import * as React from "react";
import { Card } from "../types";

interface ICardComponentProps {
  card: Card;
  onClick?: () => void;
}

const CardComponent: React.FunctionComponent<ICardComponentProps> = ({
  card,
  onClick,
}) => {
  return (
    <div className="card" onClick={onClick}>
      <img src={card.img} alt="card" width={80} key={card.id} />
    </div>
  );
};

export default CardComponent;
