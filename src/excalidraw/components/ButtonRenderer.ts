import type { ComponentNode } from "../../dsl/types";
import { LAYOUT } from "../../dsl/constants";
import { IdGenerator } from "../IdGenerator";
import { rect, text } from "../primitives";
import type { ExcalidrawElement } from "../types";
import type { ComponentRenderer } from "./ComponenteRenderer";

type ButtonNode = Extract<ComponentNode, { kind: "button" }>;

export class ButtonRenderer implements ComponentRenderer<ButtonNode> {
  render(
    comp: ButtonNode,
    x: number,
    y: number,
    contentWidth: number,
    ids: IdGenerator,
  ): ExcalidrawElement[] {
    return [
      rect(ids, x, y, contentWidth, LAYOUT.COMPONENT_HEIGHT, {
        backgroundColor: "#e9ecef",
        roughness: 1,
        roundness: { type: 3, value: 6 },
      }),
      text(ids, x + 8, y + 8, contentWidth - 16, comp.label, 12, {
        textAlign: "center",
      }),
    ];
  }
}
