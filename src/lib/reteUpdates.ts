
import { NodeEditor } from "rete";

type BuyLimitData = {
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

export const buyLimitOrders: BuyLimitData[] = [];
export const ParArray: Par[] = [];
export const RSI_Array: RSI[] = [];

export function updateBuyLimitOrder(
  nodeId: string,
  patch: Partial<Omit<BuyLimitData, "nodeId">>,
) {
  const existingOrder = buyLimitOrders.find((order) => order.nodeId === nodeId);

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

export function clearReteArrays(){
  buyLimitOrders.length = 0;
  ParArray.length = 0;
  RSI_Array.length= 0;
}
