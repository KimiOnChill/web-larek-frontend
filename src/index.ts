import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { GalleryModel } from './components/models/GalleryModel';
import { CustomerDataModel } from './components/models/CustomerDataModel';
import { BasketModel } from './components/models/BasketModel';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/AppApi';
import { IItem, IOrder } from './types';
import { Card } from "./components/view/CardBase";
import { cloneTemplate } from "./utils/utils";
import { CardInGallery } from './components/view/CardInGallery';
import { CardInModal } from './components/view/CardInModal';
import { CardInBasket } from './components/view/CardInBasket';
import { Modal } from './components/view/Modal';
import { Page } from './components/view/Page';

const events = new EventEmitter();
const page = new Page(document.querySelector('.page'), events);
const gallery = new GalleryModel(events);
const basketModel = new BasketModel(events);
const cardTemplate = document.querySelector('#card-catalog') as HTMLTemplateElement;
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

//todo complete this function
events.on('item:selected', (item: IItem) => {

	const showItem = (item: IItem) => {

	}

	// if (item) {
  //       api.getLotItem(item.id)
  //           .then((result) => {
  //               item.description = result.description;
  //               item.history = result.history;
  //               showItem(item);
  //           })
  //           .catch((err) => {
  //               console.error(err);
  //           })
  //   } else {
  //       modal.close();
  //   }
})

// Block page scroll
events.on('modal:open', () => {
    page.locked = true;
});
events.on('modal:close', () => {
    page.locked = false;
});

// to test every emmiter
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
	//console.log(gallery);
});