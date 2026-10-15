import { runEsBuildBuilder } from "@softarc/native-federation-esbuild";

const dev = process.argv.includes("--dev");

const federation = await runEsBuildBuilder(
  "module-federation/federation.config.mjs",
  {
    outputPath: "public/federation",
    tsConfig: "tsconfig.json",
    entryPoints: ["src/federation/registerCartElement.tsx"],
    dev,
    watch: dev,
    verbose: true,
  },
);

console.log("Cart federation output:", "public/federation/remoteEntry.json");

if (dev) {
  const shutdown = async () => {
    await federation.close();
    process.exit(0);
  };

  process.once("SIGINT", shutdown);
  process.once("SIGTERM", shutdown);
} else {
  await federation.close();
}
