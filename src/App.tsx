import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useMemo, useState } from "react";
import { parse } from "./dsl";
import { codegen } from "./excalidraw/codegen";
import { getFiles } from "./excalidraw/files";
import { DslEditor } from "./DslEditor";

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
  const [autoUpdate, setAutoUpdate] = useState(true);
  const [liveDsl, setLiveDsl] = useState(DEFAULT_DSL);
  const [panelOpen, setPanelOpen] = useState(true);

  const handleDslChange = (value: string) => {
    setDsl(value);
    if (autoUpdate) setLiveDsl(value);
  };

  const activeDsl = autoUpdate ? dsl : liveDsl;

  const elements = useMemo(() => {
    try {
      return codegen(parse(activeDsl));
    } catch {
      return [];
    }
  }, [activeDsl]);

  const files = useMemo(() => getFiles(), []);

  return (
    <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
      {/* Full-screen Excalidraw canvas */}
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

      {/* Floating Code Panel */}
      {panelOpen && (
        <div
          style={{
            position: "absolute",
            top: "12px",
            left: "60px",
            width: "420px",
            height: "calc(100vh - 24px)",
            background: "#ffffff",
            borderRadius: "12px",
            boxShadow: "0 4px 24px rgba(0,0,0,0.12), 0 1px 4px rgba(0,0,0,0.08)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            zIndex: 10,
            border: "1px solid #e9ecef",
          }}
        >
          {/* Panel Toolbar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "12px",
              padding: "10px 16px",
              borderBottom: "1px solid #e9ecef",
              background: "#ffffff",
              borderRadius: "12px 12px 0 0",
            }}
          >
            {/* Code icon + label */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "8px",
                fontSize: "14px",
                fontWeight: 600,
                color: "#212529",
                fontFamily: "system-ui, -apple-system, sans-serif",
              }}
            >
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="#495057"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6" />
                <polyline points="8 6 2 12 8 18" />
              </svg>
              Code
            </div>

            {/* Auto-Update Toggle */}
            <div
              onClick={() => setAutoUpdate(!autoUpdate)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "6px",
                cursor: "pointer",
                userSelect: "none",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "20px",
                  borderRadius: "10px",
                  background: autoUpdate ? "#d63384" : "#dee2e6",
                  position: "relative",
                  transition: "background 0.2s",
                }}
              >
                <div
                  style={{
                    width: "16px",
                    height: "16px",
                    borderRadius: "50%",
                    background: "#ffffff",
                    position: "absolute",
                    top: "2px",
                    left: autoUpdate ? "18px" : "2px",
                    transition: "left 0.2s",
                    boxShadow: "0 1px 3px rgba(0,0,0,0.15)",
                  }}
                />
              </div>
            </div>

            {/* Run button when auto-update is off */}
            {!autoUpdate && (
              <button
                onClick={() => setLiveDsl(dsl)}
                style={{
                  padding: "4px 12px",
                  fontSize: "12px",
                  fontWeight: 600,
                  background: "#d63384",
                  color: "#fff",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontFamily: "system-ui, sans-serif",
                }}
              >
                ▶ Run
              </button>
            )}

            {/* Docs */}
            <button
              style={{
                display: "flex",
                alignItems: "center",
                gap: "4px",
                background: "none",
                border: "none",
                color: "#868e96",
                cursor: "pointer",
                fontSize: "13px",
                fontFamily: "system-ui, sans-serif",
                padding: "4px 8px",
                borderRadius: "6px",
              }}
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
                <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
              </svg>
              Docs
            </button>

            {/* Close */}
            <button
              onClick={() => setPanelOpen(false)}
              style={{
                marginLeft: "auto",
                background: "none",
                border: "none",
                color: "#adb5bd",
                cursor: "pointer",
                fontSize: "18px",
                lineHeight: 1,
                padding: "4px",
                borderRadius: "6px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ✕
            </button>
          </div>

          {/* Editor */}
          <div style={{ flex: 1, overflow: "hidden" }}>
            <DslEditor value={dsl} onChange={handleDslChange} />
          </div>

          {/* Bottom bar */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "8px",
              padding: "8px 16px",
              borderTop: "1px solid #e9ecef",
              background: "#ffffff",
              borderRadius: "0 0 12px 12px",
              fontSize: "13px",
              color: "#868e96",
              fontFamily: "system-ui, sans-serif",
            }}
          >
            <span style={{ display: "flex", alignItems: "center", gap: "4px" }}>
              [ ] Snippets
            </span>
            <span style={{ marginLeft: "auto", fontSize: "11px", color: "#ced4da" }}>
              wireflow DSL
            </span>
          </div>
        </div>
      )}

      {/* Hamburger toggle (visible when panel is closed) */}
      {!panelOpen && (
        <button
          onClick={() => setPanelOpen(true)}
          style={{
            position: "absolute",
            top: "12px",
            left: "12px",
            zIndex: 10,
            width: "40px",
            height: "40px",
            borderRadius: "10px",
            background: "#ffffff",
            border: "1px solid #e9ecef",
            boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: "#495057",
            fontSize: "18px",
          }}
        >
          ☰
        </button>
      )}
    </div>
  );
}