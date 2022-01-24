export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
    this.segments = this.steps - 1;
    this.value = value;
    this.render();
    this.addEventListener();
    }

  render(){
    this.elem = document.createElement('div')
    this.elem.classList.add('slider');
    this.elem.innerHTML = `<div class="slider__thumb" style="left: 50%;">
          <span class="slider__value">2</span>
        </div>
        <div class="slider__progress" style="width: 50%;"></div>
        <div class="slider__steps">
        </div>`;

        for (let i = 0; i < this.steps; i++) {
          let item = document.createElement('span');
          this.elem.querySelector('.slider__steps').append(item);
        }
        this.elem.querySelector('.slider__steps').children[0].classList.add('slider__step-active');
  }

  moveSlider = event => {
    let thumb = this.elem.querySelector('.slider__thumb');
  
    if(thumb){
      let leftRelative = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      let progress = this.elem.querySelector('.slider__progress');

      let approximateValue = leftRelative * this.segments;
      this.value = Math.round(approximateValue);;
      let valuePercents = this.value / this.segments * 100;

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      this.elem.querySelector('.slider__value').textContent = this.value;

      if (this.elem.querySelector('.slider__step-active')) {
        this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
      }
  
      this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');

    }

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

  onPointerMove = event => {
    event.preventDefault();

    let thumb = this.elem.querySelector('.slider__thumb');

    if(thumb){
      let progress = this.elem.querySelector('.slider__progress');
      let transformFor = (event.clientX - this.elem.getBoundingClientRect().left) / this.elem.offsetWidth;
      if (transformFor < 0) { transformFor = 0; }
      if (transformFor > 1) { transformFor = 1; }

      thumb.style.left = `${transformFor * 100}%`;
      progress.style.width = `${transformFor * 100}%`;
      this.value = Math.round(this.segments * transformFor);
      this.elem.querySelector('.slider__value').textContent = this.value;

      if (this.elem.querySelector('.slider__step-active')) {
        this.elem.querySelector('.slider__step-active').classList.remove('slider__step-active');
      }
  
      this.elem.querySelector('.slider__steps').children[this.value].classList.add('slider__step-active');
    }
  }

  addEventListener(){
    this.elem.querySelector('.slider__thumb').ondragstart = () => false;
    this.elem.querySelector('.slider__thumb').onpointerdown = this.onPointerDown;
    this.elem.onclick = this.moveSlider;
  }

  onPointerDown = event => {
    event.preventDefault();

    this.elem.classList.add('slider_dragging');
    document.addEventListener('pointermove', this.onPointerMove);
    document.addEventListener('pointerup', this.onPointerUp);
  }

  onPointerUp = event => {
    document.removeEventListener('pointermove', this.onPointerMove);
    document.removeEventListener('pointerup', this.onPointerUp);

    this.elem.classList.remove('slider_dragging');

    this.elem.querySelector('.slider__thumb').style.left = `${this.value / this.segments * 100}%`;
    this.elem.querySelector('.slider__progress').style.width = `${this.value / this.segments * 100}%`;

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }

}
