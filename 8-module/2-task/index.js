import createElement from '../../assets/lib/create-element.js';
import ProductCard from '../../6-module/2-task/index.js';

export default class ProductGrid {
  constructor(products) {
    this.products = products;
    this.filters = {};
    this.render();
  }

  render() {
    this.elem = createElement('<div class="products-grid"></div>');
    this.elem.innerHTML = `<div class="products-grid__inner"></div>`;
    this.renderProducts(this.products);
  }

  renderProducts(filteredProducts) {
    let container = this.elem.querySelector(`.products-grid__inner`)
    container.innerHTML = '';
    for (const product of filteredProducts) {
          let card = new ProductCard(product);
      container.append(card.elem);
    }
  }

  updateFilter(filters) {
    for (let key in filters) {
      this.filters[key] = filters[key];
    }

    if (Object.keys(filters).length == 0) {
      this.renderProducts(this.products);
    } 
    else {
      let filtered_products =  this.products
      if (this.filters.noNuts) {
        filtered_products = filtered_products.filter(item => !item.nuts);
      }
      if (this.filters.vegeterianOnly) {
        filtered_products = filtered_products.filter(item => item.vegeterian == true);
      }
      if (this.filters.maxSpiciness) {
        filtered_products = filtered_products.filter(item => item.spiciness <= this.filters.maxSpiciness);
      }
      if (this.filters.category) {
        filtered_products = filtered_products.filter(item => item.category == this.filters.category);
      }
      this.renderProducts(filtered_products);
    }
  } 
}
