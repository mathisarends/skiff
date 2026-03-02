// ---- Device Type ---- (no tablet)

export const DeviceType = {
  Smartphone: "smartphone",
  Desktop: "desktop",
} as const;

export type DeviceType = (typeof DeviceType)[keyof typeof DeviceType];

// ---- DSL AST Nodes ----

export type ComponentNode =
  | { kind: "searchbar"; placeholder?: string }
  | { kind: "card"; label: string }
  | { kind: "button"; label: string }
  | { kind: "text"; content: string }
  | { kind: "keyboard" };

export type ScreenNode = {
  name: string;
  device: DeviceType;
  components: ComponentNode[];
};

export type AST = {
  screens: ScreenNode[];
};

// ---- Device Config ----

export type DeviceConfig = {
  /** canvas display size of the device frame */
  displayWidth: number;
  displayHeight: number;
  /** relative inner screen area (0–1 fractions of display size) */
  screenRelX: number;
  screenRelY: number;
  screenRelW: number;
  screenRelH: number;
};
