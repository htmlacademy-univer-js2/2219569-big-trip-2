import { createElement } from '../render';

const createPointsListTemplate = () => '<ul class="trip-events__list">';

export default class PointsListView {
  #element = null;

  constructor() {
    this.#element = null;
  }

  get template() {
    return createPointsListTemplate();
  }

  get element() {
    this.#element = this.#element || createElement(this.template);
    return this.#element;
  }

  removeElement() {
    this.#element = null;
  }
}