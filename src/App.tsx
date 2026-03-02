import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useMemo, useState } from "react";
import { parse } from "./dsl";
import { codegen } from "./excalidraw/codegen";
import { getFiles } from "./excalidraw/files";

const DEFAULT_DSL = `screen Suchen (smartphone):
  searchbar "Beschreibe wonach du suchst"
  keyboard

screen Ergebnisse (smartphone):
  searchbar "Lernmethoden"
  card "Match 94% — Die Pomodoro-Technik..."
  card "Match 84% — Spaced Repetition..."

screen Übersicht (desktop):
  searchbar "Volltextsuche"
  card "Alle Quellen"
  card "Zitate & Notizen"
  card "KI-Analyse"
  button "Export"
`;

export default function App() {
  const [dsl, setDsl] = useState(DEFAULT_DSL);

  const elements = useMemo(() => {
    try {
      const ast = parse(dsl);
      return codegen(ast);
    } catch {
      return [];
    }
  }, [dsl]);

  const files = useMemo(() => getFiles(), []);

  return (
    <div style={{ display: "flex", width: "100vw", height: "100vh", fontFamily: "monospace" }}>
      <div style={{ width: "360px", display: "flex", flexDirection: "column", borderRight: "1px solid #ddd" }}>
        <div style={{
          padding: "10px 14px",
          fontSize: 12,
          fontWeight: "bold",
          background: "#f8f8f8",
          borderBottom: "1px solid #ddd",
          letterSpacing: 1,
          color: "#666",
        }}>
          wireflow DSL
        </div>
        <div style={{
          padding: "6px 14px",
          fontSize: 11,
          background: "#f0f0f0",
          borderBottom: "1px solid #ddd",
          color: "#888",
          lineHeight: 1.5,
        }}>
          Syntax: <code style={{ color: "#333" }}>screen Name (device):</code>
          <br />
          Geräte: <code style={{ color: "#333" }}>smartphone</code> · <code style={{ color: "#333" }}>desktop</code>
        </div>
        <textarea
          value={dsl}
          onChange={e => setDsl(e.target.value)}
          style={{
            flex: 1,
            padding: "14px",
            fontSize: 13,
            lineHeight: 1.6,
            border: "none",
            outline: "none",
            resize: "none",
            background: "#1e1e1e",
            color: "#d4d4d4",
            fontFamily: "monospace",
          }}
          spellCheck={false}
        />
      </div>

      <div style={{ flex: 1 }}>
        <Excalidraw
          key={JSON.stringify(elements)}
          initialData={{
            elements,
            appState: {
              viewBackgroundColor: "#fafafa",
              currentItemFontFamily: 3,
            },
            files,
          }}
          viewModeEnabled={true}
        />
      </div>
    </div>
  );
}