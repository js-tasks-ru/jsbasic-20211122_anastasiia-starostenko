import Carousel from '../../6-module/3-task/index.js';
import slides from '../../6-module/3-task/slides.js';

import RibbonMenu from '../../7-module/1-task/index.js';
import categories from '../../7-module/1-task/categories.js';

import StepSlider from '../../7-module/4-task/index.js';
import ProductsGrid from '../../8-module/2-task/index.js';

import CartIcon from '../../8-module/1-task/index.js';
import Cart from '../../8-module/4-task/index.js';

export default class Main {

  constructor() {
  }

  async render() {
    this.carousel = new Carousel(slides);

    let containerElement = document.body.querySelector('[data-carousel-holder]');
    containerElement.append(this.carousel.elem);

    this.ribbon = new RibbonMenu(categories);
    let container = document.querySelector('[data-ribbon-holder]');
    container.append(this.ribbon.elem);

    this.stepSlider = new StepSlider({
      steps: 5,
      value: 3
    });
    let slider_container = document.querySelector('[data-slider-holder]');
    slider_container.append(this.stepSlider.elem);

    this.cartIcon = new CartIcon();
    let cartIconHolder = document.querySelector('[data-cart-icon-holder]');
    cartIconHolder.append(this.cartIcon.elem);

    this.cart = new Cart(this.cartIcon);

    this.products = await this.fetchProducts();
    this.productsGrid = new ProductsGrid(this.products);
    
    document.querySelector('[data-products-grid-holder]').append(this.productsGrid.elem);

    this.productsGrid.updateFilter({
      noNuts: document.getElementById('nuts-checkbox').checked,
      vegeterianOnly: document.getElementById('vegeterian-checkbox').checked,
      maxSpiciness: this.stepSlider.value,
      category: this.ribbon.value
    });

    document.body.addEventListener('product-add', ({ detail: productId }) => {
      let product = this.products.find(product => product.id == productId);
      this.cart.addProduct(product);
    });

    this.stepSlider.elem.addEventListener('slider-change', ({ detail: value }) => {
      this.productsGrid.updateFilter({
        maxSpiciness: value
      });
    });

    this.ribbon.elem.addEventListener('ribbon-select', ({ detail: categoryId }) => {
      this.productsGrid.updateFilter({
        category: categoryId
      });
    });

    document.getElementById('nuts-checkbox').onchange = event => {
      this.productsGrid.updateFilter({
        noNuts: event.target.checked
      });
    };

    document.getElementById('vegeterian-checkbox').onchange = event => {
      this.productsGrid.updateFilter({
        vegeterianOnly: event.target.checked
      });
    };
  }


  async fetchProducts() {
    let response = await fetch('products.json');
    let products = await response.json();

    return products;
  }
}
