import React from 'react';
import { Link } from 'react-router-dom';
import Price from '../../components/Price/Price';
import Title from '../../components/Title/Title';
import { useCart } from '../../hooks/useCart';
import classes from './cartPage.module.css';
import NotFound from '../../components/NotFound/NotFound';

export default function CartPage() {
  const { cart, removeFromCart, changeQuantity } = useCart();

  return (
    <>
      <Title title="Cart Page" margin="1.5rem 0 0 2.5rem" />

      {cart.items.length === 0 ? (
        <NotFound message="Cart Page Is Empty!" />
      ) : (
        <div className={classes.container}>
          <ul className={classes.list}>
            {cart.items.map((item) => (
              <li key={item.sweet.id} className={classes.listItem}>
                <div className={classes.itemImage}>
                  <img
                    src={`${item.sweet.imageUrl}`}
                    alt={item.sweet.name}
                  />
                </div>

                <div>
                  <Link to={`/sweet/${item.sweet.id}`}>{item.sweet.name}</Link>
                </div>

                <div>
                  <select
                    className={classes.quantitySelector}
                    value={item.quantity}
                    onChange={(e) => changeQuantity(item, Number(e.target.value))}
                  >
                    {[...Array(10).keys()].map((num) => (
                      <option key={num + 1}>{num + 1}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <Price price={item.price} />
                </div>

                <div>
                  <button
                    className={classes.removeButton}
                    onClick={() => removeFromCart(item.sweet.id)}
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <div className={classes.checkoutContainer}>
            <div className={classes.checkoutItem}>
              <span>Count:</span> {cart.totalCount}
            </div>

            <div className={classes.checkoutItem}>
              <span>Price:</span> <Price price={cart.totalPrice} />
            </div>

            <Link to="/checkout" className={classes.checkoutButton}>
              Proceed To Checkout
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
