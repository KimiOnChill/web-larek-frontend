import { IEvents } from './base/events';
import { IGallery, IItem } from '../types';

export class GalleryModel implements IGallery {
	protected preview: string | null = null;
	protected itemsArr: IItem[] = [];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	// todo: add check on is avalible

	getItem(itemId: string) {
		const itemMatch = this.itemsArr.find((item) => item.id === itemId);
		this.setItem(itemMatch)
		return itemMatch;
	}

	protected setItem(item: IItem) {
		this.preview = item.id;
		this.events.emit('item:selected', item);
	}

	getItemList() {
    return this.itemsArr;
  }

	setItemList(itemList: IItem[]) {
		this.itemsArr = itemList;
    this.events.emit('items:changed', itemList)
	}
}
