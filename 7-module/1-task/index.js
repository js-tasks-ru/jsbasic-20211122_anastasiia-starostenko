import createElement from '../../assets/lib/create-element.js';

export default class RibbonMenu {
  constructor(categories) {
    this.categories = categories;
    this.render();
    this.value = '';

  }

  render() {
    this.elem = createElement(
      `<div class = "ribbon">
        <button class = "ribbon__arrow ribbon__arrow_left">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
          </button>
        <nav class = "ribbon__inner"></nav>
        <button class = "ribbon__arrow ribbon__arrow_right ribbon__arrow_visible">
          <img src="/assets/images/icons/angle-icon.svg" alt="icon">
        </button>
      </div>`);

    this.categories.forEach((category) => {
      let item = createElement(`<a href="#" class="ribbon__item" data-id = '${category.id}' >${category.name}</a>`);
      this.elem.querySelector('.ribbon__inner').append(item);
    });

    this.elem.querySelector('.ribbon__item').classList.add('ribbon__item_active');

    this.elem.onclick = (e) => this.onItemClick(e);
    this.elem.querySelector('.ribbon__arrow_left').onclick = (event) => this.onArrowLeftClick(event);
    this.elem.querySelector('.ribbon__arrow_right').onclick = (event) => this.onArrowRightClick(event);
    this.elem.querySelector('.ribbon__inner').onscroll = (event) => this.updateArrows(event);
  }


  onItemClick(e) {
    e.preventDefault();
      let itemElem = e.target.closest('.ribbon__item');

      if (itemElem) {
        let oldItem = document.querySelector('.ribbon__item_active');

        oldItem.classList.remove('ribbon__item_active');
        itemElem.classList.add('ribbon__item_active');
        this.value = itemElem.dataset.id;

        this.elem.dispatchEvent(new CustomEvent("ribbon-select", {
          detail: this.value,
          bubbles: true
        }));
    }
  };
  
  onArrowLeftClick(event){
    document.querySelector('.ribbon__inner').scrollBy(-350, 0);
    this.updateArrows();
  }

  onArrowRightClick(event){
    document.querySelector('.ribbon__inner').scrollBy(350, 0);
    this.updateArrows();
  }

  updateArrows() {
    let ribbonInner = this.elem.querySelector('.ribbon__inner')
    let scrollLeft = ribbonInner.scrollLeft;
    let scrollRight = ribbonInner.scrollWidth - (ribbonInner.scrollLeft + ribbonInner.clientWidth);

    if (scrollLeft > 0) {
      this.elem.querySelector('.ribbon__arrow_left').classList.add('ribbon__arrow_visible');
    } else {
      this.elem.querySelector('.ribbon__arrow_left').classList.remove('ribbon__arrow_visible');
    }

    scrollRight = scrollRight < 1 ? 0 : scrollRight;
    if (scrollRight > 0) {
      this.elem.querySelector('.ribbon__arrow_right').classList.add('ribbon__arrow_visible');
    } else {
      this.elem.querySelector('.ribbon__arrow_right').classList.remove('ribbon__arrow_visible');
    }
  }
}
