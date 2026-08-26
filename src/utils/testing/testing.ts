import type { resultados } from "../../interfaces/resultados";
import type { StrategyAction } from "../../interfaces/strategyAction";
import type { StrategyCondition } from "../../interfaces/strategyCondition";
import type { StrategyIndicator } from "../../interfaces/strategyIndicator";
import type { StrategyOptions } from "../../interfaces/strategyOptions";
import type { Trade } from "../../interfaces/trades";
// import type { DataTv } from "../../interfaces/dataTv";

import { GestionStrategy } from "../../enums/gestionStrategy";
import type { GestionParams } from "../../interfaces/gestionParams";
import { Activo } from "../../enums/activo";
import { Action } from "../../enums/action";
import { Logic } from "../../enums/logic";
import { Dias } from "../../enums/Dias";
import { TradingDirection } from "../../enums/tradingDirection";
import type { TakeProfit } from "../../interfaces/takeProfit";
import type { SymbolInfoCFD } from "../../interfaces/symbolInfoCFD";
import { EntryDirection } from "../../enums/EntryDirection";
import type { Strategy } from "../../interfaces/strategy";
import type { Backtest } from "../../interfaces/backtest";
import { Timeframe } from "../../enums/timeframe";
import { DataFormatSymbol } from "../../enums/dataFormatSymbol";
import type { DataDukas } from "../../interfaces/dataDukas";
// import type { DataIndicator } from "../../interfaces/dataIndicator";
import type { DataIndicator } from "../../interfaces/dataIndicator";
import type { DataTv } from "../../interfaces/dataTv";

