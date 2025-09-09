// класс для отображения карточки товара в каталоге
// template is id = card-catalog
// дополняет класс CardBase свойствами image, category и кнопкой открытия карточки в preview

import { IItemActions } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Card } from './CardBase';

export class CardInGallery extends Card {
	protected cardCategory: HTMLElement;
	protected cardImage: HTMLImageElement;
	protected cardSelectButton: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		protected events: EventEmitter,
		actions?: IItemActions
	) {
		super(container, events, actions);

		this.cardSelectButton = this.container as HTMLButtonElement;
		this.cardCategory = ensureElement<HTMLElement>(
			'.card__category',
			this.container
		);
		this.cardImage = ensureElement<HTMLImageElement>(
			'.card__image',
			this.container
		);

		this.cardSelectButton.addEventListener('click', () =>
			this.events.emit('item:select', { id: this.id })
		);
	}

	set category(value: string) {
		this.setText(this.cardCategory, value);
		switch (value) {
			case 'софт-скил':
				this.cardCategory.classList.add('card__category_soft');
				break;
			case 'хард-скил':
				this.cardCategory.classList.add('card__category_hard');
				break;
			case 'другое':
				this.cardCategory.classList.add('card__category_other');
				break;
			case 'дополнительное':
				this.cardCategory.classList.add('card__category_additional');
				break;
			case 'кнопка':
				this.cardCategory.classList.add('card__category_button');
				break;
		}
	}

	//todo take title from data,
	set image(src: string) {
		this.setImage(this.cardImage, src, 'Изображение товара');
	}
}
