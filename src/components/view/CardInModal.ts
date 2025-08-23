// класс для отображения карточки в модальном окне
// template is id = card-preview
// дополняет класс CardBase свойствами description и кнопкой покупки
// ! figure out about the inf price bitch

import { ensureElement } from '../../utils/utils';
import { CardInGallery } from './CardInGallery';

export class CardInModal extends CardInGallery {
  protected cardDescription: HTMLElement;
  protected cardBuyButton: HTMLButtonElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardDescription = ensureElement<HTMLElement>('.card__text', this.container);
    this.cardBuyButton = ensureElement<HTMLButtonElement>('.card__button', this.container);
  }

  set description(value: string) {
    this.setText(this.cardDescription, value);
  }

  set isBought(value: boolean) {
    if (value) {
      this.setText(this.cardBuyButton, 'Удалить из корзины');
    } else {
      this.setText(this.cardBuyButton, 'Купить');
    }
  }
  //!if !price -> "button_unavailable disabled" price.text = Бесценно
  // this.toggleClass(this.cardBuyButton, 'todo-item__flag-on', value);
  // this.toggleClass(this.cardBuyButton, 'todo-item__flag-off', !value);
}
