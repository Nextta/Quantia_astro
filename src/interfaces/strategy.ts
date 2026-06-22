import type { StrategyIndicator } from "./strategyIndicator";
import type { StrategyAction } from "./strategyAction";
import type { StrategyOptions } from "./strategyOptions";


export interface Strategy {
    id: number;
    id_user?: number;
    nombre: string,
    descripcion?: string;
    activa?: boolean;
    creada_en?: string;
    indicadores?: StrategyIndicator[];
    acciones?: StrategyAction[];
    opciones?: StrategyOptions;
}