export function get_alls_backtests() {
  let allBacktests: Backtest[] = [
    {
      id: 27,
      titulo: "UnitTest: CruceMedias",
      balance: 10000.0,
      tipo: Activo.CDF,
      gestion_strategy: GestionStrategy.Formula,
      parametros_gestion: { multiplicador: 1.0, lotaje_fijo: 0.1 },
      trades: [
        {
          duracion_dias: "00",
          duracion_horas: "22",
          duracion_minutos: "1320",
          duracion_segundos: "79200",
          id: 18065,
          id_backtest: 27,
          id_symbol: 1,
          label: 0,
          lotaje: 0.07,
          multiplicador: 1.0,
          pips_pl: -23232.68248,
          pl: -15.84,
          plsc: -16.26,
          precio_cierre: 1280.7012682484271,
          precio_entrada: 1278.378,
          precio_maximo: 0.0,
          precio_minimo: 0.0,
          sl: 1280.7012682484271,
          symbol: {
            id: 1,
            broker_id: 1,
            name: "XAUUSD",
            valor_contrato: 100,
            comision_lote: 7,
            swap_long: -35,
            swap_short: 12,
            dia_triple_swap: Dias.Mi,
            lotaje_minimo: 0.01,
            lotaje_maximo: 50,
            digitos: 3,
            open_weekend: false,
            spread: 25,
          },
          t0: "2019-01-21 10:00:00",
          t1: "2019-01-22 08:00:00",
          tipo: EntryDirection.Sell,
          tp: 1272.8021562037748,
        },
      ],
      datos: {
        id: 1,
        name: "XAUUSD",
        timeframe: Timeframe.H1,
        ruta: "data/xauusd_h1.csv",
        formato: DataFormatSymbol.Csv,
        fecha_inicio: "2019-01-01",
        fecha_fin: "2024-12-31",
        actualizado: true,
        n_data: 50000,
        origen: "broker",
      },
      estrategia: {
        activa: true,
        creada_en: "2020/05/20",
        descripcion: "Esto es una prueba para el tets unitario.",
        id: 1,
        id_user: 1,
        nombre: "Cruce de medias",
      },
    },
    {
      id: 27,
      titulo: "UnitTest: CruceMedias",
      balance: 10000.0,
      tipo: Activo.CDF,
      gestion_strategy: GestionStrategy.Formula,
      parametros_gestion: { multiplicador: 1.0, lotaje_fijo: 0.1 },
      trades: [
        {
          duracion_dias: "00",
          duracion_horas: "22",
          duracion_minutos: "1320",
          duracion_segundos: "79200",
          id: 18065,
          id_backtest: 27,
          id_symbol: 1,
          label: 0,
          lotaje: 0.07,
          multiplicador: 1.0,
          pips_pl: -23232.68248,
          pl: -15.84,
          plsc: -16.26,
          precio_cierre: 1280.7012682484271,
          precio_entrada: 1278.378,
          precio_maximo: 0.0,
          precio_minimo: 0.0,
          sl: 1280.7012682484271,
          symbol: {
            id: 1,
            broker_id: 1,
            name: "XAUUSD",
            valor_contrato: 100,
            comision_lote: 7,
            swap_long: -35,
            swap_short: 12,
            dia_triple_swap: Dias.Mi,
            lotaje_minimo: 0.01,
            lotaje_maximo: 50,
            digitos: 3,
            open_weekend: false,
            spread: 25,
          },
          t0: "2019-01-21 10:00:00",
          t1: "2019-01-22 08:00:00",
          tipo: EntryDirection.Sell,
          tp: 1272.8021562037748,
        },
      ],
      datos: {
        id: 1,
        name: "XAUUSD",
        timeframe: Timeframe.H1,
        ruta: "data/xauusd_h1.csv",
        formato: DataFormatSymbol.Csv,
        fecha_inicio: "2019-01-01",
        fecha_fin: "2024-12-31",
        actualizado: true,
        n_data: 50000,
        origen: "broker",
      },
      estrategia: {
        activa: true,
        creada_en: "2020/05/20",
        descripcion: "Esto es una prueba para el tets unitario.",
        id: 1,
        id_user: 1,
        nombre: "Cruce de medias",
      },
    },
    {
      id: 27,
      titulo: "UnitTest: CruceMedias",
      balance: 10000.0,
      tipo: Activo.CDF,
      gestion_strategy: GestionStrategy.Formula,
      parametros_gestion: { multiplicador: 1.0, lotaje_fijo: 0.1 },
      trades: [
        {
          duracion_dias: "00",
          duracion_horas: "22",
          duracion_minutos: "1320",
          duracion_segundos: "79200",
          id: 18065,
          id_backtest: 27,
          id_symbol: 1,
          label: 0,
          lotaje: 0.07,
          multiplicador: 1.0,
          pips_pl: -23232.68248,
          pl: -15.84,
          plsc: -16.26,
          precio_cierre: 1280.7012682484271,
          precio_entrada: 1278.378,
          precio_maximo: 0.0,
          precio_minimo: 0.0,
          sl: 1280.7012682484271,
          symbol: {
            id: 1,
            broker_id: 1,
            name: "XAUUSD",
            valor_contrato: 100,
            comision_lote: 7,
            swap_long: -35,
            swap_short: 12,
            dia_triple_swap: Dias.Mi,
            lotaje_minimo: 0.01,
            lotaje_maximo: 50,
            digitos: 3,
            open_weekend: false,
            spread: 25,
          },
          t0: "2019-01-21 10:00:00",
          t1: "2019-01-22 08:00:00",
          tipo: EntryDirection.Sell,
          tp: 1272.8021562037748,
        },
      ],
      datos: {
        id: 1,
        name: "XAUUSD",
        timeframe: Timeframe.H1,
        ruta: "data/xauusd_h1.csv",
        formato: DataFormatSymbol.Csv,
        fecha_inicio: "2019-01-01",
        fecha_fin: "2024-12-31",
        actualizado: true,
        n_data: 50000,
        origen: "broker",
      },
      estrategia: {
        activa: true,
        creada_en: "2020/05/20",
        descripcion: "Esto es una prueba para el tets unitario.",
        id: 1,
        id_user: 1,
        nombre: "Cruce de medias",
      },
    },
  ];

  return allBacktests;
}

