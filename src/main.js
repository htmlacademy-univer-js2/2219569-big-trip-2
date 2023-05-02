import { render } from './render';
import FiltersView from './view/filters';
import Trip from './presenter/trip';
import PointsModel from './models/points_model';


const filtersContainerElement = document.querySelector('.trip-controls__filters');
const tripContainerElement = document.querySelector('.trip-events');
const pointsModel = new PointsModel();
const tripPresenter = new Trip(tripContainerElement, pointsModel);

render(new FiltersView(), filtersContainerElement);
tripPresenter.init();