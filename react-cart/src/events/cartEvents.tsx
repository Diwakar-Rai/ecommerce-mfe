
export interface CartItem {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export const CART_ADD_EVENT = "ecommerce:cart-add";
export const CART_STATE_REQUEST_EVENT = "ecommerce:cart-state-request";
export const CART_STATE_EVENT = "ecommerce:cart-state";
export const CART_UPDATE_EVENT = "ecommerce:cart-update";

export function requestCartState() {
  window.dispatchEvent(new Event(CART_STATE_REQUEST_EVENT));
}

export function updateCart(items: CartItem[]) {
  window.dispatchEvent(
    new CustomEvent<CartItem[]>(CART_UPDATE_EVENT, {
      detail: items,
    }),
  );
}
