import React from "react";
import { createRoot, type Root } from "react-dom/client";
import { MemoryRouter } from "react-router-dom";
import CartPage from "../pages/CartPage";

class CartMfeElement extends HTMLElement {
  private root?: Root;
  private mountPoint?: HTMLDivElement;

  connectedCallback() {
    if (this.root) return;

    this.mountPoint = document.createElement("div");
    this.appendChild(this.mountPoint);

    this.root = createRoot(this.mountPoint);

    this.root.render(
      <React.StrictMode>
        <MemoryRouter initialEntries={["/"]}>
          <CartPage />
        </MemoryRouter>
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

if (!customElements.get("cart-mfe")) {
  customElements.define("cart-mfe", CartMfeElement);
}

export {};
