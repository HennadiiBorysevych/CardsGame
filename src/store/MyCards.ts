import { makeObservable, observable } from "mobx";
import PlayerCards from "./PlayerCards";
import { Card } from "../types";

class MyCards extends PlayerCards {
  cards: Array<Card> = [];
  
  constructor() {
    super();
  
    makeObservable(this, {
      cards: observable,
    });
  }
}

export default new MyCards();
