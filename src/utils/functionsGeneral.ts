import type { Backtest } from "../interfaces/backtest";
import type { resultados } from "../interfaces/resultados"
import type { Trade} from "../interfaces/trades";

// const cuenta_data_all, Strategy = cuenta_data
import Database from "better-sqlite3";
import { get_alls_backtests } from './testing/testing';

const db = new Database(import.meta.env.URL_DATABASE);

export async function getBacktest(): Promise<Backtest[]> {
  return db.prepare("SELECT * FROM backtest ORDER BY id ASC").all() as Backtest[];
}

export async function getOneBacktest(idBacktest:number): Promise<Backtest> {
  return db.prepare(`SELECT * FROM backtest WHERE id = ?`).get(idBacktest) as Backtest;
}

export async function getResults(idBacktest:number): Promise<resultados[]>{
    return db.prepare(`SELECT * FROM resultados WHERE id_backtest= ${idBacktest} ORDER BY id ASC`).all() as resultados[];
}

export async function getTrades(idBacktest:number): Promise<Trade[]>{
    return db.prepare(`SELECT * FROM trades WHERE id_backtest= ${idBacktest} ORDER BY id ASC`).all() as Trade[];
}




//---------------------------------------
//---------------------------------------


interface MonthlyAverage {
  month: number;
  average: number | null;
  observations: number;
}

//Sumamos porcentaje

// const monthNames = [
//   "Ene",
//   "Feb",
//   "Mar",
//   "Abr",
//   "May",
//   "Jun",
//   "Jul",
//   "Ago",
//   "Sep",
//   "Oct",
//   "Nov",
//   "Dic",
// ];

export function calculateMonthlyTotals(trades: Trade[]) {
  const monthTotals = new Map<string, number>();
  const yearsTotals = new Set<number>();

  for (const tr of trades) {
    if (!tr.t0) continue;

    const dateMatch = /^(\d{4})-(\d{2})/.exec(tr.t0);

    if (!dateMatch) continue;

    const year = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);

    if (month < 1 || month > 12) continue;

    yearsTotals.add(year);

    const key = `${year}-${month}`;

    const parsedPL = Number(tr.pl ?? 0);
    const tradePL = Number.isFinite(parsedPL) ? parsedPL : 0;

    const currentTotal = monthTotals.get(key) ?? 0;

    monthTotals.set(key, currentTotal + tradePL);
  }

  return{
    monthTotals,
    yearsTotals,
  };
}

export function calculateAverageByMonth(
  monthTotals: Map<string, number>,
): MonthlyAverage[] {
  const accumulators = Array.from({ length: 12 }, () => ({
    sum: 0,
    count: 0,
  }));

  for (const [key, monthlyTotal] of monthTotals) {
    const [, monthText] = key.split("-");
    const month = Number(monthText);

    if (month < 1 || month > 12) continue;
    if (!Number.isFinite(monthlyTotal)) continue;

    const accumulator = accumulators[month - 1];

    accumulator.sum += monthlyTotal;
    accumulator.count += 1;
  }
  return accumulators.map((accumulator, index) => ({
    month: index + 1,

    average: accumulator.count > 0 ? accumulator.sum / accumulator.count : null,

    observations: accumulator.count,
  }));
}





