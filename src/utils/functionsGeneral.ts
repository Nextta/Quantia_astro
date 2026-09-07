import type { Backtest } from "../interfaces/backtest";
import type { resultados } from "../interfaces/resultados";
import type { Trade } from "../interfaces/trades";
import type { PointInterface } from "../interfaces/pointInterface";

// const cuenta_data_all, Strategy = cuenta_data
import Database from "better-sqlite3";
import { get_alls_backtests } from "./testing/testing";
import type { Activo } from "../enums/activo";
const db = new Database(import.meta.env.URL_DATABASE);

export async function getBacktest(): Promise<Backtest[]> {
  return db
    .prepare("SELECT * FROM backtest ORDER BY id ASC")
    .all() as Backtest[];
}

export async function getOneBacktest(idBacktest: number): Promise<Backtest> {
  return db
    .prepare(`SELECT * FROM backtest WHERE id = ?`)
    .get(idBacktest) as Backtest;
}

export async function getResults(idBacktest: number): Promise<resultados[]> {
  return db
    .prepare(`SELECT * FROM resultados WHERE id_backtest= ${idBacktest}`)
    .all() as resultados[];
}

export async function getTrades(idBacktest: number): Promise<Trade[]> {
  return db
    .prepare(
      `SELECT * FROM trades WHERE id_backtest= ${idBacktest} ORDER BY id ASC`,
    )
    .all() as Trade[];
}

export async function getTrade(
  idBacktest: number,
  idTrade: number,
): Promise<Trade | undefined> {
  const trade = db
    .prepare(
      `
      SELECT *
      FROM trades
      WHERE id_backtest = ?
        AND id = ?
      LIMIT 1
    `,
    )
    .get(idBacktest, idTrade) as Trade | undefined;

  return trade;
}

//---------------------------------------
//---------------------------------------
//Llamadas para la sección de trades:

// export const tradesArray = await getTrades(idActualTradeList);
// export const backtestArray = await getOneBacktest(idActualTradeList);

//---------------------------------------

export interface YearRow {
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
  initialBalance: number = 1,
): YearRow[] {
  const validInitialBalance =
    Number.isFinite(initialBalance) && initialBalance > 0 ? initialBalance : 1;

  const monthlyTotals = new Map<string, number>(); //El number es el PL, la clave es año y mes
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

  const sortedYears = Array.from(years).sort((a, b) => a - b);
  const yearsRows: YearRow[] = sortedYears.map((year) => {
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
        monthOpeningBalance !== 0 ? (monthPL / monthOpeningBalance) * 100 : 0;

      runningBalance += monthPL;

      return monthlyPercentage;
    });

    const ytd =
      yearOpeningBalance !== 0
        ? ((runningBalance - yearOpeningBalance) / yearOpeningBalance) * 100
        : 0;

    const yearRow: YearRow = {
      year,
      months,
      ytd,
    };
    return yearRow;
  });
  return yearsRows;
}

export function calculateAverageMonthlyPerformance(
  yearRows: YearRow[],
): MonthlyAverage[] {
  const monthlyAvgs = Array.from({ length: 12 }, (_, monthIndex) => {
    const values = yearRows
      .map((row) => row.months[monthIndex])
      .filter((value): value is number => typeof value === "number");

    const sum = values.reduce((accumulator, value) => accumulator + value, 0);

    return {
      month: monthIndex + 1,
      average: values.length > 0 ? sum / values.length : null,
      observations: values.length,
    };
  });

  return monthlyAvgs;
}

type TradingWeekDay = 1 | 2 | 3 | 4 | 5;

export type WeekAverage = {
  day: TradingWeekDay;
  average: number | null;
  observations: number;
};

