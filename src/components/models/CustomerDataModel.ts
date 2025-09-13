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

	// сохраняет данные покупателя в классе
	// setCustomerInfo(customerData: ICustomer){
	//   this.paymentMethod = customerData.paymentMethod;
	//   this.address = customerData.address;
	//   this.email = customerData.email;
	//   this.phone = customerData.phone;
	// }

	getCustomer() {
		return {...this.orderEntered}
	}

	setOneInfo(field: keyof ICustomer, value: string) {
		this.orderEntered[field] = value;
		if (field === 'payment' || field === 'address') {
			this.validateOrder();
			//this.events.emit('order:ready', this.orderEntered);
		} else {
			this.validateContacts();
			//this.events.emit('order:ready', this.orderEntered);
		}
	}

	//todo complete function
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

  //todo complete function
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

	// проверяет объект с данными покупателя на валидность (пустое поле или нет)
	checkCustomerValidation(fieldName: keyof ICustomer) {
		switch (fieldName) {
			case 'payment':
				return (
					this.orderEntered.payment !== '' &&
					this.orderEntered.payment !== null
				);
			case 'address':
				return this.orderEntered.address !== '';
			case 'email':
				return this.orderEntered.email !== '';
			case 'phone':
				return this.orderEntered.phone !== '';
			default:
				return false;
		}
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
