import { IEvents } from '../base/events';
import { IBasket, IItem, IBasketModel } from '../../types';

export class BasketModel implements IBasketModel {
  protected basketItemsList: string[] = []; //array of ids
  protected fullPrice: number; //? mb remove
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  getBasket() {
    return this.basketItemsList;
  }

  setBasket(basketItems: string[]) {
    this.basketItemsList = basketItems;
    this.events.emit('basket:changed');
    this.countAmount();
    this.countFullPrice();
  }

  addItem(id: string) {
    this.basketItemsList.push(id);
    this.events.emit('basket:changed');
    this.countAmount();
    this.countFullPrice();
  }

  deleteItem(id: string) {
    this.basketItemsList = this.basketItemsList.filter((itemId) => itemId !== id);
    this.events.emit('basket:changed');
    this.countAmount();
    this.countFullPrice();
  }

  countAmount() {
    return this.basketItemsList.length;
  }

  countFullPrice(){
    this.fullPrice = 0;
    //! this.basketItemsList.forEach((id) => this.fullPrice += item.price);
    return this.fullPrice;
  }

  includesItem(id: string): boolean {
		return this.basketItemsList.includes(id);
	}

  clearBasket(){
    this.basketItemsList = [];
    this.fullPrice = 0;
    this.events.emit('basket:changed');
  }
}