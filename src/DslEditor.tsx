import { useCallback, useEffect, useRef } from "react";
import { EditorState } from "@codemirror/state";
import {
  EditorView,
  keymap,
  lineNumbers,
  highlightActiveLine,
  highlightActiveLineGutter,
} from "@codemirror/view";
import { defaultKeymap, indentWithTab } from "@codemirror/commands";
import {
  syntaxHighlighting,
  HighlightStyle,
  indentOnInput,
  bracketMatching,
  StreamLanguage,
} from "@codemirror/language";
import { tags } from "@lezer/highlight";
import { searchKeymap } from "@codemirror/search";

const wireflowLanguage = StreamLanguage.define({
  token(stream) {
    if (stream.match(/^screen\b/)) return "keyword";
    if (
      stream.match(
        /^(searchbar|card|button|keyboard|image|text|divider)\b/
      )
    )
      return "typeName";
    if (stream.match(/^\(smartphone\)|\(desktop\)|\(tablet\)/))
      return "atom";
    if (stream.match(/"[^"]*"/)) return "string";
    if (stream.match(/^\d+%/)) return "number";
    if (stream.match(/#.*/)) return "comment";
    if (stream.match(/:/)) return "punctuation";
    stream.next();
    return null;
  },
});

// Mermaid-style light highlight colors
const lightHighlightStyle = HighlightStyle.define([
  { tag: tags.keyword, color: "#d63384" },        // pink like mermaid
  { tag: tags.typeName, color: "#0d6efd" },        // blue
  { tag: tags.string, color: "#198754" },           // green
  { tag: tags.atom, color: "#e67700" },             // orange
  { tag: tags.number, color: "#6f42c1" },           // purple
  { tag: tags.comment, color: "#adb5bd" },          // gray
  { tag: tags.punctuation, color: "#495057" },      // dark gray
]);

const lightTheme = EditorView.theme({
  "&": {
    height: "100%",
    fontSize: "13px",
    backgroundColor: "#ffffff",
  },
  ".cm-content": {
    fontFamily: "'JetBrains Mono', 'Fira Code', 'SF Mono', 'Consolas', monospace",
    padding: "12px 0",
    lineHeight: "1.7",
    caretColor: "#d63384",
  },
  ".cm-gutters": {
    background: "#ffffff",
    border: "none",
    color: "#ced4da",
    paddingLeft: "4px",
    minWidth: "36px",
  },
  ".cm-activeLineGutter": {
    background: "transparent",
    color: "#868e96",
  },
  ".cm-activeLine": {
    background: "#f8f9fa",
  },
  ".cm-cursor": {
    borderLeftColor: "#d63384",
    borderLeftWidth: "2px",
  },
  ".cm-selectionBackground": {
    background: "#e7f5ff !important",
  },
  "&.cm-focused .cm-selectionBackground": {
    background: "#d0ebff !important",
  },
  ".cm-line": {
    padding: "0 12px",
  },
});

interface DslEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export function DslEditor({ value, onChange }: DslEditorProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView>();

  const onUpdate = useCallback(
    (update: { state: EditorState; docChanged: boolean }) => {
      if (update.docChanged) {
        onChange(update.state.doc.toString());
      }
    },
    [onChange]
  );

  useEffect(() => {
    if (!containerRef.current) return;

    const state = EditorState.create({
      doc: value,
      extensions: [
        lineNumbers(),
        highlightActiveLine(),
        highlightActiveLineGutter(),
        indentOnInput(),
        bracketMatching(),
        syntaxHighlighting(lightHighlightStyle),
        wireflowLanguage,
        lightTheme,
        keymap.of([...defaultKeymap, ...searchKeymap, indentWithTab]),
        EditorView.updateListener.of(onUpdate),
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;
    return () => view.destroy();
  }, []);

  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return <div ref={containerRef} style={{ height: "100%", overflow: "auto" }} />;
}