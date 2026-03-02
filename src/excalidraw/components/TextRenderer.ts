import type { ComponentNode } from "../../dsl/types";
import { IdGenerator } from "../IdGenerator";
import { text } from "../primitives";
import type { ExcalidrawElement } from "../types";
import type { ComponentRenderer } from "./ComponenteRenderer";

type TextNode = Extract<ComponentNode, { kind: "text" }>;

export class TextRenderer implements ComponentRenderer<TextNode> {
  render(
    comp: TextNode,
    x: number,
    y: number,
    contentWidth: number,
    ids: IdGenerator,
  ): ExcalidrawElement[] {
    return [
      text(ids, x, y, contentWidth, comp.content, 11, {
        strokeColor: "#555555",
      }),
    ];
  }
}
