import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    // toon elke test apart met naam en resultaat
    reporters: "verbose",
    // verberg console-logs (mailserver, dotenv, "Database connected")
    silent: true,
    // draai bestanden één voor één
    fileParallelism: false,
  },
});
