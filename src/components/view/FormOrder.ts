// класс для отображения формы с данными об оплате и адресе доставки
// template is id = order
// дополняет класс Form свойствами 

import { IFormOrder } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Form } from './FormBase';

export class FormOrder extends Form<IFormOrder> {
  protected buttonCard: HTMLButtonElement;
  protected buttonCash: HTMLButtonElement;
  protected addressInput: HTMLInputElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container, events);

    this.buttonCard = ensureElement<HTMLButtonElement>(
			'button[name=card]',
			this.container
		);
    this.buttonCash = ensureElement<HTMLButtonElement>(
			'button[name=cash]',
			this.container
		);
    this.addressInput = ensureElement<HTMLInputElement>(
			'input[name="address"]',
			this.container
		);

		this.buttonCard.addEventListener('click', () => {
			events.emit('payment:change', {method: this.buttonCard.name});
			this.buttonCard.classList.toggle('button_alt-active');
			if (this.buttonCash.classList.contains('button_alt-active'))
				this.buttonCash.classList.remove('button_alt-active');
		});

		this.buttonCash.addEventListener('click', () => {
			events.emit('payment:change', {method: this.buttonCard.name}); 
			this.buttonCash.classList.toggle('button_alt-active');
			if (this.buttonCard.classList.contains('button_alt-active'))
				this.buttonCard.classList.remove('button_alt-active');
		});

    this.submitButton.addEventListener('click', () => {
			events.emit('contacts:open'); 
		});
  }

  // set paymentMethod()
}