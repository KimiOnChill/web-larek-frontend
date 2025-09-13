import { ICustomerModel, ICustomer, IFormOrder, IFormContacts } from '../../types';

export class CustomerDataModel implements ICustomerModel {
  protected orderEntered: ICustomer = {
    paymentMethod: '',
    address: '',
    email: '',
    phone: ''
  };
  // protected paymentMethod: string | null;
  // protected address: string;
  // protected email: string;
  // protected phone: string;

  // сохраняет данные покупателя в классе
  // setCustomerInfo(customerData: ICustomer){
  //   this.paymentMethod = customerData.paymentMethod;
  //   this.address = customerData.address;
  //   this.email = customerData.email;
  //   this.phone = customerData.phone;
  // }

  setOneInfo(field: keyof ICustomer, value: string ) {
    this.orderEntered[field] = value
  }
  
  // проверяет объект с данными покупателя на валидность (пустое поле или нет)
  checkCustomerValidation(fieldName: keyof ICustomer){
    switch (fieldName) {
      case 'paymentMethod':
        return this.orderEntered.paymentMethod !== '' && this.orderEntered.paymentMethod !== null;
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
}