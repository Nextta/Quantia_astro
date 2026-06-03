// src/components/ReteEditor.tsx

import { useEffect, useRef, useState } from "react";


type ReteInstance = {
  area: {
    destroy: () => void;
  };
  generateOrders: () => unknown[];
};

export default function ReteEditor() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const editorInstanceRef = useRef<ReteInstance | null>(null);

  const [generatedOrders, setGeneratedOrders] = useState<unknown[]>([]);
  

  useEffect(() => {
    let destroyEditor: (() => void) | undefined;
    let cancelled = false;

    async function startEditor() {
      if (!containerRef.current) return;

      const { createEditor } = await import("../../lib/reteF");

      if (cancelled) return;

      const editorInstance = await createEditor(containerRef.current);

      editorInstanceRef.current = editorInstance;

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
      editorInstanceRef.current = null;
    };
  }, []);

  function handleGenerateOrders() {
    const editorInstance = editorInstanceRef.current;

    if (!editorInstance) {
      console.warn("El editor todavía no está listo");
      return;
    }

    const orders = editorInstance.generateOrders();

    setGeneratedOrders(orders);

    console.log("Órdenes generadas botón:", orders);
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <button
        type="button"
        onClick={handleGenerateOrders}
        className="fixed left-120 top-3/4 z-50 rounded-xl bg-blue-500 px-4 py-2 text-white"
      >
        Generar array
      </button>

      <div
        ref={containerRef}
        id="rete-editor"
        className="h-screen w-screen overflow-hidden bg-slate-950"
      />

      {generatedOrders.length > 0 && (
        <pre className="fixed bottom-5 right-5 z-50 max-h-[300px] max-w-[500px] overflow-auto rounded-xl border border-cyan-500 bg-slate-950 p-4 text-xs text-cyan-100 shadow-xl">
          {JSON.stringify(generatedOrders, null, 2)}
        </pre>
      )}
    </div>
  );
}
