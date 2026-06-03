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
//NodeEditor es la clase principal que representa el editor de nodos. Es el punto de entrada para crear y manipular nodos, conexiones y otras entidades dentro del editor. Proporciona métodos para agregar nodos, conexiones, controles, etc., así como para gestionar eventos y realizar operaciones en el editor.

//ClasicPreset es un conjunto de clases y funciones predefinidas que implementan un estilo clásico de nodos y conexiones. Proporciona clases como Node, Connection, Socket, InputControl, OutputControl, etc., que se pueden utilizar para crear nodos y conexiones con un estilo visual específico. Estas clases también incluyen funcionalidades básicas para la gestión de nodos y conexiones, como agregar controles, definir entradas y salidas, etc.

//GetSchemes es un tipo genérico que se utiliza para definir los tipos de nodos y conexiones que se utilizarán en el editor. Permite especificar los tipos de nodos y conexiones personalizados que se pueden crear y manipular dentro del editor. Al usar GetSchemes, puedes definir tus propios tipos de nodos y conexiones, lo que te brinda flexibilidad para adaptar el editor a tus necesidades específicas.

import { NodeEditor, ClassicPreset } from "rete";
import type { GetSchemes } from "rete";
import { DockPlugin, DockPresets } from "rete-dock-plugin";
import { createRoot } from "react-dom/client";

import { AreaPlugin, AreaExtensions } from "rete-area-plugin";

import { ReactPlugin, Presets } from "rete-react-plugin";

import type { ReactArea2D } from "rete-react-plugin";

import {
  buildConnectedOrders,
  buyLimitOrders,
  updateSellLimitOrder,
  updateBuyLimitOrder,
  buildConnectedBuyLimitOrders,
  updateRSINode,
  updateParNode,
  clearReteArrays,
  buildConnectedSellLimitOrders,
  updateStrategyNode,
} from "../lib/reteUpdates"; //Arreglo
//Función para actualizar el arreglo

import { BuyLimitNode } from "../components/Nodes/BuyLimitNode";
import { SellLimitNode } from "../components/Nodes/SellLimitNode";
import { NodePAR } from "../components/Nodes/NodePAR";

import {
  ConnectionPlugin,
  Presets as ConnectionPresets,
} from "rete-connection-plugin";
import { RSINode } from "../components/Nodes/RSI_Node";
// import { updateBuyLimitOrder, updateParNode } from './reteUpdates';

export type Schemes = GetSchemes<
  ClassicPreset.Node,
  ClassicPreset.Connection<ClassicPreset.Node, ClassicPreset.Node>
>;

export type AreaExtra = ReactArea2D<Schemes>;

