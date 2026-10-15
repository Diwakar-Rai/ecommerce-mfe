import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  CART_STATE_EVENT,
  type CartItem,
  requestCartState,
  updateCart,
} from "../events/cartEvents";

function CartPage() {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const handleCartState = (event: Event) => {
      const customEvent = event as CustomEvent<CartItem[]>;
      setItems(customEvent.detail ?? []);
    };

    window.addEventListener(CART_STATE_EVENT, handleCartState);

    // Ask the shell for the current cart.
    requestCartState();

    return () => {
      window.removeEventListener(CART_STATE_EVENT, handleCartState);
    };
  }, []);

  function publishCart(nextItems: CartItem[]) {
    setItems(nextItems);
    updateCart(nextItems);
  }

  function changeQuantity(productId: string, delta: number) {
    const nextItems = items.map((item) =>
      item.productId === productId
        ? {
            ...item,
            quantity: Math.max(1, item.quantity + delta),
          }
        : item,
    );

    publishCart(nextItems);
  }

  function removeItem(productId: string) {
    publishCart(items.filter((item) => item.productId !== productId));
  }

  const itemCount = items.reduce((total, item) => total + item.quantity, 0);

  const subtotal = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0,
  );

  const shipping = subtotal === 0 || subtotal >= 2000 ? 0 : 99;
  const total = subtotal + shipping;

  if (items.length === 0) {
    return (
      <section className="cart-empty">
        <div className="empty-icon">🛒</div>
        <h1>Your cart is empty</h1>
        <p>Add some products to get started.</p>
        <Link to="/products" className="primary-button">
          Continue Shopping
        </Link>
      </section>
    );
  }

  return (
    <section className="cart-page">
      <div className="cart-heading">
        <div>
          <p className="eyebrow">YOUR SHOPPING CART</p>
          <h1>Shopping Cart</h1>
        </div>
        <span>{itemCount} item(s)</span>
      </div>

      <div className="cart-layout">
        <div className="cart-items">
          {items.map((item) => (
            <article className="cart-item" key={item.productId}>
              <div className="cart-item-art">🛍️</div>

              <div className="cart-item-info">
                <h2>{item.name}</h2>
                <p>₹{item.price.toLocaleString("en-IN")} each</p>

                <div className="quantity-control">
                  <button
                    aria-label={`Decrease ${item.name} quantity`}
                    onClick={() => changeQuantity(item.productId, -1)}
                  >
                    −
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    aria-label={`Increase ${item.name} quantity`}
                    onClick={() => changeQuantity(item.productId, 1)}
                  >
                    +
                  </button>
                </div>
              </div>

              <div className="cart-item-actions">
                <strong>
                  ₹{(item.price * item.quantity).toLocaleString("en-IN")}
                </strong>

                <button
                  className="remove-button"
                  onClick={() => removeItem(item.productId)}
                >
                  Remove
                </button>
              </div>
            </article>
          ))}

          <Link to="/products" className="continue-link">
            ← Continue Shopping
          </Link>
        </div>

        <aside className="order-summary">
          <h2>Order Summary</h2>

          <div className="summary-row">
            <span>Subtotal</span>
            <span>₹{subtotal.toLocaleString("en-IN")}</span>
          </div>

          <div className="summary-row">
            <span>Shipping</span>
            <span>
              {shipping === 0 ? "Free" : `₹${shipping.toLocaleString("en-IN")}`}
            </span>
          </div>

          <div className="summary-row total-row">
            <strong>Total</strong>
            <strong>₹{total.toLocaleString("en-IN")}</strong>
          </div>

          <button
            className="checkout-button"
            onClick={() =>
              alert("Checkout will be implemented in a later step.")
            }
          >
            Proceed to Checkout
          </button>

          <p className="shipping-note">
            Free shipping on orders of ₹2,000 or more.
          </p>
        </aside>
      </div>
    </section>
  );
}

export default CartPage;
