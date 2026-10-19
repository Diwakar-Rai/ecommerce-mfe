import React, { useEffect, useState, useRef } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  CART_STATE_EVENT,
  CART_STATE_REQUEST_EVENT,
  CART_UPDATE_EVENT,
  type CartItem,
} from "./cart/cartEvents";
import { eventBus } from "./events/eventBus";
import { EVENT_NAMES } from "./events/eventNames";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const cartItemsRef = useRef<CartItem[]>([]);

  useEffect(() => {
    function publishCart(items: CartItem[]) {
      // Keep the latest cart available to event handlers.
      cartItemsRef.current = items;

      // Update the Shell's rendered state.
      setCartItems(items);

      // Notify the Cart remote and other listeners.
      window.dispatchEvent(
        new CustomEvent<CartItem[]>(CART_STATE_EVENT, {
          detail: items,
        }),
      );
    }

    function handleAdd(detail: CartItem) {

      if (
        !detail?.productId ||
        !detail.name ||
        !Number.isFinite(detail.price) ||
        !Number.isFinite(detail.quantity) ||
        detail.quantity <= 0
      ) {
        return;
      }

      const current = cartItemsRef.current;
      const existing = current.find(
        (item) => item.productId === detail.productId,
      );

      const next = existing
        ? current.map((item) =>
            item.productId === detail.productId
              ? {
                  ...item,
                  quantity: item.quantity + detail.quantity,
                }
              : item,
          )
        : [...current, { ...detail }];

      publishCart(next);
    }

    function handleUpdate(event: Event) {
      const detail = (event as CustomEvent<CartItem[]>).detail;

      if (!Array.isArray(detail)) return;

      const validItems = detail.filter(
        (item) =>
          item &&
          item.productId &&
          item.name &&
          Number.isFinite(item.price) &&
          item.price >= 0 &&
          Number.isInteger(item.quantity) &&
          item.quantity > 0,
      );

      publishCart(validItems);
    }

    function handleStateRequest() {
      window.dispatchEvent(
        new CustomEvent<CartItem[]>(CART_STATE_EVENT, {
          detail: cartItemsRef.current,
        }),
      );
    }

    const unsubscribeAdd = eventBus.on<CartItem>(
      EVENT_NAMES.CART_ADD,
      handleAdd,
    );
    window.addEventListener(CART_UPDATE_EVENT, handleUpdate);
    window.addEventListener(CART_STATE_REQUEST_EVENT, handleStateRequest);

    return () => {
      unsubscribeAdd();
      window.removeEventListener(CART_UPDATE_EVENT, handleUpdate);
      window.removeEventListener(CART_STATE_REQUEST_EVENT, handleStateRequest);
    };
  }, []);

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const navigation = [
    { label: "Home", path: "/" },
    { label: "Products", path: "/products" },
    { label: "Cart", path: "/cart" },
    { label: "Orders", path: "/orders" },
    { label: "Profile", path: "/profile" },
  ];

  return (
    <div className="app">
      <header className="header">
        <NavLink to="/" className="brand">
          <span className="brand-icon">E</span>
          <span>Ecommerce MFE</span>
        </NavLink>

        <nav className="navigation">
          {navigation.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `nav-link ${isActive ? "active" : ""}`
              }
            >
              {item.label}

              {item.path === "/cart" && (
                <span className="cart-count">{cartCount}</span>
              )}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <footer className="footer">
        <p>Ecommerce MFE · React · Angular · Native Federation</p>
      </footer>
    </div>
  );
}

export default App;
