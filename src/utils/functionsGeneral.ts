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



