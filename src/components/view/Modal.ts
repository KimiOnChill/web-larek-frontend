// для для отображения модального окна
// в полях содержимое передавемого через темплейт контента и кнопка закрытия

import { IModal } from "../../types";
import { ensureElement } from "../../utils/utils";
import { EventEmitter } from "../base/events";
import { Component } from "../component";

export class Modal extends Component<IModal> {
  protected modalContent: HTMLElement;
  protected closeButton: HTMLButtonElement;

  constructor(container: HTMLElement, protected events: EventEmitter) {
    super(container);
  
    this.modalContent = ensureElement<HTMLElement>('.modal__content', this.container);
    this.closeButton = ensureElement<HTMLButtonElement>('.modal__close', this.container);

    this.closeButton.addEventListener('click', () =>
      this.events.emit('modal:close')
    )
//! took from mesto
    this.container.addEventListener("mousedown", (evt) => {
        if (evt.target === evt.currentTarget) {
          this.close();
        }
      });
      this.handleEscUp = this.handleEscUp.bind(this);
  }

  set content (element: HTMLElement) {
    this.content.append(element);
  }

  open() {
    this.container.classList.add('modal_active');
    document.addEventListener('keydown', this.handleEscUp);
  }

  close() {
    this.container.classList.remove('modal_active');
    document.removeEventListener("keydown", this.handleEscUp);
  }

  handleEscUp (evt: KeyboardEvent) {
    if (evt.key === "Escape") {
      this.close();
    }
  }

  renderModal(data: HTMLElement) {}
}

// //previous modal check in index.ts
// const modalElement = document.querySelector('.modal') as HTMLElement;//into Page class
// const previewTemplate = document.querySelector('#card-preview') as HTMLTemplateElement;//into Page class
// const testPreview = new CardInModal(cloneTemplate(previewTemplate), events);
// const modalContentElement = document.querySelector('.modal__content') as HTMLElement;//into Page class
// modalElement.classList.add('modal_active');
// modalContentElement.append(testPreview.render(testProduct));