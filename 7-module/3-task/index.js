export default class StepSlider {
  constructor({ steps, value = 0 }) {
    this.steps = steps;
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

  addEventListener(){
    this.elem.onclick = this.moveSlider;
  }

  moveSlider = event => {
    let thumb = this.elem.querySelector('.slider__thumb');
  
    if(thumb){
      let left = event.clientX - this.elem.getBoundingClientRect().left;
      let progress = this.elem.querySelector('.slider__progress');

      let leftRelative = left / this.elem.offsetWidth;
      let segments = this.steps - 1;
      let approximateValue = leftRelative * segments;
      let value = Math.round(approximateValue);
      let valuePercents = value / segments * 100;

      thumb.style.left = `${valuePercents}%`;
      progress.style.width = `${valuePercents}%`;

      this.value = value;
      this.elem.querySelector('.slider__value').textContent = this.value;

    }

    this.elem.dispatchEvent(
      new CustomEvent('slider-change', {
        detail: this.value,
        bubbles: true
      })
    );
  }
}
