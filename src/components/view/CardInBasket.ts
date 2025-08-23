// класс для отображения карточки в модальном окне
// template is id = card-basket
// дополняет класс CardBase свойствами порядкового номера в корзине

import { ensureElement } from '../../utils/utils';
import { Card } from './CardBase';

export class CardInBasket extends Card {
  protected cardNum: HTMLElement;

  constructor(container: HTMLElement) {
    super(container);

    this.cardNum = ensureElement<HTMLElement>('.basket__item-index', this.container);
  }

  //todo review it
  set number(value: string) {
    this.setText(this.cardNum, value);
  }

}