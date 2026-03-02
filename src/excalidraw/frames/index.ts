import type { DeviceType } from "../../dsl/types";
import type { FrameRenderer } from "./FrameRenderer";
import { SmartphoneFrameRenderer } from "./SmartphoneRenderer";
import { DesktopFrameRenderer } from "./DesktopRenderer";

export type { FrameRenderer };

/**
 * Registry that maps every DeviceType to its renderer strategy.
 * To add a new device: implement FrameRenderer, register it here — done.
 */
export const FRAME_RENDERERS: Record<DeviceType, FrameRenderer> = {
  smartphone: new SmartphoneFrameRenderer(),
  desktop: new DesktopFrameRenderer(),
};
