import {describe, it, expect, vi, beforeEach} from 'vitest'
import { getDataDukasCopy } from '../dukascopy.ts';  //Función original
import { getHistoricalRates } from 'dukascopy-node'

vi.mock("dukascopy-node", () => ({ //aqui hacem
  getHistoricalRates: vi.fn(), //Versión simulada de la función getHistoricalRates
}));

const getHistoricalRatesMock = vi.mocked(getHistoricalRates);

describe("getDataDukasCopy || Obtenemos datos de Dukascopy de diferentes formas", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("devuelve los datos obtenidos sin modificarlos", async () => {
    const mockData = [
      {
        timestamp: 1617062100000,
        open: 1.17681,
        high: 1.17681,
        low: 1.17671,
        close: 1.17681,
        volume: 35.91,
      },
    ];

    getHistoricalRatesMock.mockResolvedValueOnce(mockData);

    const result = await getDataDukasCopy();

    expect(result).toEqual(mockData);
  });

  it("devuelve un arreglo vacío cuando no hay datos", async () => {
    getHistoricalRatesMock.mockResolvedValueOnce([]);

    const result = await getDataDukasCopy();

    expect(result).toEqual([]);
  });

  it("propaga el error cuando Dukascopy falla", async () => {
    const errorSimulado = new Error("Dukascopy no disponible");

    getHistoricalRatesMock.mockRejectedValueOnce(errorSimulado);

    await expect(getDataDukasCopy()).rejects.toThrow(
      "Dukascopy no disponible",
    );
  });

  it("solicita EUR/USD con la configuración correcta", async () => {
    getHistoricalRatesMock.mockResolvedValueOnce([]);

    await getDataDukasCopy();

    expect(getHistoricalRatesMock).toHaveBeenCalledTimes(1);

    expect(getHistoricalRatesMock).toHaveBeenCalledWith({
      instrument: "eurusd",
      dates: {
        from: new Date("2021-03-30"),
        to: new Date("2021-03-31"),
      },
      timeframe: "m1",
      format: "json",
      priceType: "bid",
    });
  });
});