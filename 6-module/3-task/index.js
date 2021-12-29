import createElement from '../../assets/lib/create-element.js';

export default class Carousel {
  constructor(slides) {
    this.slides = slides;
    this.render();
  }

  render() {
    this.elem = document.createElement('div');
    this.elem.className = "carousel";

    this.elem.innerHTML = `<div class="carousel__arrow carousel__arrow_right">
      <img src="/assets/images/icons/angle-icon.svg" alt="icon">
      </div>
      <div class="carousel__arrow carousel__arrow_left">
      <img src="/assets/images/icons/angle-left-icon.svg" alt="icon">
      </div>`;

    let carousel = document.createElement('div');
    carousel.className = "carousel__inner";

    this.slides.forEach((slide) => {
      let slideHtml = document.createElement('div');
      slideHtml.className = "carousel__slide";
      slideHtml.innerHTML =  `<img src="/assets/images/carousel/${slide.image}" class="carousel__img" alt="slide">
        <div class="carousel__caption">
        <span class="carousel__price">${'€' + slide.price.toFixed(2)}</span>
        <div class="carousel__title"><${slide.name}</div>
        <button type="button" class="carousel__button" data-id="${slide.id}">
        <img src="/assets/images/icons/plus-icon.svg" alt="icon">
        </button>
        </div>`;
      
      carousel.append(slideHtml);
    });

    this.elem.append(carousel)
    let slidesCount = carousel.children.length;
    let slide = 1;
    let slideSize = 0;
    let carouselArrowLeft = this.elem.querySelector('.carousel__arrow_left');
    let carouselArrowRight = this.elem.querySelector('.carousel__arrow_right');
    carouselArrowLeft.style.display = 'none';

    carouselArrowRight.onclick = function(e) {
      slideSize += carousel.offsetWidth;
      carousel.style.transform = `translateX(-${slideSize}px)`;
      slide++;
      this.style.display = slide == slidesCount ? 'none' : '';
      carouselArrowLeft.style.display = slide != 0 ? '' : 'none';
    };
    
    carouselArrowLeft.onclick = function(e) {
      slideSize -= carousel.offsetWidth;
      carousel.style.transform = `translateX(-${slideSize}px)`;
      slide--;
      this.style.display = slide == 0 ? 'none' : '';
      carouselArrowRight.style.display = slide != slidesCount ? '' : 'none';
    };

    this.elem.addEventListener('click', function (e) {
      if (e.target.closest('BUTTON')) {
        this.dispatchEvent(new CustomEvent("product-add", {
          detail: e.target.closest('BUTTON').dataset.id,
          bubbles: true
        }));
      }
    });

    return this.elem;
  }
}
