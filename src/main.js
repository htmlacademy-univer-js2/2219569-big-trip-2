import { render } from './framework/render';
import Trip from './presenter/trip';
import PointsModel from './models/points-model';
import MenuView from './view/menu';
import DestinationsModel from './models/destinations-model';
import OffersByTypeModel from './models/offers-by-type-model';
import FiltersModel from './models/filters-model';
import FiltersPresenter from './presenter/filters-presenter';

const pointsModel = new PointsModel();
const destinationsModel = new DestinationsModel();
const offersByTypeModel = new OffersByTypeModel();
const filterModel = new FiltersModel();

const tripContainer = document.querySelector('.trip-events');
const menuContainer = document.querySelector('.trip-main');

const filtersPresenter = new FiltersPresenter({
  filtersContainer: document.querySelector('.trip-controls__filters'),
  pointsModel: pointsModel,
  filterModel: filterModel,
});

const tripPresenter = new Trip({
  container: tripContainer,
  menuContainer: menuContainer,
  pointsModel: pointsModel,
  filtersModel: filterModel,
  destinationsModel: destinationsModel,
  offersByTypeModel: offersByTypeModel,
});

render(new MenuView(), document.querySelector('.trip-controls__navigation'));

tripPresenter.init(pointsModel);
filtersPresenter.init();