export function getDayAverage(
  trades: Trade[],
  initialBalance: number = 1,
): WeekAverage[] {
  const validInitialBalance =
    Number.isFinite(initialBalance) && initialBalance > 0 ? initialBalance : 1;

  const dayTotals = new Map<string, number>();

  for (const trade of trades) {
    if (!trade.t0) continue;

    const dateMatch = /^(\d{4})-(\d{2})-(\d{2})/.exec(trade.t0);

    if (!dateMatch) continue;

    const year = Number(dateMatch[1]);
    const month = Number(dateMatch[2]);
    const day = Number(dateMatch[3]);

    if (month < 1 || month > 12) continue;

    const key = `${year}-${month}-${day}`;

    const parsedPL = Number(trade.pl ?? 0);

    const tradePL = Number.isFinite(parsedPL) ? parsedPL : 0;

    const currentTotal = dayTotals.get(key) ?? 0;

    dayTotals.set(key, currentTotal + tradePL); //Aqui hacemos la suma por dia
    //Aqui ya tenemos la suma de cada fecha, esto es  lo que hace todo el for
  }

  const allEntrys = dayTotals.entries(); //Obtenemos todos los datos anteriormente obtenidos con el for

  const arrDaysTotals = Array.from(allEntrys); //Aqui convertimos el iterador en array

  const sortedDaysTotals = arrDaysTotals.sort((a, b) => {
    const dateA = a[0]; //a[0] es la fechav a[1] es el PL
    const dateB = b[0]; //Extraemos ambas fechas
    const elementsA = dateA.split("-").map(Number); //Separamos el string con guion, y convertimos a numero con map
    const elementsB = dateB.split("-").map(Number);
    const timeA = Date.UTC(elementsA[0], elementsA[1] - 1, elementsA[2]);
    const timeB = Date.UTC(elementsB[0], elementsB[1] - 1, elementsB[2]);

    return timeA - timeB;
  });

  let runningBalance = validInitialBalance;

  const percentWeekDay = new Map<number, number[]>();

  for (const [dateKey, dayPL] of sortedDaysTotals) {
    const [year, month, day] = dateKey.split("-").map(Number);

    const dailyPercent = (dayPL / runningBalance) * 100;

    const dateUTC = Date.UTC(year, month - 1, day);
    const weekDay = new Date(dateUTC).getUTCDay();

    const currentPercentages = percentWeekDay.get(weekDay) ?? [];

    //aumentar running balance

    runningBalance += dayPL;

    currentPercentages.push(dailyPercent);

    percentWeekDay.set(weekDay, currentPercentages);
  }

  const daysToShow: TradingWeekDay[] = [1, 2, 3, 4, 5];

  const weekAvgs = daysToShow.map((weekDay) => {
    const percentages = percentWeekDay.get(weekDay) ?? [];

    const sum = percentages.reduce(
      (accumulator, percentage) => accumulator + percentage,
      0,
    );

    const prom = percentages.length > 0 ? sum / percentages.length : null;

    return {
      day: weekDay,
      average: prom,
      observations: percentages.length,
    };
  });

  return weekAvgs;
}

export function buildEquityCurve(trades: Trade[], initialBalance: number) {
  const orderedTrades = trades
    .map((trade) => ({
      trade,
      time: parseTradeTime(trade.t0),
    }))
    .sort((a, b) => a.time - b.time);

  let currentBalance = initialBalance;

  const initialTime =
    orderedTrades.length > 0
      ? orderedTrades[0].time - 1
      : Math.floor(Date.now() / 1000);

  let previousTime = initialTime;

  const points = [
    {
      time: initialTime,
      value: initialBalance,
    },
  ];

  for (const item of orderedTrades) {
    const { trade } = item;

    const uniqueTime = // Aqui nos aseguramos de que el tiempo sea único para cada punto en la curva de equidad
      item.time <= previousTime // Si el tiempo del trade es menor o igual al tiempo anterior, incrementamos el tiempo en 1 segundo para evitar duplicados
        ? previousTime + 1
        : item.time;

    currentBalance += trade.pl;

    points.push({
      time: uniqueTime,
      value: currentBalance,
    });
    previousTime = uniqueTime;
  }

  return {
    points,
    initialBalance,
    finalBalance: currentBalance,
    netProfit: currentBalance - initialBalance,
    tradeCount: trades.length,
  };
}

function parseTradeTime(time: string): number {
  const normalizedTime = time.trim().replace(" ", "T");
  const milliseconds = Date.parse(normalizedTime);

  if (Number.isNaN(milliseconds)) {
    throw new Error(`Fecha inválida en una operación: ${time}`);
  }

  return Math.floor(milliseconds / 1000); //Quitamos posibles decimales con math floor
}

//------------------------Para StrategyCard

export type RankedBacktest = {
  id: number;
  titulo: string;
  tipo: Activo;
  initialBalance: number;
  returnPercent: number;
  profitFactor: number;
  drawDown: number;
  points: PointInterface[];
};

type RankedBacktestRow = {
  id: number;
  titulo: string;
  balance: number;
  tipo: Activo;
  returnPercent: number;
  profitFactor: number;
  drawDown: number;
};

