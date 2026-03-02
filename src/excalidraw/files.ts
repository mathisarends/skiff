// ---- Smartphone SVG Frame ----
// Single-phone SVG (dark body #666 + white screen + notch).
// viewBox: 0 0 458 928

const SMARTPHONE_SVG_DATA_URL =
  "data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA0NTggOTI4Ij4KICA8cGF0aCBmaWxsPSIjNjY2NjY2IiBkPSJNMzk1LDkyOEg2My4xQzI4LjQsOTI4LDAsODk5LjYsMCw4NjQuOVY2My4xQzAsMjguNCwyOC40LDAsNjMuMSwwSDM5NWMzNC43LDAsNjMuMSwyOC40LDYzLjEsNjMuMXY4MDEuOUM0NTguMSw4OTkuNiw0MjkuNyw5MjgsMzk1LDkyOHoiLz4KICA8cGF0aCBmaWxsPSIjRkZGRkZGIiBkPSJNMzg1LjUsMjNoLTYyLjVjLTAuMywxMi4xLTEwLjMsMjItMjIuNSwyMmgtMTQzYy0xMi4yLDAtMjIuMi05LjktMjIuNS0yMkg3Mi41Qy00NC45LDIzLDUwLDQ1LjQsNTAsNzN2NzgyYzAsMjcuNiwyMi40LDUwLDUwLDUwaDMxMi45YzI3LjYsMCw1MC0yMi40LDUwLTUwVjczQzQzNS42LDQ1LjQsNDEzLjIsMjMsMzg1LjUsMjN6Ii8+Cjwvc3ZnPg==";

export const SMARTPHONE_FILE_ID = "smartphone-frame-svg-001";

// ---- File Record Types ----

export type ExcalidrawFileEntry = {
  mimeType: string;
  id: string;
  dataURL: string;
  created: number;
  lastRetrieved: number;
};

export type ExcalidrawFiles = Record<string, ExcalidrawFileEntry>;

// ---- Factory ----

export function getFiles(): ExcalidrawFiles {
  const now = Date.now();
  return {
    [SMARTPHONE_FILE_ID]: {
      mimeType: "image/svg+xml",
      id: SMARTPHONE_FILE_ID,
      dataURL: SMARTPHONE_SVG_DATA_URL,
      created: now,
      lastRetrieved: now,
    },
  };
}
