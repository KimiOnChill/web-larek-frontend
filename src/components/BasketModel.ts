import { IEvents } from './base/events';
import { IBasket, IItem } from '../types';

//todo create tests
export class BasketModel implements IBasket {
  protected basketItemsList: IItem[] = [];
  protected fullPrice: number = 0;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  getBasket() {
    return this.basketItemsList;
  }

  addItem(item: IItem) {
    this.basketItemsList.push(item);
    this.events.emit('basket:changed');
    this.countAmount();
    this.countFullPrice();
  }

  deleteItem(itemId: string) {
    this.basketItemsList = this.basketItemsList.filter((item) => item.id !== itemId);
    this.events.emit('basket:changed');
    this.countAmount();
    //todo minus item price
    this.countFullPrice();
  }

  countAmount() {
    return this.basketItemsList.length;
  }

  countFullPrice(){
    this.basketItemsList.forEach((item) => this.fullPrice += item.price);
    return this.fullPrice;
  }

  isPossibleToBuy(item: IItem){
    item.isBought = this.basketItemsList.includes(item)
    return !item.isBought;
  }

  clearBasket(){
    this.basketItemsList = [];
    this.fullPrice = 0;
    this.events.emit('basket:changed');
    this.countAmount();
  }
}