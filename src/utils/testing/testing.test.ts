import { describe, //agrupa pruebas
     expect, //revisa si el resultado es el esperado
      it //define una prueba específica
     } from "vitest";
import type { resultados } from "../../interfaces/resultados";
import { get_results_by_backtest, get_backtest, get_strategies, get_strategies_actions, get_strategies_conditions, get_strategies_indicators, get_strategies_options,get_symbol_cfd, get_trades } from "./testing";
import type { Backtest } from "../../interfaces/backtest";
import type { Strategy } from "../../interfaces/strategy";
import type { StrategyAction } from "../../interfaces/strategyAction";
import type { StrategyCondition } from "../../interfaces/strategyCondition";
import type { StrategyIndicator } from "../../interfaces/strategyIndicator";
import type { Trades } from "../../interfaces/trades";
import type { SymbolInfoCFD } from "../../interfaces/symbolInfoCFD";

describe("getResultadoActual", () => {
  it("devuelve los valores del resultado encontrado", () => {


    let result: resultados = get_results_by_backtest(1);
    let tipo = false;
    if(typeof result === "object" ){
        tipo = true;
    }
    expect(tipo).toBe(true);
    
  });
});

describe("getResultadoActual", () => {
  it("devuelve los valores del resultado encontrado", () => {


    let result: Backtest = get_backtest(1);
    let tipo = false;
    if(typeof result === "object" ){
        tipo = true;
    }
    expect(tipo).toBe(true);
    
  });
});

describe("getResultadoActual", () => {
  it("devuelve los valores del resultado encontrado", () => {


    let result: Strategy = get_strategies(1);
    let tipo = false;
    if(typeof result === "object" ){
        tipo = true;
    }
    expect(tipo).toBe(true);
    
  });
});

describe("getResultadoActual", () => {
  it("devuelve los valores del resultado encontrado", () => {


    let result: StrategyAction = get_strategies_actions(1);
    let tipo = false;
    if(typeof result === "object" ){
        tipo = true;
    }
    expect(tipo).toBe(true);
    
  });
});

describe("getResultadoActual", () => {
  it("devuelve los valores del resultado encontrado", () => {


    let result: StrategyCondition = get_strategies_conditions(1);
    let tipo = false;
    if(typeof result === "object" ){
        tipo = true;
    }
    expect(tipo).toBe(true);
    
  });
});

describe("getResultadoActual", () => {
  it("devuelve los valores del resultado encontrado", () => {


    let result: StrategyIndicator = get_strategies_indicators(1);
    let tipo = false;
    if(typeof result === "object" ){
        tipo = true;
    }
    expect(tipo).toBe(true);
    
  });
});

describe("getResultadoActual", () => {
  it("devuelve los valores del resultado encontrado", () => {


    let result: SymbolInfoCFD = get_symbol_cfd(1);
    let tipo = false;
    if(typeof result === "object" ){
        tipo = true;
    }
    expect(tipo).toBe(true);
    
  });
});

describe("getResultadoActual", () => {
  it("devuelve los valores del resultado encontrado", () => {


    let result: Trades = get_trades(1);
    let tipo = false;
    if(typeof result === "object" ){
        tipo = true;
    }
    expect(tipo).toBe(true);
    
  });
});


