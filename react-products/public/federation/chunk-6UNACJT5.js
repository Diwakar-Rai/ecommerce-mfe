import {
  __commonJS,
  __esm,
  __export,
  __toCommonJS
} from "@nf-internal/chunk-HOM7SSJL";

// nf-cjs-external:esm:react
var esm_react_exports = {};
__export(esm_react_exports, {
  ns: () => ns
});
import * as ns from "react";
var init_esm_react = __esm({
  "nf-cjs-external:esm:react"() {
  }
});

// nf-cjs-external:react
var require_react = __commonJS({
  "nf-cjs-external:react"(exports, module) {
    module.exports = (function(ns2) {
      var value = ns2.default;
      if (value === null || typeof value !== "object" && typeof value !== "function") return ns2;
      return Object.keys(ns2).every(function(key) {
        return key === "default" || ns2[key] === value[key];
      }) ? value : ns2;
    })((init_esm_react(), __toCommonJS(esm_react_exports)).ns);
  }
});

export {
  require_react
};
//# sourceMappingURL=chunk-6UNACJT5.js.map
