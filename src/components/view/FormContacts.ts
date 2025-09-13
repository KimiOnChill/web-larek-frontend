// класс для отображения формы с данными о почте и телефоне покупателя
// template is id = contacts
// дополняет класс Form свойствами 

import { IFormContacts } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Form } from './FormBase';

export class FormContacts extends Form<IFormContacts> {
  protected emailInput: HTMLInputElement;
  protected phoneInput: HTMLInputElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container, events);

    this.emailInput = ensureElement<HTMLInputElement>(
			'input[name="email"]',
			this.container
		);
    this.phoneInput = ensureElement<HTMLInputElement>(
			'input[name="phone"]',
			this.container
		);

    this.submitButton.addEventListener('click', () => {
			events.emit('success:open');//!check event 
		});
  }
}