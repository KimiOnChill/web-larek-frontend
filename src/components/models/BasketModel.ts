import { IEvents } from '../base/events';
import { IBasket, IItem, IBasketModel } from '../../types';

export class BasketModel implements IBasketModel {
  protected basketItemsList: string[] = []; //array of ids
  protected fullPrice: number = 0;
  protected events: IEvents;

  constructor(events: IEvents) {
    this.events = events;
  }

  getBasket(): string[] {
    return this.basketItemsList;
  }

  setBasket(basketItems: string[]): void {
    this.basketItemsList = basketItems;
    this.events.emit('basket:changed');
    this.countAmount();
  }

  addItem(id: string, price: number): void {
    this.basketItemsList.push(id);
    this.fullPrice += price;
    this.setBasket(this.basketItemsList);
  }

  deleteItem(id: string, price: number): void {
    this.basketItemsList = this.basketItemsList.filter((itemId) => itemId !== id);
    this.fullPrice -= price;
    this.setBasket(this.basketItemsList);
  }

  countAmount(): number {
    return this.basketItemsList.length;
  }

  countTotalPrice(): number {
    return this.fullPrice;
  }

  includesItem(id: string): boolean {
		return this.basketItemsList.includes(id);
	}

  clearBasket(): void {
    this.basketItemsList = [];
    this.fullPrice = 0;
    this.events.emit('basket:changed');
  }
}