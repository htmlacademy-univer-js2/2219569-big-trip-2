import { randomInteger } from '../presenter/util';

const descriptions = ['Killing Spree!', 'Rampage!', 'GODLIKE!'];
const names = ['Austin', 'Moscow', 'Helsinki', 'Birmingham', 'Oslo', 'Dresden', 'Seattle'];

export const createDestination = (id) => ({
  id: id,
  description: descriptions[randomInteger(0, descriptions.length - 1)],
  name: names[randomInteger(0, names.length - 1)],
  pictures: [
    {
      src: `http://picsum.photos/248/152?r=${randomInteger(0, 100)}`,
      description: descriptions[randomInteger(0, descriptions.length - 1)],
    },
  ],
});