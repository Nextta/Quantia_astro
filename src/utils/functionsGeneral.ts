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

const monthNames = [
  "Ene",
  "Feb",
  "Mar",
  "Abr",
  "May",
  "Jun",
  "Jul",
  "Ago",
  "Sep",
  "Oct",
  "Nov",
  "Dic",
];
interface YearRow {
  year: number;
  months: Array<number | null>;
  ytd: number;
}
export interface MonthlyAverage {
  month: number;
  average: number | null;
  observations: number;
}

export function calculateMonthlyPerformance(
  trades: Trade[],
  initialBalance = 20,
): YearRow[] {
  const validInitialBalance =
    Number.isFinite(initialBalance) && initialBalance > 0
      ? initialBalance
      : 200;

  const monthlyTotals = new Map<string, number>();
  const years = new Set<number>();

  for (const trade of trades) {
    if (!trade.t0) continue;

    const dateMatch = /^(\d{4})-(\d{2})/.exec(trade.t0);

    if (!dateMatch) continue;

    const year = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);

    if (month < 1 || month > 12) continue;

    years.add(year);

    const key = `${year}-${month}`;
    const parsedPL = Number(trade.pl ?? 0);
    const tradePL = Number.isFinite(parsedPL) ? parsedPL : 0;
    const currentTotal = monthlyTotals.get(key) ?? 0;

    monthlyTotals.set(key, currentTotal + tradePL);
  }

  let runningBalance = validInitialBalance;
  console.log(runningBalance);

  return Array.from(years)
    .sort((a, b) => a - b)
    .map((year) => {
      const yearOpeningBalance = runningBalance;

      const months = Array.from({ length: 12 }, (_, index) => {
        const month = index + 1;
        const key = `${year}-${month}`;

        if (!monthlyTotals.has(key)) {
          return null;
        }

        const monthPL = monthlyTotals.get(key) ?? 0;
        const monthOpeningBalance = runningBalance;

        const monthlyPercentage =
          monthOpeningBalance !== 0
            ? (monthPL / monthOpeningBalance) * 100
            : 0;

        runningBalance += monthPL;

        return monthlyPercentage;
      });

      const ytd =
        yearOpeningBalance !== 0
          ? ((runningBalance - yearOpeningBalance) /
              yearOpeningBalance) *
            100
          : 0;

      return {
        year,
        months,
        ytd,
      };
    });
}

export function calculateAverageMonthlyPerformance(
  yearRows: YearRow[],
): MonthlyAverage[] {
  return Array.from({ length: 12 }, (_, monthIndex) => {
    const values = yearRows
      .map((row) => row.months[monthIndex])
      .filter((value): value is number => typeof value === "number");

    const sum = values.reduce(
      (accumulator, value) => accumulator + value,
      0,
    );

    return {
      month: monthIndex + 1,
      average: values.length > 0 ? sum / values.length : null,
      observations: values.length,
    };
  });
}


// interface MonthlyAverage {
//   month: number;
//   average: number | null;
//   observations: number;
// }

//Sumamos porcentaje





// export function calculateMonthlyTotals(trades: Trade[]) {
//   const monthTotals = new Map<string, number>();
//   const yearsTotals = new Set<number>();

//   for (const tr of trades) {
//     if (!tr.t0) continue;

//     const dateMatch = /^(\d{4})-(\d{2})/.exec(tr.t0);

//     if (!dateMatch) continue;

//     const year = Number(dateMatch[1]);
//     const month = Number(dateMatch[2]);

//     if (month < 1 || month > 12) continue;

//     yearsTotals.add(year);

//     const key = `${year}-${month}`;

//     const parsedPL = Number(tr.pl ?? 0);
//     const tradePL = Number.isFinite(parsedPL) ? parsedPL : 0;

//     const currentTotal = monthTotals.get(key) ?? 0;

//     monthTotals.set(key, currentTotal + tradePL);
//   }

//   return{
//     monthTotals,
//     yearsTotals,
//   };
// }

// export function calculateAverageByMonth(
//   monthTotals: Map<string, number>,
// ): MonthlyAverage[] {
//   const accumulators = Array.from({ length: 12 }, () => ({
//     sum: 0,
//     count: 0,
//   }));

//   for (const [key, monthlyTotal] of monthTotals) {
//     const [, monthText] = key.split("-");
//     const month = Number(monthText);

//     if (month < 1 || month > 12) continue;
//     if (!Number.isFinite(monthlyTotal)) continue;

//     const accumulator = accumulators[month - 1];

//     accumulator.sum += monthlyTotal;
//     accumulator.count += 1;
//   }
//   return accumulators.map((accumulator, index) => ({
//     month: index + 1,

//     average: accumulator.count > 0 ? accumulator.sum / accumulator.count : null,

//     observations: accumulator.count,
//   }));
// }

// export function calculateMonthlyReturns(
//   trades: Trade[],
//   initialBalance: number,
// ) {
//   const { monthTotals } = calculateMonthlyTotals(trades);

//   // Ordenar cronológicamente los meses.
//   const orderedMonths = [...monthTotals.entries()]
//     .map(([key, profitLoss]) => {
//       const [yearText, monthText] = key.split("-");

//       return {
//         key,
//         year: Number(yearText),
//         month: Number(monthText),
//         profitLoss,
//       };
//     })
//     .sort(
//       (a, b) =>
//         a.year - b.year ||
//         a.month - b.month,
//     );

//   let currentBalance = initialBalance;
//   const monthlyReturns = new Map<string, number>();

//   for (const period of orderedMonths) {
//     const openingBalance = currentBalance;

//     const returnPercentage =
//       openingBalance !== 0
//         ? (period.profitLoss / openingBalance) * 100
//         : 0;

//     monthlyReturns.set(period.key, returnPercentage);

//     // El cierre de este mes será el balance inicial del siguiente.
//     currentBalance += period.profitLoss;
//   }

//   return monthlyReturns;
// }



