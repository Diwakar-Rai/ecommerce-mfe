import { useEffect, useState } from "react";
import { NavLink, Outlet } from "react-router-dom";
import {
  CART_ADD_EVENT,
  CART_STATE_EVENT,
  CART_STATE_REQUEST_EVENT,
  CART_UPDATE_EVENT,
  type CartItem,
} from "./cart/cartEvents";
import "./App.css";

function App() {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    function publishCart(items: CartItem[]) {
      setCartItems(items);

      window.dispatchEvent(
        new CustomEvent<CartItem[]>(CART_STATE_EVENT, {
          detail: items,
        }),
      );
    }

    function handleAdd(event: Event) {
      const detail = (event as CustomEvent<CartItem>).detail;

      if (
        !detail?.productId ||
        !detail.name ||
        !Number.isFinite(detail.price) ||
        !Number.isFinite(detail.quantity) ||
        detail.quantity <= 0
      ) {
        return;
      }

      setCartItems((current) => {
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

        window.dispatchEvent(
          new CustomEvent<CartItem[]>(CART_STATE_EVENT, {
            detail: next,
          }),
        );

        return next;
      });
    }

    function handleUpdate(event: Event) {
      const detail = (event as CustomEvent<CartItem[]>).detail;

      if (!Array.isArray(detail)) return;

      const validItems = detail.filter(
        (item) =>
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
      // The cart's state is kept in the shell.
      setCartItems((current) => {
        window.dispatchEvent(
          new CustomEvent<CartItem[]>(CART_STATE_EVENT, {
            detail: current,
          }),
        );

        return current;
      });
    }

    window.addEventListener(CART_ADD_EVENT, handleAdd);
    window.addEventListener(CART_UPDATE_EVENT, handleUpdate);
    window.addEventListener(CART_STATE_REQUEST_EVENT, handleStateRequest);

    return () => {
      window.removeEventListener(CART_ADD_EVENT, handleAdd);
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
