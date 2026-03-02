// ---- Shared Base ----

type BaseElement = {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
  angle: number;
  strokeColor: string;
  backgroundColor: string;
  fillStyle: string;
  strokeWidth: number;
  strokeStyle: string;
  roughness: number;
  opacity: number;
  groupIds: string[];
  frameId: string | null;
  roundness: { type: number; value?: number } | null;
  seed: number;
  version: number;
  versionNonce: number;
  isDeleted: boolean;
  boundElements: null;
  updated: number;
  link: string | null;
  locked: boolean;
};

// ---- Concrete Element Types ----

export type RectangleElement = BaseElement & { type: "rectangle" };

export type EllipseElement = BaseElement & { type: "ellipse" };

export type LineElement = BaseElement & {
  type: "line";
  points: [number, number][];
};

export type TextElement = BaseElement & {
  type: "text";
  text: string;
  originalText: string;
  fontSize: number;
  fontFamily: number;
  textAlign: string;
  verticalAlign: string;
  containerId: string | null;
  lineHeight: number;
  baseline: number;
};

export type ImageElement = BaseElement & {
  type: "image";
  status: "saved" | "pending" | "error";
  fileId: string;
  scale: [number, number];
  crop: null;
};

export type ExcalidrawElement =
  | RectangleElement
  | EllipseElement
  | LineElement
  | TextElement
  | ImageElement;
