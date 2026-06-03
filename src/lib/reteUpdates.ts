import { NodeEditor } from "rete";
//---------------------------------------------
//New Types --------------->
type NodeType = "MARKET" | "INDICATOR" | "CONDITION" | "ORDER";

type MarketNode = {
  nodeId: string;
  kind: "MARKET";
  nodeType: "PAR";
  pair: string;
};

type RSI_NodeV2 = {
  nodeId: string;
  kind: "INDICATOR";
  nodeType: "RSI";
  longitud: number;
  fuente: string;
};

type OrderNodeData = {
  nodeId: string;
  kind: "ORDER";
  orderType: OrderType;
  price?: number;
  percentageRisk: number;
};

type OrderType =
  | "BUY_LIMIT"
  | "SELL_LIMIT"
  | "BUY_STOP"
  | "SELL_STOP"
  | "BUY_MARKET"
  | "SELL_MARKET";



type StrategyNodeData =
  | MarketNode
  | RSI_NodeV2
  | BuyLimitNode
  | SellLimitNode
  | OrderNodeData;
//New Types --------------->|

type BuyLimitNode = {
  nodeId: string;
  kind: "ORDER";
  nodeType: "BUY_LIMIT";
  price: number;
  percentageRisk: number;
};

type SellLimitNode = {
  nodeId: string;
  kind: "ORDER";
  nodeType: "SELL_LIMIT";
  price: number;
  percentageRisk: number;
};

type BuyLimitData = {
  nodeId: string;
  price: number;
  percentageRisk: number;
};

type SellLimitData = {
  nodeId: string;
  price: number;
  percentageRisk: number;
};

type Par = {
  nodeId: string;
  pair: string;
};

type RSI = {
  nodeId: string;
  longitud: number;
  fuente: string;
};

type NodeWithId = {
  nodeId: string;
};


export const strategyNodes: StrategyNodeData[] = [];

export const buyLimitOrders: BuyLimitData[] = [];
export const sellLimitOrders: SellLimitData[] = [];
export const ParArray: Par[] = [];
export const RSI_Array: RSI[] = [];

export function buildConnectedOrders(editor: NodeEditor<any>) {
  const connections = editor.getConnections();

  const nodesById = new Map(
    strategyNodes.map((node) => [node.nodeId, node]),
  );

  const orderNodes = strategyNodes.filter((node) => {
    return node.kind === "ORDER";
  });

  const finalOrders = orderNodes.map((orderNode) => {
    const connectionToOrder = connections.find((connection: any) => {
      return connection.target === orderNode.nodeId;
    });

    if (!connectionToOrder) {
      return null;
    }

    const previousNodeId = connectionToOrder.source;
    const previousNode = nodesById.get(previousNodeId);

    if (!previousNode) {
      return null;
    }

    return {
      order: orderNode,
      previousNode,
      path: {
        previousNodeId,
        orderNodeId: orderNode.nodeId,
      },
    };
  });

  return finalOrders.filter(Boolean);
}

export function updateStrategyNode(nodeData: StrategyNodeData) {
  const existingNode = strategyNodes.find((node) => {
    node.nodeId === nodeData.nodeId;
  });

  if (existingNode) {
    Object.assign(existingNode, nodeData);
  } else {
    strategyNodes.push(nodeData);
  }
  console.log("El array strategyNodes:", strategyNodes);
}
//------- 52
console.log("El array BuyLimit:", buyLimitOrders);

export function updateBuyLimitOrder(
  nodeId: string,
  patch: Partial<Omit<BuyLimitData, "nodeId">>,
) {
  const existingOrder = buyLimitOrders.find(
    (order) => order.nodeId === nodeId,
  );

  if (existingOrder) {
    Object.assign(existingOrder, patch);
  } else {
    buyLimitOrders.push({
      nodeId,
      price: 0,
      percentageRisk: 0,
      ...patch,
    });
  }
  console.log("El array BuyLimit:", buyLimitOrders);
}

export function updateSellLimitOrder(
  nodeId: string,
  patch: Partial<Omit<SellLimitData, "nodeId">>,
) {
  const existingOrder = sellLimitOrders.find(
    (order) => order.nodeId === nodeId,
  );

  if (existingOrder) {
    Object.assign(existingOrder, patch);
  } else {
    sellLimitOrders.push({
      nodeId,
      price: 0,
      percentageRisk: 0,
      ...patch,
    });
  }
  console.log("El array SellLimit:", sellLimitOrders);
}

