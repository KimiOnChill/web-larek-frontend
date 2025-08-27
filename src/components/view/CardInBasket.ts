// класс для отображения карточки в модальном окне
// template is id = card-basket
// дополняет класс CardBase свойствами порядкового номера в корзине и кнопкой удаления из корзины

import { ensureElement } from '../../utils/utils';
import { EventEmitter } from '../base/events';
import { Card } from './CardBase';

export class CardInBasket extends Card {
  protected cardNum: HTMLElement;
  protected cardDeleteButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container, events);

    this.cardDeleteButton = ensureElement<HTMLButtonElement>('.basket__item-delete', this.container);
    this.cardNum = ensureElement<HTMLElement>('.basket__item-index', this.container);
    
    this.cardDeleteButton.addEventListener('click', () =>
      this.events.emit('basket:changed', {id: this.id})
    )
  }

  //todo review it
  set number(value: string) {
    this.setText(this.cardNum, value);
  }

}