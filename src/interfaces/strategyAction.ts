import { Action } from "../enums/action";
import type {StrategyCondition}  from "./strategyCondition";
export interface StrategyAction {
    id: number;
    strategy_id: number;
    tipo_signal: string,
    tipo: Action,
    parametro: any,
    conditions?: StrategyCondition,
}