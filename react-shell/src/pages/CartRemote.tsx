import { useEffect, useState } from "react";
import { loadRemoteModule } from "../federation";

const CART_CSS = "http://localhost:5175/cart.css";

function loadCartStyles(): Promise<void> {
  return new Promise((resolve, reject) => {
    let link = document.querySelector<HTMLLinkElement>(
      'link[data-mfe-styles="cart"]',
    );

    if (link?.dataset.loaded === "true") {
      resolve();
      return;
    }

    if (link?.sheet) {
      link.dataset.loaded = "true";
      resolve();
      return;
    }

    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CART_CSS;
      link.dataset.mfeStyles = "cart";
    }

    link.onload = () => {
      link!.dataset.loaded = "true";
      resolve();
    };

    link.onerror = () =>
      reject(new Error(`Failed to load Cart CSS: ${CART_CSS}`));

    if (!link.isConnected) {
      document.head.appendChild(link);
    }
  });
}

function CartRemote() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    let active = true;

    async function start() {
      try {
        await loadCartStyles();
        await loadRemoteModule("react_cart", "./CartElement");

        if (active) setLoaded(true);
      } catch (err) {
        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load Cart.");
        }
      }
    }

    start();

    return () => {
      active = false;
    };
  }, []);

  if (error) return <p>Could not load Cart: {error}</p>;
  if (!loaded) return <p>Loading Cart...</p>;

  return <cart-mfe />;
}

export default CartRemote;
