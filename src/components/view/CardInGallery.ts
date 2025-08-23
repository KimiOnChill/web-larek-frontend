// класс для отображения карточки товара в каталоге
// template is id = card-catalog
// дополняет класс CardBase свойствами image, category

import { ensureElement } from '../../utils/utils';
import { Card } from './CardBase';

export class CardInGallery extends Card {
  protected cardCategory: HTMLElement;
  protected cardImage: HTMLImageElement;
  protected cardButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardButton = ensureElement<HTMLButtonElement>('.gallery__item', this.container);
    this.cardCategory = ensureElement<HTMLElement>('.card__category', this.container);
    this.cardImage = ensureElement<HTMLImageElement>('.card__image', this.container);

  }

  set category(value: string) {
    this.setText(this.cardCategory, value);
    switch (value){
      case "софт-скил":
        this.cardCategory.classList.add('card__category_soft')
        break;
      case "хард-скил":
        this.cardCategory.classList.add('card__category_hard')
        break;
      case "другое":
        this.cardCategory.classList.add('card__category_other')
        break;
      case "дополнительное":
        this.cardCategory.classList.add('card__category_additional')
        break;
      case "кнопка":
        this.cardCategory.classList.add('card__category_button')
        break;
    }
  }

  set image (src: string) {
    const imageLink: string = `https://larek-api.nomoreparties.co/content/weblarek/${src.replace('/', '')}` 
    this.setImage(this.cardImage, imageLink, `Изображение товара ${this.title}`);
  }
}
