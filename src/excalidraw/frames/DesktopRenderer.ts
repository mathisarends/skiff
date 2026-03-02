import type { DeviceConfig } from "../../dsl/types";
import { IdGenerator } from "../IdGenerator";
import { line, rect } from "../primitives";
import type { ExcalidrawElement } from "../types";
import type { FrameRenderer } from "./FrameRenderer";

// Stand geometry constants
const STAND_H = 50;
const STAND_TOP_W = 100;
const STAND_BASE_W = 140;
const STAND_BASE_H = 10;

/**
 * Renders a desktop monitor: outer bezel, inner screen area,
 * two neck lines, and a base rectangle (the stand).
 */
export class DesktopFrameRenderer implements FrameRenderer {
  render(
    x: number,
    y: number,
    cfg: DeviceConfig,
    groupId: string,
    ids: IdGenerator,
  ): ExcalidrawElement[] {
    const els: ExcalidrawElement[] = [];

    // Outer monitor bezel
    els.push(
      rect(ids, x, y, cfg.displayWidth, cfg.displayHeight, {
        strokeWidth: 2.5,
        roughness: 1,
        backgroundColor: "#e9ecef",
        roundness: { type: 3, value: 10 },
        groupIds: [groupId],
      }),
    );

    // Inner screen area
    const sx = x + cfg.displayWidth * cfg.screenRelX;
    const sy = y + cfg.displayHeight * cfg.screenRelY;
    const sw = cfg.displayWidth * cfg.screenRelW;
    const sh = cfg.displayHeight * cfg.screenRelH;

    els.push(
      rect(ids, sx, sy, sw, sh, {
        strokeWidth: 1,
        roughness: 0,
        backgroundColor: "#ffffff",
        strokeColor: "#dee2e6",
        groupIds: [groupId],
      }),
    );

    // Stand geometry
    const neckCx = x + cfg.displayWidth / 2;
    const neckTop = y + cfg.displayHeight;
    const spread = (STAND_BASE_W - STAND_TOP_W) / 4;

    els.push(
      line(ids, neckCx - STAND_TOP_W / 2, neckTop, [[0, 0], [-spread, STAND_H]], {
        strokeWidth: 2,
        roughness: 1,
        strokeColor: "#868e96",
        groupIds: [groupId],
      }),
    );

    els.push(
      line(ids, neckCx + STAND_TOP_W / 2, neckTop, [[0, 0], [spread, STAND_H]], {
        strokeWidth: 2,
        roughness: 1,
        strokeColor: "#868e96",
        groupIds: [groupId],
      }),
    );

    els.push(
      rect(ids, neckCx - STAND_BASE_W / 2, neckTop + STAND_H, STAND_BASE_W, STAND_BASE_H, {
        strokeWidth: 2,
        roughness: 1,
        backgroundColor: "#ced4da",
        strokeColor: "#868e96",
        roundness: { type: 3, value: 4 },
        groupIds: [groupId],
      }),
    );

    return els;
  }

  footerHeight(): number {
    // Stand extends STAND_H + STAND_BASE_H below displayHeight,
    // plus a small label margin
    return STAND_H + STAND_BASE_H + 10;
  }
}
