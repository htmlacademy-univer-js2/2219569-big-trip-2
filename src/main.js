import { render } from './framework/render';
import Trip from './presenter/trip';
import PointsModel from './models/points-model';
import MenuView from './view/menu';
import FiltersModel from './models/filters-model';
import FiltersPresenter from './presenter/filters-presenter';
import PointsApiService from './point-api-service';

const AUTHORIZATION = 'Basic sr014kllbdp';
const END_POINT = 'https://18.ecmascript.pages.academy/big-trip/';
const pointsApiService = new PointsApiService(END_POINT, AUTHORIZATION);

const pointsModel = new PointsModel({
    pointsApiService: pointsApiService,
  });
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
});

render(new MenuView(), document.querySelector('.trip-controls__navigation'));

pointsModel.init();
tripPresenter.init();
filtersPresenter.init();