import {Logic} from '../enums/logic';

export interface StrategyCondition {
    id: number;
    strategy_id: number;
    action_id: number;
    campo_a: String;
    shift_a: number;
    operador: String;
    campo_b: String;
    shift_b: number;
    logica?: Logic;
    orden: number;
    next_condition?: StrategyCondition;
}