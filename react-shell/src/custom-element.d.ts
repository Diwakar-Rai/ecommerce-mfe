import type React from "react";

declare module "react" {
  namespace JSX {
    interface IntrinsicElements {
      "products-mfe": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;

      "cart-mfe": React.DetailedHTMLProps<
        React.HTMLAttributes<HTMLElement>,
        HTMLElement
      >;
    }
  }
}