export function get_backtest(
  id: number
) : Backtest {
  let backtest: Backtest = {
    id: 27,
    titulo: "UnitTest: CruceMedias",
    balance: 10000.0,
    tipo: Activo.CDF,
    gestion_strategy: GestionStrategy.Formula,
    parametros_gestion: { multiplicador: 1.0, lotaje_fijo: 0.1 },
    trades: [
      {
        duracion_dias: "00",
        duracion_horas: "22",
        duracion_minutos: "1320",
        duracion_segundos: "79200",
        id: 18065,
        id_backtest: 27,
        id_symbol: 1,
        label: 0,
        lotaje: 0.07,
        multiplicador: 1.0,
        pips_pl: -23232.68248,
        pl: -15.84,
        plsc: -16.26,
        precio_cierre: 1280.7012682484271,
        precio_entrada: 1278.378,
        precio_maximo: 0.0,
        precio_minimo: 0.0,
        sl: 1280.7012682484271,
        symbol: {
          id: 1,
          broker_id: 1,
          name: "XAUUSD",
          valor_contrato: 100,
          comision_lote: 7,
          swap_long: -35,
          swap_short: 12,
          dia_triple_swap: Dias.Mi,
          lotaje_minimo: 0.01,
          lotaje_maximo: 50,
          digitos: 3,
          open_weekend: false,
          spread: 25,
        },
        t0: "2019-01-21 10:00:00",
        t1: "2019-01-22 08:00:00",
        tipo: EntryDirection.Sell,
        tp: 1272.8021562037748,
      },
    ],
    datos: {
      id: 1,
      name: "XAUUSD",
      timeframe: Timeframe.H1,
      ruta: "data/xauusd_h1.csv",
      formato: DataFormatSymbol.Csv,
      fecha_inicio: "2019-01-01",
      fecha_fin: "2024-12-31",
      actualizado: true,
      n_data: 50000,
      origen: "broker",
    },
    estrategia: {
      activa: true,
      creada_en: "2020/05/20",
      descripcion: "Esto es una prueba para el tets unitario.",
      id: 1,
      id_user: 1,
      nombre: "Cruce de medias",
    },
  };

  return backtest;
}

export function save_data_dukas(
  data: DataDukas[],
  name: string,
  timeframe: Timeframe,
  from_date: string,
  to_date: string,
  broker_data: string, //Tiapdo correcto⚠️: DataOrigen
  ruta: string,
  format: DataFormatSymbol,
  actualized: boolean,
): string {
  let mensajeConfirmación: string;
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    name.trim() !== "" &&
    timeframe !== undefined &&
    timeframe !== null &&
    from_date.trim() !== "" &&
    to_date.trim() !== "" &&
    broker_data.trim() !== "" &&
    ruta.trim() !== "" &&
    format !== undefined &&
    format !== null &&
    typeof actualized === "boolean"
  ) {
    return (mensajeConfirmación = "Datos de Dukas guardados correctamente.");
  } else {
    return (mensajeConfirmación = "Error al guardar los datos de Dukas.");
  }
}

export function save_data_dukas_ticks(
  data: DataDukasTicks[],
  name: string,
  timeframe: Timeframe,
  from_date: string,
  to_date: string,
  broker_data: string, //Tiapdo correcto⚠️: DataOrigen
  ruta: string,
  format: DataFormatSymbol,
  actualized: boolean,
): string {
  let mensajeConfirmación: string;
  if (
    Array.isArray(data) &&
    data.length > 0 &&
    name.trim() !== "" &&
    timeframe !== undefined &&
    timeframe !== null &&
    from_date.trim() !== "" &&
    to_date.trim() !== "" &&
    broker_data.trim() !== "" &&
    ruta.trim() !== "" &&
    format !== undefined &&
    format !== null &&
    typeof actualized === "boolean"
  ) {
    return (mensajeConfirmación =
      "Datos de Dukas en ticks guardados correctamente.");
  } else {
    return (mensajeConfirmación =
      "Error al guardar los datos de Dukas en ticks.");
  }
}

export function get_data_for_tv(
  id_backtest: number,
  from_date: string,
  to_date: string,
  prev_bars: number,
): DataTv [] {
  let get_indicator_for_tv: DataTv [] = [{
    time: 1717200000, // Unix timestamp en segundos
    open: 1.08452,
    high: 1.0851,
    low: 1.0839,
    close: 1.0848,
    volume: 1520,
  },{
    time: 1717200000, // Unix timestamp en segundos
    open: 1.08452,
    high: 1.0851,
    low: 1.0839,
    close: 1.0848,
    volume: 1520,
  }];

  return get_indicator_for_tv;
}

