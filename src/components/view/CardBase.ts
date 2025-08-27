// это базовый класс карточки товара. 
// в нем поля стоимости, названия, id и сеттеры для них

import { IItem } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Component } from '../component';

export class Card extends Component<IItem> {
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;
	protected productId: string;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
	}

  set title(value: string) {
    this.setText(this.cardTitle, value);
  }

  get title(): string {
    return this.cardTitle.textContent || '';
  }

  set price(value: string) {
    this.setText(this.cardPrice, `${value} синапсов`);
  }

  //todo take id from data
  set id(value: string) {
    this.productId = value;
  }

  get id(): string {
    return this.productId;
  }
}