import AbsractView from '../framework/view/abstract-view';
import { upperCaseFirst } from '../presenter/util';
import dayjs from 'dayjs';

const BLANK_POINT = {
  basePrice: 0,
  dateFrom: dayjs(),
  dateTo: dayjs(),
  destination: 0,
  id: 0,
  isFavorite: false,
  offers: [],
  type: 'taxi',
};

const createOffersTemplate = (offers, type, activeOffersIds) => {
  const offersByType = offers.filter((offer) => offer.type === type)[0].offers;
  return offersByType
    .map((offer) => {
      return `
      <div class="event__available-offers">
        <div class="event__offer-selector">
        <input class="event__offer-checkbox  visually-hidden" id="event-offer-luggage-1" type="checkbox" name="event-offer-luggage" ${activeOffersIds.includes(offer.id) ? 'checked' : ''}>
        <label class="event__offer-label" for="event-offer-luggage-1">
          <span class="event__offer-title">${offer.title}</span>
          &plus;&euro;&nbsp;
          <span class="event__offer-price">${offer.price}</span>
        </label>
      </div>`;
    })
    .join('\n');
};

const createTypesTemplate = (offersByType) => {
  const types = offersByType.map((type) => type.type);
  return types
    .map((type) => {
      return `
    <div class="event__type-item">
      <input id="event-type-${type}-1" class="event__type-input  visually-hidden" type="radio" name="event-type" value="${type}">
      <label class="event__type-label  event__type-label--${type}" for="event-type-${type}-1">${upperCaseFirst(type)}</label>
    </div>`;
    })
    .join('\n');
};

const createDestinationsOptionsTemplate = (destinations) => {
  return destinations.map((destination) => `<option value="${destination.name}">${destination.name}</option>`).join('\n');
};

const createEditPointTemplate = (point, destinations, offersByType) => {
  let { dateFrom, dateTo } = point;
  const { basePrice, destination, type, offers } = point;

  dateFrom = dayjs(dateFrom);
  dateTo = dayjs(dateTo);
  const destinationObj = destinations[destination];

  const offersTemplate = createOffersTemplate(offersByType, type, offers);
  const typesTemplate = createTypesTemplate(offersByType);
  const destinationsTemplate = createDestinationsOptionsTemplate(destinations);

  return `
  <li class="trip-events__item">
    <form class="event event--edit" action="#" method="post">
      <header class="event__header">
        <div class="event__type-wrapper">
          <label class="event__type  event__type-btn" for="event-type-toggle-1">
            <span class="visually-hidden">Choose event type</span>
            <img class="event__type-icon" width="17" height="17" src="img/icons/${type}.png" alt="Event type icon">
          </label>
          <input class="event__type-toggle  visually-hidden" id="event-type-toggle-1" type="checkbox">

          <div class="event__type-list">
            <fieldset class="event__type-group">
              <legend class="visually-hidden">Event type</legend>
              ${typesTemplate}
            </fieldset>
          </div>
        </div>

        <div class="event__field-group  event__field-group--destination">
          <label class="event__label  event__type-output" for="event-destination-1">
            ${upperCaseFirst(type)}
          </label>
          <input class="event__input  event__input--destination" id="event-destination-1" type="text" name="event-destination"
            value="${destinationObj.name}" list="destination-list-1">
          <datalist id="destination-list-1">
            ${destinationsTemplate}
          </datalist>
        </div>

        <div class="event__field-group  event__field-group--time">
          <label class="visually-hidden" for="event-start-time-1">From</label>
          <input class="event__input  event__input--time" id="event-start-time-1" type="text" name="event-start-time"
            value="${dateFrom.format('DD/MM/YY HH:mm')}">
          &mdash;
          <label class="visually-hidden" for="event-end-time-1">To</label>
          <input class="event__input  event__input--time" id="event-end-time-1" type="text" name="event-end-time"
            value="${dateTo.format('DD/MM/YY HH:mm')}">
        </div>

        <div class="event__field-group  event__field-group--price">
          <label class="event__label" for="event-price-1">
            <span class="visually-hidden">Price</span>
            &euro;
          </label>
          <input class="event__input  event__input--price" id="event-price-1" type="text" name="event-price" value="${basePrice}">
        </div>

        <button class="event__save-btn  btn  btn--blue" type="submit">Save</button>
        <button class="event__reset-btn" type="reset">Delete</button>
        <button class="event__rollup-btn" type="button">
          <span class="visually-hidden">Open event</span>
        </button>
      </header>
      <section class="event__details">
        <section class="event__section  event__section--offers">
          <h3 class="event__section-title  event__section-title--offers">Offers</h3>

          <div class="event__available-offers">
            ${offersTemplate}
          </div>
        </section>

        <section class="event__section  event__section--destination">
          <h3 class="event__section-title  event__section-title--destination">Destination</h3>
          <p class="event__destination-description">
            ${destinationObj.description}
          </p>
        </section>
      </section>
    </form>
  </li>`;
};

export default class EditPointView extends AbsractView {
  #point = null;
  #destinations = null;
  #offersByType = null;

  constructor({ point = BLANK_POINT, destinations, offersByType, saveClick }) {
    super();
    this.#point = point;
    this.#destinations = destinations;
    this.#offersByType = offersByType;

    this._callback.saveClick = saveClick;
    this.element.querySelector('.event__rollup-btn').addEventListener('click', this.#saveClickHandler);
    this.element.querySelector('.event__save-btn').addEventListener('click', this.#saveClickHandler);
  }

  get template() {
    return createEditPointTemplate(this.#point, this.#destinations, this.#offersByType);
  }

  #saveClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.saveClick();
  };
}