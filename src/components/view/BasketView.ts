//класс для отображения корзины товаров

import { IBasket } from '../../types';
import { createElement, ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Component } from '../component';

export class Basket extends Component<IBasket> {
	protected basketItemsList: HTMLElement;
	protected fullPrice: HTMLElement;
	protected createOrderButton: HTMLButtonElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.basketItemsList = this.container.querySelector('.basket__list');
		this.fullPrice = this.container.querySelector('.basket__price');
		this.createOrderButton = this.container.querySelector('.basket__button');

		if (this.createOrderButton) {
			this.createOrderButton.addEventListener('click', () => {
				events.emit('order:open'); 
			});
		}

		this.items = [];
	}

	set items(items: HTMLElement[]) {
		if (items.length) {
			this.basketItemsList.replaceChildren(...items);
			this.basketItemsList.style.opacity = '1';
			this.setDisabled(this.createOrderButton, false);
		} else {
			this.basketItemsList.replaceChildren(
				createElement<HTMLParagraphElement>('p', {
					textContent: 'Корзина пуста',
				})
			);
			this.basketItemsList.style.opacity = '0.3';
			this.setDisabled(this.createOrderButton, true);
		}
	}

	set total(total: number) {
		this.setText(this.fullPrice, `${total} синапсов`);
	}
}