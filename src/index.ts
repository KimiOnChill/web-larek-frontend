import './scss/styles.scss';
import { EventEmitter } from './components/base/events';
import { GalleryModel } from './components/models/GalleryModel';
import { CustomerDataModel } from './components/models/CustomerDataModel';
import { BasketModel } from './components/models/BasketModel';
import { API_URL, CDN_URL } from './utils/constants';
import { AppApi } from './components/AppApi';
import { IItem, IItemActions, IOrder } from './types';
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
const cardInBasketTemplate = document.querySelector('#card-basket') as HTMLTemplateElement;
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
		console.log(gallery);// todo remove
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
	gallery.setItem(gallery.getItem(id));
	//it will chain event item:selected
});

events.on('item:selected', (item: IItem) => {
	const showItem = (item: IItem) => {
		const cardPreview = new CardInModal(cloneTemplate(previewTemplate), events, {
			onClick: () => {
				//this tells basketModel how it changed and also changes button text
				if (basketModel.includesItem(item.id)){
					basketModel.deleteItem(item.id);
					showItem(item);
				}else{
					basketModel.addItem(item.id);
					showItem(item);
				}
			}
		});
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

	item ? showItem(item): modal.close();
})

// Blocks page scroll
events.on('modal:open', () => {
  page.locked = true;
});
events.on('modal:close', () => {
  page.locked = false;
});

events.on('basket:open', () => {
  modal.render({
  	content: createElement<HTMLElement>('div', {}, [
      basket.render()
      ])
  });
});

events.on('basket:changed', () => {
	basket.items = basketModel.getBasket().map((id) => {
		const element = new CardInBasket(cloneTemplate(cardInBasketTemplate), events, {onClick: () => {
			basketModel.deleteItem(id)
		}});
		element.number = basketModel.getBasket().indexOf(id) + 1;
		return element.render(gallery.getItem(id));
	});

	basket.total = basketModel.getBasket().reduce((acc, x) => acc + gallery.getItem(x).price, 0);

  //update counter by BasketModel
	page.render({
		counter: basketModel.countAmount()
	})
});

// To show every emmiter
events.onAll(({ eventName, data }) => {
  console.log(eventName, data);
});