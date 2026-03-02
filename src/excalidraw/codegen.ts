import type { AST } from "../dsl/types";
import { DEVICE_CONFIGS, LAYOUT } from "../dsl/constants";
import { IdGenerator } from "./IdGenerator";
import { rect, text } from "./primitives";
import type { ExcalidrawElement } from "./types";
import { FRAME_RENDERERS } from "./frames";
import { COMPONENT_RENDERERS } from "./components";

/**
 * Converts a parsed DSL AST into a flat array of Excalidraw elements.
 *
 * This function only orchestrates the layout loop — all device-specific
 * and component-specific rendering logic lives in the respective
 * FrameRenderer / ComponentRenderer strategies.
 */
export function codegen(ast: AST): ExcalidrawElement[] {
  const elements: ExcalidrawElement[] = [];
  const ids = new IdGenerator();

  let offsetX = 40;
  const startY = 40;

  for (const screen of ast.screens) {
    const cfg = DEVICE_CONFIGS[screen.device];
    const frameRenderer = FRAME_RENDERERS[screen.device];
    const groupId = `group-${ids.next()}`;

    // 1. Device frame (bezel, screen area, stand, …)
    elements.push(...frameRenderer.render(offsetX, startY, cfg, groupId, ids));

    // 2. Compute inner content area coordinates
    const screenX = offsetX + cfg.displayWidth * cfg.screenRelX;
    const screenY = startY + cfg.displayHeight * cfg.screenRelY;
    const screenW = cfg.displayWidth * cfg.screenRelW;
    const contentX = screenX + LAYOUT.SCREEN_PADDING;
    const contentWidth = screenW - LAYOUT.SCREEN_PADDING * 2;

    // 3. Screen title
    elements.push(
      text(ids, contentX, screenY + 6, contentWidth, screen.name, 14, {
        groupIds: [groupId],
      }),
    );

    // 4. Divider line under title
    elements.push(
      rect(ids, screenX, screenY + LAYOUT.HEADER_HEIGHT, screenW, 1, {
        strokeWidth: 1,
        roughness: 0,
        backgroundColor: "#dee2e6",
        strokeColor: "#dee2e6",
        groupIds: [groupId],
      }),
    );

    // 5. Component list
    let curY = screenY + LAYOUT.HEADER_HEIGHT + LAYOUT.SCREEN_PADDING;

    for (const comp of screen.components) {
      const compRenderer = COMPONENT_RENDERERS[comp.kind];
      const compEls = compRenderer(comp, contentX, curY, contentWidth, ids);

      // Attach all component elements to the screen group
      for (const el of compEls) {
        el.groupIds = [groupId, ...el.groupIds];
      }

      elements.push(...compEls);
      curY += LAYOUT.COMPONENT_HEIGHT + LAYOUT.COMPONENT_GAP;
    }

    // 6. Device label below the frame (each renderer knows its own footer height)
    const labelY = startY + cfg.displayHeight + frameRenderer.footerHeight();

    elements.push(
      text(ids, offsetX, labelY, cfg.displayWidth, screen.device.toUpperCase(), 11, {
        strokeColor: "#adb5bd",
        textAlign: "center",
      }),
    );

    offsetX += cfg.displayWidth + LAYOUT.SCREEN_GAP;
  }

  return elements;
}
