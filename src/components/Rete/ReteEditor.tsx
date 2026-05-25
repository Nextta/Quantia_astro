// src/components/ReteEditor.tsx

import { useEffect, useRef } from "react";

export default function ReteEditor() {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    let destroyEditor: (() => void) | undefined;
    let cancelled = false;

    async function startEditor() {
      if (!containerRef.current) return;

      const { createEditor } = await import("../../lib/reteF");

      if (cancelled) return;

      const editorInstance = await createEditor(containerRef.current);

      destroyEditor = () => {
        editorInstance.area.destroy();
      };
    }

    startEditor().catch((error) => {
      console.error("Error creando Rete:", error);
    });

    return () => {
      cancelled = true;
      destroyEditor?.();
    };
  }, []);

  return (
    <div
      ref={containerRef}
      id="rete-editor"
      className="h-screen w-screen overflow-hidden bg-slate-950"
    />
  );
}