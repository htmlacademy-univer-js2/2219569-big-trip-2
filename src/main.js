import { render, RenderPosition } from './framework/render';
import Trip from './presenter/trip';
import PointsModel from './models/points-model';
import MenuView from './view/menu';
import FiltersView from './view/filters';
import InfoView from './view/info';

const pointsModel = new PointsModel();
const tripPresenter = new Trip(document.querySelector('.trip-events'), pointsModel);

render(new MenuView(), document.querySelector('.trip-controls__navigation'));
render(new FiltersView(pointsModel.points), document.querySelector('.trip-controls__filters'));
render(new InfoView(pointsModel.points, pointsModel.destinations), document.querySelector('.trip-main'), RenderPosition.AFTERBEGIN);
tripPresenter.init(pointsModel);