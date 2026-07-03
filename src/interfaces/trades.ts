// import SymbolInfoCFD  from "C:\\Users\\AXEN BROKER\\Documents\\Quantia\\Quantia_astro\\src\\interfaces\\SymbolInfoCFD";
import type { SymbolInfoCFD } from '../interfaces/symbolInfoCFD'
import { EntryDirection } from "../enums/EntryDirection";



export interface Trade{
    id: number; // id del Backtest
    id_backtest: number;
    id_symbol: number;
    symbol: SymbolInfoCFD;
    tipo: EntryDirection; // tipo = Tipo de operación (buy/sell)
    lotaje: number;
    multiplicador: number; // Multiplicador del lotaje por operación.
    t0: string;         // t0 = Fecha y hora de entrada
    precio_entrada: number;
    tp: number;
    sl: number;
    t1: string; // t1 = Fecha y hora de cierre
    precio_cierre: number;
    precio_maximo: number; // precioMaximo = Precio máximo alcanzado durante la operación
    precio_minimo: number; // precioMinimo = Precio mínimo alcanzado durante la operación
    duracion_segundos: string; // duracionSegundos = Duración en segundos de la operación
    duracion_minutos: string; // duracionMinutos = Duración en minutos de la operación
    duracion_horas: string; // duracionHoras = Duración en horas de la operación
    duracion_dias: string; // duracionDias = Duración en días de la operación
    label: number;         // label = Etiqueta de la operación 1 ganada; 0 perdida
    pl: number;            // pl = Ganancia o pérdida de la operación con comisión
    plsc: number;          // plsc = Ganancia o pérdida de la operación sin comisiones
    pips_pl: number; 
}

// pipsPL = Ganancia o pérdida de la operación en pi