// Layer with Data
// todo update interfaces in doc
export interface IItem {
  id: string;
  category: string;
  title: string;
  image: string;
  price: number | null;
  description: string;
  //!isBought: boolean;
}

export interface ICustomerModel {
  setCustomerInfo(customerData: ICustomer): void; // not in doc
  // checkCustomerValidation(data: Record<keyof TPaymentModal, string>): boolean;
  checkCustomerValidation(fieldName: string): boolean;
}

export interface ICustomer {
  paymentMethod: string | null;
  address: string;
  email: string;
  phone: string;
}

export interface IBasket {
  addItem(item: IItem): void; // not in doc
  deleteItem(itemId: string, payload: Function | null): void; // not in doc
  countFullPrice(): number;
  isPossibleToBuy(item: IItem): boolean;
  clearBasket(): void;
}

export interface IGallery {
  getItem(itemId: string): IItem;
  getItemList(): IItem[];
  setItemList(itemList: IItem[]): void;
}

export interface IOrderResponse {
  id: string;
  total: number;
}

// !View Types
export type TGallery = Partial<IGallery>; 
// export type TCardInfo = Pick<IItem, 'category' | 'title' | 'image' | 'price'>;
// export type TCounter = Pick<IBasket, 'counter'>;
// export type TItemCard = Pick<IItem, 'category' | 'title' | 'image' | 'description'| 'isBought' | 'price'>;
// export type TBasket = Pick<IBasket, 'itemsList' | 'counter' | 'fullPrice'>;
export type TPaymentModal = Partial<ICustomer>;
// export type TCustomerInfoModal = Pick<ICustomer, 'email' | 'phone'>;
// export type TSuccessModal = Pick<IBasket, 'fullPrice'>;