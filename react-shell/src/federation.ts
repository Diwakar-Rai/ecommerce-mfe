import { initFederation } from "@softarc/native-federation-orchestrator";
import {
  useShimImportMap,
  consoleLogger,
} from "@softarc/native-federation-orchestrator/options";

let remoteLoader: Awaited<ReturnType<typeof initFederation>> | undefined;

export async function initializeFederation() {
  remoteLoader = await initFederation(
    {
      react_products: "http://localhost:5174/federation/remoteEntry.json",
      react_cart: "http://localhost:5175/federation/remoteEntry.json",
      "angular-orders": "http://localhost:4200/remoteEntry.json",
      "angular-profile": "http://localhost:4201/remoteEntry.json",
    },
    {
      ...useShimImportMap({ shimMode: true }),
      logger: consoleLogger,
      logLevel: "debug",
    },
  );
}

export async function loadRemoteModule(
  remoteName: string,
  exposedModule: string,
) {
  if (!remoteLoader) {
    throw new Error("Federation has not been initialized.");
  }

  return remoteLoader.loadRemoteModule(remoteName, exposedModule);
}
