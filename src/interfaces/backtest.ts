import { Activo } from "../enums/activo";
import { GestionStrategy } from "../enums/gestionStrategy";
import type { GestionParams } from "./gestionParams";
import type { Trades } from "./trades";
import type { Strategy } from "./strategy";
export interface Backtest {
    id: number;
    titulo: String;
    balance: number;
    tipo: Activo; // Tipo de activo ej: Forex, Crypto, Futuros...etc - Enum
    gestion_strategy: GestionStrategy,
    parametros_gestion: GestionParams,
    trades: [Trades],
    datos: [any],
    estrategia: Strategy,
}