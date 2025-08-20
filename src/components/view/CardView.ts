import { IItem } from '../../types';
import { ensureElement } from '../../utils/utils';
import { Component } from '../component';

// это для отображения карточки в каталоге. id = card-catalog
export class Card extends Component<IItem> {
	protected cardCategory: HTMLElement;
	protected cardTitle: HTMLElement;
	protected cardImage: HTMLImageElement;
	protected cardPrice: HTMLElement;
	protected cardButton: HTMLButtonElement; //like for the whole card
	protected productId: number; //? mb don't need

  //todo add event emitter for user actions
	constructor(container: HTMLElement) {
		super(container);

		this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
		this.cardTitle = ensureElement<HTMLElement>('.card__title', this.container);
    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container) as HTMLImageElement;
    this.cardPrice = ensureElement<HTMLElement>('.card__price', this.container);
	}

  set category(value: string) {
    this.setText(this.cardCategory, value);
  }

  set title(value: string) {
    this.setText(this.cardTitle, value);
  }

  //todo add alt
  set image (src: string) {
    this.setImage(this.cardImage, src);
  }

  set price(value: string) {
    this.setText(this.cardPrice, value);
  }
}
