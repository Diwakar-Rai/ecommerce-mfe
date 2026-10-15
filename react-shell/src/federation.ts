import {
  initFederation,
} from "@softarc/native-federation-orchestrator";

import {
  useShimImportMap,
  consoleLogger,
} from "@softarc/native-federation-orchestrator/options";

let remoteLoader: Awaited<ReturnType<typeof initFederation>> | undefined;

export async function initializeFederation() {
  remoteLoader = await initFederation(
    {
      react_products:
        "http://localhost:5174/federation/remoteEntry.json",
      react_cart:
        "http://localhost:5175/federation/remoteEntry.json",
      "angular-orders":
        "http://localhost:4200/remoteEntry.json",
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

  try {
    return await remoteLoader.loadRemoteModule(
      remoteName,
      exposedModule,
    );
  } catch (error: unknown) {
    console.error("Remote module:", remoteName, exposedModule);
    console.error("Original federation error:", error);

    if (error instanceof Error) {
      console.error("Error name:", error.name);
      console.error("Error message:", error.message);
      console.error("Error cause:", error.cause);
      console.error("Error stack:", error.stack);
    }

    throw error;
  }
}

export async function testOrdersRemote() {
  if (!remoteLoader) {
    throw new Error("Federation has not been initialized.");
  }

  const result = await remoteLoader.loadRemoteModule(
    "angular_orders",
    "./OrdersElement",
  );

  console.log("Orders remote module loaded:", result);
  return result;
}