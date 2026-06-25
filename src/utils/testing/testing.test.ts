import { describe, //agrupa pruebas
     expect, //revisa si el resultado es el esperado
      it //define una prueba específica
     } from "vitest";
import type { resultados } from "../../interfaces/resultados";
import { get_results_by_backtest } from "./testing";

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


