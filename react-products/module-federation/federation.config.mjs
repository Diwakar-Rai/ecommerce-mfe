import {
  withNativeFederation,
  shareAll,
} from "@softarc/native-federation/config";

import { REACT_SKIP_LIST } from "@softarc/native-federation-esbuild/frameworks/react";

export default withNativeFederation({
  name: "react_products",

  exposes: {
    "./ProductsApp": "./src/App.tsx",
    "./ProductsElement": "./src/federation/registerProductsElement.tsx",
  },

  shared: shareAll(
    {
      singleton: true,
      strictVersion: true,
      requiredVersion: "auto",
    },
    {
      skipList: REACT_SKIP_LIST,
    },
  ),
});
