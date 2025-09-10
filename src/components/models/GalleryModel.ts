import { IEvents } from '../base/events';
import { IGallery, IItem } from '../../types';

export class GalleryModel implements IGallery {
	protected preview: string | null = null;
	protected itemsArr: IItem[] = [];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	// получение карточки по ее id
	getItem(itemId: string) {
		return this.itemsArr.find((item) => item.id === itemId);
	}

	// сохранение карточки по ее id в preview
	setItem(item: IItem) {
		this.preview = item.id;
		this.events.emit('item:selected', item);
	}

	// получение массива товаров, сохраненного в поле класса
	getItemList() {
    return this.itemsArr;
  }

	// сохранение массива товаров
	setItemList(itemList: IItem[]) {
		this.itemsArr = itemList;
    this.events.emit('items:changed');
	}
}