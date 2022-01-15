import createElement from '../../assets/lib/create-element.js';

export default class Modal {
  constructor() {
    this.render();    
  }

  render(){
    this.elem = createElement(`<div class="modal">
      <!--Прозрачная подложка перекрывающая интерфейс-->
      <div class="modal__overlay"></div>

      <div class="modal__inner">
        <div class="modal__header">
          <!--Кнопка закрытия модального окна-->
          <button type="button" class="modal__close">
            <img src="/assets/images/icons/cross-icon.svg" alt="close-icon" />
          </button>

          <h3 class="modal__title">
            Вот сюда нужно добавлять заголовок
          </h3>
        </div>

        <div class="modal__body">
        </div>
      </div>
    </div>`);
  }

  open() {
    document.body.append(this.elem);
    document.body.classList.add('is-modal-open');
    this.addEventListeners();
  }

  setTitle(title){
    this.elem.querySelector('.modal__title').textContent = title;
  }

  setBody(modalBody) {
    this.elem.querySelector('.modal__body').innerHTML = '';
    this.elem.querySelector('.modal__body').append(modalBody);
  }

  close() {
    document.removeEventListener('keydown', this._keydownEventListener);
    document.body.classList.remove('is-modal-open');
    this.elem.remove();
  }

  addEventListeners() {
    this.elem.querySelector('.modal__close').onclick = (e) => this.close(e);
    this._keydownEventListener = (event) => this.keyDownClose(event);
    document.addEventListener('keydown', this._keydownEventListener);
  }

  keyDownClose (event){
    if (event.code === 'Escape') {
      event.preventDefault();
      this.close();
    }
  }

}
