import { render } from './render';
import FiltersView from './view/filters';
import Trip from './presenter/trip';
import PointsModel from './models/points-model';
import MenuView from './view/menu';

const pointsModel = new PointsModel();
const tripPresenter = new Trip(document.querySelector('.trip-events'), pointsModel);
render(new MenuView(), document.querySelector('.trip-controls__navigation'));
render(new FiltersView(), document.querySelector('.trip-controls__filters'));
tripPresenter.init(pointsModel);