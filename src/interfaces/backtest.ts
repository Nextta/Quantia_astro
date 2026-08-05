import { Activo } from "../enums/activo";
import { GestionStrategy } from "../enums/gestionStrategy";
import type { GestionParams } from "./gestionParams";
import type { Trade } from "./trades";
import type { Strategy } from "./strategy";
import type { DataSymbol } from "./dataSymbol";


export interface Backtest {
    id: number;
    titulo: string;
    balance: number;
    tipo: Activo; // Tipo de activo ej: Forex, Crypto, Futuros...etc - Enum
    gestion_strategy: GestionStrategy,
    parametros_gestion: GestionParams,
    trades?: Trade[],
    datos?: DataSymbol,
    estrategia?: Strategy,
}