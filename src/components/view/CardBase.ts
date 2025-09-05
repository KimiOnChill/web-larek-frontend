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
  protected cardBuyButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
    this.cardBuyButton = this.container.querySelector('.card__button');
    // ensureElement<HTMLButtonElement>('.card__button', this.container);
	}

  set title(value: string) {
    this.setText(this.cardTitle, value);
  }

  set price(value: string) {
    if (!value) {
      this.setText(this.cardPrice, 'Бесценно');
			this.setDisabled(this.cardBuyButton, true);
    } else {
      this.setText(this.cardPrice, `${value} синапсов`);
      this.setDisabled(this.cardBuyButton, false);
    }
  }

  //todo take id from data
  set id(value: string) {
    this.productId = value;
  }

  get id(): string {
    return this.productId;
  }
}