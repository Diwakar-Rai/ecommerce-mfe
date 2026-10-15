import { initFederation } from "@softarc/native-federation-orchestrator";

let remoteLoader: Awaited<ReturnType<typeof initFederation>> | undefined;

export async function initializeFederation() {
  remoteLoader = await initFederation({
    react_products: "http://localhost:5174/federation/remoteEntry.json",
    react_cart: "http://localhost:5175/federation/remoteEntry.json",
  });
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
