import {Logic} from '../enums/logic';

export interface StrategyCondition {
    id: number;
    strategy_id: number;
    action_id: number;
    campo_a: string;
    shift_a: number;
    operador: string;
    campo_b: string;
    shift_b: number;
    logica?: Logic;
    orden: number;
    next_condition?: StrategyCondition;
}