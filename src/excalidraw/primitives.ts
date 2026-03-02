import { IdGenerator } from "./IdGenerator";
import type {
  EllipseElement,
  ExcalidrawElement,
  ImageElement,
  LineElement,
  RectangleElement,
  TextElement,
} from "./types";

// ---- Shared Defaults ----

function base(ids: IdGenerator, overrides: Partial<ExcalidrawElement>): ExcalidrawElement {
  return {
    id: ids.next(),
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    angle: 0,
    strokeColor: "#1e1e1e",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 1.5,
    strokeStyle: "solid",
    roughness: 2,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: IdGenerator.seed(),
    version: 1,
    versionNonce: IdGenerator.seed(),
    isDeleted: false,
    boundElements: null,
    updated: Date.now(),
    link: null,
    locked: false,
    ...overrides,
  } as ExcalidrawElement;
}

// ---- Primitive Factories ----

export function rect(
  ids: IdGenerator,
  x: number,
  y: number,
  w: number,
  h: number,
  extra?: Partial<RectangleElement>,
): RectangleElement {
  return base(ids, { type: "rectangle", x, y, width: w, height: h, ...extra }) as RectangleElement;
}

export function ellipse(
  ids: IdGenerator,
  x: number,
  y: number,
  w: number,
  h: number,
  extra?: Partial<EllipseElement>,
): EllipseElement {
  return base(ids, { type: "ellipse", x, y, width: w, height: h, ...extra }) as EllipseElement;
}

export function line(
  ids: IdGenerator,
  x: number,
  y: number,
  points: [number, number][],
  extra?: Partial<LineElement>,
): LineElement {
  return base(ids, {
    type: "line",
    x,
    y,
    width: 0,
    height: 0,
    points,
    ...extra,
  }) as LineElement;
}

export function text(
  ids: IdGenerator,
  x: number,
  y: number,
  w: number,
  content: string,
  fontSize = 14,
  extra?: Partial<TextElement>,
): TextElement {
  return base(ids, {
    type: "text",
    x,
    y,
    width: w,
    height: fontSize * 1.4,
    text: content,
    originalText: content,
    fontSize,
    fontFamily: 3,
    textAlign: "left",
    verticalAlign: "top",
    containerId: null,
    lineHeight: 1.25,
    baseline: fontSize,
    ...extra,
  }) as TextElement;
}

export function imageEl(
  ids: IdGenerator,
  x: number,
  y: number,
  w: number,
  h: number,
  fileId: string,
  extra?: Partial<ImageElement>,
): ImageElement {
  return base(ids, {
    type: "image",
    x,
    y,
    width: w,
    height: h,
    status: "saved",
    fileId,
    scale: [1, 1],
    crop: null,
    strokeColor: "transparent",
    backgroundColor: "transparent",
    strokeWidth: 0,
    roughness: 0,
    ...extra,
  }) as ImageElement;
}
