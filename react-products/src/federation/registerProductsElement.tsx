import React, { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "../App";

function RouteSync() {
  const location = useLocation();

  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("ecommerce:products-navigate", {
        detail: {
          pathname: location.pathname,
        },
      }),
    );
  }, [location.pathname]);

  return <App />;
}

class ProductsMfeElement extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;

  connectedCallback() {
    if (this.root) return;

    this.mountPoint = document.createElement("div");
    this.appendChild(this.mountPoint);

    this.root = createRoot(this.mountPoint);

    this.root.render(
      <React.StrictMode>
        <BrowserRouter basename="/products">
          <RouteSync />
        </BrowserRouter>
      </React.StrictMode>,
    );
  }

  disconnectedCallback() {
    this.root?.unmount();
    this.root = undefined;
    this.mountPoint?.remove();
    this.mountPoint = undefined;
  }
}

if (!customElements.get("products-mfe")) {
  customElements.define("products-mfe", ProductsMfeElement);
}

export {};
