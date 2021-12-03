import { Item } from './types';
import frenchFries from './resources/images/plate__french-fries.png';
import salmonVegetables from './resources/images/plate__salmon-vegetables.png';
import spaghetti from './resources/images/plate__spaghetti-meat-sauce.png';

export const formatter = Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
});

export const items: Item[] = [
  {
    id: 1,
    name: 'French Fries with Ketchup',
    imgSrc: frenchFries,
    price: 2.23,
  },
  {
    id: 2,
    name: 'Salmon and Vegetables',
    imgSrc: salmonVegetables,
    price: 5.52,
  },
  {
    id: 3,
    name: 'Spaghetti and Meat Sauce',
    imgSrc: spaghetti,
    price: 7.82,
  },
];

export const itemsById = items.reduce<{ [key: number]: Item }>(
  (acc, item) => ({ ...acc, [item.id]: item }),
  {}
);
