import type { DeviceConfig } from "../../dsl/types";
import { IdGenerator } from "../IdGenerator";
import { imageEl } from "../primitives";
import type { ExcalidrawElement } from "../types";
import { SMARTPHONE_FILE_ID } from "../files";
import type { FrameRenderer } from "./FrameRenderer";

/**
 * Renders the smartphone as a single SVG image element.
 * The SVG asset itself defines the bezel — no geometry needed.
 */
export class SmartphoneFrameRenderer implements FrameRenderer {
  render(
    x: number,
    y: number,
    cfg: DeviceConfig,
    groupId: string,
    ids: IdGenerator,
  ): ExcalidrawElement[] {
    return [
      imageEl(ids, x, y, cfg.displayWidth, cfg.displayHeight, SMARTPHONE_FILE_ID, {
        groupIds: [groupId],
      }),
    ];
  }

  footerHeight(): number {
    // The SVG frame has no stand or extra geometry below displayHeight
    return 8;
  }
}