export function get_indicator_for_tv(
  id_backtest: number,
  id_estrategia: number,
  column: string,
  from_date: string,
  to_date: string,
  prev_bars?: number
): DataIndicator[] {
  let get_indicator_for_tv: DataIndicator[] = [
    {
      time: 1717200000, // Unix timestamp en segundos
      value: 1.08495, // valor del indicador
    },
    {
      time: 1717200000, // Unix timestamp en segundos
      value: 1.08495, // valor del indicador
    },
  ];
  return get_indicator_for_tv;
}

export function get_results_by_backtest(id:number): resultados {
  let get_results_by_backtest: resultados = {
    id: 1,
    id_backtest: 101,

    retorno: 2500,
    return_percent: 25.5,
    cagr: 12.3,
    sharpe_ratio: 1.45,
    sortino_ratio: 1.82,
    omega_ratio: 1.35,

    expected_daily: 0.08,
    expected_monthly: 2.1,
    expected_yearly: 24.8,

    best_day: 3.2,
    worst_day: -2.4,
    best_month: 8.7,
    worst_month: -5.1,
    best_year: 32.4,
    worst_year: -12.8,

    time_in_market: 65.5,

    max_drawdown: -14.2,
    max_drawdown_divisa: -1420,
    max_drawdown_duration: 45,
    avg_drawdown_duration: 12,
    max_drawdown_avg: -6.8,
    avg_drawdown: -3.4,

    ulcer_index: 4.2,
    serenity_index: 1.15,

    daily_var: -1.8,
    daily_var_95: -2.5,
    daily_var_99: -4.1,
    cvar: -3.2,

    risk_of_ruin: 0.02,

    volatility_ann: 18.6,
    calmar_ratio: 1.73,
    skew_ratio: 0.35,
    kurtosis_ratio: 2.8,
    tail_ratio: 1.12,

    outlier_win: 5.4,
    outlier_loss: -4.7,

    payoff_ratio: 1.6,
    profit_factor: 1.85,
    gain_pain_ratio: 1.42,
    common_sense_ratio: 1.95,
    cpc_index: 1.25,
    kelly_criterion: 0.18,

    win_days: 56,
    win_months: 8,
    win_quarters: 3,
    win_years: 1,

    beta: 0.87,
    alpha: 4.5,
    correlation: 0.72,
    information_ratio: 0.91,
    recovery_factor: 2.4,

    n_trades: 150,
    return_drawdown_ratio: 1.79,
    wins_percentage: 58.6,

    avg_trade_return: 16.67,
    avg_win_return: 45.2,
    avg_loss_return: -28.4,
    avg_win_loss_ratio: 1.59,

    r_expectancy: 0.42,
    r_exp_score: 1.3,

    z_score: 1.96,
    z_probability: 0.95,

    n_wins: 88,
    n_losses: 62,

    avg_bars_win: 14,
    avg_bars_loss: 9,
  };
  return get_results_by_backtest;
}

export function get_trade(id: number): Trade {
  let trade: Trade = {
    duracion_dias: "00",
    duracion_horas: "22",
    duracion_minutos: "1320",
    duracion_segundos: "79200",
    id: 18065,
    id_backtest: 27,
    id_symbol: 1,
    label: 0,
    lotaje: 0.07,
    multiplicador: 1.0,
    pips_pl: -23232.68248,
    pl: -15.84,
    plsc: -16.26,
    precio_cierre: 1280.7012682484271,
    precio_entrada: 1278.378,
    precio_maximo: 0.0,
    precio_minimo: 0.0,
    sl: 1280.7012682484271,
    symbol: {
      id: 1,
      broker_id: 1,
      name: "XAUUSD",
      valor_contrato: 100,
      comision_lote: 7,
      swap_long: -35,
      swap_short: 12,
      dia_triple_swap: Dias.Mi,
      lotaje_minimo: 0.01,
      lotaje_maximo: 50,
      digitos: 3,
      open_weekend: false,
      spread: 25,
    },
    t0: "2019-01-21 10:00:00",
    t1: "2019-01-22 08:00:00",
    tipo: EntryDirection.Sell,
    tp: 1272.8021562037748,
  };

  return trade;
}

