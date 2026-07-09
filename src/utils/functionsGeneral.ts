import type { Backtest } from "../interfaces/backtest";
import type { resultados } from "../interfaces/resultados"

// const cuenta_data_all, Strategy = cuenta_data
import Database from "better-sqlite3";

const db = new Database(import.meta.env.URL_DATABASE);

export async function getBacktest(): Promise<Backtest[]> {
  return db.prepare("SELECT * FROM backtest ORDER BY id ASC").all() as Backtest[];
}

export async function getResults(idBacktest:number): Promise<resultados[]>{
    return db.prepare(`SELECT * FROM resultados WHERE id= ${idBacktest} ORDER BY id ASC`).all() as resultados[];
}




