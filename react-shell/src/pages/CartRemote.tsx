import { useEffect, useState } from "react";
import { loadRemoteModule } from "../federation";
import LoadingFallback from "../components/LoadingFallback";
import RemoteErrorFallback from "../components/RemoteErrorFallback";

const CART_CSS = "http://localhost:5175/cart.css";

function loadCartStyles(): Promise<void> {
  return new Promise((resolve, reject) => {
    let link = document.querySelector<HTMLLinkElement>(
      'link[data-mfe-styles="cart"]',
    );

    if (link?.dataset.loaded === "true" || link?.sheet) {
      resolve();
      return;
    }

    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = CART_CSS;
      link.dataset.mfeStyles = "cart";
      document.head.appendChild(link);
    }

    const stylesheet = link;

    stylesheet.onload = () => {
      stylesheet.dataset.loaded = "true";
      resolve();
    };

    stylesheet.onerror = () => {
      stylesheet.remove();
      reject(new Error(`Failed to load Cart CSS: ${CART_CSS}`));
    };
  });
}

function CartRemote() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  useEffect(() => {
    let active = true;

    async function start() {
      setLoaded(false);
      setError("");

      try {
        await loadCartStyles();
        await loadRemoteModule("react_cart", "./CartElement");

        if (active) setLoaded(true);
      } catch (err) {
        console.error("Cart loading failed:", err);

        if (active) {
          setError(err instanceof Error ? err.message : "Unable to load Cart.");
        }
      }
    }

    void start();

    return () => {
      active = false;
    };
  }, [retryCount]);

  if (error) {
    return (
      <RemoteErrorFallback
        name="Cart"
        message={error}
        onRetry={() => setRetryCount((count) => count + 1)}
      />
    );
  }

  if (!loaded) return <LoadingFallback name="Cart" />;

  return <cart-mfe />;
}

export default CartRemote;