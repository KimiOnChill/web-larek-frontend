// класс для отображения главной страницы сайта
// в полях содержит элемент корзины со счетчиком и элемент с галереей карточек

import { IPage } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Component } from '../component';

export class Page extends Component<IPage> {
	protected basketElement: HTMLButtonElement;
  protected counterElement: HTMLElement;
  protected wrapperElement: HTMLElement;
	protected galleryElement: HTMLElement;
	
	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

    this.basketElement = ensureElement<HTMLButtonElement>('.header__basket');
		this.counterElement = ensureElement<HTMLElement>('.header__basket-counter');
		this.wrapperElement = ensureElement<HTMLElement>('.page__wrapper');
		this.galleryElement = ensureElement<HTMLElement>('.gallery');

		this.basketElement.addEventListener('click', () => {
			this.events.emit('basket:open');
		});
	}

	set counter(value: number) {
		this.setText(this.counterElement, String(value));
	}

	set catalog(items: HTMLElement[]) {
		this.galleryElement.replaceChildren(...items);
	}

	set locked(value: boolean) {
		if (value) {
			this.wrapperElement.classList.add('page__wrapper_locked');
		} else {
			this.wrapperElement.classList.remove('page__wrapper_locked');
		}
	}
}
