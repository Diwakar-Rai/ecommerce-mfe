import {
  withNativeFederation,
  shareAll,
} from "@softarc/native-federation/config";

import { REACT_SKIP_LIST } from "@softarc/native-federation-esbuild/frameworks/react";

export default withNativeFederation({
  name: "react_cart",

  exposes: {
    "./CartElement": "./src/federation/registerCartElement.tsx",
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
