import { createElement } from '../utils/render.js';

const createStartWindowTemplate = () => {
  return `<section class="start-window">
      <b class="start-window__slogan-text">
        Это просто демонстрационный сайт -  Made by me &#128515;
      </b>
      <p class="start-window__default-text">

      </p>
      <p class="start-window__contacts">
      </p>
      <button class="start-window__close-button">
        Поехали смотреть!
      </button>
    </section>`;
};

export default class StartWindow {
  constructor() {
    this._element = null;
  }

  getTemplate() {
    return createStartWindowTemplate();
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    console.log(this._element);

    return this._element;
  }
}
