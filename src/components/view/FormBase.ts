//Базовый класс формы
//описан общий функционал валидации полей и кнопки

import { IFormState } from '../../types';
import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Component } from '../component';

export class Form<T> extends Component<IFormState> {
	protected submitButton: HTMLButtonElement;
	protected errorField: HTMLElement;

	constructor(container: HTMLElement, protected events: EventEmitter) {
		super(container);

		this.submitButton = ensureElement<HTMLButtonElement>(
			'button[type=submit]',
			this.container
		);
		this.errorField = ensureElement<HTMLElement>(
			'.form__errors',
			this.container
		);

		this.container.addEventListener('input', (e: Event) => {
			const target = e.target as HTMLInputElement;
			const field = target.name as keyof T;
			const value = target.value;
			this.onInputChange(field, value);
		});

		this.container.addEventListener('submit', (e: Event) => {
			e.preventDefault();
			const form = this.container as HTMLFormElement;
			this.events.emit(`${form.name}:submit`);
		});
	}

	protected onInputChange(field: keyof T, value: string) {
		const form = this.container as HTMLFormElement;
		this.events.emit(`${form.name}.${String(field)}:change`, {
			field,
			value,
		});
	}

	set valid(value: boolean) {
		this.submitButton.disabled = !value;
	}

	set errors(value: string) {
		this.setText(this.errorField, value);
	}

	render(state: Partial<T> & IFormState) {
		const { valid, errors, ...inputs } = state;
		super.render({ valid, errors });
		Object.assign(this, inputs);
		return this.container;
	}
}