import { render, RenderPosition } from './render';
import FiltersView from './view/filters';
import Trip from './presenter/trip';
import PointsModel from './models/points-model';
import MenuView from './view/menu';
import InfoView from './view/info';


const pointsModel = new PointsModel();
const tripPresenter = new Trip(document.querySelector('.trip-events'), pointsModel);

render(new InfoView(), document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
render(new MenuView(), document.querySelector('.trip-controls__navigation'));
render(new FiltersView(), document.querySelector('.trip-controls__filters'));
tripPresenter.init(pointsModel);