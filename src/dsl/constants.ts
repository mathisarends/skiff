import type { DeviceConfig, DeviceType } from "./types";

// ---- Device Frame Configs ----

export const DEVICE_CONFIGS: Record<DeviceType, DeviceConfig> = {
  smartphone: {
    // SVG viewBox: 0 0 458 928 → displayed at ~280×567
    displayWidth: 280,
    displayHeight: 567,
    // Inner white screen area in SVG coords: x=22.5 y=73 w=412.9 h=782
    screenRelX: 22.5 / 458,
    screenRelY: 73 / 928,
    screenRelW: 412.9 / 458,
    screenRelH: 782 / 928,
  },
  desktop: {
    displayWidth: 540,
    displayHeight: 380,
    screenRelX: 12 / 540,
    screenRelY: 32 / 380,
    screenRelW: 516 / 540,
    screenRelH: 308 / 380,
  },
};

// ---- Layout Constants ----

export const LAYOUT = {
  /** horizontal gap between device frames */
  SCREEN_GAP: 60,
  /** padding inside the screen content area */
  SCREEN_PADDING: 10,
  /** height of the screen title bar */
  HEADER_HEIGHT: 36,
  /** default height of a single component */
  COMPONENT_HEIGHT: 32,
  /** vertical gap between components */
  COMPONENT_GAP: 6,
  /** how far the stand extends below the desktop monitor */
  DESKTOP_STAND_HEIGHT: 60,
} as const;
