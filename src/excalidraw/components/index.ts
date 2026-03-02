import type { ComponentNode } from "../../dsl/types";
import { ButtonRenderer } from "./ButtonRenderer";
import { CardRenderer } from "./CardRenderer";
import type { ComponentRenderFn } from "./ComponenteRenderer";
import { KeyboardRenderer } from "./KeyboardRenderer";
import { SearchbarRenderer } from "./SearchbarRenderer";
import { TextRenderer } from "./TextRenderer";

export type { ComponentRenderFn };

// One singleton per renderer — they are all stateless.
const searchbar = new SearchbarRenderer();
const card = new CardRenderer();
const button = new ButtonRenderer();
const textR = new TextRenderer();
const keyboard = new KeyboardRenderer();

/**
 * Registry that maps every ComponentNode kind to its renderer strategy.
 * To add a new component kind: implement ComponentRenderer, register here — done.
 */
export const COMPONENT_RENDERERS: Record<ComponentNode["kind"], ComponentRenderFn> = {
  searchbar: (comp, x, y, w, ids) => searchbar.render(comp, x, y, w, ids),
  card: (comp, x, y, w, ids) => card.render(comp, x, y, w, ids),
  button: (comp, x, y, w, ids) => button.render(comp, x, y, w, ids),
  text: (comp, x, y, w, ids) => textR.render(comp, x, y, w, ids),
  keyboard: (comp, x, y, w, ids) => keyboard.render(comp, x, y, w, ids),
};
