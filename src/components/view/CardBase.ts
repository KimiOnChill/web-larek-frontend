// это базовый класс карточки товара. 
// в нем поля стоимости и названия. и сеттеры для этого
// методы для взаимодействия с поьзователем
// это для отображения карточки в каталоге. id = card-catalog

import { IItem } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../component';

export class Card extends Component<IItem> {
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLElement;
	protected productId: number;

  //todo add event emitter for user actions
	constructor(container: HTMLElement) {
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
}
