import { Dias } from "../enums/Dias";

export interface SymbolInfoCFD {
    id: number;
    broker_id: number;
    name: String;
    valor_contrato: number;
    comision_lote: number;
    swap_long: number;
    swap_short: number;
    dia_triple_swap: Dias;
    lotaje_minimo: number;
    lotaje_maximo: number;
    digitos: number;
    open_weekend: boolean;
    spread: number;
}