export async function getRankedBacktests(
  limit?: number,
): Promise<RankedBacktest[]> {
  const query = `
    SELECT
      b.id,
      b.titulo,
      b.balance,
      b.tipo,
      r.return_percent AS "returnPercent",
      r.profit_factor AS "profitFactor",
      r.max_drawdown AS "drawDown"
    FROM backtest AS b
    INNER JOIN resultados AS r
      ON r.id_backtest = b.id
    ORDER BY
      r.return_percent DESC,
      b.id ASC
  `;

  const rows =
    typeof limit === "number"
      ? db.prepare(`${query} LIMIT ?`).all(Math.max(0, Math.trunc(limit)))
      : db.prepare(query).all();

  const typedRows = rows as RankedBacktestRow[];

  return Promise.all(
    typedRows.map(async (row): Promise<RankedBacktest> => {
      const id = Number(row.id);
      const initialBalance = Number(row.balance);

      const trades = await getTrades(id);

      const equityCurve = buildEquityCurve(trades, initialBalance);

      return {
        id,
        titulo: row.titulo,
        tipo: row.tipo,
        initialBalance,
        returnPercent: Number(row.returnPercent),
        profitFactor: Number(row.profitFactor),
        drawDown: Number(row.drawDown),
        points: equityCurve.points,
      };
    }),
  );
}

//---Para BarGraph

const DEFAULT_DAY_LABELS = ["LUN", "MAR", "MIE", "JUE", "VIE"];

export interface ChartDay extends WeekAverage {
  height: number;
  label: string;
}

function getMax(weekAverages: WeekAverage[]): number {
  let actualMax = 0;

  for (const item of weekAverages) {
    const currentAverage = Math.abs(item.average ?? 0);

    if (currentAverage > actualMax) {
      actualMax = currentAverage;
    }
  }

  return actualMax;
}

export function createChartDays(
  weekAverages: WeekAverage[],
  dayLabels: string[] = DEFAULT_DAY_LABELS,
): ChartDay[] {
  const maxAverage = getMax(weekAverages);

  return weekAverages.map((item): ChartDay => {
    const absoluteAverage = Math.abs(item.average ?? 0);

    const height = maxAverage > 0 ? (absoluteAverage / maxAverage) * 100 : 0;

    return {
      ...item,
      height,
      label: dayLabels[item.day - 1] ?? "",
    };
  });
}

//------Busqueda ---------->>

export interface StrategySearchResult {
  id: number;
  name: string;
  type: "strategy";
  href: string;
}

type StrategySearchRow = {
  id: number;
  name: string;
};

export function searchStrategies(
  searchText: string,
  limit: number = 8,
): StrategySearchResult[] {
  const query = searchText.trim();

  if (!query) {
    return [];
  }

  const numericId = /^\d+$/.test(query) ? Number(query) : null;

  const safeLimit = Math.min(Math.max(Math.trunc(limit), 1), 10);

  const rows = db
    .prepare(
      `
      SELECT
        id,
        titulo AS name
      FROM backtest
      WHERE
        (? IS NOT NULL AND id = ?)
        OR LOWER(titulo) LIKE LOWER(?) 
      ORDER BY
        CASE
          WHEN (? IS NOT NULL AND id = ?) THEN 0
          WHEN LOWER(titulo) = LOWER(?) THEN 1
          ELSE 2
        END,
        titulo ASC
      LIMIT ?
    `,
    )
    .all(
      numericId,
      numericId,
      `%${query}%`,
      numericId,
      numericId,
      query,
      safeLimit,
    ) as StrategySearchRow[];

  return rows.map((row) => ({
    id: Number(row.id),
    name: row.name,
    type: "strategy",
    href: `/strategies/${row.id}`,
  }));
}

type PercentPlResult = {
  percentReturn: string;
  totalPNL: string;
};

export function percentPl(pl: number, initialBalance: number): PercentPlResult {
  const totalPNL = pl.toFixed(2);

  // Evitamos dividir entre cero     
  if (initialBalance === 0) {
    return {
      percentReturn: "0.00",
      totalPNL,
    };
  }

  const percentResult = (pl * 100) / initialBalance;

  let percentReturn: string;

  if (percentResult < 0) {
    percentReturn = percentResult.toFixed(2); // "-5.00"
  } else if (percentResult > 0) {
    percentReturn = `+${percentResult.toFixed(2)}`; // "+5.00"
  } else {
    percentReturn = "0.00";
  }

  return {
    percentReturn,
    totalPNL,
  };
}

export function percentFavorable(entryPrice: number, maxPrice: number): number{
  const percentMfe = (maxPrice * 100) / entryPrice;
  return percentMfe; 
}

export function percentUnFavorable(entryPrice: number, maxPrice: number): number{
  const percentMae = (maxPrice * 100) / entryPrice;
  return percentMae; 
}


