import { IEvents } from '../base/events';
import { IBasket, IItem, IBasketModel } from '../../types';

export class BasketModel implements IBasketModel {
  protected basketItemsList: string[] = []; //array of ids
  protected fullPrice: number;
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
  }

  addItem(id: string) {
    this.basketItemsList.push(id);
    this.setBasket(this.basketItemsList);
  }

  deleteItem(id: string) {
    this.basketItemsList = this.basketItemsList.filter((itemId) => itemId !== id);
    this.setBasket(this.basketItemsList);
  }

  countAmount() {
    return this.basketItemsList.length;
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