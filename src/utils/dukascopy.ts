import { getHistoricalRates, type Config } from "dukascopy-node";

const config: Config = {
  instrument: "eurusd",
  dates: {
    from: new Date("2021-03-30"),
    to: new Date("2021-03-31"),
  },
  timeframe: "m1",
  format: "json",
  priceType: "bid",
};

// getHistoricalRates(config).then((data) => console.log(data));

export async function getDataDukasCopy(){
  return await getHistoricalRates(config);
}