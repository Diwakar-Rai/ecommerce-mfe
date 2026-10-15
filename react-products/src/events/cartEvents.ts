
export interface AddToCartDetail {
  productId: string;
  name: string;
  price: number;
  quantity: number;
}

export const CART_ADD_EVENT = "ecommerce:cart-add";

export function addToCart(detail: AddToCartDetail) {
  window.dispatchEvent(
    new CustomEvent<AddToCartDetail>(CART_ADD_EVENT, {
      detail,
    }),
  );
}
