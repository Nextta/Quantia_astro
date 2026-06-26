
import type { resultados } from "../../interfaces/resultados";
import type { Backtest } from "../../interfaces/backtest";
import type { Strategy } from "../../interfaces/strategy";
import type { Backtest } from "../../interfaces/backtest";
import type { Backtest } from "../../interfaces/backtest";
import type { Backtest } from "../../interfaces/backtest";
import type { Backtest } from "../../interfaces/backtest";
import type { Backtest } from "../../interfaces/backtest";
import type { Backtest } from "../../interfaces/backtest";
import type { StrategyAction } from "../../interfaces/strategyAction";
import type { StrategyCondition } from "../../interfaces/strategyCondition";
import type { StrategyIndicator } from "../../interfaces/strategyIndicator";
import type { StrategyOptions } from "../../interfaces/strategyOptions";
import type { Trades } from "../../interfaces/trades";

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

export function get_results_by_backtest(idActual: number) {
  let resultados : resultados = {"alpha":0.0,"avg_bars_loss":153967.16417910447,"avg_bars_win":216139.13043478262,"avg_drawdown":-2.243828161783433,"avg_drawdown_duration":10505520.0,"avg_loss_return":0.37386849183687876,"avg_trade_return":0.03566955660683254,"avg_win_loss_ratio":2.222718243170819,"avg_win_return":0.8310043173525908,"best_day":412.2833358857993,"best_month":1206.6820132896805,"best_year":1548.1776913915526,"beta":0.0,"cagr":0.029717846357110833,"calmar_ratio":0.22656467503247452,"common_sense_ratio":2.0771908385754876,"correlation":0.0,"cpc_index":0.8762921214508917,"cvar":-114.68995525293225,"daily_var":0.0,"daily_var_95":-133.96056046020018,"daily_var_99":-191.3274125301566,"expected_daily":0.03566955660683254,"expected_monthly":0.7490606887434833,"expected_yearly":8.9887282649218,"gain_pain_ratio":0.14453402073721272,"id":9,"id_backtest":27,"information_ratio":0.0,"kelly_criterion":0.044894030616327185,"kurtosis_ratio":0.31674177842351803,"max_drawdown":-13.116716607675597,"max_drawdown_avg":0.0,"max_drawdown_divisa":-1697.4877875091133,"max_drawdown_duration":129726000,"n_losses":402,"n_trades":609,"n_wins":207,"omega_ratio":1.1445340207372128,"outlier_loss":1.9369620422677272,"outlier_win":2.0838133990435144,"payoff_ratio":2.237565622144309,"profit_factor":1.152179312895204,"r_exp_score":2.4789800153433648,"r_expectancy":0.10045333954658775,"recovery_factor":1.7273117153924984,"retorno":2932.0905421001835,"return_drawdown_ratio":1.7285562029958543,"return_percent":22.672981855136392,"risk_of_ruin":0.0,"serenity_index":0.37827296710147895,"sharpe_ratio":0.8692662348688661,"skew_ratio":0.9636679792311731,"sortino_ratio":1.61299609911238,"tail_ratio":1.8028364294754677,"time_in_market":48.44544755736552,"ulcer_index":5.990920997230984,"volatility_ann":10.340592909694465,"win_days":204.0,"win_months":44.0,"win_quarters":15.0,"win_years":5.0,"wins_percentage":33.99014778325123,"worst_day":-177.4923450535783,"worst_month":-355.6350757786191,"worst_year":-979.0303165157611,"z_probability":0.0,"z_score":-235.65668843725746};

  return resultados;
}

export function get_backtest(idActual: number){
  let backtest : Backtest = {"balance":10000.0,"gestion_strategy":GestionStrategy.Formula,"id":27,"parametros_gestion":{multiplicador:1.0,lotaje_fijo:0.1},"tipo":Activo.CDF,"titulo":"UnitTest: CruceMedias"};

  return backtest;
}
//Testear el tipo de archivo que estoy recibiendo

// export function get_brokerCFD(idActual: number){
//   let backtest : Backtest = {"balance":10000.0,"gestion_strategy":"Formula","id":27,"parametros_gestion":"{\"multiplicador\":1.0,\"lotaje_fijo\":0.1}","tipo":"CDF","titulo":"UnitTest: CruceMedias"};
// }


export function get_strategies(idActual: number){
  let strategies : Strategy = {"activa":true,"creada_en":"2020/05/20","descripcion":"Esto es una prueba para el tets unitario.","id":1,"id_user":1,"nombre":"Cruce de medias"};

  return strategies;
}

export function get_strategies_actions(idActual: number){
  let strategies_actions : StrategyAction = {"id":1,"parametro":"{}","strategy_id":1,"tipo":Action.Buy,"tipo_signal":"Entry"};

  return strategies_actions;
}

export function get_strategies_conditions(idActual: number){
  let strategies_conditions : StrategyCondition = {"action_id":1,"campo_a":"close","campo_b":"ema_50","id":1,"logica":Logic.AND,"operador":">","orden":1,"shift_a":1,"shift_b":1,"strategy_id":1};

  return strategies_conditions
}

export function get_strategies_indicators(idActual: number){
  let strategies_indicators : StrategyIndicator  = {"id":1,"nombre":"ema_50","parametros":"{\"timeperiod\":50}","strategy_id":1,"tipo":"EMA"};

  return strategies_indicators;
}

export function get_strategies_options(idActual: number){
  let strategies_options : StrategyOptions = {"activar_cierre_numero_velas":false,"cerrar_fin_de_dia":false,"cerrar_fin_rango_operativo":false,"cerrar_viernes":false,"cierre_limite_hora":false,"hora_cierre_limite":null,"hora_cierre_viernes":null,"hora_fin_de_dia":null,"id":1,"multiples_trades":false,"numero_velas_cierre":0,"operar_finde":false,"parametros_stoploss":{"tipo":"atr","nombre_col":"atr","shift":0,"valor":0.0},"parametros_takeprofit":{"tipo":"atr","nombre_col":"atr_tp","shift":0,"valor":0.0},"rango_operativo":false,"rango_operativo_fin":null,"rango_operativo_inicio":null,"strategy_id":1,"trading_direccion":TradingDirection.Both};

  return strategies_options;
}

export function get_symbol_cfd(idActual: number){
  let symbol_cfd : SymbolInfoCFD = {"broker_id":1,"comision_lote":6.0,"dia_triple_swap":Dias.Vi,"digitos":2,"id":1,"lotaje_maximo":100.0,"lotaje_minimo":0.01,"name":"XAUUSD","open_weekend":false,"spread":0.2,"swap_long":-56.72,"swap_short":44.69,"valor_contrato":100.0};

  return symbol_cfd;
}

export function get_trades(idActual: number){
  let trades : Trades = {"duracion_dias":"00","duracion_horas":"22","duracion_minutos":"1320","duracion_segundos":"79200","id":18065,"id_backtest":27,"id_symbol":1,"label":0,"lotaje":0.07,"multiplicador":1.0,"pips_pl":-23232.68248,"pl":-15.84,"plsc":-16.26,"precio_cierre":1280.7012682484271,"precio_entrada":1278.378,"precio_maximo":0.0,"precio_minimo":0.0,"sl":1280.7012682484271,"symbol":{id: 1,
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
      spread: 25,},
      "t0":"2019-01-21 10:00:00","t1":"2019-01-22 08:00:00","tipo":EntryDirection.Sell,"tp":1272.8021562037748};

      return trades;
}