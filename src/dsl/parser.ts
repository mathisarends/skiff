import type { AST, ComponentNode, DeviceType, ScreenNode } from "./types";
import { DeviceType as DT } from "./types";

// ---- Screen Parser ----

export function parse(input: string): AST {
  const screens: ScreenNode[] = [];
  let currentScreen: ScreenNode | null = null;

  for (const rawLine of input.split("\n")) {
    const line = rawLine.trimEnd();
    if (!line.trim()) continue;

    const indent = line.length - line.trimStart().length;
    const trimmed = line.trim();

    if (indent === 0 && trimmed.startsWith("screen ")) {
      const match = trimmed.match(/^screen\s+(.+?)(?:\s*\((\w+)\))?\s*:$/);
      if (match) {
        const name = match[1].trim();
        const device = parseDeviceType(match[2]);
        currentScreen = { name, device, components: [] };
        screens.push(currentScreen);
      }
      continue;
    }

    if (indent > 0 && currentScreen) {
      const component = parseComponent(trimmed);
      if (component) currentScreen.components.push(component);
    }
  }

  return { screens };
}

// ---- Helpers ----

function parseDeviceType(raw: string | undefined): DeviceType {
  const lower = (raw ?? "").toLowerCase();
  if (lower === DT.Desktop) return DT.Desktop;
  return DT.Smartphone; // default
}

// Each entry describes one component prefix and its factory.
// Adding new component kinds only requires extending this array.
const COMPONENT_PARSERS: Array<{
  prefix: string;
  parse: (line: string) => ComponentNode | null;
}> = [
  {
    prefix: "searchbar",
    parse(line) {
      const match = line.match(/searchbar\s+"(.+)"/);
      return { kind: "searchbar", placeholder: match?.[1] ?? "Suchen..." };
    },
  },
  {
    prefix: "card",
    parse(line) {
      const match = line.match(/card\s+"(.+)"/);
      return { kind: "card", label: match?.[1] ?? "" };
    },
  },
  {
    prefix: "button",
    parse(line) {
      const match = line.match(/button\s+"(.+)"/);
      return { kind: "button", label: match?.[1] ?? "" };
    },
  },
  {
    prefix: "text",
    parse(line) {
      const match = line.match(/text\s+"(.+)"/);
      return { kind: "text", content: match?.[1] ?? "" };
    },
  },
  {
    prefix: "keyboard",
    parse() {
      return { kind: "keyboard" };
    },
  },
];

export function parseComponent(line: string): ComponentNode | null {
  const entry = COMPONENT_PARSERS.find((p) => line.startsWith(p.prefix));
  return entry ? entry.parse(line) : null;
}
