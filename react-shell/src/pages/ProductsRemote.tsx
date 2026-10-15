import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { loadRemoteModule } from "../federation";

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
    }

    link.onload = () => {
      link!.dataset.loaded = "true";
      resolve();
    };

    link.onerror = () => {
      reject(new Error(`Failed to load Products CSS: ${PRODUCTS_CSS}`));
    };

    if (!link.isConnected) {
      document.head.appendChild(link);
    }
  });
}

function ProductsRemote() {
  const [loaded, setLoaded] = useState(false);
  const [error, setError] = useState("");

  const location = useLocation();
  const navigate = useNavigate();

  // Sync navigation initiated inside the Products remote with the shell.
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

  // Load CSS first, then register the federated custom element.
  useEffect(() => {
    let active = true;

    async function start() {
      try {
        await loadProductsStylesheet();
        await loadRemoteModule("react_products", "./ProductsElement");

        if (active) setLoaded(true);
      } catch (err) {
        if (active) {
          setError(
            err instanceof Error ? err.message : "Unable to load Products.",
          );
        }
      }
    }

    start();

    return () => {
      active = false;
    };
  }, []);

  if (error) {
    return <p>Could not load Products: {error}</p>;
  }

  if (!loaded) {
    return <p>Loading Products...</p>;
  }

  return <products-mfe />;
}

export default ProductsRemote;
