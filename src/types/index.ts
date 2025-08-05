import { EventEmitter, IEvents } from "../components/base/events";
import { GalleryModel } from "../components/GalleryModel";
// Layer with Data
export interface IItem {
  id: string;
  category: string;
  title: string;
  image: string;
  price: number | null;
  description: string;
  //isBought: boolean;
}

export interface ICustomer {
  paymentMethod: '' | 'card' | 'cash';
  address: string;
  email: string;
  phone: string;
  // to save user data
  setCustomerInfo(customerData: ICustomer): void; // not in doc
  //checkCustomerValidation(data: Record<keyof TPaymentModal, string>): boolean; // not in doc
}

export interface IBasket {
  itemsList: IItem[];
  counter: number;
  fullPrice: number;
  addItem(item: IItem): void; // not in doc
  deleteItem(itemId: string, payload: Function | null): void; // not in doc
}

export interface IGallery {
  //preview: string | null; // save cardID here or nothing when no card is picked
  //itemsArr: IItem[];
  //events: IEvents;
  getItem(itemId: string): IItem;
  //setItem(item: IItem): void;
  getItemList(): IItem[];
  setItemList(itemList: IItem[]): void;
}

export interface IOrderResponse {
  id: string;
  total: number;
}

// !View Types
// export type TGallery = Partial<IGallery>; 
// export type TCardInfo = Pick<IItem, 'category' | 'title' | 'image' | 'price'>;
// export type TCounter = Pick<IBasket, 'counter'>;
// export type TItemCard = Pick<IItem, 'category' | 'title' | 'image' | 'description'| 'isBought' | 'price'>;
// export type TBasket = Pick<IBasket, 'itemsList' | 'counter' | 'fullPrice'>;
// export type TPaymentModal = Pick<ICustomer, 'paymentMethod' | 'address'>;
// export type TCustomerInfoModal = Pick<ICustomer, 'email' | 'phone'>;
// export type TSuccessModal = Pick<IBasket, 'fullPrice'>;