export function get_trades_page(
  id_backtest: number,
  limite:number,
  pagina:number
): Trade[] {
  let pages: Trade[] = [
    {
      duracion_dias: "00",
      duracion_horas: "22",
      duracion_minutos: "1320",
      duracion_segundos: "79200",
      id: 18065,
      id_backtest: 27,
      id_symbol: 1,
      label: 0,
      lotaje: 0.07,
      multiplicador: 1.0,
      pips_pl: -23232.68248,
      pl: -15.84,
      plsc: -16.26,
      precio_cierre: 1280.7012682484271,
      precio_entrada: 1278.378,
      precio_maximo: 0.0,
      precio_minimo: 0.0,
      sl: 1280.7012682484271,
      symbol: {
        id: 1,
        broker_id: 1,
        name: "XAUUSD",
        valor_contrato: 100,
        comision_lote: 7,
        swap_long: -35,
        swap_short: 12,
        dia_triple_swap: Dias.Mi,
        lotaje_minimo: 0.01,
        lotaje_maximo: 50,
        digitos: 3,
        open_weekend: false,
        spread: 25,
      },
      t0: "2019-01-21 10:00:00",
      t1: "2019-01-22 08:00:00",
      tipo: EntryDirection.Sell,
      tp: 1272.8021562037748,
    },
  ];

  return pages;
}

export function get_trades(id: number): Trade[] {
  let trades: Trade[] = [
    {
      duracion_dias: "00",
      duracion_horas: "22",
      duracion_minutos: "1320",
      duracion_segundos: "79200",
      id: 18065,
      id_backtest: 27,
      id_symbol: 1,
      label: 0,
      lotaje: 0.07,
      multiplicador: 1.0,
      pips_pl: -23232.68248,
      pl: -15.84,
      plsc: -16.26,
      precio_cierre: 1280.7012682484271,
      precio_entrada: 1278.378,
      precio_maximo: 0.0,
      precio_minimo: 0.0,
      sl: 1280.7012682484271,
      symbol: {
        id: 1,
        broker_id: 1,
        name: "XAUUSD",
        valor_contrato: 100,
        comision_lote: 7,
        swap_long: -35,
        swap_short: 12,
        dia_triple_swap: Dias.Mi,
        lotaje_minimo: 0.01,
        lotaje_maximo: 50,
        digitos: 3,
        open_weekend: false,
        spread: 25,
      },
      t0: "2019-01-21 10:00:00",
      t1: "2019-01-22 08:00:00",
      tipo: EntryDirection.Sell,
      tp: 1272.8021562037748,
    },
    {
      duracion_dias: "00",
      duracion_horas: "22",
      duracion_minutos: "1320",
      duracion_segundos: "79200",
      id: 18065,
      id_backtest: 27,
      id_symbol: 1,
      label: 0,
      lotaje: 0.07,
      multiplicador: 1.0,
      pips_pl: -23232.68248,
      pl: -15.84,
      plsc: -16.26,
      precio_cierre: 1280.7012682484271,
      precio_entrada: 1278.378,
      precio_maximo: 0.0,
      precio_minimo: 0.0,
      sl: 1280.7012682484271,
      symbol: {
        id: 1,
        broker_id: 1,
        name: "XAUUSD",
        valor_contrato: 100,
        comision_lote: 7,
        swap_long: -35,
        swap_short: 12,
        dia_triple_swap: Dias.Mi,
        lotaje_minimo: 0.01,
        lotaje_maximo: 50,
        digitos: 3,
        open_weekend: false,
        spread: 25,
      },
      t0: "2019-01-21 10:00:00",
      t1: "2019-01-22 08:00:00",
      tipo: EntryDirection.Sell,
      tp: 1272.8021562037748,
    },
  ];

  return trades;
}

