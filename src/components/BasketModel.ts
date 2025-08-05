import { IEvents } from './base/events';
import { IBasket, IItem } from '../types';

//todo new class for basket items
//todo create tests
export class BasketModel implements IBasket {
  protected itemsList: IItem[] = [];
  protected fullPrice: number = 0;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  addItem(item: IItem) {
    this.itemsList.push(item);
    this.events.emit('basket:changed');
    this.countFullPrice();
  }

  deleteItem(itemId: string, payload: Function | null) {
    this.itemsList = this.itemsList.filter((x) => x.id !== itemId);
    this.events.emit('basket:changed');
    this.countFullPrice();
  }

  countFullPrice(){
    return this.itemsList.length;
  }

  isPossibleToBuy(item: IItem){
    return !this.itemsList.includes(item);
  }

  clearBasket(){
    this.itemsList = [];
    this.events.emit('basket:changed');
    this.countFullPrice();
  }
}