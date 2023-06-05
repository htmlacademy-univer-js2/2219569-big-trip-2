import { UpdateType, UserAction } from '../const';
import { RenderPosition, remove, render } from '../framework/render';
import EditPointView from '../view/edit-point';
import { nanoid } from 'nanoid';

export default class NewPointPresenter {
  #pointsModel = null;
  #destinationsModel = null;
  #offersByTypeModel = null;

  #newPointComponent = null;
  #pointsListContainer = null;

  #handleDestroy = null;
  #handleChangeData = null;

  constructor({
    newPointContainer,
    pointsModel,
    destinationsModel,
    offersByTypeModel,
    handleChangeData,
    handleDestroy,
  }) {
    this.#pointsListContainer = newPointContainer;
    this.#destinationsModel = destinationsModel;
    this.#pointsModel = pointsModel;
    this.#offersByTypeModel = offersByTypeModel;
    this.#handleChangeData = handleChangeData;
    this.#handleDestroy = handleDestroy;
  }

  init() {
    if (this.#newPointComponent !== null) {
      return;
    }
    this.#newPointComponent = new EditPointView({
      destinations: this.#destinationsModel.destinations,
      offersByType: this.#offersByTypeModel.offersByType,
      saveClick: this.#handleSaveClick,
      deleteClick: this.#handleCloseClick,
      closeClick: this.#handleCloseClick,
    });

    render(this.#newPointComponent, this.#pointsListContainer, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  destroy() {
    if (this.#newPointComponent === null) {
      return;
    }

    this.#handleDestroy();
    remove(this.#newPointComponent);
    this.#newPointComponent = null;
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.destroy();
    }
  };

  #handleSaveClick = (point) => {
    this.#handleChangeData(UserAction.ADD_POINT, UpdateType.MAJOR, { ...point, id: nanoid() });
    this.destroy();
  };

  #handleCloseClick = () => {
    this.destroy();
  };
}