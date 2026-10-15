import { initializeFederation } from "./federation";

async function start() {
  await initializeFederation();
  await import("./bootstrap");
}

start().catch((error) => {
  console.error("Application startup failed:", error);
});
