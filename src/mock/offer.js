import { randomInteger } from '../presenter/util';

const titles = ['Economy', 'Comfort', 'Business'];

export const createOffer = (id) => ({
  id: id,
  title: titles[randomInteger(0, titles.length - 1)],
  price: randomInteger(10, 500),
});