export async function createEditor(container: HTMLElement) {
  clearReteArrays();
  const editor = new NodeEditor<Schemes>();

  const area = new AreaPlugin<Schemes, AreaExtra>(container);

  const render = new ReactPlugin<Schemes, AreaExtra>({
    createRoot,
  });

  const connection = new ConnectionPlugin<Schemes, AreaExtra>();

  render.addPreset(
    Presets.classic.setup({
      customize: {
        node(context) {
          if (context.payload.label === "Buy Limit") {
            // return BuyLimitStyledNode;
            return BuyLimitNode;
          }
          if (context.payload.label === "Sell Limit") {
            return SellLimitNode;
          }
          if (context.payload.label === "RSI") {
            return RSINode;
          }
          if (context.payload.label === "Node PAR") {
            return NodePAR;
          }
          return Presets.classic.Node;
        },
      },
    }),
  );

  connection.addPreset(ConnectionPresets.classic.setup());

  //Drop---------------------------------------->
  const dock = new DockPlugin<Schemes>();
  dock.addPreset(
    DockPresets.classic.setup({
      area,
      size: 120,
      scale: 0.6,
    }),
  );

  //Drop----------------------------------------||>

  editor.use(area); //conectamos el área visual con el editor lógico.
  area.use(connection);
  area.use(render);
  area.use(dock); //drop

  AreaExtensions.selectableNodes(area, AreaExtensions.selector(), {
    accumulating: AreaExtensions.accumulateOnCtrl(),
  });

  AreaExtensions.simpleNodesOrder(area);

  //Basic settings
  class sBuyLimit extends ClassicPreset.Socket {
    constructor() {
      super("socketBuyLimit");
    }
    isCompatibleWith(socket: ClassicPreset.Socket) {
      return socket instanceof sBuyLimit;
    }
  }

  class sSellLimit extends ClassicPreset.Socket {
    constructor() {
      super("socketSellLimit");
    }
    isCompatibleWith(socket: ClassicPreset.Socket) {
      return socket instanceof sSellLimit;
    }
  }

  class sRSI extends ClassicPreset.Socket {
    constructor() {
      super("socketRSI");
    }
    isCompatibleWith(socket: ClassicPreset.Socket) {
      return socket instanceof sRSI;
    }
  }

  class sPAR extends ClassicPreset.Socket {
    constructor() {
      super("socketPAR");
    }
    isCompatibleWith(socket: ClassicPreset.Socket) {
      return socket instanceof sPAR;
    }
  }

  class flowSocket extends ClassicPreset.Socket {
    constructor() {
      super("socketFlow");
    }
    isCompatibleWith(socket: ClassicPreset.Socket) {
      return socket instanceof flowSocket;
    }
  }

  const socketBuyLimit = new sBuyLimit();
  const socketSellLimit = new sSellLimit();
  const socketRSI = new sRSI();
  const socketPAR = new sPAR();
  const socketFlow = new flowSocket();
  //Class para nodo A

  class NodeBuyLimit extends ClassicPreset.Node {
    constructor(socket: ClassicPreset.Socket, init: string = "Node---") {
      super("Buy Limit");

      updateStrategyNode({
        nodeId: this.id,
        kind: "ORDER",
        nodeType: "BUY_LIMIT",
        price: 0,
        percentageRisk: 0,
      });

      this.addInput(
        "buyLimitInput",
        new ClassicPreset.Input(socketFlow, "=>Receive"),
      );

      this.addControl(
        "symbol",
        new ClassicPreset.InputControl("text", {
          initial: "Precio",
          change: (value) => {
            updateStrategyNode({
              nodeId: this.id,
              kind: "ORDER",
              nodeType: "BUY_LIMIT",
              price: Number(value),
              percentageRisk: 0,
            });
          },
        }),
      );

      (this.addControl(
        "risk",
        new ClassicPreset.InputControl("text", {
          initial: "Porcentaje de riesgo %",
          change: (value) => {
            const cleanPercentValue = String(value).replace("%", "");
            const risk = Number(cleanPercentValue);
            updateStrategyNode({
              nodeId: this.id,
              kind: "ORDER",
              nodeType: "BUY_LIMIT",
              price: 0,
              percentageRisk: Number.isNaN(risk) ? 0 : risk,
            });
          },
        }),
      ),
        this.addOutput(
          "buyLimitOutput",
          new ClassicPreset.Output(socketFlow, "Send=>"),
        ));
    }
  }

  // dock.add(()=> new NodeBuyLimit(socketFlow, "Buy Limit"));

  // const BuyLimit = new NodeBuyLimit(socketFlow, "Node Buy Limit");
  // await editor.addNode(BuyLimit);
  // console.log("Nodos en el editor:", editor.getNodes());

  //Nodo sell limit

  class NodeSellLimit extends ClassicPreset.Node {
    constructor(socket: ClassicPreset.Socket, init: string = "Node---") {
      super("Sell Limit");

      updateSellLimitOrder(this.id, {
        price: 0,
        percentageRisk: 0,
      });

      this.addInput(
        "sellLimitInput",
        new ClassicPreset.Input(socketFlow, "=>Receive"),
      );

      this.addControl(
        "entryPrice",
        new ClassicPreset.InputControl("text", {
          initial: "100",
          change: (value) => {
            updateSellLimitOrder(this.id, { price: Number(value) });
          },
        }),
      );

      this.addControl(
        "risk",
        new ClassicPreset.InputControl("text", {
          initial: "1%",
          change: (value) => {
            const cleanPercentValue = String(value).replace("%", "");
            const risk = Number(cleanPercentValue);
            updateSellLimitOrder(this.id, {
              percentageRisk: Number.isNaN(risk) ? 0 : risk,
            });
          },
        }),
      );

      this.addOutput(
        "sellLimitOutput",
        new ClassicPreset.Output(socketFlow, "Send->"),
      );
    }
  }

  // const SellLimit = new NodeSellLimit(socketSellLimit, "Node Sell Limit");
  // await editor.addNode(SellLimit);
  // console.log("Nodos en el editor:", editor.getNodes());

  class NodeRSI extends ClassicPreset.Node {
    constructor(socket: ClassicPreset.Socket, init: string = "Node---") {
      super("RSI");

      updateRSINode(this.id, {
        longitud: 14,
        fuente: "100",
      });

      this.addInput(
        "rsiInput",
        new ClassicPreset.Input(socketFlow, "=>Receive"),
      );

      this.addControl(
        "Longitud RSI",
        new ClassicPreset.InputControl("text", {
          initial: "14",
          change: (value) => {
            updateRSINode(this.id, { longitud: Number(value) });
          },
        }),
      );

      this.addControl(
        "Fuente",
        new ClassicPreset.InputControl("text", {
          initial: "100",
          change: (value) => {
            updateRSINode(this.id, { fuente: String(value) });
          },
        }),
      );

      this.addOutput(
        "rsiOutput",
        new ClassicPreset.Output(socketFlow, "Send->"),
      );
    }
  }

  // const RSI = new NodeRSI(socketFlow, "Node RSI");
  // await editor.addNode(RSI);

  class ParNode extends ClassicPreset.Node {
    constructor(socket: ClassicPreset.Socket, init: string = "EURUSD") {
      super("Node PAR");

      updateParNode(this.id, {
        pair: init,
      });

      this.addControl(
        "risk",
        new ClassicPreset.InputControl("text", {
          initial: init,
          change: (value) => {
            updateParNode(this.id, { pair: String(value) });
          },
        }),
      );

      this.addOutput(
        "parOutput",
        new ClassicPreset.Output(socketFlow, "Send->"),
      );
    }
  }

  // const PAR = new ParNode(socketFlow, "NAS100");
  // await editor.addNode(PAR);

  // const BuyLimit = new NodeBuyLimit(socketFlow, "Node Buy Limit");
  // await editor.addNode(BuyLimit);

  // const SellLimit = new NodeSellLimit(socketSellLimit, "Node Sell Limit");
  // await editor.addNode(SellLimit);

  // const RSI = new NodeRSI(socketFlow, "Node RSI");
  // await editor.addNode(RSI);

  // const PAR = new ParNode(socketFlow, "NAS100");
  // await editor.addNode(PAR);

  dock.add(() => new NodeBuyLimit(socketFlow, "Node Buy Limit"));
  dock.add(() => new NodeSellLimit(socketFlow, "Node Sell Limit"));
  dock.add(() => new NodeRSI(socketFlow, "Node RSI"));
  dock.add(() => new ParNode(socketFlow, "NAS100"));

  console.log("Nodos en el editor:", editor.getNodes());
  await area.translate(BuyLimit.id, {
    x: 0,
    y: 100,
  });

  await area.translate(SellLimit.id, {
    x: 0,
    y: 580,
  });

  await area.translate(RSI.id, {
    x: 0,
    y: 1070,
  });

  await area.translate(PAR.id, {
    x: 0,
    y: 1550,
  });

  AreaExtensions.simpleNodesOrder(area);

  await AreaExtensions.zoomAt(area, editor.getNodes());

  (window as any).debugOrders = () => {
    console.log("Conexiones reales:", editor.getConnections());
    console.log("Nodos reales:", editor.getNodes());
    console.log(
      "Órdenes conectadas:",
      buildConnectedBuyLimitOrders(editor),
      buildConnectedSellLimitOrders(editor),
    );
  };

  function generateOrders() {
    const buyLimitOrdersConnected = buildConnectedBuyLimitOrders(editor);
    const sellLimitOrdersConnected = buildConnectedSellLimitOrders(editor);

    const orders = [...buyLimitOrdersConnected, ...sellLimitOrdersConnected];

    console.log("Órdenes generadas:", orders);
    return orders;
  }

  return {
    editor,
    area,
    render,
    connection,
    generateOrders,
  };
}
