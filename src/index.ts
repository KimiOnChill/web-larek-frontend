import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { GalleryModel } from './components/models/GalleryModel';
import { CustomerDataModel } from './components/models/CustomerDataModel';
import { BasketModel } from './components/models/BasketModel';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/AppApi';
import { IOrder } from './types';
import { Card } from "./components/view/CardBase";
import { cloneTemplate } from "./utils/utils";
import { CardInGallery } from './components/view/CardInGallery';
import { CardInModal } from './components/view/CardInModal';
import { CardInBasket } from './components/view/CardInBasket';
import { Modal } from './components/view/Modal';

const events = new EventEmitter();
const gallery = new GalleryModel(events);
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;//? into Page class

const api = new AppApi(CDN_URL, API_URL);

api.getProductList()
	.then((initialCards) => {
		gallery.setItemList(initialCards);
		console.log(gallery);
	})
	.catch((err) => {
		console.error(err);
});

events.on('items:changed', () => {
	const galleryElement = document.querySelector('.gallery') as HTMLElement;//? mbinto Page class
	const itemsHTMLArray = gallery.getItemList().map(
		item => galleryElement.append(
				new CardInGallery(cloneTemplate(cardTemplate), events).render(item)
			)
		);
	
	//page.render({
	// itemsList: itemsHTMLArray,
	// counter: counter
	// })
})

// to test every emmiter
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
})