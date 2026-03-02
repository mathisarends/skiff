import type { DeviceConfig } from "../../dsl/types";
import type { IdGenerator } from "../IdGenerator";
import type { ExcalidrawElement } from "../types";

/**
 * Strategy interface for rendering a device frame.
 *
 * Each device is a self-contained renderer — codegen.ts has zero knowledge
 * of how any specific device looks. Adding a new device only requires
 * creating a class that implements this interface and registering it.
 */
export interface FrameRenderer {
  /**
   * Renders the device shell (outer bezel, screen area, stand, etc.)
   * and returns a flat list of Excalidraw elements.
   *
   * @param x        Top-left x of the device frame on the canvas
   * @param y        Top-left y of the device frame on the canvas
   * @param cfg      Display dimensions and relative screen coords
   * @param groupId  Excalidraw group ID to attach all elements to
   * @param ids      Shared ID generator for this render pass
   */
  render(
    x: number,
    y: number,
    cfg: DeviceConfig,
    groupId: string,
    ids: IdGenerator,
  ): ExcalidrawElement[];

  /**
   * Returns how far below `y + cfg.displayHeight` the device's visual
   * footprint extends (e.g. a desktop monitor stand adds extra height).
   * Used to position the device label correctly in codegen.ts.
   */
  footerHeight(): number;
}
