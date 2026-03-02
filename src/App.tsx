import { Excalidraw } from "@excalidraw/excalidraw";
import "@excalidraw/excalidraw/index.css";
import { useState } from "react";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ex = any;

const elements: Ex[] = [
  {
    id: "screen-1",
    type: "rectangle",
    x: 100,
    y: 100,
    width: 220,
    height: 380,
    angle: 0,
    strokeColor: "#000000",
    backgroundColor: "#f8f8f8",
    fillStyle: "solid",
    strokeWidth: 2,
    strokeStyle: "solid",
    roughness: 2,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: 42,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    boundElements: null,
    updated: 1,
    link: null,
    locked: false,
  },
  {
    id: "text-1",
    type: "text",
    x: 110,
    y: 110,
    width: 200,
    height: 30,
    angle: 0,
    strokeColor: "#000000",
    backgroundColor: "transparent",
    fillStyle: "solid",
    strokeWidth: 1,
    strokeStyle: "solid",
    roughness: 1,
    opacity: 100,
    groupIds: [],
    frameId: null,
    roundness: null,
    seed: 43,
    version: 1,
    versionNonce: 1,
    isDeleted: false,
    boundElements: null,
    updated: 1,
    link: null,
    locked: false,
    text: "Suchen",
    fontSize: 20,
    fontFamily: 3,
    textAlign: "left",
    verticalAlign: "top",
    baseline: 18,
    containerId: null,
    originalText: "Suchen",
    lineHeight: 1.25,
  },
];

export default function App() {

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Excalidraw
        initialData={{ elements, appState: { viewBackgroundColor: "#ffffff" } }}
      />
    </div>
  );
}
