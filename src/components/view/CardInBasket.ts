// класс для отображения карточки в модальном окне
// template is id = card-basket
// дополняет класс CardBase свойствами порядкового номера в корзине и кнопкой удаления из корзины

import { IItemActions } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Card } from './CardBase';

export class CardInBasket extends Card {
	protected cardNum: HTMLElement;
	protected cardDeleteButton: HTMLButtonElement;

	constructor(
		container: HTMLElement,
		protected events: EventEmitter,
		actions?: IItemActions
	) {
		super(container, events, actions);

		this.cardNum = ensureElement<HTMLElement>(
			'.basket__item-index',
			this.container
		);
		this.cardDeleteButton = this.container.querySelector('.basket__item-delete');

		if (actions?.onClick) {
			this.cardDeleteButton.addEventListener('click', actions.onClick);
		}
	}

	//todo review it
	set number(value: number) {
		this.setText(this.cardNum, value);
	}
}
