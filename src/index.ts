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

// todo when Page class appear Block page scroll
// events.on('modal:open', () => {
//     page.locked = true;
// });
// events.on('modal:close', () => {
//     page.locked = false;
// });

// to test every emmiter
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
	//console.log(gallery);
});