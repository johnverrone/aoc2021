import React from 'react';
import { formatter } from '../items';
import { Item } from '../types';
import './CartItem.css';

interface CartItemProps {
  item: Item;
  quantity: number;
  onQuantityChange: (newQuantity: number) => void;
}

export const CartItem: React.FC<CartItemProps> = ({
  item: { imgSrc, name, price },
  quantity,
  onQuantityChange,
}) => (
  <div className="cart-item-wrapper">
    <div className="cart-item-image">
      <img src={imgSrc} className="cart-item-image" />
    </div>
    <div className="cart-item-data">
      <span>{name}</span>
      <span className="cart-item-unit-price">{formatter.format(price)}</span>
      <div className="cart-item-quantity-row">
        <button
          className="cart-item-quantity-button decrease"
          onClick={() => onQuantityChange(quantity - 1)}
        >
          -
        </button>
        <span>{quantity}</span>
        <button
          className="cart-item-quantity-button increase"
          onClick={() => onQuantityChange(quantity + 1)}
        >
          +
        </button>
        <span className="cart-item-total">
          {formatter.format(price * quantity)}
        </span>
      </div>
    </div>
  </div>
);
