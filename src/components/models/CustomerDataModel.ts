import { ICustomerModel, ICustomer } from '../../types';

export class CustomerDataModel implements ICustomerModel {
  protected paymentMethod: string | null;
  protected address: string;
  protected email: string;
  protected phone: string;

  // сохраняет данные покупателя в классе
  setCustomerInfo(customerData: ICustomer){
    this.paymentMethod = customerData.paymentMethod;
    this.address = customerData.address;
    this.email = customerData.email;
    this.phone = customerData.phone;
  }
  
  // проверяет объект с данными покупателя на валидность (пустое поле или нет)
  checkCustomerValidation(fieldName: keyof ICustomer){
    switch (fieldName) {
      case 'paymentMethod':
        return this.paymentMethod !== '' && this.paymentMethod !== null;
      case 'address':
        return this.address !== '';
      case 'email':
        return this.email !== '';
      case 'phone':
        return this.phone !== '';
      default:
        return false;
    }
  }
}