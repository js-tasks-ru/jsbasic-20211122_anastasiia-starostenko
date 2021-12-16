function initCarousel() {

  let carousel = document.querySelector('.carousel__inner');
  let slidesCount = carousel.children.length;
  let slide = 1;
  let slideSize = 0;
  let carouselArrowLeft = document.querySelector('.carousel__arrow_left');
  let carouselArrowRight = document.querySelector('.carousel__arrow_right');
  
  carouselArrowLeft.style.display = 'none';
    
  carouselArrowRight.onclick = function() {
    slideSize += carousel.offsetWidth;
    carousel.style.transform = `translateX(-${slideSize}px)`;
    slide++;
    this.style.display = slide == slidesCount ? 'none' : '';
    carouselArrowLeft.style.display = slide != 0 ? '' : 'none';
  }

  carouselArrowLeft.onclick = function() {
    slideSize -= carousel.offsetWidth;
    carousel.style.transform = `translateX(-${slideSize}px)`;
    slide--;
    this.style.display = slide == 0 ? 'none' : '';
    carouselArrowRight.style.display = slide != slidesCount ? '' : 'none';
  }   
}     