import {
  App_default
} from "./chunk-4TUEBTAC.js";

// src/federation/registerProductsElement.tsx
import React, { useEffect } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, useLocation } from "react-router-dom";
function RouteSync({
  onAddToCart
}) {
  const location = useLocation();
  useEffect(() => {
    window.dispatchEvent(
      new CustomEvent("ecommerce:products-navigate", {
        detail: {
          pathname: location.pathname
        }
      })
    );
  }, [location.pathname]);
  return /* @__PURE__ */ React.createElement(App_default, { onAddToCart });
}
var ProductsMfeElement = class extends HTMLElement {
  root;
  mountPoint;
  _onAddToCart;
  set onAddToCart(callback) {
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
  renderApp() {
    if (!this.root) return;
    this.root.render(
      /* @__PURE__ */ React.createElement(React.StrictMode, null, /* @__PURE__ */ React.createElement(BrowserRouter, { basename: "/products" }, /* @__PURE__ */ React.createElement(RouteSync, { onAddToCart: this._onAddToCart })))
    );
  }
  disconnectedCallback() {
    this.root?.unmount();
    this.root = void 0;
    this.mountPoint?.remove();
    this.mountPoint = void 0;
  }
};
if (!customElements.get("products-mfe")) {
  customElements.define("products-mfe", ProductsMfeElement);
}
//# sourceMappingURL=ProductsElement.js.map
