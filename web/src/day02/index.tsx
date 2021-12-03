import React, { useState } from 'react';
import { CartItem } from './components/CartItem';
import { MenuItem } from './components/MenuItem';
import BottomRight from './resources/images/bg__btm-right.svg?component';
import Left from './resources/images/bg__left.svg?component';
import TopRight from './resources/images/bg__top-right.svg?component';
import './index.css';
import { formatter, items, itemsById } from './items';

const TAX_RATE = 0.0975;

export const Day02 = () => {
  const [cartCount, setCartCount] = useState<Map<number, number>>(new Map());

  const updateItem = (itemId: number, newCount: number) => {
    setCartCount(new Map(cartCount.set(itemId, newCount)));
  };

  let itemsInCart = [...cartCount.keys()].filter((item) => {
    const count = cartCount.get(item);
    return !!count;
  });

  const subtotal = itemsInCart.reduce((sum, id) => {
    const item = itemsById[id];
    const quantity = cartCount.get(id) ?? 0;
    return (sum += item.price * quantity);
  }, 0);
  const tax = subtotal * TAX_RATE;
  const total = subtotal + tax;

  return (
    <div className="day02-container">
      <div className="day02-bg__btm-right">
        <BottomRight />
      </div>
      <div className="day02-bg__left">
        <Left />
      </div>
      <div className="day02-bg__top-right">
        <TopRight />
      </div>
      <div className="day02-content">
        <div className="day02-menu day02-card">
          <h1 className="day02-card-title">To Go Menu</h1>
          {items.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              inCart={!!cartCount.get(item.id)}
              onCartPress={(inCart) => updateItem(item.id, inCart ? 0 : 1)}
            />
          ))}
        </div>
        <div className="day02-cart day02-card">
          <h1 className="day02-card-title">Your Cart</h1>
          {!itemsInCart.length ? (
            <p>Your cart is empty.</p>
          ) : (
            <>
              {itemsInCart.map((id) => (
                <>
                  <CartItem
                    key={id}
                    item={itemsById[id]}
                    quantity={cartCount.get(id) ?? 0}
                    onQuantityChange={(newQuantity) =>
                      updateItem(id, newQuantity)
                    }
                  />
                  <hr />
                </>
              ))}
              <div className="day02-total-box">
                <div className="day02-total-row">
                  <label>Subtotal:</label>
                  <span>{formatter.format(subtotal)}</span>
                </div>
                <div className="day02-total-row">
                  <label>Tax:</label>
                  <span>{formatter.format(tax)}</span>
                </div>
                <div className="day02-total-row">
                  <label>Subtotal:</label>
                  <span>{formatter.format(total)}</span>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
