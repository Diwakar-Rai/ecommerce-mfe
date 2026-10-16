import React, { useEffect } from "react";
import { createRoot, type Root } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
import App from "../App";
import type { AddToCartDetail } from "../events/cartEvents";

function RouteSync({
  onAddToCart,
}: {
  onAddToCart?: (item: AddToCartDetail) => void;
}) {
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

  return <App onAddToCart={onAddToCart} />;
}

class ProductsMfeElement extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;

  private _onAddToCart?: (item: AddToCartDetail) => void;

  set onAddToCart(callback: ((item: AddToCartDetail) => void) | undefined) {
    this._onAddToCart = callback;
    this.renderApp();
  }

  get onAddToCart() {
    return this._onAddToCart;
  }

  connectedCallback() {
    if (this.root) return;

    this.mountPoint = document.createElement("div");
    this.appendChild(this.mountPoint);

    this.root = createRoot(this.mountPoint);
    this.renderApp();
  }

  private renderApp() {
    if (!this.root) return;

    this.root.render(
      <React.StrictMode>
        <BrowserRouter basename="/products">
          <RouteSync onAddToCart={this._onAddToCart} />
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
