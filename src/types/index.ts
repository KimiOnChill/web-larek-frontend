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
  addItem(id: string, price: number): void;
  deleteItem(id: string, price: number): void; 
  countAmount(): number;
  countTotalPrice(): number;
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
  payment: string | null;
  address: string;
}

export interface IFormContacts {
  email: string;
  phone: string;
}

export interface ICustomerModel {
  getCustomer(): void;
  setOneInfo(field: keyof ICustomer, value: string ): void;
  validateOrder(): void;
  validateContacts(): void;
  orderClear(): void;
}

export interface ICustomer {
  payment: string | null;
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
export interface IOrder {
	total: number;
	items: string[]; // id array
}

export interface IOrderActions {
	onClick: () => void;
}

export type FormErrors = Partial<Record<keyof ICustomer, string>>;

// наследование класса api
export type ApiPostMethods = 'POST' | 'PUT' | 'DELETE';
export interface IApi {
  getOneProduct(id: string): Promise<IItem>;
  getProductList(): Promise<IItem[]>;
  addOrder(order: IOrder): Promise<IServerOrder>
}