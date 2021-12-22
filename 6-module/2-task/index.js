export default class ProductCard {
  constructor(product) {
    this.product = product;
    this.renderProductCard();
  }
  
  renderProductCard() {
    this.elem = document.createElement('div');
    let price = '€' + this.product.price.toFixed(2);
    this.elem.innerHTML = `<div class="card__top">
                              <img src="/assets/images/products/${this.product.image}" class="card__image" alt="product">
                              <span class="card__price">${price}</span>
                            </div>
                          <div class="card__body">
                              <div class="card__title">${this.product.name}</div>
                              <button type="button" class="card__button">
                                  <img src="/assets/images/icons/plus-icon.svg" alt="icon">
                              </button>
                          </div>`;
    
    this.elem.querySelector('.card__button').addEventListener('click', this.onClick);
  }

  onClick = (ev) => {
    let action = new CustomEvent("product-add", { 
      detail: this.product.id, 
      bubbles: true });
      this.elem.dispatchEvent(action);
  }
}