import type { StrategyIndicator } from "./strategyIndicator";
import type { StrategyAction } from "./strategyAction";
import type { StrategyOptions } from "./strategyOptions";


export interface Strategy {
    id: number;
    id_user: number;
    nombre: String,
    descripcion?: String;
    activa: boolean;
    creada_en: String;
    indicadores: StrategyIndicator[];
    acciones: StrategyAction[];
    opciones: StrategyOptions;
}