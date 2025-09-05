// для для отображения модального окна
// в полях содержимое передаваемого через темплейт контента и кнопка закрытия
// описаны методы открытия и закрытия
// дополнен метод render открытием модалки и возвращением контейнера

import { IModal, IModalView } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";
import { Component } from "../component";

export class Modal extends Component<IModalView> implements IModal {
  protected modalContent: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
  
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    this.modalContent.addEventListener('click', (event) => event.stopPropagation());

    this.closeButton.addEventListener('click', () => {
      this.close();
    })

    this.container.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      });
      this.handleEscUp = this.handleEscUp.bind(this);
  }

  set content(value: HTMLElement) {
    this.modalContent.replaceChildren(value);
  }

  open() {
    this.container.classList.add('modal_active');
    document.addEventListener('keydown', this.handleEscUp);
    this.events.emit('modal:open');
  }

  close() {
    this.container.classList.remove('modal_active');
    document.removeEventListener("keydown", this.handleEscUp);
    //this.container.removeChild(this.modalContent);
    this.events.emit('modal:close');
  }

  handleEscUp (evt: KeyboardEvent) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  render(data: IModalView): HTMLElement {
    super.render(data);
		this.open();
		return this.container;
  }
}