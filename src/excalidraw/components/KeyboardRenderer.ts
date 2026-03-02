import type { ComponentNode } from "../../dsl/types";
import { IdGenerator } from "../IdGenerator";
import { rect, text } from "../primitives";
import type { ExcalidrawElement } from "../types";
import type { ComponentRenderer } from "./ComponenteRenderer";

type KeyboardNode = Extract<ComponentNode, { kind: "keyboard" }>;

const KEYBOARD_HEIGHT = 70;

export class KeyboardRenderer implements ComponentRenderer<KeyboardNode> {
  render(
    _comp: KeyboardNode,
    x: number,
    y: number,
    contentWidth: number,
    ids: IdGenerator,
  ): ExcalidrawElement[] {
    return [
      rect(ids, x, y, contentWidth, KEYBOARD_HEIGHT, {
        backgroundColor: "#e9ecef",
        roughness: 1,
        roundness: { type: 3, value: 4 },
      }),
      text(ids, x + contentWidth / 2 - 30, y + 26, 80, "⌨️ Tastatur", 11, {
        strokeColor: "#aaaaaa",
      }),
    ];
  }
}
