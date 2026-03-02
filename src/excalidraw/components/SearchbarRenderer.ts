import type { ComponentNode } from "../../dsl/types";
import { LAYOUT } from "../../dsl/constants";
import { IdGenerator } from "../IdGenerator";
import { rect, text } from "../primitives";
import type { ExcalidrawElement } from "../types";
import type { ComponentRenderer } from "./ComponenteRenderer";

type SearchbarNode = Extract<ComponentNode, { kind: "searchbar" }>;

export class SearchbarRenderer implements ComponentRenderer<SearchbarNode> {
  render(
    comp: SearchbarNode,
    x: number,
    y: number,
    contentWidth: number,
    ids: IdGenerator,
  ): ExcalidrawElement[] {
    return [
      rect(ids, x, y, contentWidth, LAYOUT.COMPONENT_HEIGHT, {
        backgroundColor: "#f1f3f5",
        roughness: 1,
        roundness: { type: 3, value: 6 },
      }),
      text(ids, x + 8, y + 8, contentWidth - 16, `🔍 ${comp.placeholder ?? "Suchen..."}`, 12),
    ];
  }
}
