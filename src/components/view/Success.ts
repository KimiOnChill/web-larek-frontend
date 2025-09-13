//Класс для отображения успешности покупки
//template id = success
import { Component } from '../component';
import { ensureElement } from '../../utils/utils';
import { IOrder, IOrderActions } from '../../types';

export class Success extends Component<IOrder> {
	protected happyButton: HTMLButtonElement;
  protected totalPrice: HTMLElement;

	constructor(
    container: HTMLElement,
    actions: IOrderActions
  ) {
    super(container);

		this.happyButton = ensureElement<HTMLButtonElement>('.order-success__close', this.container);
    this.totalPrice = ensureElement<HTMLElement>('.order-success__description', this.container);

		this.happyButton.addEventListener('click', actions.onClick);
	}

  set priceTotal(value: number) {
		this.setText(this.totalPrice, `Списано ${value} синапсов`);
  }
}
