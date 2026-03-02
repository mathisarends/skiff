import type { ComponentNode } from "../../dsl/types";
import type { IdGenerator } from "../IdGenerator";
import type { ExcalidrawElement } from "../types";

/**
 * Strategy interface for rendering a single DSL component node.
 *
 * Each component kind (searchbar, card, button, …) is an independent
 * renderer. Adding a new kind only requires implementing this interface
 * and registering it in components/index.ts.
 */
export interface ComponentRenderer<T extends ComponentNode = ComponentNode> {
  render(
    comp: T,
    x: number,
    y: number,
    contentWidth: number,
    ids: IdGenerator,
  ): ExcalidrawElement[];
}

/**
 * Generic render-function type used to populate the COMPONENT_RENDERERS registry.
 * Keeps the registry declaration concise without sacrificing type safety.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type ComponentRenderFn = ComponentRenderer<any>["render"];
