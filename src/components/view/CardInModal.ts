// класс для отображения карточки в модальном окне
// template is id = card-preview
// дополняет класс CardBase свойствами description и кнопкой покупки
// ! figure out about the inf price bitch

import { IItemActions } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { CardInGallery } from './CardInGallery';

export class CardInModal extends CardInGallery {
	protected cardDescription: HTMLElement;

	constructor(
		container: HTMLElement,
		protected events: EventEmitter,
		actions?: IItemActions
	) {
		super(container, events, actions);

		this.cardDescription = ensureElement<HTMLElement>(
			'.card__text',
			this.container
		);

		// this.cardButton.addEventListener('click', () =>
		//   this.events.emit('basket:changed', {id: this.id})
		// )
	}

	set description(value: string) {
		this.setText(this.cardDescription, value);
	}

	set button(hasItem: boolean) {
		if (this.cardButton.hasAttribute('disabled')) {
			this.setText(this.cardButton, 'Недоступно');
		} else if (hasItem) {
			this.setText(this.cardButton, 'Удалить из корзины');
		} else {
			this.setText(this.cardButton, 'Купить');
		}
	}
}
