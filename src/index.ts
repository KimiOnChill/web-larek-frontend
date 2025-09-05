import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { GalleryModel } from './components/models/GalleryModel';
import { CustomerDataModel } from './components/models/CustomerDataModel';
import { BasketModel } from './components/models/BasketModel';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/AppApi';
import { IItem, IOrder } from './types';
import { Card } from "./components/view/CardBase";
import { cloneTemplate, createElement } from "./utils/utils";
import { CardInGallery } from './components/view/CardInGallery';
import { CardInModal } from './components/view/CardInModal';
import { CardInBasket } from './components/view/CardInBasket';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';
import { Basket } from './components/view/BasketView';

//Templates
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
const previewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;
const cardInBasket = document.querySelector('#card-basket') as HTMLTemplateElement;
const basketTemplate = document.querySelector('#basket') as HTMLTemplateElement;

//Base
const events = new EventEmitter();
const api = new AppApi(CDN_URL, API_URL);

//Models
const gallery = new GalleryModel(events);
const basketModel = new BasketModel(events);

//View
const page = new Page(document.querySelector('.page'), events);
const modal = new Modal(document.querySelector('.modal'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);

api.getProductList()
	.then((initialCards) => {
		gallery.setItemList(initialCards);
		console.log(gallery);
	})
	.catch((err) => {
		console.error(err);
});

events.on('items:changed', () => {
	const itemsHTMLArray = gallery.getItemList().map(
		item => new CardInGallery(cloneTemplate(cardTemplate), events).render(item)
	);
	
	page.render({
		catalog: itemsHTMLArray,
		counter: basketModel.countAmount()
	})
});

events.on('item:select', ({id}: {id: string}) => {
	gallery.getItem(id);
	//it will chain setItem and event item:selected from GalleryModel
});

//todo complete this function with button action
events.on('item:selected', (item: IItem) => {
	const showItem = (item: IItem) => {
		const cardPreview = new CardInModal(cloneTemplate(previewTemplate), events);
		modal.render({content: cardPreview.render({
				id: item.id,
				title: item.title,
				image: item.image,
				price: item.price,
				category: item.category,
				description: item.description,
				isBought: basketModel.includesItem(item.id),
				button: basketModel.includesItem(item.id)
			})})
	}

	//button action

	item ? showItem(item): modal.close();
})

// Block page scroll
events.on('modal:open', () => {
    page.locked = true;
});
events.on('modal:close', () => {
    page.locked = false;
});

events.on('basket:open', () => {
  modal.render({
		//mb only basket.render()
  	content: createElement<HTMLElement>('div', {}, [
      basket.render()
      ])
    })
});

events.on('basket:changed', () => {
    
});

// To show every emmiter
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
	//console.log(gallery);
});