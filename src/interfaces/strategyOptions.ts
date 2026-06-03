import { TradingDirection } from "../enums/tradingDirection";
import type {StopLoss} from "./stopLoss";
import type {TakeProfit} from "./takeProfit";

export interface StrategyOptions {
    id: number;
    strategy_id: number;
    multiples_trades: boolean;
    trading_direccion: TradingDirection,
    operar_finde: boolean;
    cerrar_fin_de_dia: boolean;
    hora_fin_de_dia: Date;
    cerrar_viernes: boolean;
    hora_cierre_viernes: Date;
    rango_operativo: boolean;
    rango_operativo_inicio: Date;
    rango_operativo_fin: Date;
    cerrar_fin_rango_operativo: boolean;
    activar_cierre_numero_velas: boolean;
    numero_velas_cierre: number;
    cierre_limite_hora: boolean;
    hora_cierre_limite: Date;
    parametros_stoploss?: StopLoss,
    parametros_takeprofit?: TakeProfit,
}