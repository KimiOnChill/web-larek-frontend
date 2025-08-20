import { IApi, IItem, IOrder, IOrderServer } from '../types';
import { Api, ApiListResponse } from './base/api';
// actions with server:
// 1) get cards array from it
// 2) add order info to it

// Api as a inheritance + interface in types/index
export class AppApi extends Api implements IApi {
	readonly cdn: string;

	constructor(cdn: string, baseUrl: string, options?: RequestInit) {
		super(baseUrl, options);
		this.cdn = cdn;
	}

	getOneProduct(id: string): Promise<IItem> {
		return this.get(`/product/${id}`).then((item: IItem) => ({
			...item,
			image: this.cdn + item.image,
		}));
	}

	getProductList(): Promise<IItem[]> {
		return this.get('/product').then((data: ApiListResponse<IItem>) =>
			data.items.map((item) => ({
				...item,
				image: this.cdn + item.image,
			}))
		);
	}

	addOrder(order: IOrder): Promise<IOrderServer> {
		return this.post('/order', order).then((data: IOrderServer) => data);
	}
}
