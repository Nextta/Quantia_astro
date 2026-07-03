import {
  describe, //agrupa pruebas
  expect, //revisa si el resultado es el esperado
  it, //define una prueba específica
} from "vitest";
import type { resultados } from "../../interfaces/resultados";
import {
  get_alls_backtests,
  get_backtest,
  get_data_for_tv,
  get_indicator_for_tv,
  get_results_by_backtest,
  get_trade,
  get_trades,
  get_trades_page,
  save_data_dukas,
  save_data_dukas_ticks,
} from "./testing";
import type { Backtest } from "../../interfaces/backtest";
import type { Strategy } from "../../interfaces/strategy";
import type { StrategyAction } from "../../interfaces/strategyAction";
import type { StrategyCondition } from "../../interfaces/strategyCondition";
import type { StrategyIndicator } from "../../interfaces/strategyIndicator";
import type { Trade } from "../../interfaces/trades";
import type { SymbolInfoCFD } from "../../interfaces/symbolInfoCFD";
import type { DataDukas } from "../../interfaces/dataDukas";
import type { DataTv } from "../../interfaces/dataTv";
import type { DataIndicator } from "../../interfaces/dataIndicator";

describe("get_alls_backtests", () => {
  it("Devuelve todos los backtest en Vec", () => {
    let result: Backtest[] = get_alls_backtests();
    // let tipo = false;
    // if(typeof result === "object"  ){
    //     tipo = true;
    // }
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("get_backtest", () => {
  it("Devuelve un backtest específico en objeto", () => {
    let result: Backtest = get_backtest(1);
    // let tipo = false;
    // if(typeof result === "object"  ){
    //     tipo = true;
    // }
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(false);
  });
});

describe("get_data_for_tv", () => {
  it("Devuelve los datos para TradingView en Vec", () => {
    let result: DataTv[] = get_data_for_tv(
      35,
      "2024-08-19 04:00:00",
      "2024-08-19 11:00:00",
      40,
    );
    // let tipo = false;
    // if(typeof result === "object"  ){
    //     tipo = true;
    // }
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("get_indicator_for_tv", () => {
  it("Devuelve los indicadores para TradingView en Vec", () => {
    let result: DataIndicator[] = get_indicator_for_tv(
      35,
      1,
      "ema_50",
      "2024-08-19 04:00:00",
      "2024-08-19 11:00:00",
      40,
    );
    // let tipo = false;
    // if(typeof result === "object"  ){
    //     tipo = true;
    // }
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("get_results_by_backtest", () => {
  it("Devuelve los resultados de un backtest específico en objeto", () => {
    let result: resultados = get_results_by_backtest(
     1
    );
    // let tipo = false;
    // if(typeof result === "object"  ){
    //     tipo = true;
    // }
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(false);
  });
});


describe("get_trade", () => {
  it("Devuelve un trade específico en objeto", () => {
    let result: Trade = get_trade(
     1
    );
    // let tipo = false;
    // if(typeof result === "object"  ){
    //     tipo = true;
    // }
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(false);
  });
});

describe("get_trades_page", () => {
  it("Devuelve una página de trades en Vec", () => {
    let result: Trade[] = get_trades_page(
     35,20,0
    );
    // let tipo = false;
    // if(typeof result === "object"  ){
    //     tipo = true;
    // }
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(true);
  });
});

describe("get_trades", () => {
  it("Devuelve los trades específicos en Vec", () => {
    let result: Trade[] = get_trades(
     1
    );
    // let tipo = false;
    // if(typeof result === "object"  ){
    //     tipo = true;
    // }
    expect(result).not.toBeNull();
    expect(result).not.toBeUndefined();
    expect(typeof result).toBe("object");
    expect(Array.isArray(result)).toBe(true);
  });
});
// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: Backtest = get_backtest(1);
//     let tipo = false;
//     if(typeof result === "object"  ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });

// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: Backtest[] = get_alls_backtests();
//     let tipo = false;
//     if(typeof result === "object" ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });

// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: resultados = get_results_by_backtest(1);
//     let tipo = false;
//     if(typeof result === "object" ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });

// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: Strategy = get_strategies(1);
//     let tipo = false;
//     if(typeof result === "object" ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });

// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: StrategyAction = get_strategies_actions(1);
//     let tipo = false;
//     if(typeof result === "object" ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });

// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: StrategyCondition = get_strategies_conditions(1);
//     let tipo = false;
//     if(typeof result === "object" ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });

// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: StrategyIndicator = get_strategies_indicators(1);
//     let tipo = false;
//     if(typeof result === "object" ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });

// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: SymbolInfoCFD = get_symbol_cfd(1);
//     let tipo = false;
//     if(typeof result === "object" ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });

// describe("getResultadoActual", () => {
//   it("devuelve los valores del resultado encontrado", () => {

//     let result: Trades = get_trades(1);
//     let tipo = false;
//     if(typeof result === "object" ){
//         tipo = true;
//     }
//     expect(tipo).toBe(true);

//   });
// });
