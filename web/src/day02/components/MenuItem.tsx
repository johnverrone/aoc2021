import React from 'react';
import { formatter } from '../items';
import { Item } from '../types';
import './MenuItem.css';

interface MenuItemProps {
  item: Item;
  backgroundColor?: 'blue' | 'white' | 'ice';
  inCart: boolean;
  onCartPress: (inCart: boolean) => void;
}

export const MenuItem: React.FC<MenuItemProps> = ({
  item: { imgSrc, name, price },
  backgroundColor = 'blue',
  inCart,
  onCartPress,
}) => (
  <div className="menu-item-wrapper">
    <img src={imgSrc} className="menu-item-image" />
    <div className="menu-item-data">
      <span>{name}</span>
      <span className="menu-item-price">{formatter.format(price)}</span>
      <button
        className={`menu-item-cart-button${inCart ? ' in-cart' : ''}`}
        onClick={() => onCartPress(inCart)}
      >
        {inCart ? '️✔ In Cart' : 'Add to Cart'}
      </button>
    </div>
  </div>
);
