import {
	ICustomerModel,
	ICustomer,
	IFormOrder,
	IFormContacts,
	FormErrors,
} from '../../types';
import { IEvents } from '../base/events';

export class CustomerDataModel implements ICustomerModel {
	protected orderEntered: ICustomer = {
		payment: null,
		address: '',
		email: '',
		phone: '',
	};
	formErrors: FormErrors = {};
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	getCustomer() {
		return {...this.orderEntered}
	}

	setOneInfo(field: keyof ICustomer, value: string) {
		this.orderEntered[field] = value;
		if (field === 'payment' || field === 'address') {
			this.validateOrder();
		} else {
			this.validateContacts();
		}
	}

	validateOrder() {
		const errors: FormErrors = {};
		const { payment, address } = this.orderEntered;

		if (!payment) {
			errors.payment = 'Необходимо указать способ оплаты';
		}

		if (!address || address.trim() === '') {
			errors.address = 'Необходимо указать адрес';
		}

		const isValid = Object.keys(errors).length === 0;
		this.formErrors = errors;
		this.events.emit('validation:error', this.formErrors);
		return isValid;
	}

	validateContacts() {
		const errors: FormErrors = {};
		const { email, phone } = this.orderEntered;

		if (!email) {
			errors.email = 'Необходимо указать email';
		}

		if (!phone || phone.trim() === '') {
			errors.phone = 'Необходимо указать телефон';
		}

		const isValid = Object.keys(errors).length === 0;
		this.formErrors = errors;
		this.events.emit('validation:error', this.formErrors);
		return isValid;
	}

	orderClear(): void {
		this.orderEntered = {
			payment: null,
			address: '',
			email: '',
			phone: '',
		};
		this.formErrors = {};
	}
}
