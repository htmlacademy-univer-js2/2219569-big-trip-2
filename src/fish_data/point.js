import { getRandomInteger } from '../utils';
import generateDestination from './destination';

const identifyFavorite = () => {
    const id = getRandomInteger();
    return id === 1;
  };

const TYPE_POINT = [
  'taxi.png',
  'bus.png',
  'train.png',
  'ship.png',
  'drive.png',
  'flight.png',
  'check-in.png',
  'sightseeing.png',
  'restaurant.png'
];

const generateTypePoint = () =>
TYPE_POINT[getRandomInteger(0,TYPE_POINT.length - 1)];

const generatePoint = () => ({
    'basePrice': getRandomInteger(1, 500),
    'dateFrom': '2019-07-10T22:55:56.845Z',
    'dateTo': '2019-07-11T11:22:13.375Z',
  'destination': generateDestination(),
  'isFavorite': identifyFavorite(),
  'offers': [],
  'type': generateTypePoint()
});

export default generatePoint;