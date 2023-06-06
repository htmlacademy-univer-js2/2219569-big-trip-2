import { UpdateType } from '../const';
import Observable from '../framework/observable';

export default class PointsModel extends Observable {
  #pointsApiService = null;
  #points = [];
  #destinations = [];
  #offers = [];

  constructor({ pointsApiService }) {
    super();
    this.#pointsApiService = pointsApiService;
  }

  get points() {
    return this.#points;
  }

  get destinations() {
    return this.#destinations;
  }

  get offers() {
    return this.#offers;
  }

  async init() {
    try {
      const points = await this.#pointsApiService.points;
      this.#points = points.map(this.#adaptToClient);
      this.#destinations = await this.#pointsApiService.destinations;
      this.#offers = await this.#pointsApiService.offers;
    } catch (err) {
      this.#points = [];
      this.#offers = [];
      this.#destinations = [];
    }
    this._notify(UpdateType.INIT);
  }

  async updatePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      return;
    }

    try {
      const responce = await this.#pointsApiService.updatePoint(update);
      const updatedPoint = this.#adaptToClient(responce);
      this.#points = [...this.#points.slice(0, index), updatedPoint, ...this.#points.slice(index + 1)];
      this._notify(updateType, update);
    } catch {
      throw new Error('Can\'t update task');
    }
  }

  addPoint(updateType, update) {
    this.#points = [update, ...this.#points];
    this._notify(updateType, update);
  }

  deletePoint(updateType, update) {
    const index = this.#points.findIndex((point) => point.id === update.id);

    if (index === -1) {
      return;
    }

    this.#points = [...this.#points.slice(0, index), ...this.#points.slice(index + 1)];

    this._notify(updateType, update);
  }
  
  #adaptToClient = (point) => {
    const adaptedPoint = {
      ...point,
      basePrice: point['base_price'],
      dateFrom: point['date_from'],
      dateTo: point['date_to'],
      isFavorite: point['is_favorite'],
    };

    delete adaptedPoint['base_price'];
    delete adaptedPoint['date_from'];
    delete adaptedPoint['date_to'];
    delete adaptedPoint['is_favorite'];

    return adaptedPoint;
  };
}