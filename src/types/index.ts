// Layer with Data
// todo update interfaces in doc
export interface IItem {
  id: string;
  category: string;
  title: string;
  image: string;
  price: number | null;
  description: string;
  button: boolean;
  isBought?: boolean;
}

export interface IItemActions {
  onClick: (event: MouseEvent) => void;
}

export interface IGallery {
  getItem(itemId: string): IItem;
  getItemList(): IItem[];
  setItemList(itemList: IItem[]): void;
}

export interface IPage {
  counter: number;
  catalog: HTMLElement[];
  locked: boolean;
}

export interface IModalView {
	content: HTMLElement;
}
export interface IModal {
	content: HTMLElement;
	open(): void;
	close(): void;
	render(data: IModalView): HTMLElement;
  handleEscUp (evt: KeyboardEvent): void;
}

export interface IBasketModel {
  getBasket(): string[];
  setBasket(asketItems: string[]): void;
  addItem(id: string): void;
  deleteItem(id: string): void; 
  countAmount(): number;
  includesItem(id: string): boolean;
  clearBasket(): void;
}

export interface IBasket {
  basketItemsList: IItem[];
  fullPrice: number;
}

export interface IFormState {
  valid: boolean;
  errors: string[];
}

export interface IFormOrder {
  paymentMethod: string | null;
  address: string;
}

export interface IFormContacts {
  email: string;
  phone: string;
}

export interface ICustomerModel {
  setOneInfo(field: keyof ICustomer, value: string ): void;
  //setCustomerInfo(customerData: ICustomer): void;
 
  // checkCustomerValidation(data: Record<keyof TPaymentModal, string>): boolean;
  checkCustomerValidation(fieldName: keyof ICustomer): boolean; // not in doc
}

export interface ICustomer {
  paymentMethod: string | null;
  address: string;
  email: string;
  phone: string;
}

// Ответ с сервера о созданном заказе
export interface IServerOrder {
  id: string;
  total: number;
}

// Оформленный заказ для сервера
export interface IOrder extends ICustomer {
	total: number;
	items: string[]; // id array
}

// !View Types, mb delete
export type TGallery = Partial<IGallery>; 
// export type TCardInfo = Pick<IItem, 'category' | 'title' | 'image' | 'price'>;
// export type TCounter = Pick<IBasket, 'counter'>;
// export type TItemCard = Pick<IItem, 'category' | 'title' | 'image' | 'description'| 'isBought' | 'price'>;
// export type TBasket = Pick<IBasket, 'itemsList' | 'counter' | 'fullPrice'>;
export type TPaymentModal = Partial<ICustomer>;
// export type TCustomerInfoModal = Pick<ICustomer, 'email' | 'phone'>;
// export type TSuccessModal = Pick<IBasket, 'fullPrice'>;

// наследование класса api
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export interface IApi {
  getOneProduct(id: string): Promise<IItem>;
  getProductList(): Promise<IItem[]>;
  addOrder(order: IOrder): Promise<IServerOrder>
}