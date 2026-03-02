/**
 * Barrel — all real implementations live in ./dsl/
 * This file exists so that `import from "./dsl"` continues to resolve correctly
 * (TypeScript prefers ./dsl.ts over ./dsl/index.ts).
 */
export * from "./dsl/types";
export * from "./dsl/constants";
export * from "./dsl/parser";

// Intentionally left empty below — original monolithic code has been split into
// src/dsl/  and  src/excalidraw/  modules.
// === DO NOT ADD CODE HERE — edit the modules in ./dsl/ instead ===