export function updateParNode(
  nodeId: string,
  patch: Partial<Omit<Par, "nodeId">>,
) {
  const existingPar = ParArray.find((pr) => pr.nodeId === nodeId);

  if (existingPar) {
    Object.assign(existingPar, patch);
  } else {
    ParArray.push({
      nodeId,
      pair: "",
      ...patch,
    });
  }

  console.log("El array Par:", ParArray);
}

export function updateRSINode(
  nodeId: string,
  patch: Partial<Omit<RSI, "nodeId">>,
) {
  const existingRSI = RSI_Array.find((rsi) => rsi.nodeId === nodeId);

  if (existingRSI) {
    Object.assign(existingRSI, patch);
  } else {
    RSI_Array.push({
      nodeId,
      longitud: 0,
      fuente: "",
      ...patch,
    });
  }

  console.log("El array RSI:", RSI_Array);
}

function arrayToMap<T extends NodeWithId>(array: T[]) {
  return new Map(array.map((item) => [item.nodeId, item]));
}



export function buildConnectedBuyLimitOrders(editor: NodeEditor<any>) {
  const connections = editor.getConnections();

  console.log("Conexiones:", connections);
  console.log("ParArray:", ParArray);
  console.log("RSI_Array:", RSI_Array);
  console.log("buyLimitOrders:", buyLimitOrders);

  const parById = arrayToMap(ParArray);
  const rsiById = arrayToMap(RSI_Array);

  const finalOrders = buyLimitOrders.map((buyLimit) => {
    const connectionToBuyLimit = connections.find((connection: any) => {
      return connection.target === buyLimit.nodeId;
    });

    if (!connectionToBuyLimit) {
      return null;
    }

    const rsiNodeId = connectionToBuyLimit.source;
    const rsi = rsiById.get(rsiNodeId);

    if (!rsi) {
      return null;
    }

    const connectionToRsi = connections.find((connection: any) => {
      return connection.target === rsi.nodeId;
    });

    if (!connectionToRsi) {
      return null;
    }

    const parNodeId = connectionToRsi.source;
    const par = parById.get(parNodeId);

    if (!par) {
      return null;
    }

    return {
      path: {
        parNodeId: par.nodeId,
        rsiNodeId: rsi.nodeId,
        buyLimitNodeId: buyLimit.nodeId,
      },
      pair: par.pair,
      rsi: {
        longitud: rsi.longitud,
        fuente: rsi.fuente,
      },
      buyLimit: {
        price: buyLimit.price,
        percentageRisk: buyLimit.percentageRisk,
      },
    };
  });

  return finalOrders.filter(Boolean);
}

export function buildConnectedSellLimitOrders(editor: NodeEditor<any>) {
  const connections = editor.getConnections(); // Obtener todas las conexiones del editor

  const parById = arrayToMap(ParArray);
  const rsiById = arrayToMap(RSI_Array);

  const finalOrders = sellLimitOrders.map((sellLimit) => {
    const connectionToSellLimit = connections.find((connection: any) => {
      return connection.target === sellLimit.nodeId;
    });

    if (!connectionToSellLimit) {
      return null;
    }

    const rsiNodeId = connectionToSellLimit.source;
    const rsi = rsiById.get(rsiNodeId);

    if (!connectionToSellLimit) {
      return null;
    }

    if (!rsi) {
      return null;
    }

    const connectionToRsi = connections.find((connection: any) => {
      return connection.target === rsi.nodeId;
    });
    if (!connectionToRsi) {
      return null;
    }

    const parNodeId = connectionToRsi.source;
    const par = parById.get(parNodeId);

    if (!par) {
      return null;
    }

    return {
      path: {
        parNodeId: par.nodeId,
        rsiNodeId: rsi.nodeId,
        selLimitNodeId: sellLimit.nodeId,
      },
      pair: par.pair,
      rsi: {
        longitud: rsi.longitud,
        fuente: rsi.fuente,
      },
      sellLimit: {
        price: sellLimit.price,
        percentageRisk: sellLimit.percentageRisk,
      },
    };
  });

  return finalOrders.filter(Boolean);
}

export function clearReteArrays() {
  buyLimitOrders.length = 0;
  sellLimitOrders.length = 0;
  ParArray.length = 0;
  RSI_Array.length = 0;
}
