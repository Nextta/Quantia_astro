
// //Tipos
// import { NodeEditor, GetSchemes, ClassicPreset } from "rete";
// //Tipos---------------
// //Creamos area
// import { createRoot } from "react-dom/client";
// import { AreaPlugin, AreaExtensions } from "rete-area-plugin";
// import { ReactPlugin, Presets, ReactArea2D } from "rete-react-plugin";

// import {
//     ReactPlugin,
//     Presets,
//     ReactArea2D,
// } from "rete-react-plugin";


// //Tipos
// type Schemes = GetSchemes<
//   ClassicPreset.Node,
//   ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
// >;

// const editor = new NodeEditor<Schemes>();
// //Tipos---------------



// //Añadir un nodo arbitrario
// const socket = new ClassicPreset.Socket("socket");

// const nodeA = new ClassicPreset.Node("A");
// nodeA.addControl("a", new ClassicPreset.InputControl("text", {}));
// nodeA.addOutput("a", new ClassicPreset.Output(socket));
// await editor.addNode(nodeA);
// //Añadir un nodo arbitrario------------------


// //Creamos area

// type AreaExtra = ReactArea2D<Schemes>;

// const area = new AreaPlugin<Schemes, AreaExtra>(container);
// const render = new ReactPlugin<Schemes, AreaExtra>({ createRoot });

// render.addPreset(Presets.classic.setup());

// editor.use(area);
// area.use(render);
// //Creamos area------------------

// //Creamos otro nodo
// const nodeB = new ClassicPreset.Node("B");
// nodeB.addControl("b", new ClassicPreset.InputControl("text", {}));
// nodeB.addInput("b", new ClassicPreset.Input(socket));
// await editor.addNode(nodeB);
// //Creamos otro nodo-----------------

// //Conectamos los dos nodos:
// await editor.addConnection(new ClassicPreset.Connection(nodeA, "a", nodeB, "b"));

// //Conectamos los dos nodos-----------------

import { NodeEditor, ClassicPreset } from "rete";
import type { GetSchemes } from "rete";

import { createRoot } from "react-dom/client";

import { AreaPlugin, AreaExtensions } from "rete-area-plugin";

import {
  ReactPlugin,
  Presets,
} from "rete-react-plugin";

import type { ReactArea2D } from "rete-react-plugin";

import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";

type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;

type AreaExtra = ReactArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
  const editor = new NodeEditor<Schemes>();

  const area = new AreaPlugin<Schemes, AreaExtra>(container);

  const render = new ReactPlugin<Schemes, AreaExtra>({
    createRoot,
  });

  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  render.addPreset(Presets.classic.setup());

  connection.addPreset(ConnectionPresets.classic.setup());

  editor.use(area);

  area.use(render);
  area.use(connection);

  const socket = new ClassicPreset.Socket("socket");

  const nodeA = new ClassicPreset.Node("A");

  nodeA.addControl(
    "a",
    new ClassicPreset.InputControl("text", {
      initial: "Nodo A",
    })
  );

  nodeA.addOutput(
    "a",
    new ClassicPreset.Output(socket, "Salida")
  );

  await editor.addNode(nodeA);

  const nodeB = new ClassicPreset.Node("B");

  nodeB.addControl(
    "b",
    new ClassicPreset.InputControl("text", {
      initial: "Nodo B",
    })
  );

  nodeB.addInput(
    "b",
    new ClassicPreset.Input(socket, "Entrada")
  );

  await editor.addNode(nodeB);

  await editor.addConnection(
    new ClassicPreset.Connection(nodeA, "a", nodeB, "b")
  );

  await area.translate(nodeA.id, {
    x: 100,
    y: 100,
  });

  await area.translate(nodeB.id, {
    x: 500,
    y: 100,
  });

  AreaExtensions.simpleNodesOrder(area);

  AreaExtensions.zoomAt(area, editor.getNodes());

  return {
    editor,
    area,
    render,
    connection,
  };
}