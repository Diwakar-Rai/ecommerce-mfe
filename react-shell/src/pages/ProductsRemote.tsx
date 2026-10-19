import { useCallback, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadRemoteModule } from "../federation";
import LoadingFallback from "../components/LoadingFallback";
import RemoteErrorFallback from "../components/RemoteErrorFallback";
import { type CartItem } from "../cart/cartEvents";
import { eventBus } from "../events/eventBus";
import { EVENT_NAMES } from "../events/eventNames";

type ProductsMfeElement = HTMLElement & {
  onAddToCart?: (item: CartItem) => void;
};

const PRODUCTS_CSS = "http://localhost:5174/products.css";

function loadProductsStylesheet(): Promise<void> {
  return new Promise((resolve, reject) => {
    let link = document.querySelector<HTMLLinkElement>(
      'link[data-mfe-styles="products"]',
    );

    if (link?.dataset.loaded === "true" || link?.sheet) {
      resolve();
      return;
    }

    if (!link) {
      link = document.createElement("link");
      link.rel = "stylesheet";
      link.href = PRODUCTS_CSS;
      link.dataset.mfeStyles = "products";
      document.head.appendChild(link);
    }

    const stylesheet = link;

    stylesheet.onload = () => {
      stylesheet.dataset.loaded = "true";
      resolve();
    };

    stylesheet.onerror = () => {
      stylesheet.remove();
      reject(new Error(`Failed to load Products CSS: ${PRODUCTS_CSS}`));
    };
  });
}

function ProductsRemote() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");
  const [retryCount, setRetryCount] = useState(0);

  const productsRef = useRef<ProductsMfeElement>(null);

  const location = useLocation();
  const navigate = useNavigate();

  const handleAddToCart = useCallback((item: CartItem) => {

    eventBus.emit(EVENT_NAMES.CART_ADD, item);
  }, []);

  useEffect(() => {
    const handleRemoteNavigation = (event: Event) => {
      const detail = (event as CustomEvent<{ pathname: string }>).detail;

      if (!detail?.pathname) return;

      const target =
        detail.pathname === "/" ? "/products" : `/products${detail.pathname}`;

      if (target !== location.pathname) {
        navigate(target);
      }
    };

    window.addEventListener(
      "ecommerce:products-navigate",
      handleRemoteNavigation,
    );

    return () => {
      window.removeEventListener(
        "ecommerce:products-navigate",
        handleRemoteNavigation,
      );
    };
  }, [location.pathname, navigate]);

  useEffect(() => {
    let active = true;

    async function start() {
      setLoaded(false);
      setError("");

      try {
        await loadProductsStylesheet();
        await loadRemoteModule("react_products", "./ProductsElement");

        if (active) setLoaded(true);
      } catch (err) {
        console.error("Products loading failed:", err);

        if (active) {
          setError(
            err instanceof Error ? err.message : "Unable to load Products.",
          );
        }
      }
    }

    void start();

    return () => {
      active = false;
    };
  }, [retryCount]);

  // Assign the callback as a DOM property, not an HTML attribute.
  useEffect(() => {
    if (!loaded || !productsRef.current) return;


    productsRef.current.onAddToCart = handleAddToCart;

    return () => {
      if (productsRef.current) {
        productsRef.current.onAddToCart = undefined;
      }
    };
  }, [loaded, handleAddToCart]);

  if (error) {
    return (
      <RemoteErrorFallback
        name="Products"
        message={error}
        onRetry={() => setRetryCount((count) => count + 1)}
      />
    );
  }

  if (!loaded) return <LoadingFallback name="Products" />;

  return <products-mfe ref={productsRef} />;
}

export default ProductsRemote;
