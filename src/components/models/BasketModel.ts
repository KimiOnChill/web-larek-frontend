import { IEvents } from '../base/events';
import { IBasket, IItem, IBasketModel } from '../../types';

export class BasketModel implements IBasketModel {
  protected basketItemsList: IItem[] = [];
  protected fullPrice: number;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  getBasket() {
    return this.basketItemsList;
  }

  setBasket(basketItems: IItem[]) {
    this.basketItemsList = basketItems;
    this.events.emit('basket:changed');
    this.countAmount();
    this.countFullPrice();
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
    this.countFullPrice();
  }

  countAmount() {
    return this.basketItemsList.length;
  }

  countFullPrice(){
    this.fullPrice = 0;
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
  }
}